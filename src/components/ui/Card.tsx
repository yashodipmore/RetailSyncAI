interface CardProps {
  children: React.ReactNode;
  variant?: 'default' | 'glass' | 'dark' | 'gradient';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  hover?: boolean;
  className?: string;
  onClick?: () => void;
}

export default function Card({
  children,
  variant = 'default',
  padding = 'md',
  hover = true,
  className = '',
  onClick,
}: CardProps) {
  const variants = {
    default: `
      bg-white border border-gray-100 shadow-lg
      ${hover ? 'hover:shadow-xl hover:-translate-y-1' : ''}
    `,
    glass: `
      bg-white/80 backdrop-blur-xl border border-white/30 shadow-lg
      ${hover ? 'hover:shadow-xl hover:bg-white/90' : ''}
    `,
    dark: `
      bg-gray-900 border border-gray-800 text-white
      ${hover ? 'hover:border-gray-700' : ''}
    `,
    gradient: `
      bg-gradient-to-br from-primary-500 to-accent-500 text-white shadow-lg
      ${hover ? 'hover:shadow-glow hover:-translate-y-1' : ''}
    `,
  };

  const paddings = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  return (
    <div
      onClick={onClick}
      className={`
        rounded-2xl transition-all duration-300
        ${variants[variant]}
        ${paddings[padding]}
        ${onClick ? 'cursor-pointer' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
}
