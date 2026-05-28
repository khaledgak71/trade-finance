import { cn } from '@/lib/utils/cn'

interface ProgressBarProps {
  value: number
  className?: string
  showLabel?: boolean
  color?: 'blue' | 'green' | 'amber'
}

export default function ProgressBar({ value, className, showLabel, color = 'blue' }: ProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, value))
  return (
    <div className={cn('w-full', className)}>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className={cn('h-2 rounded-full transition-all duration-500', {
            'bg-blue-500': color === 'blue',
            'bg-green-500': color === 'green',
            'bg-amber-500': color === 'amber',
          })}
          style={{ width: `${clamped}%` }}
        />
      </div>
      {showLabel && (
        <div className="mt-1 text-xs text-gray-500 text-right">{clamped}%</div>
      )}
    </div>
  )
}
