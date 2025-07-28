import { cn } from '@/lib/utils'
import { Loader2 } from 'lucide-react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
}

export function Button({ 
  className, 
  variant = 'primary', 
  size = 'md',
  loading = false,
  children,
  disabled,
  ...props 
}: ButtonProps) {
  const variants = {
    primary: 'bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 shadow-lg',
    secondary: 'bg-white text-purple-600 border-2 border-purple-600 hover:bg-purple-50',
    outline: 'border-2 border-gray-300 text-gray-700 hover:border-gray-400',
    ghost: 'bg-transparent hover:bg-gray-100 text-gray-700'
  }
  
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-6 py-2.5',
    lg: 'px-8 py-3.5 text-lg'
  }
  
  return (
    <button
      className={cn(
        'rounded-lg font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2',
        variants[variant],
        sizes[size],
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <Loader2 className="w-4 h-4 animate-spin" />}
      {children}
    </button>
  )
}
