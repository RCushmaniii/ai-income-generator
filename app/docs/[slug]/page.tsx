import { getAllDocs, getDocBySlug } from '@/lib/docs'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, FileText } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import rehypeRaw from 'rehype-raw'
import 'highlight.js/styles/github-dark.css'

export async function generateStaticParams() {
  const docs = getAllDocs()
  return docs.map((doc) => ({
    slug: doc.slug,
  }))
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const doc = getDocBySlug(params.slug)
  
  if (!doc) {
    return {
      title: 'Documentation Not Found',
    }
  }

  return {
    title: `${doc.title} | CushLabs Docs`,
    description: doc.description || `Documentation for ${doc.title}`,
  }
}

export default function DocPage({ params }: { params: { slug: string } }) {
  const doc = getDocBySlug(params.slug)

  if (!doc) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Back Navigation */}
        <Link
          href="/docs"
          className="inline-flex items-center gap-2 text-sm text-muted hover:text-accent transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Documentation
        </Link>

        {/* Document Header */}
        <div className="mb-8 pb-6 border-b border-muted-strong/20">
          <div className="flex items-center gap-3 mb-3">
            <FileText className="w-6 h-6 text-accent" />
            <span className="text-sm font-semibold text-accent uppercase tracking-wider">
              {doc.category}
            </span>
          </div>
          <h1 className="font-heading text-4xl font-bold mb-3">{doc.title}</h1>
          {doc.description && (
            <p className="text-lg text-muted">{doc.description}</p>
          )}
        </div>

        {/* Markdown Content */}
        <article className="prose prose-slate dark:prose-invert max-w-none">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeHighlight, rehypeRaw]}
            components={{
              h1: ({ node, ...props }) => (
                <h1 className="font-heading text-3xl font-bold mt-8 mb-4 text-foreground" {...props} />
              ),
              h2: ({ node, ...props }) => (
                <h2 className="font-heading text-2xl font-bold mt-8 mb-4 text-foreground" {...props} />
              ),
              h3: ({ node, ...props }) => (
                <h3 className="font-heading text-xl font-bold mt-6 mb-3 text-foreground" {...props} />
              ),
              h4: ({ node, ...props }) => (
                <h4 className="font-heading text-lg font-bold mt-4 mb-2 text-foreground" {...props} />
              ),
              p: ({ node, ...props }) => (
                <p className="text-base leading-7 mb-4 text-foreground" {...props} />
              ),
              a: ({ node, ...props }) => (
                <a className="text-accent hover:underline font-medium" {...props} />
              ),
              ul: ({ node, ...props }) => (
                <ul className="list-disc list-inside mb-4 space-y-2 text-foreground" {...props} />
              ),
              ol: ({ node, ...props }) => (
                <ol className="list-decimal list-inside mb-4 space-y-2 text-foreground" {...props} />
              ),
              li: ({ node, ...props }) => (
                <li className="text-base leading-7 text-foreground" {...props} />
              ),
              code: ({ node, inline, ...props }: any) =>
                inline ? (
                  <code className="bg-muted-strong/20 text-accent px-1.5 py-0.5 rounded text-sm font-mono" {...props} />
                ) : (
                  <code className="block bg-muted-strong/10 p-4 rounded-lg overflow-x-auto text-sm font-mono" {...props} />
                ),
              pre: ({ node, ...props }) => (
                <pre className="bg-muted-strong/10 p-4 rounded-lg overflow-x-auto mb-4" {...props} />
              ),
              blockquote: ({ node, ...props }) => (
                <blockquote className="border-l-4 border-accent pl-4 italic text-muted my-4" {...props} />
              ),
              table: ({ node, ...props }) => (
                <div className="overflow-x-auto mb-4">
                  <table className="min-w-full border border-muted-strong/20 rounded-lg" {...props} />
                </div>
              ),
              th: ({ node, ...props }) => (
                <th className="bg-muted-strong/10 border border-muted-strong/20 px-4 py-2 text-left font-bold text-foreground" {...props} />
              ),
              td: ({ node, ...props }) => (
                <td className="border border-muted-strong/20 px-4 py-2 text-foreground" {...props} />
              ),
              hr: ({ node, ...props }) => (
                <hr className="border-t border-muted-strong/20 my-8" {...props} />
              ),
            }}
          >
            {doc.content}
          </ReactMarkdown>
        </article>

        {/* Footer Navigation */}
        <div className="mt-12 pt-8 border-t border-muted-strong/20">
          <Link
            href="/docs"
            className="inline-flex items-center gap-2 text-sm text-accent hover:underline"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to all documentation
          </Link>
        </div>
      </div>
    </div>
  )
}
