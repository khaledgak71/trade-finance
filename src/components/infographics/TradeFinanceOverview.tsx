'use client'

export default function TradeFinanceOverview() {
  return (
    <div className="w-full overflow-x-auto bg-gray-50 rounded-2xl p-6 border border-gray-200">
      <h3 className="text-center font-bold text-gray-800 text-lg mb-2">Trade Finance — The Global Trade Ecosystem</h3>
      <p className="text-center text-sm text-gray-500 mb-6">How banks bridge the trust gap between exporters and importers worldwide</p>

      <svg viewBox="0 0 900 580" className="w-full max-w-4xl mx-auto" aria-label="Trade Finance Overview">
        <defs>
          <marker id="arr-green" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
            <polygon points="0 0,10 3.5,0 7" fill="#16a34a" />
          </marker>
          <marker id="arr-blue" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
            <polygon points="0 0,10 3.5,0 7" fill="#2563eb" />
          </marker>
          <marker id="arr-amber" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
            <polygon points="0 0,10 3.5,0 7" fill="#d97706" />
          </marker>
          <marker id="arr-gray" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
            <polygon points="0 0,10 3.5,0 7" fill="#6b7280" />
          </marker>
          <linearGradient id="risk-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#16a34a" />
            <stop offset="50%" stopColor="#2563eb" />
            <stop offset="100%" stopColor="#dc2626" />
          </linearGradient>
        </defs>

        {/* ── SECTION 1: Country Backgrounds ── */}
        <rect x="0"   y="0" width="260" height="330" fill="#f0fdf4" rx="0" />
        <rect x="640" y="0" width="260" height="330" fill="#eff6ff" rx="0" />
        <rect x="260" y="0" width="380" height="330" fill="#f8fafc" rx="0" />

        {/* Section divider */}
        <line x1="0" y1="330" x2="900" y2="330" stroke="#e2e8f0" strokeWidth="2" />

        {/* Country labels */}
        <text x="130" y="22" textAnchor="middle" fontSize="11" fontWeight="700" fill="#15803d" letterSpacing="1">EXPORTER&apos;S COUNTRY</text>
        <text x="770" y="22" textAnchor="middle" fontSize="11" fontWeight="700" fill="#1d4ed8" letterSpacing="1">IMPORTER&apos;S COUNTRY</text>
        <text x="450" y="22" textAnchor="middle" fontSize="11" fontWeight="600" fill="#6b7280" letterSpacing="1">INTERNATIONAL BANKING CHANNEL</text>

        {/* ── Exporter (Seller) ── */}
        <rect x="30" y="38" width="200" height="72" rx="10" fill="#16a34a" />
        <text x="130" y="68" textAnchor="middle" fontSize="14" fontWeight="700" fill="white">🏭 Exporter</text>
        <text x="130" y="86" textAnchor="middle" fontSize="11" fill="#dcfce7">(Seller / Beneficiary)</text>
        <text x="130" y="102" textAnchor="middle" fontSize="10" fill="#bbf7d0">Ships goods · Needs payment security</text>

        {/* ── Importer (Buyer) ── */}
        <rect x="670" y="38" width="200" height="72" rx="10" fill="#1d4ed8" />
        <text x="770" y="68" textAnchor="middle" fontSize="14" fontWeight="700" fill="white">🏢 Importer</text>
        <text x="770" y="86" textAnchor="middle" fontSize="11" fill="#dbeafe">(Buyer / Applicant)</text>
        <text x="770" y="102" textAnchor="middle" fontSize="10" fill="#bfdbfe">Buys goods · Wants delivery assurance</text>

        {/* ── Exporter's Bank ── */}
        <rect x="30" y="210" width="200" height="72" rx="10" fill="#166534" />
        <text x="130" y="240" textAnchor="middle" fontSize="13" fontWeight="700" fill="white">🏦 Exporter&apos;s Bank</text>
        <text x="130" y="257" textAnchor="middle" fontSize="10" fill="#bbf7d0">Advising / Confirming Bank</text>
        <text x="130" y="272" textAnchor="middle" fontSize="10" fill="#86efac">Authenticates &amp; advises instruments</text>

        {/* ── Importer's Bank ── */}
        <rect x="670" y="210" width="200" height="72" rx="10" fill="#1e3a8a" />
        <text x="770" y="240" textAnchor="middle" fontSize="13" fontWeight="700" fill="white">🏦 Importer&apos;s Bank</text>
        <text x="770" y="257" textAnchor="middle" fontSize="10" fill="#bfdbfe">Issuing Bank</text>
        <text x="770" y="272" textAnchor="middle" fontSize="10" fill="#93c5fd">Issues LC / BG on buyer&apos;s behalf</text>

        {/* ── Flow 1: Goods (top, green) ── */}
        <line x1="232" y1="68" x2="668" y2="68" stroke="#16a34a" strokeWidth="2.5" markerEnd="url(#arr-green)" />
        <rect x="340" y="50" width="220" height="24" fill="white" rx="4" stroke="#d1fae5" />
        <text x="450" y="66" textAnchor="middle" fontSize="11" fill="#166534" fontWeight="600">① Goods / Services Flow →</text>

        {/* ── Flow 2: Payment (mid-top, blue) ── */}
        <line x1="668" y1="102" x2="232" y2="102" stroke="#2563eb" strokeWidth="2.5" markerEnd="url(#arr-blue)" />
        <rect x="340" y="84" width="220" height="24" fill="white" rx="4" stroke="#dbeafe" />
        <text x="450" y="100" textAnchor="middle" fontSize="11" fill="#1e40af" fontWeight="600">← ② Payment Flow</text>

        {/* ── Exporter vertical: to bank ── */}
        <line x1="130" y1="112" x2="130" y2="208" stroke="#6b7280" strokeWidth="2" strokeDasharray="5,3" markerEnd="url(#arr-gray)" />
        <rect x="50" y="152" width="155" height="22" fill="white" rx="4" stroke="#e5e7eb" />
        <text x="128" y="167" textAnchor="middle" fontSize="10" fill="#374151">Presents Documents</text>

        {/* ── Importer vertical: to bank ── */}
        <line x1="770" y1="112" x2="770" y2="208" stroke="#6b7280" strokeWidth="2" strokeDasharray="5,3" markerEnd="url(#arr-gray)" />
        <rect x="690" y="152" width="155" height="22" fill="white" rx="4" stroke="#e5e7eb" />
        <text x="768" y="167" textAnchor="middle" fontSize="10" fill="#374151">Applies / Instructs</text>

        {/* ── Flow 3: Bank-to-bank SWIFT (amber dashed) ── */}
        <line x1="232" y1="248" x2="668" y2="248" stroke="#d97706" strokeWidth="2" strokeDasharray="7,3" markerEnd="url(#arr-amber)" />
        <rect x="315" y="230" width="270" height="24" fill="white" rx="4" stroke="#fde68a" />
        <text x="450" y="246" textAnchor="middle" fontSize="11" fill="#92400e" fontWeight="600">③ SWIFT Messages (MT700/MT760…)</text>

        {/* Center label: Trust Gap solved */}
        <rect x="295" y="128" width="310" height="88" rx="10" fill="white" stroke="#e2e8f0" strokeWidth="1.5" />
        <text x="450" y="152" textAnchor="middle" fontSize="13" fontWeight="700" fill="#1f2937">Banks Bridge the Trust Gap</text>
        <text x="450" y="171" textAnchor="middle" fontSize="10" fill="#6b7280">Seller wants payment before shipping</text>
        <text x="450" y="186" textAnchor="middle" fontSize="10" fill="#6b7280">Buyer wants goods before paying</text>
        <text x="450" y="205" textAnchor="middle" fontSize="11" fontWeight="600" fill="#2563eb">→ Banks provide the guarantee both need ←</text>

        {/* ── SECTION 2: Instrument Risk Spectrum ── */}
        <text x="450" y="356" textAnchor="middle" fontSize="13" fontWeight="700" fill="#1f2937">Trade Finance Instruments — Risk Spectrum</text>

        {/* Risk gradient bar */}
        <rect x="40" y="365" width="820" height="18" rx="9" fill="url(#risk-grad)" opacity="0.85" />
        <text x="44"  y="398" fontSize="10" fill="#166534" fontWeight="600">← More risk on Seller</text>
        <text x="856" y="398" textAnchor="end" fontSize="10" fill="#dc2626" fontWeight="600">More risk on Buyer →</text>

        {/* Instrument Cards */}
        {/* 1: Open Account */}
        <rect x="18"  y="406" width="148" height="126" rx="8" fill="#f0fdf4" stroke="#86efac" strokeWidth="1.5" />
        <text x="92"  y="428" textAnchor="middle" fontSize="20">📦</text>
        <text x="92"  y="448" textAnchor="middle" fontSize="11" fontWeight="700" fill="#166534">Open Account</text>
        <text x="92"  y="464" textAnchor="middle" fontSize="9"  fill="#374151">Goods shipped before</text>
        <text x="92"  y="476" textAnchor="middle" fontSize="9"  fill="#374151">payment. Max seller</text>
        <text x="92"  y="488" textAnchor="middle" fontSize="9"  fill="#374151">risk. Common in</text>
        <text x="92"  y="500" textAnchor="middle" fontSize="9"  fill="#374151">trusted partnerships.</text>
        <rect x="38"  y="510" width="108" height="16" rx="6" fill="#dcfce7" />
        <text x="92"  y="522" textAnchor="middle" fontSize="9" fill="#166534" fontWeight="600">Low cost · High risk</text>

        {/* 2: Documentary Collections */}
        <rect x="186" y="406" width="148" height="126" rx="8" fill="#fffbeb" stroke="#fde68a" strokeWidth="1.5" />
        <text x="260" y="428" textAnchor="middle" fontSize="20">📄</text>
        <text x="260" y="448" textAnchor="middle" fontSize="11" fontWeight="700" fill="#92400e">Documentary</text>
        <text x="260" y="462" textAnchor="middle" fontSize="11" fontWeight="700" fill="#92400e">Collections</text>
        <text x="260" y="478" textAnchor="middle" fontSize="9" fill="#374151">Bank handles docs.</text>
        <text x="260" y="490" textAnchor="middle" fontSize="9" fill="#374151">Payment against</text>
        <text x="260" y="502" textAnchor="middle" fontSize="9" fill="#374151">document release.</text>
        <rect x="206" y="510" width="108" height="16" rx="6" fill="#fef9c3" />
        <text x="260" y="522" textAnchor="middle" fontSize="9" fill="#92400e" fontWeight="600">URC 522 · Moderate</text>

        {/* 3: Letters of Credit (highlighted) */}
        <rect x="354" y="400" width="192" height="138" rx="8" fill="#eff6ff" stroke="#2563eb" strokeWidth="2.5" />
        <rect x="354" y="400" width="192" height="22" rx="8" fill="#2563eb" />
        <rect x="354" y="412" width="192" height="10" rx="0" fill="#2563eb" />
        <text x="450" y="416" textAnchor="middle" fontSize="10" fill="white" fontWeight="700">★ MOST COMMON ★</text>
        <text x="450" y="442" textAnchor="middle" fontSize="20">🏦</text>
        <text x="450" y="462" textAnchor="middle" fontSize="11" fontWeight="700" fill="#1e40af">Letters of Credit</text>
        <text x="450" y="478" textAnchor="middle" fontSize="9" fill="#374151">Bank guarantees payment</text>
        <text x="450" y="490" textAnchor="middle" fontSize="9" fill="#374151">on compliant docs.</text>
        <text x="450" y="502" textAnchor="middle" fontSize="9" fill="#374151">Balanced protection</text>
        <text x="450" y="514" textAnchor="middle" fontSize="9" fill="#374151">for both parties.</text>
        <rect x="374" y="524" width="152" height="16" rx="6" fill="#dbeafe" />
        <text x="450" y="536" textAnchor="middle" fontSize="9" fill="#1e40af" fontWeight="600">UCP 600 · Balanced risk</text>

        {/* 4: Bank Guarantees */}
        <rect x="566" y="406" width="148" height="126" rx="8" fill="#faf5ff" stroke="#c4b5fd" strokeWidth="1.5" />
        <text x="640" y="428" textAnchor="middle" fontSize="20">🛡️</text>
        <text x="640" y="448" textAnchor="middle" fontSize="11" fontWeight="700" fill="#6b21a8">Bank Guarantees</text>
        <text x="640" y="464" textAnchor="middle" fontSize="9" fill="#374151">Contingent instrument.</text>
        <text x="640" y="476" textAnchor="middle" fontSize="9" fill="#374151">Called only on default.</text>
        <text x="640" y="488" textAnchor="middle" fontSize="9" fill="#374151">Protects buyer /</text>
        <text x="640" y="500" textAnchor="middle" fontSize="9" fill="#374151">project owner.</text>
        <rect x="586" y="510" width="108" height="16" rx="6" fill="#ede9fe" />
        <text x="640" y="522" textAnchor="middle" fontSize="9" fill="#6b21a8" fontWeight="600">URDG 758 · On demand</text>

        {/* 5: Cash in Advance */}
        <rect x="734" y="406" width="148" height="126" rx="8" fill="#fff1f2" stroke="#fca5a5" strokeWidth="1.5" />
        <text x="808" y="428" textAnchor="middle" fontSize="20">💵</text>
        <text x="808" y="448" textAnchor="middle" fontSize="11" fontWeight="700" fill="#991b1b">Cash in Advance</text>
        <text x="808" y="464" textAnchor="middle" fontSize="9" fill="#374151">Buyer pays before</text>
        <text x="808" y="476" textAnchor="middle" fontSize="9" fill="#374151">shipment. Zero seller</text>
        <text x="808" y="488" textAnchor="middle" fontSize="9" fill="#374151">risk. Max buyer risk.</text>
        <text x="808" y="500" textAnchor="middle" fontSize="9" fill="#374151">Used for new buyers.</text>
        <rect x="754" y="510" width="108" height="16" rx="6" fill="#fee2e2" />
        <text x="808" y="522" textAnchor="middle" fontSize="9" fill="#991b1b" fontWeight="600">No bank · High risk</text>
      </svg>

      {/* Key takeaway cards */}
      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { icon: '🔒', title: 'Trust Gap', desc: 'Seller and buyer are in different countries — neither wants to move first' },
          { icon: '🏦', title: 'Banks Intervene', desc: 'Banks issue guarantees and handle documents so both parties are protected' },
          { icon: '📜', title: 'Documents = Money', desc: 'In trade finance, payment is triggered by compliant documents, not physical goods' },
          { icon: '⚖️', title: 'Risk vs. Cost', desc: 'More bank involvement = more security but higher fees. Choose the right instrument' },
        ].map((item, i) => (
          <div key={i} className="bg-white rounded-xl p-3 border border-gray-200 shadow-sm">
            <div className="text-blue-600 font-bold text-xl mb-1">{item.icon}</div>
            <div className="font-semibold text-gray-700 text-sm">{item.title}</div>
            <div className="text-gray-500 text-xs mt-1">{item.desc}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
