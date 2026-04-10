import { useEffect, useRef, useState } from "react"
import { Award, Trophy, Shield, Target, Zap, TrendingUp, Calendar, MapPin, Users, AlertCircle, ArrowRight, Sparkles, Clock, Briefcase, Building2, ChevronDown, MessageCircle, HelpCircle, Play, Pause, Volume2, VolumeX, Star, Quote, ArrowLeft, Search, Filter, IndianRupee, MousePointer, ChevronRight } from "lucide-react"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"

// ==================== GLOBAL STYLES ====================
const globalStyles = `
  html {
    scroll-behavior: smooth !important;
  }

  .horizontal-scroll {
    scroll-behavior: smooth;
    -webkit-overflow-scrolling: touch;
  }

  .horizontal-scroll::-webkit-scrollbar {
    height: 4px;
  }

  .horizontal-scroll::-webkit-scrollbar-track {
    background: rgba(30, 41, 59, 0.1);
    border-radius: 10px;
  }

  .horizontal-scroll::-webkit-scrollbar-thumb {
    background: linear-gradient(90deg, #2563EB, #F97316);
    border-radius: 10px;
  }

  .horizontal-scroll::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(90deg, #1D4ED8, #EA580C);
  }

  @keyframes fadeSlideUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes slideInFromLeft {
    from {
      opacity: 0;
      transform: translateX(-50px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes slideInFromRight {
    from {
      opacity: 0;
      transform: translateX(50px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes scrollBounce {
    0%, 100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(10px);
    }
  }

  @keyframes gradient-x {
    0%, 100% {
      background-position: 0% center;
    }
    50% {
      background-position: 100% center;
    }
  }

  @keyframes float {
    0%, 100% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-20px);
    }
  }

  .fade-slide-up {
    animation: fadeSlideUp 0.8s ease-out forwards;
  }

  .slide-in-left {
    animation: slideInFromLeft 0.6s ease-out;
  }

  .slide-in-right {
    animation: slideInFromRight 0.6s ease-out;
  }

  .scroll-bounce {
    animation: scrollBounce 1.5s ease-in-out infinite;
  }

  .gradient-x {
    animation: gradient-x 3s ease infinite;
    background-size: 200% center;
  }

  .float {
    animation: float 6s ease-in-out infinite;
  }
`

// ==================== ANIMATED COUNTER ====================
function AnimatedCounter({ value, suffix = "", duration = 2000 }) {
  const [count, setCount] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [isVisible])

  useEffect(() => {
    if (!isVisible) return

    let startTime
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      const easeOut = 1 - Math.pow(1 - progress, 4)
      setCount(Math.floor(easeOut * value))
      if (progress < 1) {
        requestAnimationFrame(step)
      }
    }
    requestAnimationFrame(step)
  }, [isVisible, value, duration])

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>
}

// ==================== TYPEWRITER TEXT ====================
function TypewriterText({ text, delay = 0, className = "" }) {
  const [displayText, setDisplayText] = useState("")
  const [showCursor, setShowCursor] = useState(true)

  useEffect(() => {
    const startTimeout = setTimeout(() => {
      let index = 0
      const interval = setInterval(() => {
        if (index <= text.length) {
          setDisplayText(text.slice(0, index))
          index++
        } else {
          clearInterval(interval)
          setTimeout(() => setShowCursor(false), 1000)
        }
      }, 50)
      return () => clearInterval(interval)
    }, delay)
    return () => clearTimeout(startTimeout)
  }, [text, delay])

  return (
    <span className={className}>
      {displayText}
      {showCursor && <span className="animate-pulse text-[#F97316]">|</span>}
    </span>
  )
}

// ==================== HERO SECTION ====================
const stats = [
  { icon: Users, value: 40000, suffix: "+", label: "Successful Placements", color: "from-[#F97316] to-[#FB923C]" },
  { icon: Building2, value: 400, suffix: "+", label: "Partner Employers", color: "from-[#2563EB] to-[#3B82F6]" },
  { icon: Award, value: 25, suffix: "+", label: "States Covered", color: "from-[#10B981] to-[#34D399]" },
]

function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [scrollY, setScrollY] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [isMuted, setIsMuted] = useState(true)
  const heroRef = useRef(null)
  const videoRef = useRef(null)

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect()
        setMousePosition({
          x: (e.clientX - rect.left) / rect.width,
          y: (e.clientY - rect.top) / rect.height,
        })
      }
    }

    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  return (
    <section ref={heroRef} className="relative min-h-screen overflow-hidden bg-[#0A0F1C]">
      {/* Video Background with Parallax */}
      <div 
        className="absolute inset-0 z-0"
        style={{ transform: `translateY(${scrollY * 0.4}px) scale(${1 + scrollY * 0.0005})` }}
      >
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-[120%] object-cover"
          poster="/images/home/hero-bg.jpg"
        >
          <source src="https://assets.mixkit.co/videos/preview/mixkit-industrial-factory-with-machines-working-4726-large.mp4" type="video/mp4" />
        </video>
        
        {/* Fallback Image */}
        <img
          src="/images/home/hero-bg.jpg"
          alt="TSPL Group Industrial Background"
          className="absolute inset-0 w-full h-full object-cover"
        />
        
        {/* Multi-layer gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0F1C] via-[#0A0F1C]/90 to-[#0A0F1C]/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F1C] via-transparent to-[#0A0F1C]/60" />
        <div className="absolute inset-0 bg-[#0A0F1C]/30" />
        
        {/* Animated color overlay */}
        <div 
          className="absolute inset-0 opacity-40 transition-all duration-700"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, rgba(37, 99, 235, 0.3) 0%, transparent 50%)`
          }}
        />
      </div>

      {/* Animated Grid Pattern - Parallax */}
      <div 
        className="absolute inset-0 z-[1] opacity-[0.08]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), 
                           linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '80px 80px',
          transform: `translate(${(mousePosition.x - 0.5) * 20}px, ${(mousePosition.y - 0.5) * 20}px)`
        }}
      />

      {/* Floating Orbs - Different parallax speeds */}
      <div 
        className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-[#2563EB]/20 blur-[120px] animate-pulse"
        style={{ 
          transform: `translate(${(mousePosition.x - 0.5) * 50}px, ${(mousePosition.y - 0.5) * 50 + scrollY * 0.2}px)`,
          transition: 'transform 0.3s ease-out'
        }}
      />
      <div 
        className="absolute top-1/2 right-1/3 w-[300px] h-[300px] rounded-full bg-cyan-500/10 blur-[80px] animate-pulse"
        style={{ 
          animationDelay: '4s',
          transform: `translate(${(mousePosition.x - 0.5) * 30}px, ${(mousePosition.y - 0.5) * 30 + scrollY * 0.1}px)`,
          transition: 'transform 0.3s ease-out'
        }}
      />

      {/* Floating particles - deterministic positions */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-[2]">
        {[
          { left: 5, top: 10, size: 3, delay: 0 },
          { left: 15, top: 25, size: 4, delay: 0.5 },
          { left: 25, top: 15, size: 2, delay: 1 },
          { left: 35, top: 45, size: 5, delay: 1.5 },
          { left: 45, top: 30, size: 3, delay: 2 },
          { left: 55, top: 60, size: 4, delay: 2.5 },
          { left: 65, top: 20, size: 2, delay: 3 },
          { left: 75, top: 50, size: 5, delay: 3.5 },
          { left: 85, top: 35, size: 3, delay: 4 },
          { left: 95, top: 70, size: 4, delay: 4.5 },
          { left: 10, top: 80, size: 2, delay: 0.3 },
          { left: 20, top: 55, size: 5, delay: 0.8 },
          { left: 30, top: 85, size: 3, delay: 1.3 },
          { left: 40, top: 65, size: 4, delay: 1.8 },
          { left: 50, top: 90, size: 2, delay: 2.3 },
          { left: 60, top: 40, size: 5, delay: 2.8 },
          { left: 70, top: 75, size: 3, delay: 3.3 },
          { left: 80, top: 5, size: 4, delay: 3.8 },
          { left: 90, top: 45, size: 2, delay: 4.3 },
          { left: 12, top: 95, size: 5, delay: 0.2 },
        ].map((particle, i) => (
          <div
            key={i}
            className="absolute rounded-full animate-float"
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              background: i % 3 === 0 ? '#F97316' : i % 3 === 1 ? '#3B82F6' : 'white',
              opacity: 0.4,
              animationDuration: `${5 + (i % 4)}s`,
              animationDelay: `${particle.delay}s`,
            }}
          />
        ))}
      </div>
      <div 
        className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-[#F97316]/15 blur-[100px] animate-pulse"
        style={{ 
          animationDelay: '2s',
          transform: `translate(${(mousePosition.x - 0.5) * -40}px, ${(mousePosition.y - 0.5) * -40 + scrollY * 0.15}px)`,
          transition: 'transform 0.3s ease-out'
        }}
      />

      {/* Video Controls */}
      <div className="absolute bottom-8 right-8 z-30 flex gap-3">
        <button
          onClick={togglePlay}
          className="p-3 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-white hover:bg-white/20 hover:scale-110 transition-all duration-300"
          aria-label={isPlaying ? "Pause video" : "Play video"}
        >
          {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
        </button>
        <button
          onClick={toggleMute}
          className="p-3 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-white hover:bg-white/20 hover:scale-110 transition-all duration-300"
          aria-label={isMuted ? "Unmute video" : "Mute video"}
        >
          {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
        </button>
      </div>

      {/* Main Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 pt-32 pb-20 lg:pt-40 lg:pb-32 lg:px-8">
        <div className="lg:max-w-3xl">
          {/* Announcement badge */}
          <div 
            className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 mb-8 group hover:bg-white/10 transition-all cursor-pointer opacity-0 animate-[fadeSlideUp_0.8s_ease_forwards]"
            style={{ animationDelay: '0.2s' }}
          >
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-gradient-to-r from-[#F97316] to-[#FB923C] animate-pulse">
              <Sparkles className="w-3.5 h-3.5 text-white" />
            </span>
            <span className="text-sm font-medium text-white/80">Government Authorized NAPS | NATS | MAPS Partner</span>
            <ArrowRight className="w-4 h-4 text-white/60 group-hover:translate-x-1 transition-transform" />
          </div>

          {/* Main heading with typewriter effect */}
          <h1 className="text-5xl sm:text-6xl lg:text-8xl font-bold tracking-tight text-white leading-[1.05] mb-8">
            <span 
              className="block opacity-0 animate-[fadeSlideUp_0.8s_ease_forwards]"
              style={{ animationDelay: '0.4s' }}
            >
              Building India&apos;s
            </span>
            <span 
              className="block relative opacity-0 animate-[fadeSlideUp_0.8s_ease_forwards]"
              style={{ animationDelay: '0.6s' }}
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F97316] via-[#FB923C] to-[#FBBF24] animate-gradient-x">
                <TypewriterText text="Future Workforce" delay={1200} />
              </span>
              <span className="absolute -bottom-2 left-0 h-1.5 bg-gradient-to-r from-[#F97316] to-[#FBBF24] rounded-full animate-[expandWidth_1s_ease_forwards_1.5s] w-0" />
            </span>
          </h1>

          {/* Subtitle */}
          <p 
            className="text-xl lg:text-2xl text-white/60 max-w-2xl leading-relaxed mb-10 opacity-0 animate-[fadeSlideUp_0.8s_ease_forwards]"
            style={{ animationDelay: '0.8s' }}
          >
            India&apos;s leading staffing partner connecting 
            <span className="text-white font-semibold"> 40,000+ skilled candidates </span> 
            with top employers through certified apprenticeship programs.
          </p>

          {/* Trust indicators row */}
          <div 
            className="flex flex-wrap items-center gap-6 mb-12 opacity-0 animate-[fadeSlideUp_0.8s_ease_forwards]"
            style={{ animationDelay: '1s' }}
          >
            <div className="flex items-center gap-3">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div 
                    key={i} 
                    className="w-10 h-10 rounded-full bg-gradient-to-br from-[#2563EB] to-[#1D4ED8] border-2 border-[#0A0F1C] flex items-center justify-center text-xs text-white font-bold shadow-lg hover:scale-110 hover:z-10 transition-transform cursor-pointer"
                    style={{ zIndex: 6 - i, animationDelay: `${1 + i * 0.1}s` }}
                  >
                    {String.fromCharCode(64 + i)}
                  </div>
                ))}
              </div>
              <div className="text-sm">
                <span className="text-white font-semibold">400+</span>
                <span className="text-white/50 ml-1">Companies Trust Us</span>
              </div>
            </div>
            <div className="h-8 w-px bg-white/10 hidden sm:block" />
            <div className="flex items-center gap-2">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((i) => (
                  <svg key={i} className="w-5 h-5 text-[#FBBF24] drop-shadow-lg animate-[starPop_0.3s_ease_forwards]" style={{ animationDelay: `${1.2 + i * 0.1}s`, opacity: 0 }} fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-white/50 text-sm">4.9/5 Rating</span>
            </div>
          </div>

          {/* CTAs */}
          <div 
            className="flex flex-wrap gap-4 mb-16 opacity-0 animate-[fadeSlideUp_0.8s_ease_forwards]"
            style={{ animationDelay: '1.2s' }}
          >
            <button className="relative bg-gradient-to-r from-[#F97316] to-[#FB923C] hover:from-[#EA580C] hover:to-[#F97316] text-white px-8 py-7 text-lg font-semibold rounded-2xl shadow-2xl shadow-[#F97316]/30 hover:shadow-[#F97316]/50 transition-all duration-500 hover:scale-105 group overflow-hidden">
              <span className="relative z-10 flex items-center">
                Find Your Dream Job
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform duration-300" />
              </span>
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
            </button>
            <button className="border-2 border-white/20 bg-white/5 backdrop-blur-sm text-white hover:bg-white hover:text-[#0A0F1C] px-8 py-7 text-lg font-semibold rounded-2xl transition-all duration-500 hover:scale-105 group flex items-center">
              <Building2 className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
              Hire Skilled Talent
            </button>
          </div>

          {/* Stats cards - Glassmorphism style */}
          <div 
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 opacity-0 animate-[fadeSlideUp_0.8s_ease_forwards]"
            style={{ animationDelay: '1.4s' }}
          >
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <div 
                  key={index} 
                  className="group relative p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-500 cursor-pointer overflow-hidden hover:-translate-y-2"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                  <div className={`absolute -top-10 -right-10 w-20 h-20 bg-gradient-to-br ${stat.color} rounded-full blur-2xl opacity-0 group-hover:opacity-50 transition-opacity duration-500`} />
                  
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} mb-4 shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  
                  <p className="text-4xl font-bold text-white mb-1">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  </p>
                  
                  <p className="text-white/50 text-sm group-hover:text-white/70 transition-colors">{stat.label}</p>

                  <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              )
            })}
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20">
        <span className="text-white/40 text-xs tracking-widest uppercase animate-pulse">Scroll to explore</span>
        <div className="w-6 h-10 rounded-full border-2 border-white/30 flex justify-center p-2">
          <div className="w-1.5 h-1.5 bg-white/60 rounded-full animate-[scrollBounce_1.5s_ease-in-out_infinite]" />
        </div>
      </div>

      {/* Bottom gradient for smooth transition */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-white to-transparent z-[5]" />

      <style jsx>{`
        @keyframes fadeSlideUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes expandWidth {
          from {
            width: 0;
          }
          to {
            width: 100%;
          }
        }

        @keyframes starPop {
          from {
            opacity: 0;
            transform: scale(0);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        @keyframes scrollBounce {
          0%, 100% {
            transform: translateY(0);
            opacity: 1;
          }
          50% {
            transform: translateY(12px);
            opacity: 0.3;
          }
        }
        
        @keyframes gradient-x {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 3s ease infinite;
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0);
          }
          25% {
            transform: translateY(-20px) translateX(10px);
          }
          50% {
            transform: translateY(-10px) translateX(-5px);
          }
          75% {
            transform: translateY(-25px) translateX(5px);
          }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </section>
  )
}

