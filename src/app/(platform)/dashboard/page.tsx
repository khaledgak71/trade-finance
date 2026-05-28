import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { MODULE_CONTENT } from '@/lib/data/moduleContent'

const MODULES = [
  { slug: 'introduction', title: 'Introduction to Trade Finance', icon: '🌐', color: 'indigo' },
  { slug: 'letters-of-credit', title: 'Letters of Credit', icon: '🏦', color: 'blue' },
  { slug: 'documentary-collections', title: 'Documentary Collections', icon: '📄', color: 'purple' },
  { slug: 'bank-guarantees', title: 'Bank Guarantees', icon: '🛡️', color: 'cyan' },
  { slug: 'supply-chain-finance', title: 'Supply Chain Finance', icon: '🔗', color: 'emerald' },
  { slug: 'incoterms', title: 'Incoterms 2020', icon: '🚢', color: 'amber' },
  { slug: 'trade-finance-risk', title: 'Trade Finance Risk', icon: '⚠️', color: 'red' },
]

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const progressRows = user ? (await supabase
    .from('progress')
    .select('module_id, lesson_id, completed')
    .eq('user_id', user.id)).data : null

  const quizAttempts = user ? (await supabase
    .from('quiz_attempts')
    .select('module_id, score, passed')
    .eq('user_id', user.id)).data : null

  const modules = user ? (await supabase
    .from('modules')
    .select('id, slug, title')
    .eq('is_published', true)).data : null

  const moduleMap = new Map(modules?.map(m => [m.slug, m.id]) ?? [])

  function getModuleProgress(slug: string) {
    const moduleId = moduleMap.get(slug)
    if (!moduleId) return { completed: 0, total: MODULE_CONTENT[slug]?.lessons.length ?? 0, pct: 0 }
    const rows = progressRows?.filter(p => p.module_id === moduleId) ?? []
    const total = MODULE_CONTENT[slug]?.lessons.length ?? 0
    const completed = rows.filter(p => p.completed).length
    return { completed, total, pct: total > 0 ? Math.round((completed / total) * 100) : 0 }
  }

  function getBestScore(slug: string) {
    const moduleId = moduleMap.get(slug)
    if (!moduleId) return null
    const attempts = quizAttempts?.filter(a => a.module_id === moduleId) ?? []
    if (attempts.length === 0) return null
    return Math.max(...attempts.map(a => a.score))
  }

  const totalCompleted = MODULES.reduce((acc, m) => acc + getModuleProgress(m.slug).completed, 0)
  const totalLessons = MODULES.reduce((acc, m) => acc + (MODULE_CONTENT[m.slug]?.lessons.length ?? 0), 0)
  const overallPct = totalLessons > 0 ? Math.round((totalCompleted / totalLessons) * 100) : 0

  const firstName = user?.user_metadata?.full_name?.split(' ')[0] ?? 'Guest'

  return (
    <div>
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-8 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Welcome back, {firstName}!</h1>
            <p className="text-gray-500 mt-1">Continue your trade finance journey</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-blue-600">{overallPct}%</div>
            <div className="text-sm text-gray-500">Overall Progress</div>
          </div>
        </div>

        {/* Overall progress bar */}
        <div className="mt-4">
          <div className="flex justify-between text-xs text-gray-500 mb-1.5">
            <span>{totalCompleted} of {totalLessons} lessons completed</span>
            <span>{quizAttempts?.filter(a => a.passed).length ?? 0} quizzes passed</span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-500 rounded-full transition-all duration-500"
              style={{ width: `${overallPct}%` }}
            />
          </div>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-4 px-8 py-6">
        {[
          { label: 'Lessons Completed', value: totalCompleted, icon: '✅', color: 'text-green-600' },
          { label: 'Quizzes Attempted', value: quizAttempts?.length ?? 0, icon: '📝', color: 'text-blue-600' },
          { label: 'Modules Started', value: MODULES.filter(m => getModuleProgress(m.slug).completed > 0).length, icon: '🎯', color: 'text-purple-600' },
        ].map((stat, i) => (
          <div key={i} className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm">
            <div className="text-2xl mb-1">{stat.icon}</div>
            <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
            <div className="text-sm text-gray-500">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Module cards */}
      <div className="px-8 pb-8">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Your Modules</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {MODULES.map((mod) => {
            const prog = getModuleProgress(mod.slug)
            const bestScore = getBestScore(mod.slug)
            const lessonCount = MODULE_CONTENT[mod.slug]?.lessons.length ?? 0
            const quizCount = MODULE_CONTENT[mod.slug]?.quiz.length ?? 0

            return (
              <Link key={mod.slug} href={`/modules/${mod.slug}`}>
                <div className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 overflow-hidden">
                  <div className="p-5">
                    <div className="flex items-start justify-between mb-3">
                      <div className="text-3xl">{mod.icon}</div>
                      {prog.pct === 100 && (
                        <span className="bg-green-100 text-green-700 text-xs font-semibold px-2 py-0.5 rounded-full">Complete</span>
                      )}
                      {prog.pct > 0 && prog.pct < 100 && (
                        <span className="bg-blue-100 text-blue-700 text-xs font-semibold px-2 py-0.5 rounded-full">In Progress</span>
                      )}
                    </div>
                    <h3 className="font-bold text-gray-900 mb-1">{mod.title}</h3>
                    <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
                      <span>{lessonCount} lessons</span>
                      <span>•</span>
                      <span>{quizCount} quiz questions</span>
                    </div>

                    {/* Progress bar */}
                    <div>
                      <div className="flex justify-between text-xs text-gray-500 mb-1">
                        <span>{prog.completed}/{prog.total} lessons</span>
                        <span>{prog.pct}%</span>
                      </div>
                      <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-blue-500 rounded-full"
                          style={{ width: `${prog.pct}%` }}
                        />
                      </div>
                    </div>

                    {bestScore !== null && (
                      <div className="mt-2 text-xs text-gray-400">
                        Best quiz score: <span className={`font-semibold ${bestScore >= 70 ? 'text-green-600' : 'text-amber-600'}`}>{bestScore}%</span>
                      </div>
                    )}
                  </div>

                  <div className="border-t border-gray-100 px-5 py-3">
                    <span className="text-blue-600 text-sm font-semibold">
                      {prog.completed === 0 ? 'Start Module →' : prog.pct === 100 ? 'Review Module →' : 'Continue →'}
                    </span>
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
