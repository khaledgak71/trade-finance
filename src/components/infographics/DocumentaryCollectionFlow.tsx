'use client'

export default function DocumentaryCollectionFlow() {
  return (
    <div className="w-full bg-gray-50 rounded-2xl p-6 border border-gray-200 overflow-x-auto">
      <h3 className="text-center font-bold text-gray-800 text-lg mb-1">Documentary Collections — D/P vs D/A</h3>
      <p className="text-center text-sm text-gray-500 mb-6">Governed by ICC URC 522</p>

      <svg viewBox="0 0 860 480" className="w-full max-w-3xl mx-auto" aria-label="Documentary Collection Flow">
        <defs>
          <marker id="dc-arrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="#64748b" />
          </marker>
          <marker id="dp-arrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="#10b981" />
          </marker>
          <marker id="da-arrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="#f59e0b" />
          </marker>
        </defs>

        {/* Party boxes */}
        {[
          { x: 30, y: 180, w: 120, h: 60, color: '#10b981', label: 'Exporter', sub: '(Principal)' },
          { x: 230, y: 180, w: 140, h: 60, color: '#3b82f6', label: 'Remitting Bank', sub: "Exporter's Bank" },
          { x: 490, y: 180, w: 140, h: 60, color: '#8b5cf6', label: 'Collecting Bank', sub: "Importer's Bank" },
          { x: 710, y: 180, w: 120, h: 60, color: '#f59e0b', label: 'Importer', sub: '(Drawee)' },
        ].map((p, i) => (
          <g key={i}>
            <rect x={p.x} y={p.y} width={p.w} height={p.h} rx="10" fill={p.color} />
            <text x={p.x + p.w / 2} y={p.y + 26} textAnchor="middle" fill="white" fontSize="13" fontWeight="700">{p.label}</text>
            <text x={p.x + p.w / 2} y={p.y + 44} textAnchor="middle" fill="white" fontSize="11" opacity="0.9">{p.sub}</text>
          </g>
        ))}

        {/* Step 1: Exporter → Remitting Bank */}
        <line x1="152" y1="210" x2="228" y2="210" stroke="#64748b" strokeWidth="2" markerEnd="url(#dc-arrow)" />
        <text x="190" y="202" textAnchor="middle" fontSize="10" fill="#374151" fontWeight="600">① Docs + Instructions</text>

        {/* Step 2: Remitting → Collecting */}
        <line x1="372" y1="210" x2="488" y2="210" stroke="#64748b" strokeWidth="2" markerEnd="url(#dc-arrow)" />
        <text x="430" y="202" textAnchor="middle" fontSize="10" fill="#374151" fontWeight="600">② Forward Docs (SWIFT)</text>

        {/* Step 3: Collecting → Importer */}
        <line x1="632" y1="210" x2="708" y2="210" stroke="#64748b" strokeWidth="2" markerEnd="url(#dc-arrow)" />
        <text x="670" y="202" textAnchor="middle" fontSize="10" fill="#374151" fontWeight="600">③ Present Docs</text>

        {/* Branch point */}
        <circle cx="430" cy="300" r="8" fill="#64748b" />
        <text x="430" y="325" textAnchor="middle" fontSize="12" fill="#374151" fontWeight="700">Payment</text>
        <text x="430" y="340" textAnchor="middle" fontSize="12" fill="#374151" fontWeight="700">Method?</text>

        {/* Connecting line from collecting bank to branch */}
        <line x1="560" y1="242" x2="430" y2="292" stroke="#64748b" strokeWidth="1.5" strokeDasharray="5,3" />

        {/* D/P branch (left) */}
        <path d="M 422 308 L 220 370" stroke="#10b981" strokeWidth="2" fill="none" markerEnd="url(#dp-arrow)" />
        <rect x="148" y="355" width="155" height="52" rx="8" fill="#d1fae5" stroke="#10b981" strokeWidth="1.5" />
        <text x="225" y="374" textAnchor="middle" fontSize="12" fill="#065f46" fontWeight="700">D/P — Sight</text>
        <text x="225" y="390" textAnchor="middle" fontSize="10" fill="#065f46">Importer pays now</text>
        <text x="225" y="402" textAnchor="middle" fontSize="10" fill="#065f46">→ documents released</text>

        {/* D/A branch (right) */}
        <path d="M 438 308 L 640 370" stroke="#f59e0b" strokeWidth="2" fill="none" markerEnd="url(#da-arrow)" />
        <rect x="568" y="355" width="165" height="52" rx="8" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5" />
        <text x="650" y="374" textAnchor="middle" fontSize="12" fill="#92400e" fontWeight="700">D/A — Term</text>
        <text x="650" y="390" textAnchor="middle" fontSize="10" fill="#92400e">Accepts Bill of Exchange</text>
        <text x="650" y="402" textAnchor="middle" fontSize="10" fill="#92400e">→ pays at maturity</text>

        {/* D/P payment flow back */}
        <path d="M 148 390 Q 60 420 90 210" stroke="#10b981" strokeWidth="2" fill="none" strokeDasharray="6,3" markerEnd="url(#dp-arrow)" />
        <text x="42" y="330" fontSize="10" fill="#065f46" fontWeight="600">Payment</text>
        <text x="42" y="342" fontSize="10" fill="#065f46">remitted</text>

        {/* D/A deferred payment */}
        <rect x="595" y="430" width="165" height="28" rx="6" fill="#fef9c3" stroke="#fbbf24" />
        <text x="677" y="448" textAnchor="middle" fontSize="11" fill="#78350f" fontWeight="600">⑤ Pay at maturity (30/60/90 days)</text>

        {/* Labels */}
        <text x="280" y="298" fontSize="11" fill="#10b981" fontWeight="700">Documents Against</text>
        <text x="280" y="312" fontSize="11" fill="#10b981" fontWeight="700">PAYMENT (D/P)</text>
        <text x="530" y="298" fontSize="11" fill="#f59e0b" fontWeight="700">Documents Against</text>
        <text x="530" y="312" fontSize="11" fill="#f59e0b" fontWeight="700">ACCEPTANCE (D/A)</text>

        {/* URC 522 note */}
        <rect x="310" y="448" width="240" height="24" rx="6" fill="#ede9fe" stroke="#8b5cf6" />
        <text x="430" y="464" textAnchor="middle" fontSize="11" fill="#5b21b6" fontWeight="600">Governed by ICC URC 522</text>
      </svg>

      {/* Comparison Table */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
          <div className="font-bold text-emerald-800 mb-2">D/P — Documents Against Payment</div>
          <ul className="text-sm text-emerald-700 space-y-1">
            <li>• Lower risk for exporter</li>
            <li>• Importer pays before receiving goods</li>
            <li>• Also called &ldquo;sight collection&rdquo; or CAD</li>
            <li>• Goods at risk if importer refuses to pay</li>
          </ul>
        </div>
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
          <div className="font-bold text-amber-800 mb-2">D/A — Documents Against Acceptance</div>
          <ul className="text-sm text-amber-700 space-y-1">
            <li>• Higher risk for exporter</li>
            <li>• Importer gets goods before paying</li>
            <li>• Creates a negotiable Bill of Exchange</li>
            <li>• Can be discounted/forfaited by exporter</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