// ==================== JOBS SECTION ====================
const jobs = [
  {
    id: 1,
    title: "Production Operator",
    company: "Tata Motors",
    location: "Pune, Maharashtra",
    salary: "₹18,000 - ₹25,000/month",
    type: "Full-time",
    urgent: true,
    logo: "TM",
    color: "from-blue-600 to-blue-700",
  },
  {
    id: 2,
    title: "ITI Technician",
    company: "Maruti Suzuki",
    location: "Gurugram, Haryana",
    salary: "₹15,000 - ₹22,000/month",
    type: "Apprenticeship",
    urgent: false,
    logo: "MS",
    color: "from-red-500 to-red-600",
  },
  {
    id: 3,
    title: "Quality Inspector",
    company: "Bajaj Auto",
    location: "Aurangabad, Maharashtra",
    salary: "₹20,000 - ₹28,000/month",
    type: "Full-time",
    urgent: true,
    logo: "BA",
    color: "from-amber-500 to-amber-600",
  },
  {
    id: 4,
    title: "Electrical Trainee",
    company: "L&T Construction",
    location: "Chennai, Tamil Nadu",
    salary: "₹12,000 - ₹18,000/month",
    type: "Apprenticeship",
    urgent: false,
    logo: "LT",
    color: "from-sky-500 to-sky-600",
  },
  {
    id: 5,
    title: "CNC Operator",
    company: "Mahindra & Mahindra",
    location: "Nashik, Maharashtra",
    salary: "₹22,000 - ₹30,000/month",
    type: "Full-time",
    urgent: false,
    logo: "MM",
    color: "from-rose-500 to-rose-600",
  },
  {
    id: 6,
    title: "Assembly Line Worker",
    company: "Hero MotoCorp",
    location: "Haridwar, Uttarakhand",
    salary: "₹16,000 - ₹20,000/month",
    type: "Contract",
    urgent: true,
    logo: "HM",
    color: "from-emerald-500 to-emerald-600",
  },
]

const filters = ["All Jobs", "Apprenticeship", "Full-time", "Contract"]

function JobsSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [activeFilter, setActiveFilter] = useState(0)
  const [hoveredJob, setHoveredJob] = useState(null)
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} id="jobs" className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-[#F8FAFC] to-white" />

      {/* Animated background elements */}
      <div className="absolute top-20 right-0 w-[600px] h-[600px] rounded-full bg-[#2563EB]/5 blur-[100px]" />
      <div className="absolute bottom-20 left-0 w-[500px] h-[500px] rounded-full bg-[#F97316]/5 blur-[80px]" />
      <div className="absolute inset-0 dots-pattern opacity-30" />
      <div className="absolute top-40 right-40 w-64 h-64 rounded-full border-2 border-dashed border-[#2563EB]/10 animate-spin-slow" style={{ animationDuration: "30s" }} />
      <div className="absolute bottom-20 left-20 w-48 h-48 rounded-full border-2 border-dashed border-[#F97316]/10 animate-spin-slow" style={{ animationDuration: "25s", animationDirection: "reverse" }} />
      
      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section header */}
        <div className={`mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#F97316]/10 border border-[#F97316]/20 mb-6">
              <Sparkles className="w-4 h-4 text-[#F97316]" />
              <span className="text-sm font-semibold text-[#F97316]">Latest Openings</span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#0F172A] text-balance mb-6 font-[family-name:var(--font-sora)]">
              Find Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2563EB] to-[#F97316]">Perfect Role</span>
            </h2>
            <p className="text-xl text-[#64748B] max-w-2xl mx-auto">
              Explore thousands of opportunities across India&apos;s leading companies
            </p>
          </div>
        </div>

        {/* Search & Filters */}
        <div className={`flex flex-col lg:flex-row gap-4 mb-12 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="relative flex-1 group">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-[#94A3B8] group-focus-within:text-[#2563EB] transition-colors" />
            <input
              type="text"
              placeholder="Search jobs, companies, locations..."
              className="w-full pl-14 pr-6 py-5 rounded-2xl border-2 border-[#E2E8F0] bg-white focus:outline-none focus:ring-4 focus:ring-[#2563EB]/10 focus:border-[#2563EB] transition-all text-lg shadow-sm hover:shadow-md"
            />
          </div>
          <div className="flex gap-3 overflow-x-auto pb-2 lg:pb-0 scrollbar-thin">
            {filters.map((filter, index) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(index)}
                className={`relative px-6 py-4 rounded-xl text-sm font-semibold whitespace-nowrap transition-all duration-300 ${
                  activeFilter === index
                    ? "text-white shadow-lg"
                    : "bg-white border-2 border-[#E2E8F0] text-[#475569] hover:border-[#2563EB] hover:text-[#2563EB]"
                }`}
              >
                {activeFilter === index && (
                  <div className="absolute inset-0 bg-gradient-to-r from-[#2563EB] to-[#3B82F6] rounded-xl" />
                )}
                <span className="relative z-10">{filter}</span>
              </button>
            ))}
            <button className="px-5 py-4 rounded-xl bg-white border-2 border-[#E2E8F0] text-[#475569] hover:border-[#2563EB] hover:text-[#2563EB] transition-all flex items-center gap-2">
              <Filter className="w-5 h-5" />
              <span className="hidden sm:inline font-semibold">More Filters</span>
            </button>
          </div>
        </div>

        {/* Job Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job, index) => (
            <div
              key={job.id}
              className={`group relative bg-white rounded-2xl border-2 border-[#E2E8F0] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${300 + index * 100}ms` }}
              onMouseEnter={() => setHoveredJob(job.id)}
              onMouseLeave={() => setHoveredJob(null)}
            >
              <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${job.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
              <div className="absolute inset-0 bg-gradient-to-br from-[#2563EB]/[0.02] via-transparent to-[#F97316]/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className={`absolute -inset-px rounded-2xl bg-gradient-to-r ${job.color} opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500`} />

              <div className="relative p-6">
                {job.urgent && (
                  <div className="absolute top-4 right-4">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-[#FEF3C7] to-[#FDE68A] text-[#B45309] text-xs font-bold shadow-sm border border-[#F59E0B]/20">
                      <span className="w-2 h-2 rounded-full bg-[#F59E0B] animate-pulse" />
                      Urgent Hiring
                    </span>
                  </div>
                )}

                <div className="flex items-start gap-4 mb-6">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${job.color} flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                    <span className="text-white font-bold text-xl">{job.logo}</span>
                  </div>
                  <div className="pt-1 flex-1">
                    <h3 className="font-bold text-[#0F172A] text-lg group-hover:text-[#2563EB] transition-colors line-clamp-1">
                      {job.title}
                    </h3>
                    <p className="text-[#64748B] font-medium flex items-center gap-1">
                      <Building2 className="w-3.5 h-3.5" />
                      {job.company}
                    </p>
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-9 h-9 rounded-xl bg-[#F1F5F9] flex items-center justify-center group-hover:bg-[#2563EB]/10 transition-colors">
                      <MapPin className="w-4 h-4 text-[#2563EB]" />
                    </div>
                    <span className="text-[#475569]">{job.location}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-9 h-9 rounded-xl bg-[#F1F5F9] flex items-center justify-center group-hover:bg-[#10B981]/10 transition-colors">
                      <IndianRupee className="w-4 h-4 text-[#10B981]" />
                    </div>
                    <span className="text-[#0F172A] font-semibold">{job.salary}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-9 h-9 rounded-xl bg-[#F1F5F9] flex items-center justify-center group-hover:bg-[#F97316]/10 transition-colors">
                      <Briefcase className="w-4 h-4 text-[#F97316]" />
                    </div>
                    <span className="px-3 py-1 rounded-full bg-[#F1F5F9] text-[#475569] text-xs font-semibold">
                      {job.type}
                    </span>
                  </div>
                </div>

                <button className="w-full border-2 border-[#2563EB] text-[#2563EB] hover:bg-[#2563EB] hover:text-white rounded-xl py-5 font-semibold transition-all duration-300 overflow-hidden relative group/btn">
                  <span className="relative z-10 flex items-center justify-center">
                    Apply Now
                    <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                  </span>
                </button>
              </div>

              <div className="absolute inset-0 rounded-2xl ring-2 ring-[#2563EB]/0 group-hover:ring-[#2563EB]/30 transition-all duration-300 pointer-events-none" />
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className={`text-center mt-8 transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <button className="bg-gradient-to-r from-[#F97316] to-[#FB923C] hover:from-[#EA580C] hover:to-[#F97316] text-white px-10 py-7 text-lg font-semibold rounded-2xl shadow-xl shadow-[#F97316]/25 hover:shadow-2xl hover:shadow-[#F97316]/40 transition-all hover:scale-105 group flex items-center justify-center mx-auto">
            View All 500+ Jobs
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      <style jsx>{`
        .dots-pattern {
          background-image: radial-gradient(circle at 10px 10px, rgba(37, 99, 235, 0.08) 2px, transparent 0);
          background-size: 24px 24px;
        }

        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        .animate-spin-slow {
          animation: spin-slow linear infinite;
        }
      `}</style>
    </section>
  )
}

// ==================== FAQ SECTION ====================
const faqs = [
  {
    question: "What is NAPS (National Apprenticeship Promotion Scheme)?",
    answer: "NAPS is a government initiative that provides financial incentives to employers for hiring apprentices. Under NAPS, the government reimburses 25% of the stipend (up to ₹1,500/month) and covers the full cost of basic training. TSPL Group helps employers access these benefits while finding skilled candidates.",
    category: "Programs",
  },
  {
    question: "What is NATS (National Apprenticeship Training Scheme)?",
    answer: "NATS is designed for graduate and diploma holders to gain practical training in their field of study. Apprentices receive a stipend and hands-on industry experience while employers get access to trained talent. The program duration typically ranges from 1-3 years.",
    category: "Programs",
  },
  {
    question: "Who is eligible for apprenticeship programs?",
    answer: "Eligibility varies by program. Generally, candidates should be 14-21 years for trade apprentices (with relaxation for SC/ST/OBC). For NATS, you need a diploma or degree in engineering/technology. Our team helps assess your eligibility and match you with the right program.",
    category: "Eligibility",
  },
  {
    question: "How does TSPL Group help employers?",
    answer: "We provide end-to-end staffing solutions including candidate sourcing, screening, onboarding, compliance management, and documentation. We handle all government registrations, portal management, and ensure you maximize benefits from schemes like NAPS and NATS.",
    category: "Services",
  },
  {
    question: "What industries does TSPL Group serve?",
    answer: "We work across 50+ industry sectors including automotive, manufacturing, IT, retail, healthcare, hospitality, construction, and BFSI. Our extensive network covers 25+ states across India, ensuring we can support both regional and pan-India staffing needs.",
    category: "Industries",
  },
  {
    question: "Is there any fee for job seekers?",
    answer: "No, our placement services are completely free for job seekers. We help you find opportunities, prepare for interviews, and provide training support at no cost. Our revenue comes from employer partnerships, not from candidates.",
    category: "Cost",
  },
]

function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-white via-[#F8FAFC] to-white" />
      <div className="absolute top-20 right-0 w-[500px] h-[500px] rounded-full bg-[#F97316]/5 blur-[100px]" />
      <div className="absolute bottom-20 left-0 w-[400px] h-[400px] rounded-full bg-[#2563EB]/5 blur-[80px]" />
      <div className="absolute inset-0 wave-pattern opacity-30" />
      <div className="absolute top-40 right-20 w-48 h-48 rounded-full border-2 border-dashed border-[#2563EB]/10 animate-spin-slow" style={{ animationDuration: "35s" }} />
      <div className="absolute bottom-40 left-20 w-32 h-32 rounded-full border-2 border-dashed border-[#F97316]/10 animate-spin-slow" style={{ animationDuration: "25s", animationDirection: "reverse" }} />
      
      <div className="relative z-10 mx-auto max-w-4xl px-6 lg:px-8">
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#F97316]/10 border border-[#F97316]/20 mb-6">
            <HelpCircle className="w-4 h-4 text-[#F97316]" />
            <span className="text-sm font-semibold text-[#F97316]">FAQs</span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#0F172A] text-balance mb-6 font-[family-name:var(--font-sora)]">
            Frequently Asked <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2563EB] to-[#F97316]">Questions</span>
          </h2>
          <p className="text-xl text-[#64748B] max-w-2xl mx-auto">
            Everything you need to know about our services and programs
          </p>
        </div>

        <div className={`space-y-4 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`group rounded-2xl border-2 overflow-hidden transition-all duration-300 ${
                openIndex === index
                  ? "border-[#2563EB] bg-white shadow-xl shadow-[#2563EB]/10"
                  : "border-[#E2E8F0] bg-white hover:border-[#2563EB]/50 hover:shadow-lg"
              }`}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full p-6 flex items-start gap-4 text-left"
              >
                <div className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center font-bold transition-all duration-300 ${
                  openIndex === index
                    ? "bg-gradient-to-br from-[#2563EB] to-[#3B82F6] text-white shadow-lg shadow-[#2563EB]/25"
                    : "bg-[#F1F5F9] text-[#64748B] group-hover:bg-[#2563EB]/10 group-hover:text-[#2563EB]"
                }`}>
                  {index + 1}
                </div>

                <div className="flex-1 min-w-0">
                  <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold mb-2 transition-colors ${
                    openIndex === index
                      ? "bg-[#2563EB]/10 text-[#2563EB]"
                      : "bg-[#F1F5F9] text-[#64748B]"
                  }`}>
                    {faq.category}
                  </span>
                  <h3 className={`text-lg font-bold transition-colors ${
                    openIndex === index ? "text-[#2563EB]" : "text-[#0F172A] group-hover:text-[#2563EB]"
                  }`}>
                    {faq.question}
                  </h3>
                </div>

                <ChevronDown className={`flex-shrink-0 w-6 h-6 transition-all duration-300 ${
                  openIndex === index
                    ? "text-[#2563EB] rotate-180"
                    : "text-[#94A3B8] group-hover:text-[#2563EB]"
                }`} />
              </button>

              <div className={`overflow-hidden transition-all duration-500 ${
                openIndex === index ? "max-h-96" : "max-h-0"
              }`}>
                <div className="px-6 pb-6 pl-20">
                  <p className="text-[#64748B] leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className={`mt-16 p-8 rounded-3xl bg-gradient-to-br from-[#0F172A] to-[#1E293B] text-center relative overflow-hidden transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-[#2563EB]/20 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-[#F97316]/20 blur-3xl" />
          
          <div className="relative z-10">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-[#F97316] to-[#FB923C] mb-6 shadow-lg shadow-[#F97316]/30">
              <MessageCircle className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3 font-[family-name:var(--font-sora)]">
              Still have questions?
            </h3>
            <p className="text-white/60 mb-6 max-w-md mx-auto">
              Our team is here to help. Get in touch and we&apos;ll respond as soon as possible.
            </p>
            <button className="bg-white text-[#0F172A] hover:bg-white/90 px-8 py-6 text-lg font-semibold rounded-xl transition-all hover:scale-105 group inline-flex items-center justify-center mx-auto">
              Contact Our Team
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .wave-pattern {
          background-image: radial-gradient(circle at 12px 12px, rgba(37, 99, 235, 0.08) 2px, transparent 0);
          background-size: 28px 28px;
        }

        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .animate-spin-slow {
          animation: spin-slow linear infinite;
        }
      `}</style>
    </section>
  )
}

// ==================== ACHIEVEMENTS SECTION ====================
const achievements = [
  {
    icon: Award,
    title: "Government Authorized",
    description: "Registered Third Party Aggregator under NAPS & NATS",
    stat: "100%",
    statLabel: "Compliant",
    color: "from-[#2563EB] to-[#3B82F6]",
  },
  {
    icon: Trophy,
    title: "World Record Holder",
    description: "Recognized for largest apprenticeship program",
    stat: "#1",
    statLabel: "In India",
    color: "from-[#F97316] to-[#FB923C]",
  },
  {
    icon: Shield,
    title: "ISO Certified",
    description: "ISO 9001:2015 certified quality management",
    stat: "98%",
    statLabel: "Satisfaction",
    color: "from-[#10B981] to-[#34D399]",
  },
  {
    icon: Target,
    title: "Excellence Award",
    description: "Outstanding contribution to skill development",
    stat: "15+",
    statLabel: "Awards",
    color: "from-[#8B5CF6] to-[#A78BFA]",
  },
]

const trustPoints = [
  { icon: Zap, text: "Pan-India presence across 25+ states" },
  { icon: Shield, text: "Direct partnerships with government bodies" },
  { icon: TrendingUp, text: "Dedicated compliance & support teams" },
  { icon: Target, text: "Real-time tracking & reporting dashboards" },
]

function AchievementsSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const sectionRef = useRef(null)
  const [sectionTop, setSectionTop] = useState(0)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
      setSectionTop(sectionRef.current.offsetTop)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const parallaxOffset = Math.max(0, (scrollY - sectionTop + 500) * 0.3)

  return (
    <section ref={sectionRef} id="about" className="relative overflow-hidden">
      <div className="relative h-[70vh] min-h-[600px] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 scale-110"
          style={{ transform: `translateY(${parallaxOffset}px) scale(1.1)` }}
        >
          <img
            src="/images/home/team-collaboration.jpg"
            alt="TSPL Team Excellence"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="absolute inset-0 bg-gradient-to-b from-[#0F172A]/90 via-[#0F172A]/70 to-[#0F172A]" />
        <div
          className="absolute inset-0 bg-gradient-to-r from-[#2563EB]/40 via-transparent to-[#F97316]/30 animate-pulse"
          style={{ animationDuration: "4s" }}
        />

        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${3 + Math.random() * 4}px`,
                height: `${3 + Math.random() * 4}px`,
                background: i % 2 === 0 ? "#F97316" : "#3B82F6",
                opacity: 0.4,
                animationDuration: `${5 + Math.random() * 5}s`,
                animationDelay: `${Math.random() * 5}s`,
              }}
            />
          ))}
        </div>

        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent animate-slide-right" />
          <div className="absolute top-3/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent animate-slide-left" />
        </div>

        <div className={`relative z-10 text-center px-6 max-w-4xl transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-8 group hover:bg-white/20 transition-all cursor-pointer">
            <span className="w-2 h-2 rounded-full bg-[#22C55E] animate-pulse" />
            <span className="text-sm font-medium text-white/90">Trusted by 400+ Companies</span>
          </div>

          <h2 className="text-5xl sm:text-6xl lg:text-8xl font-bold text-white mb-8 leading-tight">
            <span className="block opacity-0 animate-[fadeSlideUp_0.8s_ease_forwards]" style={{ animationDelay: "0.2s" }}>
              Built on Trust,
            </span>
            <span className="block opacity-0 animate-[fadeSlideUp_0.8s_ease_forwards]" style={{ animationDelay: "0.4s" }}>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F97316] via-[#FB923C] to-[#FBBF24] animate-gradient-x">
                Proven by Results
              </span>
            </span>
          </h2>

          <p className="text-xl text-white/70 max-w-2xl mx-auto opacity-0 animate-[fadeSlideUp_0.8s_ease_forwards]" style={{ animationDelay: "0.6s" }}>
            From government recognition to world records, we deliver excellence at every step
          </p>
        </div>

        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-full max-w-5xl px-6 z-20">
          <div className={`grid grid-cols-2 lg:grid-cols-4 gap-4 transition-all duration-1000 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            {[
              { value: 40000, suffix: "+", label: "Placements", color: "from-blue-500 to-cyan-500" },
              { value: 10, suffix: "+", label: "Years Experience", color: "from-orange-500 to-amber-500" },
              { value: 25, suffix: "+", label: "States Covered", color: "from-green-500 to-emerald-500" },
              { value: 400, suffix: "+", label: "Partner Companies", color: "from-purple-500 to-pink-500" },
            ].map((stat, index) => (
              <div
                key={index}
                className="group relative p-6 rounded-2xl bg-white shadow-2xl text-center hover:-translate-y-3 hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] transition-all duration-500 overflow-hidden"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                <div className={`absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br ${stat.color} rounded-full opacity-10 group-hover:scale-150 transition-transform duration-500`} />

                <p className={`text-3xl lg:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${stat.color}`}>
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </p>
                <p className="text-sm text-[#64748B] mt-2 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute bottom-28 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10">
          <div className="w-6 h-10 rounded-full border-2 border-white/30 flex justify-center p-2">
            <div className="w-1.5 h-1.5 bg-white/60 rounded-full animate-[scrollBounce_1.5s_ease-in-out_infinite]" />
          </div>
        </div>
      </div>

      <div className="relative bg-white pt-40 pb-32">
        <div
          className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-[#2563EB]/5 blur-[120px]"
          style={{ transform: `translateY(${(scrollY - sectionTop) * 0.1}px)` }}
        />
        <div
          className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-[#F97316]/5 blur-[100px]"
          style={{ transform: `translateY(${-(scrollY - sectionTop) * 0.08}px)` }}
        />

        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: "radial-gradient(circle at 1px 1px, #2563EB 1px, transparent 0)",
            backgroundSize: "50px 50px",
          }}
        />

        <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
          <div className={`text-center mb-20 transition-all duration-1000 delay-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            <h3 className="text-3xl lg:text-5xl font-bold text-[#0F172A]">
              Why{" "}
              <span className="relative inline-block">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2563EB] to-[#F97316]">400+</span>
                <svg className="absolute -bottom-1 left-0 w-full" height="6" viewBox="0 0 100 6" fill="none">
                  <path d="M0 3C25 0 75 6 100 3" stroke="url(#grad)" strokeWidth="2" strokeLinecap="round" />
                  <defs>
                    <linearGradient id="grad" x1="0" y1="0" x2="100" y2="0">
                      <stop stopColor="#2563EB" />
                      <stop offset="1" stopColor="#F97316" />
                    </linearGradient>
                  </defs>
                </svg>
              </span>
              {" "}Employers Choose TSPL
            </h3>
          </div>

          <div className={`grid md:grid-cols-2 gap-4 mb-20 transition-all duration-1000 delay-600 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            {trustPoints.map((point, index) => {
              const Icon = point.icon
              return (
                <div
                  key={index}
                  className="group flex items-center gap-4 p-6 rounded-2xl bg-[#F8FAFC] border-2 border-[#E2E8F0] hover:border-[#2563EB]/50 hover:bg-white hover:shadow-xl transition-all duration-500 cursor-pointer opacity-0 animate-[fadeSlideUp_0.6s_ease_forwards]"
                  style={{ animationDelay: `${800 + index * 150}ms` }}
                >
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#2563EB] to-[#3B82F6] flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg shadow-[#2563EB]/25">
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <span className="text-[#1E293B] font-semibold text-lg group-hover:text-[#2563EB] group-hover:translate-x-1 transition-all duration-300">{point.text}</span>
                </div>
              )
            })}
          </div>

          <div className={`transition-all duration-1000 delay-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            <h3 className="text-2xl font-bold text-[#0F172A] text-center mb-12">Our Recognition & Awards</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {achievements.map((achievement, index) => {
                const Icon = achievement.icon
                return (
                  <div
                    key={index}
                    className="group relative bg-white rounded-2xl overflow-hidden border-2 border-[#E2E8F0] hover:border-transparent shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 opacity-0 animate-[fadeSlideUp_0.6s_ease_forwards]"
                    style={{ animationDelay: `${1200 + index * 150}ms` }}
                  >
                    <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${achievement.color}`}>
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                    </div>

                    <div className={`absolute inset-0 bg-gradient-to-br ${achievement.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />

                    <div className="relative p-6">
                      <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${achievement.color} flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                        <Icon className="w-8 h-8 text-white" />
                      </div>

                      <div className="mb-4">
                        <p className={`text-4xl font-bold bg-gradient-to-r ${achievement.color} bg-clip-text text-transparent`}>
                          {achievement.stat}
                        </p>
                        <p className="text-xs text-[#64748B] font-medium">{achievement.statLabel}</p>
                      </div>

                      <h4 className="text-lg font-bold text-[#0F172A] mb-2 group-hover:text-[#2563EB] transition-colors">
                        {achievement.title}
                      </h4>
                      <p className="text-sm text-[#64748B] leading-relaxed">{achievement.description}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeSlideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes scrollBounce {
          0%, 100% {
            transform: translateY(0);
            opacity: 1;
          }
          50% {
            transform: translateY(12px);
            opacity: 0.3;
          }
        }

        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 3s ease infinite;
        }

        @keyframes slide-right {
          from { transform: translateX(-100%); }
          to { transform: translateX(100%); }
        }

        @keyframes slide-left {
          from { transform: translateX(100%); }
          to { transform: translateX(-100%); }
        }

        .animate-slide-right {
          animation: slide-right 8s linear infinite;
        }

        .animate-slide-left {
          animation: slide-left 8s linear infinite;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </section>
  )
}

// ==================== AUDIENCE SPLIT (JOB SEEKERS VS EMPLOYERS) ====================
const jobSeekerFeatures = [
  { icon: Sparkles, text: "Free job support & placement assistance" },
  { icon: Shield, text: "Government-recognized training programs" },
  { icon: TrendingUp, text: "Skill development with certification" },
  { icon: Zap, text: "Direct employer connections" },
]

const employerFeatures = [
  { icon: Users, text: "Access to pre-screened talent pool" },
  { icon: Shield, text: "Full compliance & documentation" },
  { icon: TrendingUp, text: "NAPS/NATS stipend benefits" },
  { icon: Zap, text: "Flexible staffing solutions" },
]

function AudienceSplit() {
  const [isVisible, setIsVisible] = useState(false)
  const [hoveredCard, setHoveredCard] = useState(null)
  const [scrollY, setScrollY] = useState(0)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    const handleMouseMove = (e) => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect()
        setMousePos({
          x: (e.clientX - rect.left) / rect.width - 0.5,
          y: (e.clientY - rect.top) / rect.height - 0.5,
        })
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    window.addEventListener("mousemove", handleMouseMove)
    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  return (
    <section ref={sectionRef} id="services" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-white via-[#F8FAFC] to-white" />
      <div
        className="absolute top-0 right-0 w-[800px] h-[800px] rounded-full bg-gradient-to-bl from-[#2563EB]/10 to-transparent blur-3xl transition-transform duration-300"
        style={{ transform: `translate(${mousePos.x * 50}px, ${mousePos.y * 50 + scrollY * 0.1}px)` }}
      />
      <div
        className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-[#F97316]/10 to-transparent blur-3xl transition-transform duration-300"
        style={{ transform: `translate(${-mousePos.x * 40}px, ${-mousePos.y * 40 - scrollY * 0.08}px)` }}
      />

      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: "linear-gradient(#2563EB 1px, transparent 1px), linear-gradient(90deg, #2563EB 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          transform: `translateY(${scrollY * 0.05}px)`,
        }}
      />

      <div
        className="absolute top-20 left-20 w-20 h-20 rounded-full border-2 border-[#2563EB]/20"
        style={{
          transform: `translate(${mousePos.x * 30}px, ${mousePos.y * 30}px) rotate(${scrollY * 0.1}deg)`,
          transition: "transform 0.3s ease-out",
        }}
      />
      <div
        className="absolute bottom-40 right-20 w-32 h-32 rounded-full border-2 border-[#F97316]/20"
        style={{
          transform: `translate(${-mousePos.x * 25}px, ${-mousePos.y * 25}px) rotate(${-scrollY * 0.08}deg)`,
          transition: "transform 0.3s ease-out",
        }}
      />
      <div
        className="absolute top-1/3 right-1/4 w-16 h-16 border border-[#2563EB]/10 rounded-lg"
        style={{
          transform: `rotate(${45 + scrollY * 0.05}deg) translate(${mousePos.x * 20}px, ${mousePos.y * 20}px)`,
          transition: "transform 0.3s ease-out",
        }}
      />

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full animate-float"
            style={{
              left: `${10 + i * 6}%`,
              top: `${10 + i * 5}%`,
              width: `${4 + (i % 3) * 2}px`,
              height: `${4 + (i % 3) * 2}px`,
              background: i % 2 === 0 ? "#2563EB" : "#F97316",
              opacity: 0.2,
              animationDuration: `${4 + i * 0.5}s`,
              animationDelay: `${i * 0.3}s`,
            }}
          />
        ))}
      </div>
      
      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        <div className={`text-center mb-20 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-[#2563EB]/10 to-[#F97316]/10 border border-[#2563EB]/20 mb-6 group hover:scale-105 transition-transform cursor-pointer">
            <MousePointer className="w-4 h-4 text-[#2563EB] group-hover:rotate-12 transition-transform" />
            <span className="text-sm font-semibold bg-gradient-to-r from-[#2563EB] to-[#F97316] bg-clip-text text-transparent">Explore Our Services</span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-[#0F172A] text-balance mb-6 leading-tight">
            Solutions for{" "}
            <span className="relative inline-block">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2563EB] via-[#F97316] to-[#2563EB] animate-gradient-x">Everyone</span>
              <svg className="absolute -bottom-2 left-0 w-full" height="8" viewBox="0 0 200 8" fill="none">
                <path d="M0 4C50 0 150 8 200 4" stroke="url(#underline-gradient)" strokeWidth="3" strokeLinecap="round" className="animate-draw-line" />
                <defs>
                  <linearGradient id="underline-gradient" x1="0" y1="0" x2="200" y2="0">
                    <stop stopColor="#2563EB" />
                    <stop offset="1" stopColor="#F97316" />
                  </linearGradient>
                </defs>
              </svg>
            </span>
          </h2>
          <p className="text-xl text-[#64748B] max-w-2xl mx-auto">
            Whether you&apos;re seeking your next career opportunity or looking for exceptional talent, we&apos;ve got you covered.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          <div 
            className={`group relative transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"}`}
            style={{
              transitionDelay: "200ms",
              transform: isVisible ? `perspective(1000px) rotateY(${hoveredCard === "employer" ? 5 : 0}deg)` : undefined,
            }}
            onMouseEnter={() => setHoveredCard("jobseeker")}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div className="relative rounded-[2rem] overflow-hidden bg-white border-2 border-[#E2E8F0] shadow-xl hover:shadow-[0_25px_60px_-15px_rgba(249,115,22,0.3)] hover:border-[#F97316]/50 transition-all duration-500 hover:-translate-y-3">
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#F97316] via-[#FB923C] to-[#FBBF24] overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              </div>
              
              <div className="relative h-72 overflow-hidden">
                <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-110">
                  <img
                    src="/images/home/job-seeker.jpg"
                    alt="Young professional ready for career growth"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-white via-white/50 to-transparent" />
                
                <div className="absolute top-6 left-6 flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#F97316] to-[#FB923C] text-white shadow-lg shadow-[#F97316]/30 group-hover:scale-110 transition-transform duration-300">
                  <Users className="w-4 h-4" />
                  <span className="text-sm font-semibold">For Job Seekers</span>
                </div>

                <div className={`absolute bottom-6 right-6 p-4 rounded-2xl bg-white/95 backdrop-blur-sm border border-white/50 shadow-xl transition-all duration-500 ${hoveredCard === "jobseeker" ? "scale-110 rotate-3" : ""}`}>
                  <p className="text-3xl font-bold text-[#F97316]">40K+</p>
                  <p className="text-xs text-[#64748B]">Placed Successfully</p>
                </div>
              </div>

              <div className="p-8 lg:p-10">
                <h3 className="text-3xl font-bold text-[#0F172A] mb-4 group-hover:text-[#F97316] transition-colors duration-300">Launch Your Career</h3>
                <p className="text-[#64748B] mb-8 text-lg">
                  Get access to thousands of job opportunities with top companies. Our training programs and placement support help you build a successful career.
                </p>

                <ul className="space-y-4 mb-10">
                  {jobSeekerFeatures.map((feature, index) => {
                    const Icon = feature.icon
                    return (
                      <li
                        key={index}
                        className={`flex items-center gap-4 group/item cursor-pointer transition-all duration-500 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}`}
                        style={{ transitionDelay: `${400 + index * 100}ms` }}
                      >
                        <div className="w-10 h-10 rounded-xl bg-[#F97316]/10 flex items-center justify-center group-hover/item:bg-[#F97316] group-hover/item:scale-110 group-hover/item:rotate-6 transition-all duration-300">
                          <Icon className="w-5 h-5 text-[#F97316] group-hover/item:text-white transition-colors" />
                        </div>
                        <span className="text-[#475569] font-medium group-hover/item:text-[#F97316] group-hover/item:translate-x-1 transition-all">{feature.text}</span>
                      </li>
                    )
                  })}
                </ul>

                <button className="w-full bg-gradient-to-r from-[#F97316] to-[#FB923C] hover:from-[#EA580C] hover:to-[#F97316] text-white rounded-xl py-7 text-lg font-semibold shadow-lg shadow-[#F97316]/30 hover:shadow-xl hover:shadow-[#F97316]/40 transition-all group/btn overflow-hidden relative">
                  <span className="relative z-10 flex items-center justify-center">
                    Apply Now
                    <ArrowRight className="w-5 h-5 ml-2 group-hover/btn:translate-x-2 transition-transform" />
                  </span>
                  <div className="absolute inset-0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                </button>
              </div>
            </div>
          </div>

          <div 
            className={`group relative transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"}`}
            style={{
              transitionDelay: "400ms",
              transform: isVisible ? `perspective(1000px) rotateY(${hoveredCard === "jobseeker" ? -5 : 0}deg)` : undefined,
            }}
            onMouseEnter={() => setHoveredCard("employer")}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div className="relative rounded-[2rem] overflow-hidden bg-white border-2 border-[#E2E8F0] shadow-xl hover:shadow-[0_25px_60px_-15px_rgba(37,99,235,0.3)] hover:border-[#2563EB]/50 transition-all duration-500 hover:-translate-y-3">
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#2563EB] via-[#3B82F6] to-[#60A5FA] overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              </div>
              
              <div className="relative h-72 overflow-hidden">
                <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-110">
                  <img
                    src="/images/home/employer.jpg"
                    alt="Business executives shaking hands"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-white via-white/50 to-transparent" />
                
                <div className="absolute top-6 left-6 flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#2563EB] to-[#3B82F6] text-white shadow-lg shadow-[#2563EB]/30 group-hover:scale-110 transition-transform duration-300">
                  <Briefcase className="w-4 h-4" />
                  <span className="text-sm font-semibold">For Employers</span>
                </div>

                <div className={`absolute bottom-6 right-6 p-4 rounded-2xl bg-white/95 backdrop-blur-sm border border-white/50 shadow-xl transition-all duration-500 ${hoveredCard === "employer" ? "scale-110 -rotate-3" : ""}`}>
                  <p className="text-3xl font-bold text-[#2563EB]">400+</p>
                  <p className="text-xs text-[#64748B]">Partner Companies</p>
                </div>
              </div>

              <div className="p-8 lg:p-10">
                <h3 className="text-3xl font-bold text-[#0F172A] mb-4 group-hover:text-[#2563EB] transition-colors duration-300">Build Your Team</h3>
                <p className="text-[#64748B] mb-8 text-lg">
                  Access a vast pool of skilled, pre-screened candidates. Leverage government schemes to reduce costs while building a talented workforce.
                </p>

                <ul className="space-y-4 mb-10">
                  {employerFeatures.map((feature, index) => {
                    const Icon = feature.icon
                    return (
                      <li
                        key={index}
                        className={`flex items-center gap-4 group/item cursor-pointer transition-all duration-500 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}
                        style={{ transitionDelay: `${600 + index * 100}ms` }}
                      >
                        <div className="w-10 h-10 rounded-xl bg-[#2563EB]/10 flex items-center justify-center group-hover/item:bg-[#2563EB] group-hover/item:scale-110 group-hover/item:-rotate-6 transition-all duration-300">
                          <Icon className="w-5 h-5 text-[#2563EB] group-hover/item:text-white transition-colors" />
                        </div>
                        <span className="text-[#475569] font-medium group-hover/item:text-[#2563EB] group-hover/item:translate-x-1 transition-all">{feature.text}</span>
                      </li>
                    )
                  })}
                </ul>

                <button className="w-full bg-gradient-to-r from-[#2563EB] to-[#3B82F6] hover:from-[#1D4ED8] hover:to-[#2563EB] text-white rounded-xl py-7 text-lg font-semibold shadow-lg shadow-[#2563EB]/30 hover:shadow-xl hover:shadow-[#2563EB]/40 transition-all group/btn overflow-hidden relative">
                  <span className="relative z-10 flex items-center justify-center">
                    Hire Now
                    <ArrowRight className="w-5 h-5 ml-2 group-hover/btn:translate-x-2 transition-transform" />
                  </span>
                  <div className="absolute inset-0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 3s ease infinite;
        }

        @keyframes draw-line {
          from { stroke-dashoffset: 300; }
          to { stroke-dashoffset: 0; }
        }

        .animate-draw-line {
          stroke-dasharray: 300;
          animation: draw-line 1.5s ease forwards;
          animation-delay: 0.5s;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </section>
  )
}

// ==================== CALENDAR/EVENTS SECTION ====================
const upcomingEvents = [
  {
    id: 1,
    title: "National Job Fair 2026",
    date: "April 15, 2026",
    time: "10:00 AM - 6:00 PM",
    location: "Delhi Convention Center",
    attendees: "500+",
    type: "Job Fair",
    isUrgent: true,
    description: "India's largest job fair featuring 100+ top companies",
    image: "/images/home/team-collaboration.jpg",
  },
  {
    id: 2,
    title: "Regional Hiring Drive - Mumbai",
    date: "April 22, 2026",
    time: "9:00 AM - 5:00 PM",
    location: "Mumbai, Maharashtra",
    attendees: "300+",
    type: "Hiring Drive",
    isUrgent: false,
    description: "Exclusive hiring event for manufacturing sector",
    image: "/images/home/factory-floor.jpg",
  },
  {
    id: 3,
    title: "Apprenticeship Summit",
    date: "May 5, 2026",
    time: "11:00 AM - 7:00 PM",
    location: "Bangalore Tech Park",
    attendees: "400+",
    type: "Summit",
    isUrgent: false,
    description: "Annual celebration of apprenticeship excellence",
    image: "/images/home/hero-workers.jpg",
  },
]

function CalendarSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [activeEvent, setActiveEvent] = useState(0)
  const sectionRef = useRef(null)

  const today = new Date()
  const todayStr = today.toLocaleDateString("en-US", { 
    weekday: "long",
    month: "long", 
    day: "numeric", 
    year: "numeric" 
  })

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A]" />

      <div className="absolute top-0 right-0 w-[700px] h-[700px] rounded-full bg-[#2563EB]/20 blur-[150px] animate-orb-float" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-[#F97316]/15 blur-[120px] animate-orb-float" style={{ animationDelay: "10s" }} />

      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 mb-6">
            <Calendar className="w-4 h-4 text-[#F97316]" />
            <span className="text-sm font-medium text-white/80">{todayStr}</span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
            Upcoming <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F97316] to-[#FBBF24]">Events</span>
          </h2>
          <p className="text-xl text-white/60 max-w-2xl mx-auto">
            Don&apos;t miss exclusive hiring events and career opportunities across India
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className={`relative rounded-3xl overflow-hidden transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="absolute inset-0">
              <img
                src={upcomingEvents[activeEvent].image}
                alt={upcomingEvents[activeEvent].title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-[#0F172A]/70 to-transparent" />
            </div>
            
            <div className="relative p-8 lg:p-10 h-full flex flex-col justify-end min-h-[500px]">
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm text-white text-sm font-semibold border border-white/10">
                  {upcomingEvents[activeEvent].type}
                </span>
                {upcomingEvents[activeEvent].isUrgent && (
                  <span className="px-4 py-1.5 rounded-full bg-[#EF4444]/20 text-[#FCA5A5] text-sm font-semibold flex items-center gap-1.5 border border-[#EF4444]/30">
                    <AlertCircle className="w-3.5 h-3.5" />
                    Register Soon
                  </span>
                )}
              </div>

              <h3 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                {upcomingEvents[activeEvent].title}
              </h3>

              <p className="text-white/70 text-lg mb-6 max-w-md">
                {upcomingEvents[activeEvent].description}
              </p>

              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="flex items-center gap-3 text-white/80">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-[#F97316]" />
                  </div>
                  <div>
                    <p className="text-xs text-white/50">Date</p>
                    <p className="font-semibold">{upcomingEvents[activeEvent].date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-white/80">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                    <Clock className="w-5 h-5 text-[#2563EB]" />
                  </div>
                  <div>
                    <p className="text-xs text-white/50">Time</p>
                    <p className="font-semibold">{upcomingEvents[activeEvent].time}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-white/80">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-[#10B981]" />
                  </div>
                  <div>
                    <p className="text-xs text-white/50">Location</p>
                    <p className="font-semibold">{upcomingEvents[activeEvent].location}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-white/80">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                    <Users className="w-5 h-5 text-[#FBBF24]" />
                  </div>
                  <div>
                    <p className="text-xs text-white/50">Expected</p>
                    <p className="font-semibold">{upcomingEvents[activeEvent].attendees} Attendees</p>
                  </div>
                </div>
              </div>

              <button className="w-full sm:w-auto bg-gradient-to-r from-[#F97316] to-[#FB923C] hover:from-[#EA580C] hover:to-[#F97316] text-white px-8 py-6 text-lg font-semibold rounded-xl shadow-lg shadow-[#F97316]/30 transition-all group">
                Register Now
                <ArrowRight className="w-5 h-5 ml-2 inline-block group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          <div className={`space-y-4 transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {upcomingEvents.map((event, index) => (
              <button
                key={event.id}
                onClick={() => setActiveEvent(index)}
                className={`w-full p-6 rounded-2xl text-left transition-all duration-300 group ${
                  activeEvent === index
                    ? 'bg-white/10 border-2 border-[#F97316]/50'
                    : 'bg-white/5 border-2 border-white/10 hover:bg-white/10 hover:border-white/20'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className="relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover"
                    />
                    {activeEvent === index && (
                      <div className="absolute inset-0 bg-[#F97316]/30" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                        activeEvent === index
                          ? 'bg-[#F97316]/20 text-[#F97316]'
                          : 'bg-white/10 text-white/70'
                      }`}>
                        {event.type}
                      </span>
                      {event.isUrgent && (
                        <span className="flex items-center gap-1 text-[#FCA5A5] text-xs">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#EF4444] animate-pulse" />
                          Urgent
                        </span>
                      )}
                    </div>
                    <h4 className={`font-bold truncate transition-colors ${
                      activeEvent === index ? 'text-white' : 'text-white/80 group-hover:text-white'
                    }`}>
                      {event.title}
                    </h4>
                    <div className="flex items-center gap-4 mt-2 text-sm text-white/50">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {event.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5" />
                        {event.location.split(',')[0]}
                      </span>
                    </div>
                  </div>

                  <ArrowRight className={`w-5 h-5 flex-shrink-0 transition-all ${
                    activeEvent === index 
                      ? 'text-[#F97316] translate-x-0' 
                      : 'text-white/30 -translate-x-2 group-hover:translate-x-0 group-hover:text-white/60'
                  }`} />
                </div>
              </button>
            ))}

            <button className="w-full mt-4 border-2 border-white/20 bg-white/5 text-white hover:bg-white hover:text-[#0F172A] rounded-xl py-6 font-semibold transition-all">
              View All Events
              <ArrowRight className="w-5 h-5 ml-2 inline-block" />
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes orb-float {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(-18px) translateX(10px); }
        }

        .animate-orb-float {
          animation: orb-float 12s ease-in-out infinite;
        }
      `}</style>
    </section>
  )
}

// ==================== CLIENTS SECTION ====================
const clients = [
  { name: "Tata Motors", logo: "TM" },
  { name: "Maruti Suzuki", logo: "MS" },
  { name: "Mahindra", logo: "M" },
  { name: "Bajaj Auto", logo: "BA" },
  { name: "Hero MotoCorp", logo: "HM" },
  { name: "L&T", logo: "LT" },
  { name: "Godrej", logo: "G" },
  { name: "Asian Paints", logo: "AP" },
  { name: "Reliance", logo: "R" },
  { name: "Infosys", logo: "I" },
  { name: "Wipro", logo: "W" },
  { name: "Tech Mahindra", logo: "TM" },
  { name: "Samsung", logo: "S" },
  { name: "LG Electronics", logo: "LG" },
  { name: "Voltas", logo: "V" },
  { name: "Havells", logo: "H" },
]

function ClientsSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <section ref={sectionRef} className="relative py-24 overflow-hidden bg-white">
      <div
        className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full bg-blue-500/5 blur-[150px]"
        style={{ transform: `translateY(${scrollY * 0.1}px)` }}
      />
      <div
        className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full bg-orange-500/5 blur-[120px]"
        style={{ transform: `translateY(${-scrollY * 0.08}px)` }}
      />

      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, #2563EB 1px, transparent 0)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="h-px w-16 bg-gradient-to-r from-transparent via-[#2563EB] to-[#2563EB]" />
            <span className="text-sm font-bold text-[#2563EB] tracking-[0.2em] uppercase">Trusted By The Best</span>
            <div className="h-px w-16 bg-gradient-to-l from-transparent via-[#2563EB] to-[#2563EB]" />
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-[#0F172A] leading-tight">
            Powering <span className="relative">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2563EB] via-[#F97316] to-[#2563EB] animate-gradient-x">
                <AnimatedCounter value={400} suffix="+" />
              </span>
              <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-[#2563EB] to-[#F97316] rounded-full" />
            </span> Companies
          </h2>
          <p className="mt-6 text-xl text-[#64748B] max-w-2xl mx-auto">
            From automotive giants to tech leaders, India&apos;s most prestigious organizations trust TSPL Group
          </p>
        </div>

        <div className="relative mb-6 perspective-1000">
          <div className="absolute left-0 top-0 bottom-0 w-40 bg-gradient-to-r from-white via-white/80 to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-40 bg-gradient-to-l from-white via-white/80 to-transparent z-10" />

          <div className="flex gap-6 animate-marquee-slow hover:[animation-play-state:paused]">
            {[...clients, ...clients, ...clients].map((client, index) => (
              <div
                key={`row1-${index}`}
                className="flex-shrink-0 group"
              >
                <div className="relative flex items-center gap-4 px-8 py-5 rounded-2xl bg-white border border-[#E2E8F0] shadow-lg hover:shadow-2xl hover:border-[#2563EB]/50 hover:-translate-y-3 hover:rotate-1 transition-all duration-500 cursor-pointer overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#2563EB]/0 via-[#2563EB]/5 to-[#2563EB]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-[#2563EB] to-[#1D4ED8] flex items-center justify-center shadow-xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                    <span className="text-white font-bold text-base">{client.logo}</span>
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                  </div>
                  <span className="relative text-[#1E293B] font-semibold text-lg whitespace-nowrap group-hover:text-[#2563EB] transition-colors">
                    {client.name}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative perspective-1000">
          <div className="absolute left-0 top-0 bottom-0 w-40 bg-gradient-to-r from-white via-white/80 to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-40 bg-gradient-to-l from-white via-white/80 to-transparent z-10" />

          <div className="flex gap-6 animate-marquee-slow-reverse hover:[animation-play-state:paused]">
            {[...clients.slice().reverse(), ...clients.slice().reverse(), ...clients.slice().reverse()].map((client, index) => (
              <div
                key={`row2-${index}`}
                className="flex-shrink-0 group"
              >
                <div className="relative flex items-center gap-4 px-8 py-5 rounded-2xl bg-white border border-[#E2E8F0] shadow-lg hover:shadow-2xl hover:border-[#F97316]/50 hover:-translate-y-3 hover:-rotate-1 transition-all duration-500 cursor-pointer overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#F97316]/0 via-[#F97316]/5 to-[#F97316]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-[#F97316] to-[#EA580C] flex items-center justify-center shadow-xl group-hover:scale-110 group-hover:-rotate-6 transition-all duration-500">
                    <span className="text-white font-bold text-base">{client.logo}</span>
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                  </div>
                  <span className="relative text-[#1E293B] font-semibold text-lg whitespace-nowrap group-hover:text-[#F97316] transition-colors">
                    {client.name}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={`mt-20 transition-all duration-1000 delay-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: 50, suffix: "+", label: "Industries Served", color: "from-blue-500 to-cyan-500" },
              { value: 25, suffix: "+", label: "States Covered", color: "from-orange-500 to-amber-500" },
              { value: 15, suffix: "+", label: "Years Experience", color: "from-green-500 to-emerald-500" },
              { value: 98, suffix: "%", label: "Client Retention", color: "from-purple-500 to-pink-500" },
            ].map((stat, index) => (
              <div
                key={index}
                className="group relative text-center p-8 rounded-3xl bg-white border border-[#E2E8F0] shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 overflow-hidden"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />

                <div className={`absolute -top-10 -right-10 w-24 h-24 rounded-full bg-gradient-to-br ${stat.color} opacity-10 group-hover:opacity-20 group-hover:scale-150 transition-all duration-500`} />

                <p className={`text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${stat.color}`}>
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </p>
                <p className="text-sm text-[#64748B] mt-3 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
        }

        @keyframes marquee-slow {
          0% { transform: translateX(0); }
          100% { transform: translateX(-66.666%); }
        }

        @keyframes marquee-slow-reverse {
          0% { transform: translateX(-66.666%); }
          100% { transform: translateX(0); }
        }

        .animate-marquee-slow {
          width: max-content;
          animation: marquee-slow 42s linear infinite;
        }

        .animate-marquee-slow-reverse {
          width: max-content;
          animation: marquee-slow-reverse 42s linear infinite;
        }

        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 3s ease infinite;
        }
      `}</style>
    </section>
  )
}

// ==================== HORIZONTAL SCROLLING SECTION ====================
const horizontalFeatures = [
  {
    id: 1,
    title: "Skilled Workforce",
    description: "Access to 40,000+ trained and certified workers ready for deployment across India.",
    icon: Users,
    image: "/images/home/hero-workers.jpg",
    color: "from-blue-500 to-cyan-500",
    stats: { value: "40,000+", label: "Workers" },
  },
  {
    id: 2,
    title: "Partner Network",
    description: "Strong partnerships with 400+ leading companies across various industries.",
    icon: Building2,
    image: "/images/home/employer.jpg",
    color: "from-orange-500 to-amber-500",
    stats: { value: "400+", label: "Partners" },
  },
  {
    id: 3,
    title: "Pan-India Presence",
    description: "Operations spanning 25+ states ensuring nationwide coverage and support.",
    icon: Award,
    image: "/images/home/team-collaboration.jpg",
    color: "from-green-500 to-emerald-500",
    stats: { value: "25+", label: "States" },
  },
  {
    id: 4,
    title: "Rapid Deployment",
    description: "Quick turnaround time with workers deployed within 48-72 hours of request.",
    icon: Clock,
    image: "/images/home/factory-floor.jpg",
    color: "from-purple-500 to-pink-500",
    stats: { value: "48hrs", label: "Deployment" },
  },
  {
    id: 5,
    title: "Quality Assured",
    description: "Rigorous screening and training programs ensure top-quality workforce delivery.",
    icon: Shield,
    image: "/images/b2b/quality-control.jpg",
    color: "from-red-500 to-rose-500",
    stats: { value: "98%", label: "Satisfaction" },
  },
  {
    id: 6,
    title: "Growth Partner",
    description: "We scale with your business, providing flexible staffing solutions.",
    icon: TrendingUp,
    image: "/images/b2b/business-growth.jpg",
    color: "from-indigo-500 to-violet-500",
    stats: { value: "3x", label: "Growth" },
  },
]

function HorizontalHighlightsSection() {
  const containerRef = useRef(null)
  const scrollRef = useRef(null)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const container = containerRef.current
    const scrollContent = scrollRef.current
    if (!container || !scrollContent) return

    const handleScroll = () => {
      const rect = container.getBoundingClientRect()
      const windowHeight = window.innerHeight
      const containerHeight = container.offsetHeight - windowHeight

      const scrolled = -rect.top
      const progress = Math.max(0, Math.min(1, scrolled / Math.max(1, containerHeight)))
      setScrollProgress(progress)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const translateX = (scrollProgress * (horizontalFeatures.length - 1) * -100) / horizontalFeatures.length
  const activeIndex = Math.min(horizontalFeatures.length - 1, Math.floor(scrollProgress * horizontalFeatures.length))

  return (
    <section
      ref={containerRef}
      className="relative bg-[#0A0F1C]"
      style={{ height: `${(horizontalFeatures.length + 1) * 100}vh` }}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-blue-500/10 blur-[150px]" />
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-orange-500/10 blur-[120px]" />
        </div>

        <div className="absolute top-1/2 right-8 -translate-y-1/2 z-20 hidden lg:flex flex-col gap-3">
          {horizontalFeatures.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                activeIndex === index ? "bg-white scale-150" : "bg-white/30"
              }`}
            />
          ))}
        </div>

        <div className="absolute top-8 left-8 z-20">
          <p className="text-white/50 text-sm uppercase tracking-widest mb-2">Why Choose TSPL</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-400">Strengths</span>
          </h2>
        </div>

        <div className="absolute bottom-8 left-8 right-8 z-20">
          <div className="h-1 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-orange-500 to-amber-500 rounded-full transition-all duration-100"
              style={{ width: `${scrollProgress * 100}%` }}
            />
          </div>
          <div className="flex justify-between mt-4 text-sm text-white/50">
            <span>01</span>
            <span>0{horizontalFeatures.length}</span>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="absolute top-1/2 left-0 flex items-center gap-8 px-8 transition-transform duration-100 ease-out"
          style={{
            transform: `translate(calc(10vw + ${translateX}%), -50%)`,
            width: `${horizontalFeatures.length * 80}vw`,
          }}
        >
          {horizontalFeatures.map((feature, index) => {
            const Icon = feature.icon
            const isActive = activeIndex === index

            return (
              <div
                key={feature.id}
                className={`relative flex-shrink-0 w-[70vw] md:w-[50vw] lg:w-[35vw] h-[70vh] rounded-3xl overflow-hidden transition-all duration-500 ${
                  isActive ? "scale-100 opacity-100" : "scale-95 opacity-60"
                }`}
              >
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />

                <div className={`absolute inset-0 bg-gradient-to-t ${feature.color} opacity-60`} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                  <span className="absolute top-8 right-8 text-8xl font-bold text-white/10">
                    0{index + 1}
                  </span>

                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 shadow-2xl`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>

                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full w-fit mb-4">
                    <span className="text-2xl font-bold text-white">{feature.stats.value}</span>
                    <span className="text-white/70 text-sm">{feature.stats.label}</span>
                  </div>

                  <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">{feature.title}</h3>

                  <p className="text-white/80 text-lg leading-relaxed max-w-md">{feature.description}</p>

                  <div className="flex items-center gap-2 mt-6 text-white group cursor-pointer">
                    <span className="font-medium">Learn More</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <div className="absolute bottom-32 left-1/2 -translate-x-1/2 text-white/40 text-sm flex items-center gap-2">
          <span>Keep scrolling</span>
          <ArrowRight className="w-4 h-4 animate-pulse" />
        </div>
      </div>
    </section>
  )
}

// ==================== REVIEWS SECTION ====================
const clientReviews = [
  {
    name: "Rajesh Sharma",
    role: "HR Director",
    company: "Tata Motors",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
    rating: 5,
    review: "TSPL Group has been instrumental in helping us build a skilled workforce through their NAPS program. Their candidates are well-trained and job-ready. Highly recommend their services!",
    metric: { value: "2000+", label: "Hires" },
  },
  {
    name: "Priya Mehta",
    role: "Talent Acquisition Head",
    company: "Mahindra & Mahindra",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face",
    rating: 5,
    review: "We've partnered with TSPL for over 3 years now. Their understanding of government schemes and quick turnaround time makes them our preferred staffing partner.",
    metric: { value: "98%", label: "Retention" },
  },
  {
    name: "Amit Patel",
    role: "Operations Manager",
    company: "Reliance Industries",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face",
    rating: 5,
    review: "The quality of apprentices we receive from TSPL is exceptional. Their training programs ensure candidates are industry-ready from day one. A truly professional organization.",
    metric: { value: "1500+", label: "Trained" },
  },
]

const employeeReviews = [
  {
    name: "Vikram Singh",
    role: "CNC Operator",
    company: "Placed at Hero MotoCorp",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face",
    rating: 5,
    review: "TSPL changed my life! Coming from a small village, I never imagined working at a top company. The NAPS training gave me skills and confidence. Now I earn well and support my family.",
    metric: { value: "3x", label: "Salary Increase" },
  },
  {
    name: "Anjali Kumari",
    role: "Quality Inspector",
    company: "Placed at Maruti Suzuki",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop&crop=face",
    rating: 5,
    review: "As a woman in manufacturing, I was unsure about my career. TSPL not only trained me but also ensured I got placed in a safe and supportive workplace. Forever grateful!",
    metric: { value: "Dream", label: "Job Achieved" },
  },
  {
    name: "Mohammed Farhan",
    role: "Electrician",
    company: "Placed at L&T",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop&crop=face",
    rating: 5,
    review: "The NATS program through TSPL was excellent. I learned practical skills alongside theory. The stipend during training helped me continue without financial burden.",
    metric: { value: "100%", label: "Certified" },
  },
]

function ReviewsSection() {
  const [activeTab, setActiveTab] = useState("clients")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef(null)

  const reviews = activeTab === "clients" ? clientReviews : employeeReviews

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const nextReview = () => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length)
  }

  const prevReview = () => {
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length)
  }

  useEffect(() => {
    setCurrentIndex(0)
  }, [activeTab])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % reviews.length)
    }, 6000)
    return () => clearInterval(interval)
  }, [reviews.length])

  return (
    <section ref={sectionRef} className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-[#F8FAFC] to-white" />

      {/* Animated background elements */}
      <div className="absolute top-20 left-0 w-[600px] h-[600px] rounded-full bg-[#2563EB]/5 blur-[120px]" />
      <div className="absolute bottom-20 right-0 w-[500px] h-[500px] rounded-full bg-[#F97316]/5 blur-[100px]" />

      {/* Decorative elements */}
      <div className="absolute top-40 right-20 w-64 h-64 rounded-full border-2 border-dashed border-[#2563EB]/10 animate-spin-slow" style={{ animationDuration: "40s" }} />
      <div className="absolute bottom-40 left-20 w-48 h-48 rounded-full border-2 border-dashed border-[#F97316]/10 animate-spin-slow" style={{ animationDuration: "30s", animationDirection: "reverse" }} />
      
      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#2563EB]/10 border border-[#2563EB]/20 mb-6">
            <Sparkles className="w-4 h-4 text-[#2563EB]" />
            <span className="text-sm font-semibold text-[#2563EB]">Testimonials</span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#0F172A] mb-4">
            Voices of <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2563EB] to-[#F97316]">Success</span>
          </h2>
          <p className="text-xl text-[#64748B] max-w-2xl mx-auto">
            Hear from the companies we partner with and the careers we have transformed
          </p>
        </div>

        {/* Tab switcher */}
        <div className={`flex justify-center mb-16 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="relative inline-flex p-2 bg-[#F1F5F9] rounded-2xl">
            <div
              className={`absolute top-2 bottom-2 rounded-xl bg-white shadow-lg transition-all duration-500 ease-out ${
                activeTab === "clients"
                  ? "left-2 w-[calc(50%-8px)]"
                  : "left-[calc(50%+4px)] w-[calc(50%-8px)]"
              }`}
            />
            <button
              onClick={() => setActiveTab("clients")}
              className={`relative z-10 flex items-center gap-2 px-8 py-4 rounded-xl font-semibold transition-all duration-300 ${
                activeTab === "clients"
                  ? "text-[#2563EB]"
                  : "text-[#64748B] hover:text-[#1E293B]"
              }`}
            >
              <Building2 className={`w-5 h-5 transition-transform duration-300 ${activeTab === "clients" ? "scale-110" : ""}`} />
              <span>Client Reviews</span>
            </button>
            <button
              onClick={() => setActiveTab("employees")}
              className={`relative z-10 flex items-center gap-2 px-8 py-4 rounded-xl font-semibold transition-all duration-300 ${
                activeTab === "employees"
                  ? "text-[#F97316]"
                  : "text-[#64748B] hover:text-[#1E293B]"
              }`}
            >
              <Users className={`w-5 h-5 transition-transform duration-300 ${activeTab === "employees" ? "scale-110" : ""}`} />
              <span>Employee Stories</span>
            </button>
          </div>
        </div>

        {/* Main testimonial display */}
        <div className={`max-w-5xl mx-auto transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="relative">
            <div className={`absolute -top-10 -left-10 w-32 h-32 rounded-3xl flex items-center justify-center opacity-10 ${
              activeTab === "clients" ? "bg-[#2563EB]" : "bg-[#F97316]"
            }`}>
              <Quote className="w-16 h-16 text-white" />
            </div>

            <div className="relative bg-white rounded-3xl border-2 border-[#E2E8F0] shadow-2xl p-8 lg:p-12 overflow-hidden">
              <div className={`absolute top-0 left-0 right-0 h-2 bg-gradient-to-r ${
                activeTab === "clients"
                  ? "from-[#2563EB] via-[#3B82F6] to-[#60A5FA]"
                  : "from-[#F97316] via-[#FB923C] to-[#FBBF24]"
              }`} />

              <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
                <div className="flex flex-col items-center text-center lg:w-1/3">
                  <div className={`relative w-32 h-32 rounded-2xl overflow-hidden ring-4 mb-6 ${
                    activeTab === "clients" ? "ring-[#2563EB]/20" : "ring-[#F97316]/20"
                  }`}>
                    <img
                      src={reviews[currentIndex].image}
                      alt={reviews[currentIndex].name}
                      className="w-full h-full object-cover transition-transform duration-500"
                    />
                  </div>

                  <h4 className="text-xl font-bold text-[#0F172A] mb-1">
                    {reviews[currentIndex].name}
                  </h4>
                  <p className="text-[#64748B] mb-1">{reviews[currentIndex].role}</p>
                  <p className={`font-semibold ${activeTab === "clients" ? "text-[#2563EB]" : "text-[#F97316]"}`}>
                    {reviews[currentIndex].company}
                  </p>

                  <div className={`mt-6 px-6 py-3 rounded-2xl ${
                    activeTab === "clients" ? "bg-[#2563EB]/10" : "bg-[#F97316]/10"
                  }`}>
                    <p className={`text-2xl font-bold ${
                      activeTab === "clients" ? "text-[#2563EB]" : "text-[#F97316]"
                    }`}>
                      {reviews[currentIndex].metric.value}
                    </p>
                    <p className="text-xs text-[#64748B]">{reviews[currentIndex].metric.label}</p>
                  </div>
                </div>

                <div className="lg:w-2/3">
                  <div className="flex gap-1 mb-6 justify-center lg:justify-start">
                    {[...Array(reviews[currentIndex].rating)].map((_, i) => (
                      <Star key={i} className="w-6 h-6 fill-[#FBBF24] text-[#FBBF24]" />
                    ))}
                  </div>

                  <blockquote className="text-xl lg:text-2xl text-[#374151] leading-relaxed mb-8 text-center lg:text-left">
                    &ldquo;{reviews[currentIndex].review}&rdquo;
                  </blockquote>

                  <div className="flex items-center justify-center lg:justify-start gap-4">
                    <button
                      onClick={prevReview}
                      className={`w-12 h-12 rounded-xl border-2 flex items-center justify-center transition-all hover:scale-110 ${
                        activeTab === "clients"
                          ? "border-[#2563EB]/30 text-[#2563EB] hover:bg-[#2563EB] hover:text-white"
                          : "border-[#F97316]/30 text-[#F97316] hover:bg-[#F97316] hover:text-white"
                      }`}
                    >
                      <ArrowLeft className="w-5 h-5" />
                    </button>

                    <div className="flex gap-2">
                      {reviews.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentIndex(index)}
                          className={`h-2 rounded-full transition-all duration-300 ${
                            currentIndex === index
                              ? `w-8 ${activeTab === "clients" ? "bg-[#2563EB]" : "bg-[#F97316]"}`
                              : "w-2 bg-[#E2E8F0] hover:bg-[#CBD5E1]"
                          }`}
                        />
                      ))}
                    </div>

                    <button
                      onClick={nextReview}
                      className={`w-12 h-12 rounded-xl border-2 flex items-center justify-center transition-all hover:scale-110 ${
                        activeTab === "clients"
                          ? "border-[#2563EB]/30 text-[#2563EB] hover:bg-[#2563EB] hover:text-white"
                          : "border-[#F97316]/30 text-[#F97316] hover:bg-[#F97316] hover:text-white"
                      }`}
                    >
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className={`mt-16 text-center transition-all duration-1000 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <p className="text-[#64748B] mb-8 text-lg">
            Join thousands of satisfied clients and employees who trust TSPL Group
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#2563EB] to-[#3B82F6] text-white font-bold rounded-xl hover:shadow-xl hover:shadow-[#2563EB]/30 transition-all hover:scale-105"
            >
              <Building2 className="w-5 h-5" />
              Partner With Us
            </a>
            <a
              href="#jobs"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#F97316] to-[#FB923C] text-white font-bold rounded-xl hover:shadow-xl hover:shadow-[#F97316]/30 transition-all hover:scale-105"
            >
              <Users className="w-5 h-5" />
              Start Your Career
            </a>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .animate-spin-slow {
          animation: spin-slow linear infinite;
        }
      `}</style>
    </section>
  )
}

