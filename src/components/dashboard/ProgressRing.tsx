'use client'

interface ProgressRingProps {
  percent: number
  size?: number
  strokeWidth?: number
  label?: string
}

export default function ProgressRing({ percent, size = 80, strokeWidth = 7, label }: ProgressRingProps) {
  const clamped = Math.min(100, Math.max(0, percent))
  const r = (size - strokeWidth * 2) / 2
  const circumference = 2 * Math.PI * r
  const offset = circumference - (clamped / 100) * circumference

  const color = clamped >= 80 ? '#10b981' : clamped >= 50 ? '#3b82f6' : '#f59e0b'

  return (
    <div className="flex flex-col items-center">
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2} cy={size / 2} r={r}
          fill="none" stroke="#e5e7eb" strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2} cy={size / 2} r={r}
          fill="none" stroke={color} strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 0.6s ease' }}
        />
      </svg>
      <div className="relative" style={{ marginTop: -(size / 2 + 10) }}>
        <span className="text-sm font-bold text-gray-700">{clamped}%</span>
      </div>
      {label && <span className="text-xs text-gray-500 mt-1 text-center">{label}</span>}
    </div>
  )
}
