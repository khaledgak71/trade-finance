export interface Profile {
  id: string
  full_name: string | null
  avatar_url: string | null
  role: 'learner' | 'admin'
  created_at: string
}

export interface Module {
  id: string
  slug: string
  title: string
  description: string | null
  icon: string | null
  order_index: number
  is_published: boolean
  lesson_count?: number
}

export interface Lesson {
  id: string
  module_id: string
  slug: string
  title: string
  content_mdx: string | null
  infographic_key: string | null
  order_index: number
  duration_mins: number | null
  is_published: boolean
}

export interface QuizQuestion {
  id: string
  module_id: string
  question_text: string
  options: { key: string; text: string }[]
  correct_key: string
  explanation: string | null
  order_index: number
}

export interface Progress {
  id: string
  user_id: string
  lesson_id: string
  module_id: string
  completed: boolean
  completed_at: string | null
}

export interface QuizAttempt {
  id: string
  user_id: string
  module_id: string
  score: number
  total_q: number
  correct_q: number
  answers: { question_id: string; chosen_key: string; correct: boolean }[]
  passed: boolean
  attempted_at: string
}

export interface ModuleProgressSummary {
  user_id: string | null
  module_id: string | null
  module_title: string | null
  module_slug: string | null
  total_lessons: number | null
  completed_lessons: number | null
  percent_complete: number | null
}
