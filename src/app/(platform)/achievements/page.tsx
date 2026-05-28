import { createClient } from '@/lib/supabase/server'
import { MODULE_CONTENT } from '@/lib/data/moduleContent'

const MODULE_META = [
  { slug: 'letters-of-credit', title: 'Letters of Credit', icon: '🏦' },
  { slug: 'documentary-collections', title: 'Documentary Collections', icon: '📄' },
  { slug: 'bank-guarantees', title: 'Bank Guarantees', icon: '🛡️' },
  { slug: 'supply-chain-finance', title: 'Supply Chain Finance', icon: '🔗' },
  { slug: 'incoterms', title: 'Incoterms 2020', icon: '🚢' },
  { slug: 'trade-finance-risk', title: 'Trade Finance Risk', icon: '⚠️' },
]

const ACHIEVEMENTS = [
  { id: 'first_lesson', icon: '🌱', title: 'First Steps', desc: 'Complete your first lesson', check: (s: Stats) => s.totalCompleted >= 1 },
  { id: 'five_lessons', icon: '📚', title: 'Eager Learner', desc: 'Complete 5 lessons', check: (s: Stats) => s.totalCompleted >= 5 },
  { id: 'all_lessons', icon: '🎓', title: 'Graduate', desc: 'Complete all lessons', check: (s: Stats) => s.totalCompleted >= s.totalLessons && s.totalLessons > 0 },
  { id: 'first_quiz', icon: '✏️', title: 'Quiz Taker', desc: 'Attempt your first quiz', check: (s: Stats) => s.totalAttempts >= 1 },
  { id: 'pass_quiz', icon: '✅', title: 'Certified', desc: 'Pass a quiz with 70%+', check: (s: Stats) => s.totalPassed >= 1 },
  { id: 'three_passes', icon: '🏆', title: 'Expert', desc: 'Pass 3 or more quizzes', check: (s: Stats) => s.totalPassed >= 3 },
  { id: 'all_pass', icon: '👑', title: 'Trade Finance Master', desc: 'Pass all 6 quizzes', check: (s: Stats) => s.totalPassed >= 6 },
  { id: 'perfect', icon: '💯', title: 'Perfect Score', desc: 'Score 100% on any quiz', check: (s: Stats) => s.hasPerfect },
]

interface Stats {
  totalCompleted: number
  totalLessons: number
  totalAttempts: number
  totalPassed: number
  hasPerfect: boolean
}

export default async function AchievementsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const progressRows = user ? (await supabase
    .from('progress')
    .select('completed')
    .eq('user_id', user.id)).data : null

  const quizAttempts = user ? (await supabase
    .from('quiz_attempts')
    .select('score, passed, module_id, attempted_at')
    .eq('user_id', user.id)
    .order('attempted_at', { ascending: false })).data : null

  const dbModules = user ? (await supabase
    .from('modules')
    .select('id, slug')
    .eq('is_published', true)).data : null

  const totalLessons = MODULE_META.reduce((a, m) => a + (MODULE_CONTENT[m.slug]?.lessons.length ?? 0), 0)
  const totalCompleted = progressRows?.filter(p => p.completed).length ?? 0
  const totalAttempts = quizAttempts?.length ?? 0
  const totalPassed = quizAttempts?.filter(a => a.passed).length ?? 0
  const hasPerfect = quizAttempts?.some(a => a.score === 100) ?? false

  const stats: Stats = { totalCompleted, totalLessons, totalAttempts, totalPassed, hasPerfect }

  const moduleResults = MODULE_META.map(mod => {
    const modId = dbModules?.find(m => m.slug === mod.slug)?.id
    const attempts = quizAttempts?.filter(a => a.module_id === modId) ?? []
    const best = attempts.length > 0 ? Math.max(...attempts.map(a => a.score)) : null
    const passed = attempts.some(a => a.passed)
    return { ...mod, best, passed, attempts: attempts.length }
  })

  const earnedCount = ACHIEVEMENTS.filter(a => a.check(stats)).length

  return (
    <div>
      <div className="bg-white border-b border-gray-200 px-4 md:px-8 py-4 md:py-6">
        <h1 className="text-2xl font-bold text-gray-900">Achievements</h1>
        <p className="text-gray-500 mt-1">{earnedCount} of {ACHIEVEMENTS.length} achievements earned</p>
      </div>

      <div className="px-4 md:px-8 py-4 md:py-6">
        {/* Achievement badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {ACHIEVEMENTS.map(a => {
            const earned = a.check(stats)
            return (
              <div key={a.id} className={`rounded-2xl border p-5 text-center transition-all ${earned ? 'bg-white border-yellow-300 shadow-sm' : 'bg-gray-50 border-gray-200 opacity-50'}`}>
                <div className={`text-4xl mb-2 ${!earned && 'grayscale'}`}>{a.icon}</div>
                <div className="font-bold text-gray-900 text-sm">{a.title}</div>
                <div className="text-gray-500 text-xs mt-1">{a.desc}</div>
                {earned && (
                  <div className="mt-2">
                    <span className="bg-yellow-100 text-yellow-700 text-xs font-semibold px-2 py-0.5 rounded-full">Earned</span>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Quiz performance table */}
        <h2 className="font-bold text-gray-800 text-lg mb-4">Quiz Performance by Module</h2>
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[480px]">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                <th className="text-left px-6 py-3 font-semibold text-gray-600">Module</th>
                <th className="text-center px-4 py-3 font-semibold text-gray-600">Attempts</th>
                <th className="text-center px-4 py-3 font-semibold text-gray-600">Best Score</th>
                <th className="text-center px-4 py-3 font-semibold text-gray-600">Status</th>
              </tr>
            </thead>
            <tbody>
              {moduleResults.map((mod, i) => (
                <tr key={mod.slug} className={i < moduleResults.length - 1 ? 'border-b border-gray-100' : ''}>
                  <td className="px-6 py-4">
                    <span className="mr-2">{mod.icon}</span>
                    <span className="font-medium text-gray-800">{mod.title}</span>
                  </td>
                  <td className="text-center px-4 py-4 text-gray-600">{mod.attempts}</td>
                  <td className="text-center px-4 py-4">
                    {mod.best !== null ? (
                      <span className={`font-bold ${mod.best >= 70 ? 'text-green-600' : 'text-amber-600'}`}>{mod.best}%</span>
                    ) : (
                      <span className="text-gray-400">—</span>
                    )}
                  </td>
                  <td className="text-center px-4 py-4">
                    {mod.passed ? (
                      <span className="bg-green-100 text-green-700 text-xs font-semibold px-2.5 py-1 rounded-full">Passed</span>
                    ) : mod.attempts > 0 ? (
                      <span className="bg-amber-100 text-amber-700 text-xs font-semibold px-2.5 py-1 rounded-full">Needs Work</span>
                    ) : (
                      <span className="bg-gray-100 text-gray-500 text-xs font-semibold px-2.5 py-1 rounded-full">Not Attempted</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Lessons Completed', value: `${totalCompleted}/${totalLessons}`, icon: '📖' },
            { label: 'Quizzes Attempted', value: totalAttempts, icon: '✏️' },
            { label: 'Quizzes Passed', value: totalPassed, icon: '✅' },
            { label: 'Achievements', value: `${earnedCount}/${ACHIEVEMENTS.length}`, icon: '🏆' },
          ].map((s, i) => (
            <div key={i} className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 text-center">
              <div className="text-2xl mb-1">{s.icon}</div>
              <div className="text-2xl font-bold text-blue-600">{s.value}</div>
              <div className="text-xs text-gray-500 mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
