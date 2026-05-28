'use client'

export default function TradeRiskMatrix() {
  const quadrants = [
    {
      x: 60, y: 60, w: 310, h: 220,
      fill: '#fef9c3', stroke: '#fbbf24',
      title: 'Q3 — Standby LC / Bank Guarantee',
      instrument: 'Standby LC or Bank Guarantee',
      when: 'Low probability of default but catastrophic if it occurs (large contracts, capital projects)',
      color: '#92400e',
    },
    {
      x: 390, y: 60, w: 310, h: 220,
      fill: '#fee2e2', stroke: '#ef4444',
      title: 'Q4 — Confirmed Irrevocable LC',
      instrument: 'Confirmed Irrevocable Letter of Credit',
      when: 'Unknown buyer + high-risk country. Maximum bank protection.',
      color: '#991b1b',
    },
    {
      x: 60, y: 300, w: 310, h: 220,
      fill: '#d1fae5', stroke: '#10b981',
      title: 'Q1 — Open Account',
      instrument: 'Open Account + Trade Credit Insurance',
      when: 'Trusted buyer in stable country. Use credit insurance as backstop.',
      color: '#065f46',
    },
    {
      x: 390, y: 300, w: 310, h: 220,
      fill: '#dbeafe', stroke: '#3b82f6',
      title: 'Q2 — Documentary Collection',
      instrument: 'D/P or D/A Collection (URC 522)',
      when: 'Known buyer with some relationship. Retain document control for security.',
      color: '#1e40af',
    },
  ]

  const scenarios = [
    { x: 160, y: 340, label: 'OECD\nBuyer', color: '#10b981' },
    { x: 260, y: 310, label: 'Repeat\nBuyer', color: '#10b981' },
    { x: 430, y: 340, label: 'New\nBuyer', color: '#3b82f6' },
    { x: 560, y: 310, label: 'Emerging\nMarket', color: '#3b82f6' },
    { x: 130, y: 140, label: 'Large\nProject', color: '#92400e' },
    { x: 460, y: 110, label: 'High-Risk\nCountry', color: '#991b1b' },
    { x: 580, y: 150, label: 'Sanctioned\nMarket', color: '#991b1b' },
  ]

  return (
    <div className="w-full bg-gray-50 rounded-2xl p-6 border border-gray-200 overflow-x-auto">
      <h3 className="text-center font-bold text-gray-800 text-lg mb-1">Trade Finance Risk Matrix</h3>
      <p className="text-center text-sm text-gray-500 mb-6">Match your trade finance instrument to the risk profile of the transaction</p>

      <svg viewBox="0 0 760 560" className="w-full max-w-3xl mx-auto" aria-label="Trade Finance Risk Matrix">
        {/* Quadrants */}
        {quadrants.map((q, i) => (
          <g key={i}>
            <rect x={q.x} y={q.y} width={q.w} height={q.h} rx="10" fill={q.fill} stroke={q.stroke} strokeWidth="2" />
            <text x={q.x + q.w / 2} y={q.y + 26} textAnchor="middle" fontSize="12" fill={q.color} fontWeight="700">{q.title}</text>
            <rect x={q.x + 14} y={q.y + 36} width={q.w - 28} height={22} rx="5" fill="white" opacity="0.8" />
            <text x={q.x + q.w / 2} y={q.y + 51} textAnchor="middle" fontSize="11" fill={q.color} fontWeight="600">{q.instrument}</text>
            <text x={q.x + q.w / 2} y={q.y + 80} textAnchor="middle" fontSize="9" fill={q.color} opacity="0.9">{q.when.slice(0, 50)}</text>
            <text x={q.x + q.w / 2} y={q.y + 94} textAnchor="middle" fontSize="9" fill={q.color} opacity="0.9">{q.when.slice(50, 100)}</text>
            <text x={q.x + q.w / 2} y={q.y + 108} textAnchor="middle" fontSize="9" fill={q.color} opacity="0.9">{q.when.slice(100, 150)}</text>
          </g>
        ))}

        {/* Axes */}
        {/* X-axis */}
        <line x1="60" y1="520" x2="710" y2="520" stroke="#374151" strokeWidth="2" />
        <polygon points="710,516 720,520 710,524" fill="#374151" />
        <text x="390" y="548" textAnchor="middle" fontSize="13" fill="#374151" fontWeight="700">Probability of Non-Payment →</text>
        <text x="80" y="538" fontSize="11" fill="#10b981" fontWeight="600">LOW</text>
        <text x="660" y="538" textAnchor="end" fontSize="11" fill="#ef4444" fontWeight="600">HIGH</text>

        {/* Y-axis */}
        <line x1="40" y1="520" x2="40" y2="50" stroke="#374151" strokeWidth="2" />
        <polygon points="36,50 40,40 44,50" fill="#374151" />
        <text x="18" y="290" textAnchor="middle" fontSize="13" fill="#374151" fontWeight="700" transform="rotate(-90 18 290)">Severity of Loss (Contract Size) →</text>
        <text x="28" y="510" textAnchor="middle" fontSize="11" fill="#10b981" fontWeight="600" transform="rotate(-90 28 510)">LOW</text>
        <text x="28" y="80" textAnchor="middle" fontSize="11" fill="#ef4444" fontWeight="600" transform="rotate(-90 28 80)">HIGH</text>

        {/* Axis divider lines */}
        <line x1="60" y1="295" x2="710" y2="295" stroke="#9ca3af" strokeWidth="1.5" strokeDasharray="6,4" />
        <line x1="375" y1="55" x2="375" y2="520" stroke="#9ca3af" strokeWidth="1.5" strokeDasharray="6,4" />

        {/* Scenario dots */}
        {scenarios.map((s, i) => (
          <g key={i}>
            <circle cx={s.x} cy={s.y} r="18" fill={s.color} opacity="0.2" />
            <circle cx={s.x} cy={s.y} r="6" fill={s.color} />
            {s.label.split('\n').map((l, li) => (
              <text key={li} x={s.x} y={s.y + 20 + li * 12} textAnchor="middle" fontSize="9" fill={s.color} fontWeight="600">{l}</text>
            ))}
          </g>
        ))}
      </svg>

      {/* Instrument summary */}
      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { name: 'Open Account', color: 'emerald', risk: 'Low/Low', cost: '$' },
          { name: 'Documentary Collection', color: 'blue', risk: 'High prob / Low severity', cost: '$$' },
          { name: 'Bank Guarantee / SBLC', color: 'amber', risk: 'Low prob / High severity', cost: '$$$' },
          { name: 'Confirmed LC', color: 'red', risk: 'High/High', cost: '$$$$' },
        ].map((item, i) => (
          <div key={i} className={`bg-${item.color}-50 border border-${item.color}-200 rounded-xl p-3`}>
            <div className={`font-bold text-${item.color}-800 text-sm`}>{item.name}</div>
            <div className={`text-${item.color}-600 text-xs mt-1`}>Risk: {item.risk}</div>
            <div className={`text-${item.color}-700 font-bold mt-1`}>{item.cost}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
