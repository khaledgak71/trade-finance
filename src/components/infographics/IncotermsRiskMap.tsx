'use client'

export default function IncotermsRiskMap() {
  const incoterms = [
    { term: 'EXW', x: 0.04, group: 'any', sellerEnd: 0.04 },
    { term: 'FCA', x: 0.14, group: 'any', sellerEnd: 0.14 },
    { term: 'FAS', x: 0.22, group: 'sea', sellerEnd: 0.22 },
    { term: 'FOB', x: 0.30, group: 'sea', sellerEnd: 0.30 },
    { term: 'CFR', x: 0.42, group: 'sea', sellerEnd: 0.58 },
    { term: 'CIF', x: 0.50, group: 'sea', sellerEnd: 0.70 },
    { term: 'CPT', x: 0.42, group: 'any', sellerEnd: 0.62 },
    { term: 'CIP', x: 0.50, group: 'any', sellerEnd: 0.72 },
    { term: 'DAP', x: 0.80, group: 'any', sellerEnd: 0.80 },
    { term: 'DPU', x: 0.86, group: 'any', sellerEnd: 0.86 },
    { term: 'DDP', x: 0.96, group: 'any', sellerEnd: 0.96 },
  ]

  const seaTerms = incoterms.filter(t => t.group === 'sea')
  const anyTerms = incoterms.filter(t => t.group === 'any')

  const W = 800
  const barY = 120
  const barH = 40

  return (
    <div className="w-full bg-gray-50 rounded-2xl p-6 border border-gray-200 overflow-x-auto">
      <h3 className="text-center font-bold text-gray-800 text-lg mb-1">Incoterms® 2020 — Risk Transfer Map</h3>
      <p className="text-center text-sm text-gray-500 mb-6">Where does risk transfer from seller to buyer?</p>

      <svg viewBox="0 0 860 420" className="w-full max-w-4xl mx-auto" aria-label="Incoterms Risk Map">
        {/* Journey bar background */}
        <rect x="30" y={barY} width={W} height={barH} rx="6" fill="#e2e8f0" />

        {/* Seller zone gradient overlay */}
        <defs>
          <linearGradient id="seller-grad" x1="0" x2="1">
            <stop offset="0%" stopColor="#ef4444" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#ef4444" stopOpacity="0.1" />
          </linearGradient>
          <linearGradient id="buyer-grad" x1="0" x2="1">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.7" />
          </linearGradient>
        </defs>
        <rect x="30" y={barY} width={W / 2} height={barH} rx="0" fill="url(#seller-grad)" />
        <rect x={30 + W / 2} y={barY} width={W / 2} height={barH} rx="0" fill="url(#buyer-grad)" />

        {/* Journey phases */}
        {[
          { label: "Seller's\nWarehouse", x: 0 },
          { label: 'Export\nClearance', x: 0.12 },
          { label: 'Port of\nLoading', x: 0.25 },
          { label: 'On\nBoard', x: 0.34 },
          { label: 'Sea\nFreight', x: 0.50 },
          { label: 'Port of\nDischarge', x: 0.66 },
          { label: 'Import\nClearance', x: 0.80 },
          { label: "Buyer's\nWarehouse", x: 0.96 },
        ].map((phase, i) => {
          const px = 30 + phase.x * W
          return (
            <g key={i}>
              <line x1={px} y1={barY} x2={px} y2={barY + barH} stroke="white" strokeWidth="1.5" opacity="0.6" />
              {phase.label.split('\n').map((l, li) => (
                <text key={li} x={px + 4} y={barY + 16 + li * 14} fontSize="9" fill="#374151" fontWeight="500">{l}</text>
              ))}
            </g>
          )
        })}

        {/* Direction arrow */}
        <line x1="30" y1={barY + barH + 12} x2={30 + W} y2={barY + barH + 12} stroke="#94a3b8" strokeWidth="1.5" />
        <polygon points={`${30 + W},${barY + barH + 8} ${30 + W + 10},${barY + barH + 12} ${30 + W},${barY + barH + 16}`} fill="#94a3b8" />
        <text x="35" y={barY + barH + 24} fontSize="10" fill="#64748b">Origin</text>
        <text x={30 + W - 15} y={barY + barH + 24} textAnchor="end" fontSize="10" fill="#64748b">Destination</text>

        {/* "Any mode" Incoterms — above bar */}
        <text x="30" y="28" fontSize="11" fill="#6b7280" fontWeight="600">Any Transport Mode:</text>
        {anyTerms.map((t, i) => {
          const px = 30 + t.x * W
          const alt = i % 2 === 0
          return (
            <g key={t.term}>
              <line x1={px} y1={alt ? 40 : 60} x2={px} y2={barY} stroke="#6b7280" strokeWidth="1.5" strokeDasharray="4,2" />
              <rect x={px - 16} y={alt ? 24 : 44} width="32" height="20" rx="4" fill="#6b7280" />
              <text x={px} y={alt ? 38 : 58} textAnchor="middle" fontSize="10" fill="white" fontWeight="700">{t.term}</text>
            </g>
          )
        })}

        {/* "Sea only" Incoterms — below bar */}
        <text x="30" y={barY + barH + 52} fontSize="11" fill="#0369a1" fontWeight="600">Sea/Inland Waterway Only:</text>
        {seaTerms.map((t, i) => {
          const px = 30 + t.x * W
          const alt = i % 2 === 0
          return (
            <g key={t.term}>
              <line x1={px} y1={barY + barH} x2={px} y2={barY + barH + (alt ? 72 : 90)} stroke="#0369a1" strokeWidth="1.5" strokeDasharray="4,2" />
              <rect x={px - 16} y={barY + barH + (alt ? 72 : 90)} width="32" height="20" rx="4" fill="#0ea5e9" />
              <text x={px} y={barY + barH + (alt ? 86 : 104)} textAnchor="middle" fontSize="10" fill="white" fontWeight="700">{t.term}</text>
            </g>
          )
        })}

        {/* Labels: Seller Risk / Buyer Risk */}
        <rect x="35" y={barY + 2} width="90" height="22" rx="4" fill="#ef4444" opacity="0.85" />
        <text x="80" y={barY + 17} textAnchor="middle" fill="white" fontSize="11" fontWeight="700">Seller Risk</text>

        <rect x={30 + W - 92} y={barY + 2} width="88" height="22" rx="4" fill="#3b82f6" opacity="0.85" />
        <text x={30 + W - 48} y={barY + 17} textAnchor="middle" fill="white" fontSize="11" fontWeight="700">Buyer Risk</text>

        {/* Transfer point marker */}
        <line x1={30 + W / 2} y1={barY - 5} x2={30 + W / 2} y2={barY + barH + 5} stroke="#374151" strokeWidth="2" />
        <polygon points={`${30 + W / 2 - 6},${barY - 8} ${30 + W / 2 + 6},${barY - 8} ${30 + W / 2},${barY - 18}`} fill="#374151" />
        <text x={30 + W / 2} y={barY - 20} textAnchor="middle" fontSize="10" fill="#374151" fontWeight="600">Midpoint</text>
      </svg>

      {/* Incoterm cards */}
      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-2">
        {[
          { term: 'EXW', full: 'Ex Works', risk: 'Seller warehouse', obligation: 'Minimum seller obligation' },
          { term: 'FCA', full: 'Free Carrier', risk: 'Seller\'s premises/named place', obligation: 'Seller handles export clearance' },
          { term: 'FOB', full: 'Free On Board', risk: 'On board vessel at port of loading', obligation: 'Sea freight only' },
          { term: 'CIF', full: 'Cost, Insurance & Freight', risk: 'On board vessel (loading port)', obligation: 'Seller pays freight + insurance' },
          { term: 'CPT', full: 'Carriage Paid To', risk: 'At carrier (origin)', obligation: 'Seller pays to named destination' },
          { term: 'DAP', full: 'Delivered at Place', risk: 'At named destination', obligation: 'Seller delivers, buyer imports' },
          { term: 'DPU', full: 'Delivered at Place Unloaded', risk: 'After unloading at destination', obligation: 'Seller unloads at destination' },
          { term: 'DDP', full: 'Delivered Duty Paid', risk: 'At destination (cleared)', obligation: 'Maximum seller obligation' },
        ].map((t, i) => (
          <div key={i} className="bg-white border border-gray-200 rounded-lg p-2 shadow-sm">
            <div className="font-bold text-gray-800 text-sm">{t.term}</div>
            <div className="text-gray-500 text-xs">{t.full}</div>
            <div className="text-blue-600 text-xs mt-1 font-medium">{t.obligation}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
