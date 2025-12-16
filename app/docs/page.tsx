import { getAllDocs, getDocsByCategory } from '@/lib/docs'
import Link from 'next/link'
import { FileText, Book, Folder } from 'lucide-react'

export default function DocsPage() {
  const docsByCategory = getDocsByCategory()
  const categories = Object.keys(docsByCategory)

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <Book className="w-8 h-8 text-accent" />
            <h1 className="font-heading text-4xl font-bold">Documentation</h1>
          </div>
          <p className="text-lg text-muted max-w-2xl">
            Complete documentation for the CushLabs Income Planner, including product requirements, 
            design specifications, and deployment guides.
          </p>
        </div>

        {/* Documentation Grid by Category */}
        <div className="space-y-12">
          {categories.map((category) => (
            <section key={category}>
              <div className="flex items-center gap-2 mb-6">
                <Folder className="w-5 h-5 text-accent" />
                <h2 className="font-heading text-2xl font-bold">{category}</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {docsByCategory[category].map((doc) => (
                  <Link
                    key={doc.slug}
                    href={`/docs/${doc.slug}`}
                    className="group bg-background border border-muted-strong/20 rounded-xl p-6 hover:border-accent/50 hover:shadow-lg hover:shadow-accent/10 transition-all"
                  >
                    <div className="flex items-start gap-3 mb-3">
                      <FileText className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                      <h3 className="font-heading text-lg font-bold group-hover:text-accent transition-colors">
                        {doc.title}
                      </h3>
                    </div>
                    {doc.description && (
                      <p className="text-sm text-muted line-clamp-2">
                        {doc.description}
                      </p>
                    )}
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* Quick Links */}
        <div className="mt-16 pt-8 border-t border-muted-strong/20">
          <h3 className="font-heading text-xl font-bold mb-4">Quick Links</h3>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/docs/readme"
              className="text-sm text-accent hover:underline"
            >
              Getting Started
            </Link>
            <Link
              href="/docs/prd"
              className="text-sm text-accent hover:underline"
            >
              Product Requirements
            </Link>
            <Link
              href="/docs/predeploy_audit"
              className="text-sm text-accent hover:underline"
            >
              Pre-Deploy Checklist
            </Link>
            <Link
              href="https://github.com/RCushmaniii/ai-income-generator"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-accent hover:underline"
            >
              GitHub Repository →
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
