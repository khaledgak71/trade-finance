import { notFound } from 'next/navigation'
import { MODULE_CONTENT } from '@/lib/data/moduleContent'
import QuizRunner from '@/components/quiz/QuizRunner'

const MODULE_TITLES: Record<string, string> = {
  'letters-of-credit': 'Letters of Credit',
  'documentary-collections': 'Documentary Collections',
  'bank-guarantees': 'Bank Guarantees',
  'supply-chain-finance': 'Supply Chain Finance',
  'incoterms': 'Incoterms 2020',
  'trade-finance-risk': 'Trade Finance Risk',
}

export default function QuizPage({ params }: { params: { moduleSlug: string } }) {
  const { moduleSlug } = params
  const content = MODULE_CONTENT[moduleSlug]
  if (!content) notFound()

  const questionsForClient = content.quiz.map((q, i) => ({
    id: `q-${i}`,
    question_text: q.question_text,
    options: q.options,
  }))

  return (
    <div>
      <div className="bg-white border-b border-gray-200 px-4 md:px-8 py-4 md:py-5">
        <div className="text-sm text-gray-400 mb-1">{MODULE_TITLES[moduleSlug]}</div>
        <h1 className="text-2xl font-bold text-gray-900">Module Quiz</h1>
      </div>
      <div className="max-w-3xl mx-auto px-4 md:px-8 py-6 md:py-8">
        <QuizRunner
          moduleSlug={moduleSlug}
          moduleTitle={MODULE_TITLES[moduleSlug] ?? moduleSlug}
          questions={questionsForClient}
          totalQuestions={content.quiz.length}
        />
      </div>
    </div>
  )
}
