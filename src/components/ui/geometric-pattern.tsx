export function GeometricPattern({ className = '' }: { className?: string }) {
    return (
      <svg className={className} xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
        <defs>
          <pattern id="geometric" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
            <path d="M50 0 L100 25 L100 75 L50 100 L0 75 L0 25 Z" fill="none" stroke="currentColor" strokeWidth="1"/>
            <path d="M50 0 L100 25 L100 75 L50 100 L0 75 L0 25 Z" fill="none" stroke="currentColor" strokeWidth="1" transform="translate(50 50)"/>
            <circle cx="50" cy="50" r="5" fill="currentColor" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#geometric)" />
      </svg>
    )
  }
  
  