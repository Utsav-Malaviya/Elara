import { useNavigate } from "react-router-dom"
import { useState, useEffect, useRef } from "react"
import { Button } from "./ui/button"
import image1 from "../assets/image1.png"
import image2 from "../assets/image2.png"

export function HeroSection() {
  const navigate = useNavigate()
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [currentX, setCurrentX] = useState(0)
  const sliderRef = useRef(null)

  const slides = [
    {
      image: image1
    },
    {
      image: image2
    }
  ]

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000) // Change slide every 5 seconds

    return () => clearInterval(interval)
  }, [slides.length])

  const goToSlide = (index) => {
    setCurrentSlide(index)
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  const handleMouseDown = (e) => {
    setIsDragging(true)
    setStartX(e.clientX)
    setCurrentX(e.clientX)
  }

  const handleMouseMove = (e) => {
    if (!isDragging) return
    setCurrentX(e.clientX)
  }

  const handleMouseUp = () => {
    if (!isDragging) return
    
    const diff = startX - currentX
    const threshold = 50 // minimum distance to trigger slide change
    
    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        // Swipe left - next slide
        nextSlide()
      } else {
        // Swipe right - previous slide
        prevSlide()
      }
    }
    
    setIsDragging(false)
  }

  const handleMouseLeave = () => {
    setIsDragging(false)
  }



  return (
    <section 
      className="relative w-full overflow-hidden" 
      style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
      ref={sliderRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}

    >
      {/* Slider Background */}
      <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px]">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={slide.image}
              alt={`Slide ${index + 1}`}
              className="w-full h-full object-cover select-none"
              draggable={false}
            />
          </div>
        ))}
      </div>


    </section>
  )
}
