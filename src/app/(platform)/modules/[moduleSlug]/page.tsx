import { notFound } from 'next/navigation'
import Link from 'next/link'
import { MODULE_CONTENT } from '@/lib/data/moduleContent'
import { createClient } from '@/lib/supabase/server'

const MODULE_META: Record<string, { title: string; icon: string; description: string }> = {
  'introduction': { title: 'Introduction to Trade Finance', icon: '🌐', description: 'Understand the trust gap problem, the key parties, three core flows, and the full spectrum of trade finance instruments.' },
  'letters-of-credit': { title: 'Letters of Credit', icon: '🏦', description: 'Master UCP 600, LC types, document compliance, and the complete 8-step LC lifecycle.' },
  'documentary-collections': { title: 'Documentary Collections', icon: '📄', description: 'Learn D/P vs D/A mechanics, URC 522 rules, and bank roles in documentary collections.' },
  'bank-guarantees': { title: 'Bank Guarantees', icon: '🛡️', description: 'Understand demand guarantees, URDG 758, and the four main guarantee types.' },
  'supply-chain-finance': { title: 'Supply Chain Finance', icon: '🔗', description: 'Explore working capital optimization, reverse factoring, and receivables finance.' },
  'incoterms': { title: 'Incoterms® 2020', icon: '🚢', description: 'Navigate all 11 Incoterms, risk transfer points, and transport mode restrictions.' },
  'trade-finance-risk': { title: 'Trade Finance Risk', icon: '⚠️', description: 'Assess country risk, credit risk, fraud, and compliance in trade finance transactions.' },
}

export default async function ModulePage({ params }: { params: { moduleSlug: string } }) {
  const { moduleSlug } = params
  const content = MODULE_CONTENT[moduleSlug]
  const meta = MODULE_META[moduleSlug]

  if (!content || !meta) notFound()

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: dbModule } = await supabase
    .from('modules')
    .select('id')
    .eq('slug', moduleSlug)
    .single()

  let progressRows: { lesson_id: string; completed: boolean }[] = []
  if (dbModule && user) {
    const { data } = await supabase
      .from('progress')
      .select('lesson_id, completed')
      .eq('user_id', user.id)
      .eq('module_id', dbModule.id)
    progressRows = data ?? []
  }

  const { data: dbLessons } = await supabase
    .from('lessons')
    .select('id, slug')
    .eq('module_id', dbModule?.id ?? '')

  const lessonSlugToId = new Map(dbLessons?.map(l => [l.slug, l.id]) ?? [])
  const completedLessonIds = new Set(progressRows.filter(p => p.completed).map(p => p.lesson_id))

  const completedCount = content.lessons.filter(l => {
    const id = lessonSlugToId.get(l.slug)
    return id && completedLessonIds.has(id)
  }).length

  const pct = content.lessons.length > 0 ? Math.round((completedCount / content.lessons.length) * 100) : 0

  const { data: quizAttempts } = await supabase
    .from('quiz_attempts')
    .select('score, passed, attempted_at')
    .eq('module_id', dbModule?.id ?? '')
    .eq('user_id', user?.id ?? '')
    .order('attempted_at', { ascending: false })

  const bestScore = quizAttempts && quizAttempts.length > 0 ? Math.max(...quizAttempts.map(a => a.score)) : null

  return (
    <div>
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 md:px-8 py-4 md:py-6">
        <Link href="/modules" className="text-sm text-gray-400 hover:text-gray-600 flex items-center gap-1 mb-4">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          All Modules
        </Link>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className="text-3xl md:text-5xl">{meta.icon}</div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{meta.title}</h1>
              <p className="text-gray-500 mt-1 max-w-2xl">{meta.description}</p>
            </div>
          </div>
          {pct === 100 && (
            <div className="text-center">
              <div className="text-green-600 font-bold text-2xl">100%</div>
              <div className="text-sm text-green-600">Complete!</div>
            </div>
          )}
        </div>

        {/* Progress */}
        <div className="mt-4 max-w-md">
          <div className="flex justify-between text-xs text-gray-500 mb-1">
            <span>{completedCount} of {content.lessons.length} lessons completed</span>
            <span>{pct}%</span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-blue-500 rounded-full transition-all" style={{ width: `${pct}%` }} />
          </div>
        </div>
      </div>

      <div className="px-4 md:px-8 py-4 md:py-6 max-w-5xl grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Lessons list */}
        <div className="lg:col-span-2">
          <h2 className="font-bold text-gray-800 mb-4">Lessons</h2>
          <div className="space-y-3">
            {content.lessons.map((lesson, i) => {
              const id = lessonSlugToId.get(lesson.slug)
              const isCompleted = id ? completedLessonIds.has(id) : false

              return (
                <Link key={lesson.slug} href={`/modules/${moduleSlug}/lessons/${lesson.slug}`}>
                  <div className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all p-4 flex items-center gap-4">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold ${isCompleted ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-500'}`}>
                      {isCompleted ? '✓' : i + 1}
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-800 text-sm">{lesson.title}</div>
                      <div className="flex items-center gap-2 mt-0.5">
                        {lesson.duration_mins && (
                          <span className="text-xs text-gray-400">{lesson.duration_mins} min</span>
                        )}
                        {lesson.infographic_key && (
                          <span className="text-xs bg-blue-50 text-blue-600 px-1.5 py-0.5 rounded-md font-medium">Infographic</span>
                        )}
                      </div>
                    </div>
                    <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Quiz card */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
            <h3 className="font-bold text-gray-800 mb-1">Module Quiz</h3>
            <p className="text-sm text-gray-500 mb-3">{content.quiz.length} questions · 70% to pass</p>
            {bestScore !== null && (
              <div className="mb-3 text-sm">
                Best score: <span className={`font-bold ${bestScore >= 70 ? 'text-green-600' : 'text-amber-600'}`}>{bestScore}%</span>
              </div>
            )}
            <Link href={`/modules/${moduleSlug}/quiz`}>
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl py-2.5 text-sm font-semibold transition-colors">
                {bestScore !== null ? 'Retake Quiz' : 'Start Quiz'}
              </button>
            </Link>
          </div>

          {/* Stats */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
            <h3 className="font-bold text-gray-800 mb-3">Module Stats</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-gray-600">
                <span>Lessons</span>
                <span className="font-medium">{content.lessons.length}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Quiz Questions</span>
                <span className="font-medium">{content.quiz.length}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Infographics</span>
                <span className="font-medium">{content.lessons.filter(l => l.infographic_key).length}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Est. Duration</span>
                <span className="font-medium">{content.lessons.reduce((a, l) => a + (l.duration_mins ?? 0), 0)} min</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
