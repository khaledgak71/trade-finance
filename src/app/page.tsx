import Link from 'next/link'

const features = [
  { icon: '🏦', title: 'Letters of Credit', slug: 'letters-of-credit', desc: 'Master UCP 600 rules, LC types, document compliance, and the 8-step process flow.' },
  { icon: '📄', title: 'Documentary Collections', slug: 'documentary-collections', desc: 'D/P vs D/A mechanics, URC 522 rules, and risk comparison with Letters of Credit.' },
  { icon: '🛡️', title: 'Bank Guarantees', slug: 'bank-guarantees', desc: 'Demand guarantees, URDG 758, performance bonds, and standby LCs.' },
  { icon: '🔗', title: 'Supply Chain Finance', slug: 'supply-chain-finance', desc: 'Payables finance, reverse factoring, receivables finance, and working capital metrics.' },
  { icon: '🚢', title: 'Incoterms 2020', slug: 'incoterms', desc: 'All 11 Incoterms, risk transfer points, and choosing the right term for your trade.' },
  { icon: '⚠️', title: 'Trade Finance Risk', slug: 'trade-finance-risk', desc: 'Country risk, credit risk, fraud detection, and compliance (AML/sanctions/KYC).' },
]

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900">
      {/* Nav */}
      <nav className="flex items-center justify-between px-8 py-5 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <span className="font-bold text-white text-lg">TradeFinance Academy</span>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard"
            className="bg-blue-500 hover:bg-blue-400 text-white px-4 py-2 rounded-xl text-sm font-semibold transition-colors"
          >
            Go to Platform
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-4xl mx-auto text-center px-8 pt-20 pb-24">
        <div className="inline-flex items-center gap-2 bg-blue-500/20 border border-blue-500/30 text-blue-300 px-4 py-1.5 rounded-full text-sm font-medium mb-8">
          <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
          6 Modules · 25+ Lessons · Interactive Quizzes
        </div>
        <h1 className="text-5xl md:text-6xl font-extrabold text-white leading-tight mb-6">
          Master
          <span className="text-blue-400"> Trade Finance</span>
          <br />from First Principles
        </h1>
        <p className="text-xl text-blue-100/80 mb-10 max-w-2xl mx-auto leading-relaxed">
          Interactive lessons with professional SVG infographics visualizing every process — Letters of Credit, Documentary Collections, Incoterms, SCF, and more.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/dashboard"
            className="bg-blue-500 hover:bg-blue-400 text-white px-8 py-4 rounded-2xl text-lg font-bold transition-all hover:scale-105 shadow-lg shadow-blue-500/30"
          >
            Start Learning Free
          </Link>
        </div>
      </section>

      {/* Modules grid */}
      <section className="max-w-7xl mx-auto px-8 pb-24">
        <h2 className="text-center text-2xl font-bold text-white mb-3">What You&apos;ll Learn</h2>
        <p className="text-center text-blue-200/70 mb-10">Each module includes a visual infographic, structured lessons, and a knowledge-check quiz</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f, i) => (
            <Link key={i} href={`/modules/${f.slug}`}>
              <div className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl p-6 transition-all hover:-translate-y-1 cursor-pointer">
                <div className="text-3xl mb-3">{f.icon}</div>
                <h3 className="text-white font-bold text-lg mb-2">{f.title}</h3>
                <p className="text-blue-200/70 text-sm leading-relaxed">{f.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-3xl mx-auto text-center px-8 pb-24">
        <div className="bg-blue-600/20 border border-blue-500/30 rounded-3xl p-12">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to become a trade finance expert?</h2>
          <p className="text-blue-200/80 mb-8">Free access to all 6 modules. Track your progress. Earn certificates.</p>
          <Link
            href="/dashboard"
            className="bg-blue-500 hover:bg-blue-400 text-white px-10 py-4 rounded-2xl text-lg font-bold transition-all inline-block"
          >
            Start Learning Free
          </Link>
        </div>
      </section>

      <footer className="text-center text-blue-200/50 text-sm py-8">
        © 2024 TradeFinance Academy. Built for trade finance professionals.
      </footer>
    </div>
  )
}
