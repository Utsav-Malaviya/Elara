import { useEffect, useRef } from "react"

export function JewelryVideoBackground() {
  const fallbackRef = useRef(null)

  useEffect(() => {
    // Show fallback after a delay to ensure YouTube loads properly
    const timer = setTimeout(() => {
      const fallback = fallbackRef.current
      if (fallback) {
        fallback.style.display = 'none'
      }
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

    return (
    <div className="absolute inset-0 z-0">
      {/* YouTube Video Background */}
      <iframe
        src="https://www.youtube.com/embed/kYOP52BUZTI?autoplay=1&mute=1&loop=1&playlist=kYOP52BUZTI&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&enablejsapi=1&origin=http://localhost:3000"
        className="w-full h-full object-cover"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        style={{
          position: 'absolute',
          top: '0',
          left: '50%',
          width: '100vw',
          height: '100%',
          transform: 'translateX(-50%)',
          pointerEvents: 'none'
        }}
      />
      
      {/* Animated Background Fallback */}
      <div 
        ref={fallbackRef}
        className="absolute inset-0"
        style={{display: 'none'}}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 animate-gradient" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)] animate-pulse" />
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_30%,rgba(255,255,255,0.05)_50%,transparent_70%)] animate-shimmer" />
        
        {/* Jewelry Animation Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Floating Diamond */}
          <div className="absolute top-1/4 left-1/4 w-2 h-2 sm:w-3 sm:h-3 md:w-4 md:h-4 bg-white/20 rounded-full animate-float-slow" />
          <div className="absolute top-1/3 right-1/3 w-1.5 h-1.5 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 bg-white/15 rounded-full animate-float-medium" />
          <div className="absolute bottom-1/3 left-1/3 w-2.5 h-2.5 sm:w-4 sm:h-4 md:w-5 md:h-5 bg-white/25 rounded-full animate-float-fast" />
          <div className="absolute top-2/3 right-1/4 w-1 h-1 sm:w-1.5 sm:h-1.5 md:w-2 md:h-2 bg-white/10 rounded-full animate-float-slow" />
          
          {/* Sparkle Effects */}
          <div className="absolute top-1/2 left-1/2 w-0.5 h-0.5 sm:w-1 sm:h-1 bg-white/30 rounded-full animate-sparkle" />
          <div className="absolute top-1/3 left-2/3 w-0.5 h-0.5 sm:w-1 sm:h-1 bg-white/25 rounded-full animate-sparkle-delayed" />
          <div className="absolute bottom-1/3 right-1/2 w-0.5 h-0.5 sm:w-1 sm:h-1 bg-white/20 rounded-full animate-sparkle" />
        </div>
      </div>
      
      {/* Video Overlay */}
      <div className="absolute inset-0 bg-black/40" />
    </div>
  )
}