// ==================== MAIN HOMEPAGE ====================
export default function HomePage() {
  return (
    <>
      <Navbar />
      <Hero />
      <ClientsSection />
      <HorizontalHighlightsSection />
      <AudienceSplit />
      <JobsSection />
      <CalendarSection /> 
      <ReviewsSection />
      <AchievementsSection />    
      
           
      
      
      <FAQSection />
      <Footer />

      <style jsx>{`
        @keyframes fadeSlideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes scrollBounce {
          0%, 100% {
            transform: translateY(0);
            opacity: 1;
          }
          50% {
            transform: translateY(12px);
            opacity: 0.3;
          }
        }
        
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }

                html {
                  scroll-behavior: smooth;
                }

                .horizontal-scroll {
                  scroll-behavior: smooth;
                  -webkit-overflow-scrolling: touch;
                  scrollbar-width: thin;
                  scrollbar-color: linear-gradient(90deg, #2563EB, #F97316) rgba(30, 41, 59, 0.1);
                }

                .horizontal-scroll::-webkit-scrollbar {
                  height: 6px;
                }

                .horizontal-scroll::-webkit-scrollbar-track {
                  background: rgba(30, 41, 59, 0.05);
                  border-radius: 10px;
                }

                .horizontal-scroll::-webkit-scrollbar-thumb {
                  background: linear-gradient(90deg, #2563EB, #F97316);
                  border-radius: 10px;
                }

                .horizontal-scroll::-webkit-scrollbar-thumb:hover {
                  background: linear-gradient(90deg, #1D4ED8, #EA580C);
                }

                @keyframes slideInFromLeft {
                  from {
                    opacity: 0;
                    transform: translateX(-50px);
                  }
                  to {
                    opacity: 1;
                    transform: translateX(0);
                  }
                }

                @keyframes slideInFromRight {
                  from {
                    opacity: 0;
                    transform: translateX(50px);
                  }
                  to {
                    opacity: 1;
                    transform: translateX(0);
                  }
                }

                @keyframes float {
                  0%, 100% {
                    transform: translateY(0px);
                  }
                  50% {
                    transform: translateY(-20px);
                  }
                }

                .slide-in-left {
                  animation: slideInFromLeft 0.6s ease-out;
                }

                .slide-in-right {
                  animation: slideInFromRight 0.6s ease-out;
                }

                .scroll-bounce {
                  animation: scrollBounce 1.5s ease-in-out infinite;
                }

                .gradient-x {
                  animation: gradient-x 3s ease infinite;
                  background-size: 200% center;
                }

                .float {
                  animation: float 6s ease-in-out infinite;
                }
          `}</style>
    </>
  )
}
