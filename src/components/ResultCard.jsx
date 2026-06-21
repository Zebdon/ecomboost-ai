import { useState } from 'react'
import { motion } from 'framer-motion'
import ReactMarkdown from 'react-markdown'

const mdComponents = {
  h1: ({ children }) => <h1 className="text-base font-bold mb-2 mt-4 first:mt-0">{children}</h1>,
  h2: ({ children }) => <h2 className="text-sm font-bold mb-2 mt-4 first:mt-0">{children}</h2>,
  h3: ({ children }) => <h3 className="text-sm font-semibold mb-1 mt-3 first:mt-0">{children}</h3>,
  p: ({ children }) => <p className="text-sm text-gray-800 mb-3 last:mb-0 leading-relaxed">{children}</p>,
  strong: ({ children }) => <strong className="font-bold text-gray-900">{children}</strong>,
  em: ({ children }) => <em className="italic text-gray-700">{children}</em>,
  ol: ({ children }) => <ol className="flex flex-col gap-2.5 mb-3 last:mb-0 pl-0 list-none">{children}</ol>,
  ul: ({ children }) => <ul className="flex flex-col gap-2 mb-3 last:mb-0 pl-0 list-none">{children}</ul>,
  li: ({ children, ordered, index }) => (
    <li className="flex gap-2.5 text-sm text-gray-800 leading-relaxed">
      <span className="text-[#E8642A] font-bold shrink-0 min-w-[16px]">
        {ordered ? `${(index ?? 0) + 1}.` : '•'}
      </span>
      <span>{children}</span>
    </li>
  ),
  hr: () => <hr className="border-gray-200 my-3" />,
  code: ({ children }) => (
    <code className="bg-gray-100 text-gray-800 text-xs px-1.5 py-0.5 rounded font-mono">{children}</code>
  ),
}

function ResultCard({ text }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gray-50 border border-gray-200 rounded-2xl p-5 relative"
    >
      <button
        onClick={handleCopy}
        className="absolute top-4 right-4 text-xs font-semibold text-gray-500 hover:text-gray-900 bg-white border border-gray-200 hover:border-gray-300 px-3 py-1.5 rounded-lg transition-all"
      >
        {copied ? '✓ Copiado' : 'Copiar'}
      </button>
      <div className="pr-20">
        <ReactMarkdown components={mdComponents}>{text}</ReactMarkdown>
      </div>
    </motion.div>
  )
}

export default ResultCard
