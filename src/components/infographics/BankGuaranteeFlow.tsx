'use client'

export default function BankGuaranteeFlow() {
  const guaranteeTypes = [
    { name: 'Performance Bond', color: '#3b82f6', pct: '5–10%', use: 'Ensures contract performance' },
    { name: 'Advance Payment', color: '#8b5cf6', pct: '10–30%', use: 'Protects pre-paid amounts' },
    { name: 'Bid Bond', color: '#06b6d4', pct: '2–5%', use: 'Ensures bid commitment' },
    { name: 'Payment Guarantee', color: '#10b981', pct: 'Full amount', use: 'Guarantees buyer pays seller' },
  ]

  return (
    <div className="w-full bg-gray-50 rounded-2xl p-6 border border-gray-200 overflow-x-auto">
      <h3 className="text-center font-bold text-gray-800 text-lg mb-1">Bank Guarantee — Structure & Types</h3>
      <p className="text-center text-sm text-gray-500 mb-6">Governed by ICC URDG 758</p>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Triangle diagram */}
        <div className="flex-1">
          <svg viewBox="0 0 440 400" className="w-full max-w-sm mx-auto" aria-label="Bank Guarantee Triangle">
            <defs>
              <marker id="bg-arrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill="#64748b" />
              </marker>
              <marker id="bg-red" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill="#ef4444" />
              </marker>
              <marker id="bg-blue" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill="#3b82f6" />
              </marker>
              <marker id="bg-green" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill="#10b981" />
              </marker>
            </defs>

            {/* Triangle outline */}
            <polygon points="220,40 60,320 380,320" fill="none" stroke="#e2e8f0" strokeWidth="2" strokeDasharray="8,4" />

            {/* Top node — Guarantor Bank */}
            <ellipse cx="220" cy="40" rx="80" ry="32" fill="#8b5cf6" />
            <text x="220" y="36" textAnchor="middle" fill="white" fontSize="12" fontWeight="700">Guarantor Bank</text>
            <text x="220" y="52" textAnchor="middle" fill="white" fontSize="10" opacity="0.9">(URDG 758)</text>

            {/* Bottom left — Principal */}
            <ellipse cx="80" cy="330" rx="70" ry="28" fill="#3b82f6" />
            <text x="80" y="326" textAnchor="middle" fill="white" fontSize="12" fontWeight="700">Principal</text>
            <text x="80" y="342" textAnchor="middle" fill="white" fontSize="10" opacity="0.9">(Applicant)</text>

            {/* Bottom right — Beneficiary */}
            <ellipse cx="360" cy="330" rx="70" ry="28" fill="#10b981" />
            <text x="360" y="326" textAnchor="middle" fill="white" fontSize="12" fontWeight="700">Beneficiary</text>
            <text x="360" y="342" textAnchor="middle" fill="white" fontSize="10" opacity="0.9">(Claimant)</text>

            {/* Edge 1: Principal → Bank (Indemnity Agreement) */}
            <line x1="130" y1="312" x2="178" y2="72" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#bg-blue)" />
            <rect x="60" y="178" width="145" height="28" rx="6" fill="white" stroke="#bfdbfe" />
            <text x="133" y="196" textAnchor="middle" fontSize="10" fill="#1e40af" fontWeight="600">Indemnity Agreement</text>

            {/* Edge 2: Bank → Beneficiary (Guarantee Issued) */}
            <line x1="272" y1="64" x2="316" y2="304" stroke="#10b981" strokeWidth="2" markerEnd="url(#bg-green)" />
            <rect x="275" y="162" width="130" height="28" rx="6" fill="white" stroke="#d1fae5" />
            <text x="340" y="180" textAnchor="middle" fontSize="10" fill="#065f46" fontWeight="600">Guarantee Issued</text>

            {/* Edge 3: Beneficiary → Bank (Demand) */}
            <path d="M 310 310 Q 380 200 275 70" fill="none" stroke="#ef4444" strokeWidth="2" markerEnd="url(#bg-red)" />
            <rect x="350" y="220" width="82" height="28" rx="6" fill="white" stroke="#fecaca" />
            <text x="391" y="238" textAnchor="middle" fontSize="10" fill="#b91c1c" fontWeight="600">Demand</text>

            {/* Edge 4: Bank → Principal (Reimbursement) */}
            <path d="M 150 312 Q 140 380 190 340" fill="none" stroke="#f59e0b" strokeWidth="2" strokeDasharray="5,3" markerEnd="url(#bg-arrow)" />
            <rect x="30" y="362" width="140" height="28" rx="6" fill="white" stroke="#fde68a" />
            <text x="100" y="380" textAnchor="middle" fontSize="10" fill="#92400e" fontWeight="600">Reimbursement Claim</text>

            {/* Center label */}
            <rect x="165" y="180" width="110" height="44" rx="8" fill="#f8fafc" stroke="#e2e8f0" />
            <text x="220" y="199" textAnchor="middle" fontSize="11" fill="#475569" fontWeight="700">DEMAND</text>
            <text x="220" y="213" textAnchor="middle" fontSize="11" fill="#475569" fontWeight="700">GUARANTEE</text>
          </svg>
        </div>

        {/* Types panel */}
        <div className="flex-1">
          <h4 className="font-bold text-gray-700 mb-3 text-center">Common Guarantee Types</h4>
          <div className="space-y-3">
            {guaranteeTypes.map((gt, i) => (
              <div key={i} className="flex items-start gap-3 bg-white rounded-xl p-3 border border-gray-200 shadow-sm">
                <div className="w-3 h-3 rounded-full mt-1 flex-shrink-0" style={{ background: gt.color }} />
                <div>
                  <div className="font-semibold text-gray-800 text-sm">{gt.name}</div>
                  <div className="text-gray-500 text-xs">Typical amount: <span className="font-medium text-gray-700">{gt.pct}</span></div>
                  <div className="text-gray-500 text-xs">{gt.use}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 bg-purple-50 border border-purple-200 rounded-xl p-3">
            <div className="font-bold text-purple-800 text-sm mb-1">Key URDG 758 Principle</div>
            <p className="text-purple-700 text-xs">&ldquo;Pay first, argue later&rdquo; — the guarantor pays on a compliant demand without investigating whether the underlying default occurred. The principal must then pursue the beneficiary in a separate legal action.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
