'use client'

export default function SupplyChainFinanceFlow() {
  return (
    <div className="w-full bg-gray-50 rounded-2xl p-6 border border-gray-200 overflow-x-auto">
      <h3 className="text-center font-bold text-gray-800 text-lg mb-1">Supply Chain Finance — Payables Finance (Reverse Factoring)</h3>
      <p className="text-center text-sm text-gray-500 mb-6">Buyer-led early payment program — supplier receives cash early at buyer&apos;s credit rate</p>

      <svg viewBox="0 0 860 340" className="w-full max-w-4xl mx-auto" aria-label="Supply Chain Finance Flow">
        <defs>
          <marker id="scf-arrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="#64748b" />
          </marker>
          <marker id="scf-green" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="#10b981" />
          </marker>
          <marker id="scf-blue" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="#3b82f6" />
          </marker>
        </defs>

        {/* Timeline header */}
        <rect x="155" y="10" width="690" height="30" rx="6" fill="#f1f5f9" />
        {['Invoice Submission', 'Approval & Offer', 'Early Payment', 'Settlement'].map((phase, i) => (
          <text key={i} x={220 + i * 172} y="30" textAnchor="middle" fontSize="11" fill="#475569" fontWeight="600">{phase}</text>
        ))}

        {/* Phase dividers */}
        {[306, 478, 650].map((x, i) => (
          <line key={i} x1={x} y1="10" x2={x} y2="310" stroke="#e2e8f0" strokeWidth="1" strokeDasharray="4,3" />
        ))}

        {/* Row backgrounds */}
        <rect x="0" y="55" width="860" height="70" fill="#eff6ff" rx="0" />
        <rect x="0" y="135" width="860" height="70" fill="#f5f3ff" rx="0" />
        <rect x="0" y="215" width="860" height="70" fill="#ecfdf5" rx="0" />

        {/* Row labels */}
        {[
          { label: 'BUYER', color: '#1d4ed8', y: 90 },
          { label: 'SCF BANK', color: '#7c3aed', y: 170 },
          { label: 'SUPPLIER', color: '#065f46', y: 250 },
        ].map((r, i) => (
          <g key={i}>
            <rect x="0" y={r.y - 32} width="150" height="54" fill={['#3b82f6', '#8b5cf6', '#10b981'][i]} rx="0" />
            <text x="75" y={r.y - 10} textAnchor="middle" fill="white" fontSize="13" fontWeight="700">{r.label}</text>
            <text x="75" y={r.y + 8} textAnchor="middle" fill="white" fontSize="10" opacity="0.9">
              {['(Initiates program)', '(Finances invoices)', '(Accesses early pay)'][i]}
            </text>
          </g>
        ))}

        {/* Step 1: Supplier submits invoice */}
        <rect x="165" y="232" width="130" height="32" rx="6" fill="#d1fae5" stroke="#10b981" />
        <text x="230" y="251" textAnchor="middle" fontSize="10" fill="#065f46" fontWeight="600">① Submit Invoice</text>
        <text x="230" y="262" textAnchor="middle" fontSize="9" fill="#065f46">to SCF platform</text>

        {/* Supplier → Buyer */}
        <line x1="230" y1="232" x2="230" y2="125" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#scf-arrow)" strokeDasharray="5,3" />

        {/* Step 2: Buyer approves */}
        <rect x="165" y="72" width="130" height="32" rx="6" fill="#dbeafe" stroke="#3b82f6" />
        <text x="230" y="91" textAnchor="middle" fontSize="10" fill="#1e40af" fontWeight="600">② Approve Invoice</text>
        <text x="230" y="102" textAnchor="middle" fontSize="9" fill="#1e40af">on SCF platform</text>

        {/* Buyer → Bank (approval notification) */}
        <line x1="310" y1="88" x2="380" y2="152" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#scf-arrow)" strokeDasharray="5,3" />

        {/* Step 3: Bank sees approved invoice */}
        <rect x="330" y="152" width="140" height="32" rx="6" fill="#ede9fe" stroke="#8b5cf6" />
        <text x="400" y="171" textAnchor="middle" fontSize="10" fill="#5b21b6" fontWeight="600">③ Offer Early Payment</text>
        <text x="400" y="182" textAnchor="middle" fontSize="9" fill="#5b21b6">at buyer&apos;s credit rate</text>

        {/* Bank → Supplier (offer) */}
        <line x1="400" y1="184" x2="400" y2="230" stroke="#8b5cf6" strokeWidth="1.5" markerEnd="url(#scf-arrow)" />

        {/* Step 4: Supplier accepts */}
        <rect x="340" y="232" width="120" height="32" rx="6" fill="#d1fae5" stroke="#10b981" />
        <text x="400" y="251" textAnchor="middle" fontSize="10" fill="#065f46" fontWeight="600">④ Accept Offer</text>
        <text x="400" y="262" textAnchor="middle" fontSize="9" fill="#065f46">Receives early cash</text>

        {/* Step 5: Early payment from bank to supplier */}
        <line x1="490" y1="168" x2="490" y2="230" stroke="#10b981" strokeWidth="2.5" markerEnd="url(#scf-green)" />
        <rect x="495" y="192" width="130" height="28" rx="6" fill="white" stroke="#d1fae5" />
        <text x="560" y="210" textAnchor="middle" fontSize="11" fill="#065f46" fontWeight="700">⑤ Early Payment</text>
        <rect x="495" y="218" width="130" height="16" rx="3" fill="#f0fdf4" />
        <text x="560" y="230" textAnchor="middle" fontSize="10" fill="#065f46">Invoice − Discount Fee</text>

        {/* Discount rate annotation */}
        <rect x="500" y="248" width="160" height="26" rx="6" fill="#fef3c7" stroke="#fbbf24" />
        <text x="580" y="265" textAnchor="middle" fontSize="10" fill="#92400e" fontWeight="600">Rate ~ Buyer LIBOR+spread</text>

        {/* Step 6: Settlement — Buyer pays bank at maturity */}
        <rect x="650" y="72" width="130" height="32" rx="6" fill="#dbeafe" stroke="#3b82f6" />
        <text x="715" y="91" textAnchor="middle" fontSize="10" fill="#1e40af" fontWeight="600">⑥ Pay Bank</text>
        <text x="715" y="102" textAnchor="middle" fontSize="9" fill="#1e40af">on original due date</text>

        {/* Buyer → Bank (full payment) */}
        <line x1="715" y1="104" x2="715" y2="150" stroke="#3b82f6" strokeWidth="2.5" markerEnd="url(#scf-blue)" />
        <rect x="720" y="120" width="100" height="22" rx="4" fill="white" stroke="#bfdbfe" />
        <text x="770" y="135" textAnchor="middle" fontSize="10" fill="#1e40af" fontWeight="600">Full Invoice Value</text>

        <rect x="640" y="152" width="150" height="32" rx="6" fill="#ede9fe" stroke="#8b5cf6" />
        <text x="715" y="171" textAnchor="middle" fontSize="10" fill="#5b21b6" fontWeight="600">Bank receives full</text>
        <text x="715" y="182" textAnchor="middle" fontSize="9" fill="#5b21b6">payment at maturity</text>

        {/* Timeline x-axis */}
        <line x1="155" y1="300" x2="845" y2="300" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#scf-arrow)" />
        <text x="155" y="320" fontSize="11" fill="#64748b">Day 0</text>
        <text x="460" y="320" textAnchor="middle" fontSize="11" fill="#10b981" fontWeight="600">Supplier receives early cash</text>
        <text x="845" y="320" textAnchor="end" fontSize="11" fill="#3b82f6" fontWeight="600">Day 90 (maturity)</text>
      </svg>

      <div className="mt-6 grid grid-cols-3 gap-4">
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 text-center">
          <div className="font-bold text-blue-800 text-sm">For Buyer</div>
          <div className="text-blue-600 text-xs mt-1">Extended payment terms (90 days). Balance sheet neutral. Stronger supplier relationships.</div>
        </div>
        <div className="bg-purple-50 border border-purple-200 rounded-xl p-3 text-center">
          <div className="font-bold text-purple-800 text-sm">For Bank</div>
          <div className="text-purple-600 text-xs mt-1">Earns spread between buyer&apos;s credit rate and market rate. Low-risk (buyer-approved invoices).</div>
        </div>
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 text-center">
          <div className="font-bold text-emerald-800 text-sm">For Supplier</div>
          <div className="text-emerald-600 text-xs mt-1">Early cash at the buyer&apos;s lower credit rate — significantly cheaper than own borrowing cost.</div>
        </div>
      </div>
    </div>
  )
}
