'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface Question {
  id: string
  question_text: string
  options: { key: string; text: string }[]
}

interface QuizResult {
  score: number
  passed: boolean
  correct_q: number
  total_q: number
  explanations: { question_id: string; correct_key: string; explanation: string | null; your_key: string }[]
}

type Phase = 'intro' | 'in-progress' | 'submitting' | 'complete' | 'cert-name' | 'certificate'

interface QuizRunnerProps {
  moduleSlug: string
  moduleTitle: string
  questions: Question[]
  totalQuestions: number
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export default function QuizRunner({ moduleSlug, moduleTitle, questions, totalQuestions }: QuizRunnerProps) {
  const router = useRouter()
  const [phase, setPhase] = useState<Phase>('intro')
  const [activeQuestions, setActiveQuestions] = useState(questions)
  const [currentIdx, setCurrentIdx] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [selectedKey, setSelectedKey] = useState<string | null>(null)
  const [result, setResult] = useState<QuizResult | null>(null)
  const [certName, setCertName] = useState('')

  const currentQuestion = activeQuestions[currentIdx]
  const isLast = currentIdx === activeQuestions.length - 1

  function startQuiz(reshuffle = false) {
    setPhase('in-progress')
    setCurrentIdx(0)
    setAnswers({})
    setSelectedKey(null)
    setResult(null)
    setActiveQuestions(reshuffle ? shuffle(questions) : questions)
  }

  function handleSelect(key: string) {
    setSelectedKey(key)
  }

  function handleNext() {
    if (!selectedKey) return
    const newAnswers = { ...answers, [currentQuestion.id]: selectedKey }
    setAnswers(newAnswers)
    setSelectedKey(null)
    if (isLast) {
      submitQuiz(newAnswers)
    } else {
      setCurrentIdx(i => i + 1)
    }
  }

  async function submitQuiz(finalAnswers: Record<string, string>) {
    setPhase('submitting')
    const payload = {
      module_slug: moduleSlug,
      answers: Object.entries(finalAnswers).map(([question_id, chosen_key]) => ({
        question_id,
        chosen_key,
      })),
    }
    try {
      const res = await fetch('/api/quiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const data = await res.json()
      if (!res.ok) {
        setPhase('in-progress')
        return
      }
      setResult(data)
      setPhase('complete')
    } catch {
      setPhase('in-progress')
    }
  }

  if (phase === 'intro') {
    return (
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-10 text-center">
        <div className="text-5xl mb-4">📝</div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Ready to Test Your Knowledge?</h2>
        <p className="text-gray-500 mb-2">{totalQuestions} multiple-choice questions</p>
        <p className="text-gray-500 mb-8">You need <strong>70% or higher</strong> to pass</p>
        <button
          onClick={() => startQuiz()}
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold text-lg transition-colors"
        >
          Start Quiz
        </button>
      </div>
    )
  }

  if (phase === 'submitting') {
    return (
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-10 text-center">
        <svg className="w-10 h-10 animate-spin text-blue-600 mx-auto mb-4" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
        <p className="text-gray-600 font-medium">Grading your quiz...</p>
      </div>
    )
  }

  if (phase === 'cert-name') {
    return (
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-10 text-center max-w-md mx-auto">
        <div className="text-5xl mb-4">🎓</div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">One More Step</h2>
        <p className="text-gray-500 mb-8">Enter your full name as it should appear on your certificate.</p>
        <input
          type="text"
          value={certName}
          onChange={e => setCertName(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && certName.trim() && setPhase('certificate')}
          placeholder="Your full name"
          className="w-full border border-gray-300 rounded-xl px-4 py-3 text-center text-lg mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
          autoFocus
        />
        <div className="flex gap-3 justify-center">
          <button
            onClick={() => setPhase('complete')}
            className="bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 px-5 py-2.5 rounded-xl text-sm font-semibold"
          >
            Back
          </button>
          <button
            onClick={() => setPhase('certificate')}
            disabled={!certName.trim()}
            className="bg-blue-600 hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed text-white px-6 py-2.5 rounded-xl text-sm font-semibold"
          >
            Generate Certificate
          </button>
        </div>
      </div>
    )
  }

  if (phase === 'certificate' && result) {
    const date = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    return (
      <div className="text-center">
        <div className="bg-white rounded-2xl border-4 border-yellow-400 shadow-lg p-10 md:p-16 mb-6 relative overflow-hidden print:shadow-none print:border-4">
          <div className="absolute top-3 left-3 w-10 h-10 border-t-4 border-l-4 border-yellow-300 rounded-tl-lg" />
          <div className="absolute top-3 right-3 w-10 h-10 border-t-4 border-r-4 border-yellow-300 rounded-tr-lg" />
          <div className="absolute bottom-3 left-3 w-10 h-10 border-b-4 border-l-4 border-yellow-300 rounded-bl-lg" />
          <div className="absolute bottom-3 right-3 w-10 h-10 border-b-4 border-r-4 border-yellow-300 rounded-br-lg" />

          <div className="text-5xl mb-4">🏆</div>
          <p className="text-xs font-semibold text-gray-400 tracking-widest uppercase mb-6">Certificate of Completion</p>
          <p className="text-gray-500 mb-3">This certifies that</p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-blue-700 mb-3 pb-4 border-b-2 border-blue-100">
            {certName}
          </h2>
          <p className="text-gray-500 mt-4 mb-2">has successfully completed</p>
          <h3 className="text-xl font-bold text-gray-900 mb-3">{moduleTitle}</h3>
          <p className="text-gray-500 mb-6">
            with a score of <span className="font-bold text-green-600">{result.score}%</span>
          </p>
          <p className="text-xs text-gray-400 tracking-wide">{date}</p>
        </div>

        <div className="flex gap-3 justify-center print:hidden">
          <button
            onClick={() => window.print()}
            className="bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 px-5 py-2.5 rounded-xl text-sm font-semibold"
          >
            Print Certificate
          </button>
          <button
            onClick={() => router.push(`/modules/${moduleSlug}`)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl text-sm font-semibold"
          >
            Back to Module
          </button>
        </div>
      </div>
    )
  }

  if (phase === 'complete' && result) {
    const answersMap = Object.fromEntries(
      Object.entries(answers).map(([id, key]) => [id, key])
    )

    return (
      <div>
        <div className={`rounded-2xl border-2 p-8 text-center mb-6 ${result.passed ? 'bg-green-50 border-green-300' : 'bg-amber-50 border-amber-300'}`}>
          <div className="text-5xl mb-3">{result.passed ? '🎉' : '📚'}</div>
          <div className={`text-5xl font-extrabold mb-2 ${result.passed ? 'text-green-600' : 'text-amber-600'}`}>
            {result.score}%
          </div>
          <div className="font-bold text-gray-800 text-xl mb-1">
            {result.passed ? 'Passed!' : 'Keep Studying'}
          </div>
          <div className="text-gray-500">
            {result.correct_q} of {result.total_q} questions correct
          </div>
          <div className="flex gap-3 justify-center mt-6">
            {result.passed ? (
              <>
                <button
                  onClick={() => startQuiz(true)}
                  className="bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 px-5 py-2.5 rounded-xl text-sm font-semibold"
                >
                  Retake Quiz
                </button>
                <button
                  onClick={() => setPhase('cert-name')}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl text-sm font-semibold"
                >
                  Get Certificate
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => router.push(`/modules/${moduleSlug}`)}
                  className="bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 px-5 py-2.5 rounded-xl text-sm font-semibold"
                >
                  Back to Module
                </button>
                <button
                  onClick={() => startQuiz(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl text-sm font-semibold"
                >
                  Try Again
                </button>
              </>
            )}
          </div>
        </div>

        <h3 className="font-bold text-gray-800 text-lg mb-4">Answer Review</h3>
        <div className="space-y-4">
          {activeQuestions.map((q, i) => {
            const yourKey = answersMap[q.id]
            const explanation = result.explanations.find(e => e.question_id === q.id)
            const correctKey = explanation?.correct_key
            const isCorrect = yourKey === correctKey

            return (
              <div key={q.id} className={`bg-white rounded-xl border-2 p-5 ${isCorrect ? 'border-green-200' : 'border-red-200'}`}>
                <div className="flex items-start gap-3 mb-3">
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold ${isCorrect ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {isCorrect ? '✓' : '✗'}
                  </span>
                  <p className="font-medium text-gray-900 text-sm">{i + 1}. {q.question_text}</p>
                </div>
                <div className="space-y-1.5 ml-9">
                  {q.options.map(opt => {
                    const isYours = opt.key === yourKey
                    const isCorrectOpt = opt.key === correctKey
                    return (
                      <div key={opt.key} className={`flex items-center gap-2 text-sm px-3 py-1.5 rounded-lg ${isCorrectOpt ? 'bg-green-50 text-green-800' : isYours && !isCorrectOpt ? 'bg-red-50 text-red-700' : 'text-gray-600'}`}>
                        <span className="font-bold uppercase">{opt.key}.</span>
                        <span>{opt.text}</span>
                        {isCorrectOpt && <span className="ml-auto text-xs text-green-600 font-semibold">Correct</span>}
                        {isYours && !isCorrectOpt && <span className="ml-auto text-xs text-red-600 font-semibold">Your answer</span>}
                      </div>
                    )
                  })}
                </div>
                {explanation?.explanation && (
                  <div className="mt-3 ml-9 text-xs text-gray-500 bg-gray-50 rounded-lg p-3 leading-relaxed">
                    <span className="font-semibold text-gray-700">Explanation: </span>
                    {explanation.explanation}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-6">
        <div className="flex justify-between text-sm text-gray-500 mb-2">
          <span>Question {currentIdx + 1} of {activeQuestions.length}</span>
          <span>{Math.round((currentIdx / activeQuestions.length) * 100)}% done</span>
        </div>
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-500 rounded-full transition-all duration-300"
            style={{ width: `${(currentIdx / activeQuestions.length) * 100}%` }}
          />
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8">
        <p className="font-bold text-gray-900 text-lg mb-6 leading-relaxed">
          {currentIdx + 1}. {currentQuestion.question_text}
        </p>
        <div className="space-y-3">
          {currentQuestion.options.map(opt => (
            <button
              key={opt.key}
              onClick={() => handleSelect(opt.key)}
              className={`w-full text-left flex items-start gap-3 px-5 py-4 rounded-xl border-2 transition-all ${
                selectedKey === opt.key
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-blue-200 hover:bg-gray-50'
              }`}
            >
              <span className={`w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5 ${
                selectedKey === opt.key ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-500'
              }`}>
                {opt.key.toUpperCase()}
              </span>
              <span className={`text-sm ${selectedKey === opt.key ? 'text-blue-700 font-medium' : 'text-gray-700'}`}>
                {opt.text}
              </span>
            </button>
          ))}
        </div>
        <div className="mt-8 flex justify-end">
          <button
            onClick={handleNext}
            disabled={!selectedKey}
            className="bg-blue-600 hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed text-white px-8 py-3 rounded-xl font-semibold transition-colors"
          >
            {isLast ? 'Submit Quiz' : 'Next Question →'}
          </button>
        </div>
      </div>
    </div>
  )
}
