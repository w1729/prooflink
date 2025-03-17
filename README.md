# **ProofLink**

## **Overview**

ProofLink is a lightweight tool that enables **secure transfer and verification of API data** on blockchain networks. By leveraging **zero-knowledge proofs (ZKPs)**, it allows developers to verify API responses **on-chain** without exposing sensitive data. This ensures **privacy, security, and decentralization** while integrating external data into blockchain applications.

---

## ⚠️ Note

> Currently, the frontend and backend are hosted on Vercel using the free tier, which has a **function execution time limit of 10 seconds**. In some cases, proof generation may exceed this time, resulting in an error. This issue can be resolved by deploying the backend on a **dedicated server** with higher execution time limits.

## **Demo**

Try out the live demo: [ProofLink Demo](https://test4-zeta-nine.vercel.app/) <br>
Demo video: [Youtube](https://youtu.be/WfakfCkzE58)

## **Problem It Solves**

API data verification is **centralized and trust-dependent**, making it unsuitable for blockchain applications requiring **decentralization and immutability**. ProofLink solves this by:

✅ Allowing developers to **prove data authenticity** with just a few clicks.  
✅ Enhancing **data privacy and security** using **zero-knowledge proofs**.  
✅ **Eliminating reliance on centralized oracles** for API verification.  
✅ Providing a seamless way to **share verified data** across teams and dApps.

---

## **Project Structure**

```
prooflink/
│── backend/        # Node.js/Express backend for proof generation & verification
│── frontend/       # React/Vite-based frontend for user interaction
│── README.md       # Project documentation
```

---

## **Vision**

ProofLink envisions a future where API data verification is:

🔹 **Seamless** – Developers can fetch and verify external data in seconds.  
🔹 **Private** – No raw API data is exposed, thanks to ZK proofs.  
🔹 **Trustless** – Eliminates dependency on centralized oracles.  
🔹 **Blockchain-Agnostic** – Compatible with multiple blockchains.

Our goal is to **empower developers** to build **transparent and secure** blockchain applications with **minimal setup**.

---

## **Architecture**

ProofLink follows a **modular and trustless** architecture:

1️⃣ **Data Fetching** – Fetches API responses from external sources.  
2️⃣ **Zero-Knowledge Proof Generation** – Uses the **Reclaim Protocol** to generate ZK proofs.  
3️⃣ **On-Chain Verification** – Proofs are submitted to a smart contract for validation.  
4️⃣ **Decentralized Storage (Optional)** – Verified data can be stored on-chain or via IPFS.

### **Diagram: ProofLink Workflow**

```
User → (API Request) → Backend → (ZK Proof) → Smart Contract → (Verification) → dApp
```

This architecture ensures **trustless, private, and efficient** data verification.

---

# **Backend**

## **Backend Responsibilities**

✅ Fetch API data securely.  
✅ Generate **zero-knowledge proofs** for data authenticity.  
✅ Submit proofs to blockchain **for on-chain verification**.  
✅ Provide API endpoints for frontend integration.

### **Setup (Backend)**

1️⃣ **Navigate to the backend folder**

```sh
cd backend
```

2️⃣ **Install dependencies**

```sh
npm install
```

3️⃣ **Set up environment variables**  
Create a `.env` file and add:

```
RECLAIM_APP_ID
RECLAIM_APP_SECRET
```

4️⃣ **Run the backend**

```sh
node index.js
```

---

# **Frontend**

## **Frontend Responsibilities**

✅ Provide a **user-friendly interface** for fetching & verifying API data.  
✅ Interact with the backend to **generate ZK proofs**.  
✅ Display **verified proofs and blockchain transactions**.

### **Setup (Frontend)**

1️⃣ **Navigate to the frontend folder**

```sh
cd frontend
```

2️⃣ **Install dependencies**

```sh
npm install
```

3️⃣ **Run the frontend**

```sh
npm run dev
```

---

## **How ProofLink Works**

1️⃣ **User selects an API endpoint** to fetch data from.  
2️⃣ **Backend fetches the API response** and generates a **zero-knowledge proof**.  
3️⃣ The **ZK proof is submitted on-chain** for verification.  
4️⃣ Once verified, the **data can be used** in smart contracts, DeFi apps, or other Web3 applications.

This **trustless** approach eliminates reliance on centralized data providers.

---

## **Use Cases**

🚀 **DeFi** – Securely verify **off-chain price feeds** and interest rates.  
🔗 **Reputation Systems** – Prove credentials **without exposing sensitive data**.  
📦 **Supply Chain Transparency** – Ensure **on-chain verification** of logistics data.  
🎮 **Gaming & NFTs** – Prove **off-chain metadata authenticity** for game assets.

ProofLink is a **plug-and-play** solution for **secure blockchain data verification**.

---

## **Future Roadmap**

🔹 **Support for multiple ZK protocols** – Expand beyond **Reclaim Protocol**.  
🔹 **Cross-chain compatibility** – Enable seamless verification on **Ethereum, Solana, Arbitrum, etc.**  
🔹 **Decentralized storage integration** – Store proofs via **IPFS or Arweave**.  
🔹 **Improved privacy features** – Advanced **cryptographic techniques**.  
🔹 **Integration with oracles** – Fetch **real-time verified API data**.

## **Conclusion**

ProofLink bridges the gap between **off-chain API data and blockchain networks**. By integrating **zero-knowledge proofs**, it provides a **secure, efficient, and decentralized** way to verify external data.

**Why use ProofLink?**

✅ **Trustless API verification** – No need to trust a third party.  
✅ **Privacy-first approach** – Sensitive data remains confidential.  
✅ **Seamless blockchain integration** – Works with **Ethereum, Solana, Arbitrum, and more**.  
✅ **Open-source and extensible** – Easily customizable for any use case.

Start using **ProofLink** today and build **the next generation of trustless dApps!** 🚀

---

Here's the updated README with the demo link included:

---
