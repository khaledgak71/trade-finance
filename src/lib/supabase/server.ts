import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

function isConfigured() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? ''
  return url.length > 0 && !url.includes('your-project')
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function makeChain(): any {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const p = Promise.resolve({ data: null, error: null }) as any
  p.select = () => makeChain()
  p.eq = () => makeChain()
  p.single = () => Promise.resolve({ data: null, error: null })
  p.order = () => makeChain()
  return p
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mockClient: any = {
  auth: { getUser: async () => ({ data: { user: null }, error: null }) },
  from: () => makeChain(),
}

export async function createClient() {
  if (!isConfigured()) return mockClient

  const cookieStore = await cookies()
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {}
        },
      },
    }
  )
}
