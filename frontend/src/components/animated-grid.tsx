export function AnimatedGrid() {
    return (
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-black bg-opacity-90" />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(to right, #4f4f4f 1px, transparent 1px),
                               linear-gradient(to bottom, #4f4f4f 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
            mask: 'radial-gradient(circle, transparent, black)',
            animation: 'grid-animation 20s linear infinite',
          }}
        />
        <style jsx>{`
          @keyframes grid-animation {
            0% {
              transform: translateY(0);
            }
            100% {
              transform: translateY(50px);
            }
          }
        `}</style>
      </div>
    )
  }
  
  