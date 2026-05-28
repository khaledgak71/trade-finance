import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'
import { MODULE_CONTENT } from '@/lib/data/moduleContent'

export async function POST(request: Request) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { module_slug, answers } = await request.json() as {
    module_slug: string
    answers: { question_id: string; chosen_key: string }[]
  }

  const content = MODULE_CONTENT[module_slug]
  if (!content) {
    return NextResponse.json({ error: 'Module not found' }, { status: 404 })
  }

  const questionMap = new Map(
    content.quiz.map((q, i) => [`q-${i}`, q])
  )

  let correctCount = 0
  const explanations = answers.map(ans => {
    const q = questionMap.get(ans.question_id)
    const isCorrect = q?.correct_key === ans.chosen_key
    if (isCorrect) correctCount++
    return {
      question_id: ans.question_id,
      correct_key: q?.correct_key ?? '',
      explanation: q?.explanation ?? null,
      your_key: ans.chosen_key,
    }
  })

  const total = answers.length
  const score = total > 0 ? Math.round((correctCount / total) * 100) : 0
  const passed = score >= 70

  const { data: dbModule } = await supabase
    .from('modules')
    .select('id')
    .eq('slug', module_slug)
    .single()

  if (dbModule) {
    await supabase.from('quiz_attempts').insert({
      user_id: user.id,
      module_id: dbModule.id,
      score,
      total_q: total,
      correct_q: correctCount,
      answers: answers.map(a => ({
        question_id: a.question_id,
        chosen_key: a.chosen_key,
        correct: explanations.find(e => e.question_id === a.question_id)?.correct_key === a.chosen_key,
      })),
      passed,
    })
  }

  return NextResponse.json({ score, passed, correct_q: correctCount, total_q: total, explanations })
}
