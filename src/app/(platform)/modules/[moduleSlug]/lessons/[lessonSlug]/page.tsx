import { notFound } from 'next/navigation'
import Link from 'next/link'
import { MODULE_CONTENT } from '@/lib/data/moduleContent'
import LessonViewer from '@/components/modules/LessonViewer'
import { createClient } from '@/lib/supabase/server'

const MODULE_TITLES: Record<string, string> = {
  'letters-of-credit': 'Letters of Credit',
  'documentary-collections': 'Documentary Collections',
  'bank-guarantees': 'Bank Guarantees',
  'supply-chain-finance': 'Supply Chain Finance',
  'incoterms': 'Incoterms 2020',
  'trade-finance-risk': 'Trade Finance Risk',
}

export default async function LessonPage({
  params,
}: {
  params: { moduleSlug: string; lessonSlug: string }
}) {
  const { moduleSlug, lessonSlug } = params
  const content = MODULE_CONTENT[moduleSlug]
  if (!content) notFound()

  const lessonIndex = content.lessons.findIndex(l => l.slug === lessonSlug)
  if (lessonIndex === -1) notFound()

  const lesson = content.lessons[lessonIndex]
  const prevLesson = lessonIndex > 0 ? content.lessons[lessonIndex - 1] : null
  const nextLesson = lessonIndex < content.lessons.length - 1 ? content.lessons[lessonIndex + 1] : null

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: dbModule } = await supabase
    .from('modules')
    .select('id')
    .eq('slug', moduleSlug)
    .single()

  const { data: dbLesson } = await supabase
    .from('lessons')
    .select('id')
    .eq('slug', lessonSlug)
    .eq('module_id', dbModule?.id ?? '')
    .single()

  let isCompleted = false
  if (dbLesson && user) {
    const { data } = await supabase
      .from('progress')
      .select('completed')
      .eq('user_id', user.id)
      .eq('lesson_id', dbLesson.id)
      .single()
    isCompleted = data?.completed ?? false
  }

  return (
    <div>
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200 px-4 md:px-8 py-3 md:py-4 flex items-center gap-2 text-sm text-gray-500 overflow-x-auto">
        <Link href="/modules" className="hover:text-gray-700">Modules</Link>
        <span>/</span>
        <Link href={`/modules/${moduleSlug}`} className="hover:text-gray-700">{MODULE_TITLES[moduleSlug]}</Link>
        <span>/</span>
        <span className="text-gray-800 font-medium">{lesson.title}</span>
      </div>

      {/* Lesson content */}
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-6 md:py-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-gray-400 font-medium uppercase tracking-wider">
            Lesson {lessonIndex + 1} of {content.lessons.length}
          </span>
          {lesson.duration_mins && (
            <span className="text-xs text-gray-400">{lesson.duration_mins} min read</span>
          )}
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-6">{lesson.title}</h1>

        <LessonViewer
          lesson={lesson}
          moduleSlug={moduleSlug}
          lessonId={dbLesson?.id ?? null}
          moduleId={dbModule?.id ?? null}
          isCompleted={isCompleted}
        />

        {/* Navigation */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mt-10 pt-6 border-t border-gray-200">
          {prevLesson ? (
            <Link
              href={`/modules/${moduleSlug}/lessons/${prevLesson.slug}`}
              className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 bg-white border border-gray-200 rounded-xl px-4 py-2.5 hover:shadow-sm transition-all"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              {prevLesson.title}
            </Link>
          ) : (
            <div />
          )}

          {nextLesson ? (
            <Link
              href={`/modules/${moduleSlug}/lessons/${nextLesson.slug}`}
              className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 bg-blue-50 border border-blue-200 rounded-xl px-4 py-2.5 font-semibold hover:shadow-sm transition-all"
            >
              {nextLesson.title}
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          ) : (
            <Link
              href={`/modules/${moduleSlug}/quiz`}
              className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 bg-blue-50 border border-blue-200 rounded-xl px-4 py-2.5 font-semibold hover:shadow-sm transition-all"
            >
              Take Module Quiz
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
