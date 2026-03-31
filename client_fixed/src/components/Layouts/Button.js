import React from "react"

export function Button({ children, className = "", size = "md", variant = "default", onClick, ...props }) {
  const baseStyles = "inline-flex items-center justify-center rounded-xl font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--accent-purple)] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transform active:scale-95"

  const sizeStyles = {
    sm: "h-9 px-4 text-sm",
    md: "h-11 px-6",
    lg: "h-14 px-8 text-lg",
  }

  const variantStyles = {
    default: "bg-[var(--accent-purple)] text-white hover:shadow-lg hover:shadow-purple-500/30",
    outline: "border-2 border-[var(--card-border)] bg-transparent hover:bg-[var(--bg-secondary)] text-[var(--text-primary)]",
    ghost: "hover:bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]",
    destructive: "bg-red-500 text-white hover:bg-red-600 hover:shadow-lg hover:shadow-red-500/30",
  }

  const combinedClassName = `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`

  return (
    <button className={combinedClassName} onClick={onClick} {...props}>
      {children}
    </button>
  )
}

