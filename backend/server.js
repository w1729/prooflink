const express = require("express");
let { ReclaimClient } = require("@reclaimprotocol/zk-fetch");
let { Reclaim } = require("@reclaimprotocol/js-sdk");
const dotenv = require("dotenv");
const crypto = require("crypto");
const fs = require("fs");
const path = require("path");
const cors = require("cors");
const retry = require("async-retry");

dotenv.config();

let baseResult = {
  success: false,
  error: "",
  data: {},
};

// CORS configuration
const corsOptions = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: "Content-Type,Authorization",
  credentials: true,
  optionsSuccessStatus: 204,
};

console.log("Reclaim App ID:", process.env.RECLAIM_APP_ID);

const reclaimClient = new ReclaimClient(
  process.env.RECLAIM_APP_ID,
  process.env.RECLAIM_APP_SECRET,
  true
);

const app = express();

// Apply CORS middleware
app.use(cors(corsOptions));
app.use(express.json());

// Use `/tmp` for cache storage since Vercel allows writing there
const cacheDir = "/tmp/cache";

// Ensure cache directory exists
if (!fs.existsSync(cacheDir)) {
  fs.mkdirSync(cacheDir, { recursive: true });
}

const generateCacheKey = (reqSerialized) => {
  return crypto.createHash("md5").update(reqSerialized).digest("hex") + ".json";
};

const readCache = (cacheFile) => {
  const filePath = path.join(cacheDir, cacheFile);
  if (fs.existsSync(filePath)) {
    try {
      const data = fs.readFileSync(filePath);
      return JSON.parse(data.toString());
    } catch (err) {
      console.error("Error reading cache:", err);
      return null;
    }
  }
  return null;
};

const writeCache = (cacheFile, data) => {
  const filePath = path.join(cacheDir, cacheFile);
  try {
    fs.writeFileSync(
      filePath,
      JSON.stringify({
        data,
        cachedAt: Date.now(),
      })
    );
  } catch (err) {
    console.error("Error writing to cache:", err);
  }
};

async function generateProof(data) {
  try {
    let publicOptions = {
      method: data.method,
      headers: data.header,
    };

    let privateOptions = {};

    if (data.responseMatches && data.responseMatches.length > 0) {
      privateOptions.responseMatches = data.responseMatches;
    }

    if (data.responseRedactions && data.responseRedactions.length > 0) {
      privateOptions.responseRedactions = data.responseRedactions;
    }

    console.log("Request URL:", data.url);
    console.log("Request Options:", publicOptions);

    const proof = await retry(
      async (bail) => {
        try {
          const result = await reclaimClient.zkFetch(
            data.url,
            publicOptions,
            privateOptions,
            2, // retries
            10000 // timeout in milliseconds
          );
          return result;
        } catch (err) {
          if (err.message.includes("stream ended")) {
            throw err; // Retry on stream errors
          } else {
            bail(err); // Stop retrying on other errors
          }
        }
      },
      {
        retries: 3, // Retry 3 times
      }
    );

    if (!proof) {
      return {
        success: false,
        error: "Failed to generate proof",
      };
    }

    const isValid = await Reclaim.verifySignedProof(proof);
    if (!isValid) {
      return {
        success: false,
        error: "Proof is invalid",
      };
    }

    const tProof = await Reclaim.transformForOnchain(proof);

    return {
      success: true,
      data: { proof: proof, transformed: tProof },
    };
  } catch (err) {
    console.error("Error in generateProof:", err);
    return {
      success: false,
      error: err.message,
    };
  }
}

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

app.post("/proof", async function (req, res) {
  const cacheKey = generateCacheKey(JSON.stringify(req.body));
  const cache = readCache(cacheKey);

  if (cache) {
    baseResult.success = true;
    baseResult.data = cache;
    return res.status(200).json(baseResult);
  }

  try {
    const result = await generateProof(req.body);

    if (!result.success) {
      baseResult.error = result.error;
      return res.status(400).json(baseResult);
    }

    let response = {
      id: cacheKey.replace(".json", ""),
      url: req.body.url,
      proof: result.data.proof,
      transformed: result.data.transformed,
    };

    writeCache(cacheKey, response);
    baseResult.success = true;
    baseResult.data = response;
    baseResult.error = "";

    return res.status(200).json(baseResult);
  } catch (e) {
    console.error("Server Error:", e);
    baseResult.error = "ServerError";
    return res.status(500).json(baseResult);
  }
});

app.get("/proof/:id", function (req, res) {
  const cache = readCache(req.params.id + ".json");

  if (cache) {
    return res.status(200).json(cache.data);
  }

  return res.status(404).json({ error: "NotFound" });
});

// If we're not in a Vercel environment, start the server
if (process.env.NODE_ENV !== "production") {
  const port = process.env.PORT || 7788;
  app.listen(port, () => {
    console.log(`ZKlinker API listening on port ${port}`);
  });
}

// Export the app for Vercel serverless deployment
module.exports = app;
