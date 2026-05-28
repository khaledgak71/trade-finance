'use client'

import dynamic from 'next/dynamic'
import { useState } from 'react'
import { markdownToHtml } from '@/lib/utils/markdown'

const infographicMap: Record<string, React.ComponentType> = {
  TradeFinanceOverview: dynamic(() => import('@/components/infographics/TradeFinanceOverview')),
  LetterOfCreditFlow: dynamic(() => import('@/components/infographics/LetterOfCreditFlow')),
  DocumentaryCollectionFlow: dynamic(() => import('@/components/infographics/DocumentaryCollectionFlow')),
  BankGuaranteeFlow: dynamic(() => import('@/components/infographics/BankGuaranteeFlow')),
  SupplyChainFinanceFlow: dynamic(() => import('@/components/infographics/SupplyChainFinanceFlow')),
  IncotermsRiskMap: dynamic(() => import('@/components/infographics/IncotermsRiskMap')),
  TradeRiskMatrix: dynamic(() => import('@/components/infographics/TradeRiskMatrix')),
}

interface LessonViewerProps {
  lesson: {
    title: string
    content: string
    infographic_key?: string
    slug: string
  }
  moduleSlug: string
  lessonId: string | null
  moduleId: string | null
  isCompleted: boolean
}

export default function LessonViewer({ lesson, lessonId, moduleId, isCompleted }: LessonViewerProps) {
  const [completed, setCompleted] = useState(isCompleted)
  const [marking, setMarking] = useState(false)

  const InfographicComponent = lesson.infographic_key ? infographicMap[lesson.infographic_key] : null
  const html = markdownToHtml(lesson.content)

  async function markComplete() {
    if (completed || !lessonId || !moduleId) return
    setMarking(true)
    try {
      await fetch('/api/progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lesson_id: lessonId, module_id: moduleId }),
      })
      setCompleted(true)
    } finally {
      setMarking(false)
    }
  }

  return (
    <div>
      {/* Infographic section */}
      {InfographicComponent && (
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-4">
            <span className="bg-blue-100 text-blue-700 text-xs font-semibold px-2.5 py-1 rounded-full">Visual Infographic</span>
            <span className="text-xs text-gray-400">Study this diagram as you read the lesson</span>
          </div>
          <InfographicComponent />
        </div>
      )}

      {/* Lesson text */}
      <div
        className="lesson-content"
        dangerouslySetInnerHTML={{ __html: html }}
      />

      {/* Mark Complete */}
      <div className="mt-8 flex items-center gap-4">
        {completed ? (
          <div className="flex items-center gap-2 text-green-600 font-semibold">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Lesson Completed
          </div>
        ) : (
          <button
            onClick={markComplete}
            disabled={marking || !lessonId}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors"
          >
            {marking ? (
              <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
            ) : (
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            )}
            Mark as Complete
          </button>
        )}
      </div>
    </div>
  )
}
