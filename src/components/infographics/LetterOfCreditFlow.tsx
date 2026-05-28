'use client'

export default function LetterOfCreditFlow() {
  const parties = [
    { label: 'Applicant\n(Importer/Buyer)', color: '#3b82f6', textColor: '#fff', y: 60 },
    { label: 'Issuing Bank\n(Buyer\'s Bank)', color: '#8b5cf6', textColor: '#fff', y: 185 },
    { label: 'Advising Bank\n(Seller\'s Bank)', color: '#06b6d4', textColor: '#fff', y: 310 },
    { label: 'Beneficiary\n(Exporter/Seller)', color: '#10b981', textColor: '#fff', y: 435 },
  ]

  return (
    <div className="w-full overflow-x-auto bg-gray-50 rounded-2xl p-6 border border-gray-200">
      <h3 className="text-center font-bold text-gray-800 text-lg mb-2">Letter of Credit — 8-Step Process Flow</h3>
      <p className="text-center text-sm text-gray-500 mb-6">Swim-lane diagram across four parties</p>

      <svg viewBox="0 0 900 560" className="w-full max-w-4xl mx-auto" aria-label="Letter of Credit Process Flow">
        <defs>
          <marker id="arrow-blue" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="#3b82f6" />
          </marker>
          <marker id="arrow-green" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="#10b981" />
          </marker>
          <marker id="arrow-gray" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="#6b7280" />
          </marker>
        </defs>

        {/* Swim lane backgrounds */}
        {parties.map((p, i) => (
          <g key={i}>
            <rect x="0" y={p.y - 50} width="900" height="115" fill={i % 2 === 0 ? '#f8fafc' : '#f1f5f9'} rx="0" />
            <rect x="0" y={p.y - 50} width="140" height="115" fill={p.color} rx="0" opacity="0.9" />
            {p.label.split('\n').map((line, li) => (
              <text key={li} x="70" y={p.y - 10 + li * 20} textAnchor="middle" fill={p.textColor} fontSize="12" fontWeight="600">{line}</text>
            ))}
          </g>
        ))}

        {/* Divider lines */}
        {parties.map((p, i) => (
          <line key={i} x1="0" y1={p.y - 50} x2="900" y2={p.y - 50} stroke="#e2e8f0" strokeWidth="1" />
        ))}

        {/* Step 1: Applicant → Issuing Bank (down) */}
        <line x1="240" y1="85" x2="240" y2="170" stroke="#6b7280" strokeWidth="2" markerEnd="url(#arrow-gray)" strokeDasharray="6,3" />
        <rect x="155" y="115" width="170" height="26" fill="white" rx="4" stroke="#e2e8f0" />
        <text x="240" y="132" textAnchor="middle" fontSize="11" fill="#374151" fontWeight="500">① Apply for LC</text>

        {/* Step 2: Issuing Bank issues LC (self note) */}
        <rect x="320" y="172" width="200" height="26" fill="#8b5cf6" rx="4" opacity="0.15" />
        <rect x="320" y="172" width="200" height="26" fill="none" rx="4" stroke="#8b5cf6" strokeWidth="1" />
        <text x="420" y="189" textAnchor="middle" fontSize="11" fill="#6d28d9" fontWeight="600">② Issues LC (SWIFT MT700)</text>

        {/* Step 3: Issuing Bank → Advising Bank (down) */}
        <line x1="560" y1="210" x2="560" y2="295" stroke="#6b7280" strokeWidth="2" markerEnd="url(#arrow-gray)" strokeDasharray="6,3" />
        <rect x="570" y="240" width="140" height="26" fill="white" rx="4" stroke="#e2e8f0" />
        <text x="640" y="257" textAnchor="middle" fontSize="11" fill="#374151" fontWeight="500">③ Transmit LC</text>

        {/* Step 4: Advising Bank → Beneficiary (down) */}
        <line x1="380" y1="335" x2="380" y2="420" stroke="#6b7280" strokeWidth="2" markerEnd="url(#arrow-gray)" strokeDasharray="6,3" />
        <rect x="200" y="365" width="165" height="26" fill="white" rx="4" stroke="#e2e8f0" />
        <text x="282" y="382" textAnchor="middle" fontSize="11" fill="#374151" fontWeight="500">④ Advise LC</text>

        {/* Step 5: Beneficiary ships (self label) */}
        <rect x="600" y="450" width="220" height="26" fill="#10b981" rx="4" opacity="0.15" />
        <rect x="600" y="450" width="220" height="26" fill="none" rx="4" stroke="#10b981" strokeWidth="1" />
        <text x="710" y="467" textAnchor="middle" fontSize="11" fill="#065f46" fontWeight="600">⑤ Ship Goods &amp; Collect Docs</text>

        {/* Step 6: Beneficiary → Advising Bank (up) */}
        <line x1="520" y1="425" x2="520" y2="340" stroke="#10b981" strokeWidth="2" markerEnd="url(#arrow-green)" />
        <rect x="530" y="370" width="145" height="26" fill="white" rx="4" stroke="#d1fae5" />
        <text x="603" y="387" textAnchor="middle" fontSize="11" fill="#065f46" fontWeight="500">⑥ Present Documents</text>

        {/* Step 7: Advising Bank → Issuing Bank (up) */}
        <line x1="680" y1="300" x2="680" y2="215" stroke="#10b981" strokeWidth="2" markerEnd="url(#arrow-green)" />
        <rect x="690" y="246" width="150" height="26" fill="white" rx="4" stroke="#d1fae5" />
        <text x="765" y="263" textAnchor="middle" fontSize="11" fill="#065f46" fontWeight="500">⑦ Forward Documents</text>

        {/* Step 8: Payment released (up, left side) */}
        <line x1="180" y1="175" x2="180" y2="90" stroke="#3b82f6" strokeWidth="2.5" markerEnd="url(#arrow-blue)" />
        <rect x="150" y="118" width="200" height="32" fill="white" rx="4" stroke="#bfdbfe" />
        <text x="250" y="131" textAnchor="middle" fontSize="10" fill="#1e40af" fontWeight="600">⑧ Release Payment</text>
        <text x="250" y="143" textAnchor="middle" fontSize="10" fill="#1e40af">Buyer receives Documents</text>

        {/* Legend */}
        <rect x="155" y="512" width="590" height="36" fill="#f8fafc" rx="8" stroke="#e2e8f0" />
        <line x1="175" y1="530" x2="205" y2="530" stroke="#6b7280" strokeWidth="2" strokeDasharray="5,3" />
        <text x="215" y="534" fontSize="11" fill="#6b7280">Bank Instructions</text>
        <line x1="350" y1="530" x2="380" y2="530" stroke="#10b981" strokeWidth="2" />
        <text x="390" y="534" fontSize="11" fill="#065f46">Document/Payment Flow</text>
        <line x1="540" y1="530" x2="570" y2="530" stroke="#3b82f6" strokeWidth="2.5" />
        <text x="580" y="534" fontSize="11" fill="#1e40af">Payment Release</text>
      </svg>

      {/* Step Summary */}
      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { step: '①②', title: 'Application & Issuance', desc: 'Buyer applies; Issuing Bank issues LC via SWIFT MT700' },
          { step: '③④', title: 'Advising', desc: 'Issuing Bank sends LC to Advising Bank, who notifies the seller' },
          { step: '⑤⑥', title: 'Shipment & Presentation', desc: 'Seller ships goods, collects documents, presents to bank within 21 days' },
          { step: '⑦⑧', title: 'Settlement', desc: 'Documents forwarded to issuing bank; payment released to seller' },
        ].map((item, i) => (
          <div key={i} className="bg-white rounded-xl p-3 border border-gray-200 shadow-sm">
            <div className="text-blue-600 font-bold text-lg">{item.step}</div>
            <div className="font-semibold text-gray-700 text-sm">{item.title}</div>
            <div className="text-gray-500 text-xs mt-1">{item.desc}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
