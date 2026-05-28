import Link from 'next/link'
import { MODULE_CONTENT } from '@/lib/data/moduleContent'

const MODULES = [
  { slug: 'introduction', title: 'Introduction to Trade Finance', icon: '🌐', description: 'The trust gap problem, key parties (exporter, importer, banks), and the full instrument risk spectrum — the perfect starting point.' },
  { slug: 'letters-of-credit', title: 'Letters of Credit', icon: '🏦', description: 'UCP 600, LC types, document requirements, discrepancies, and the complete 8-step process flow with visual infographic.' },
  { slug: 'documentary-collections', title: 'Documentary Collections', icon: '📄', description: 'D/P vs D/A mechanics, URC 522 rules, and bank roles. Includes process flow comparing the two collection types.' },
  { slug: 'bank-guarantees', title: 'Bank Guarantees', icon: '🛡️', description: 'Demand guarantees, URDG 758, performance bonds, bid bonds, and the guarantee triangle diagram.' },
  { slug: 'supply-chain-finance', title: 'Supply Chain Finance', icon: '🔗', description: 'Working capital metrics, reverse factoring, invoice discounting, and the SCF platform flow diagram.' },
  { slug: 'incoterms', title: 'Incoterms® 2020', icon: '🚢', description: 'All 11 Incoterms, risk transfer points, mode-of-transport rules, and the complete risk transfer map.' },
  { slug: 'trade-finance-risk', title: 'Trade Finance Risk', icon: '⚠️', description: 'Country risk, credit risk, fraud detection, FX risk, and compliance. Includes the 2×2 risk-instrument matrix.' },
]

export default function ModulesPage() {
  return (
    <div>
      <div className="bg-white border-b border-gray-200 px-4 md:px-8 py-4 md:py-6">
        <h1 className="text-2xl font-bold text-gray-900">All Modules</h1>
        <p className="text-gray-500 mt-1">6 modules · 25+ lessons · 6 interactive quizzes · 6 SVG infographics</p>
      </div>

      <div className="px-4 md:px-8 py-4 md:py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {MODULES.map((mod) => {
            const lessonCount = MODULE_CONTENT[mod.slug]?.lessons.length ?? 0
            const quizCount = MODULE_CONTENT[mod.slug]?.quiz.length ?? 0
            const hasInfographic = MODULE_CONTENT[mod.slug]?.lessons.some(l => l.infographic_key)

            return (
              <Link key={mod.slug} href={`/modules/${mod.slug}`}>
                <div className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 p-6 h-full">
                  <div className="flex items-start gap-4">
                    <div className="text-4xl flex-shrink-0">{mod.icon}</div>
                    <div className="flex-1">
                      <h2 className="font-bold text-gray-900 text-lg mb-2">{mod.title}</h2>
                      <p className="text-gray-500 text-sm leading-relaxed mb-4">{mod.description}</p>
                      <div className="flex items-center gap-4 text-xs text-gray-400">
                        <span className="flex items-center gap-1">
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13" />
                          </svg>
                          {lessonCount} lessons
                        </span>
                        <span className="flex items-center gap-1">
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                          </svg>
                          {quizCount} quiz questions
                        </span>
                        {hasInfographic && (
                          <span className="flex items-center gap-1 text-blue-500">
                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                            </svg>
                            Infographic
                          </span>
                        )}
                      </div>
                    </div>
                    <svg className="w-5 h-5 text-gray-400 flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
