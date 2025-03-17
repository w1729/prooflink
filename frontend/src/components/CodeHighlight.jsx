import { cn } from '@/lib/utils'
import 'highlight.js/styles/github-dark.css'
import beautify from 'simply-beautiful'
import hljs from 'highlight.js/lib/core';
import json from 'highlight.js/lib/languages/json';
import { CopyButton } from '@/components/copy-button'

hljs.registerLanguage('javascript', json);

const decodeHtml = (html) => {
  const parser = new DOMParser();
  const decodedString = parser.parseFromString(html, 'text/html').body.innerHTML;
  return decodedString;
};

export const CodeHighlight = ({ code, className, copy = true }) => {
  const newClass = cn('text-xs font-mono hljs relative', className);
  const highlightCode = hljs.highlightAuto(beautify.json(code), ['json']);
  console.log(highlightCode);

  return (
    <div className={newClass}>
      {copy && (
        <CopyButton value={beautify.json(code)} className="fixed right-12 top-16" />
      )}
      <pre>
        <code className="hljs language-json">
          {decodeHtml(highlightCode.value)}
        </code>
      </pre>
      {/* <Highlight language='json'>{beautify.json(code)}</Highlight> */}
    </div>
  )
}

export default CodeHighlight
