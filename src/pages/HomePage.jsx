import React from 'react';
import { CheckCircle, Award, ArrowRight, Briefcase, Star } from 'lucide-react';
import Navbar from '../components/Navbar';
import WorkforceSection from '../components/WorkforceSection';
import JobBoard from '../components/JobBoard';
import Testimonials from '../components/Testimonials';
import Footer from '../components/Footer';

const HeroSection = ({ animateWords = false }) => {
  const partnerLogos = [
    { name: 'JCB', src: '/JCB_(company)-Logo.wine.svg' },
    { name: 'LG', src: '/images-10.jpeg' },
    { name: 'HAIER', src: '/haier-logo.png' },
    { name: 'MRF', src: '/Mrf-logo.png' },
  ];

  const statCards = [
    { value: '40,000+', label: 'Successful Placements' },
    { value: '400+', label: 'Partner Employers' },
    { value: 'Govt', label: 'Authorized' },
  ];

  return (
    <div className="relative overflow-x-hidden bg-[#0f2a4d]">
      <section className="relative min-h-screen flex items-center overflow-x-hidden overflow-y-visible">
        <Navbar />

        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img 
            src="/Gemini_Generated_Image_qskougqskougqsko.png" 
            className="w-full h-full object-cover object-[78%_center] scale-[1.12] opacity-35"
            alt="Office Background"
          />
          <div className="absolute left-0 top-0 bottom-0 w-[72%] bg-gradient-to-r from-[#0f2a4d]/90 via-[#0f2a4d]/60 to-transparent" />
          <div className="hero-color-wash absolute right-0 top-0 bottom-0 w-[58%] bg-gradient-to-l from-cyan-500/25 via-blue-500/20 to-transparent" />
          <div className="hero-color-blob-one absolute -right-24 top-20 hidden h-72 w-72 rounded-full bg-orange-500/30 blur-3xl md:block" />
          <div className="hero-color-blob-two absolute right-20 bottom-10 hidden h-80 w-80 rounded-full bg-indigo-500/30 blur-3xl md:block" />
        </div>

        {/* Decorative Circle */}
        <div className="absolute -top-24 -left-24 hidden h-96 w-96 rounded-full border border-white/10 z-0 md:block" />

        <div className="container mx-auto relative z-10 px-4 py-20 pt-28 pb-16 sm:px-6 sm:pt-32 sm:pb-20 md:pb-40">
          {/* Badges */}
          <div className={`${animateWords ? 'hero-content-enter' : 'hero-content-wait'} max-w-3xl`}>
          <div className="mb-8">
            <div className="flex flex-nowrap items-center gap-2 sm:gap-3 overflow-x-auto pb-1">
              <div className="flex items-center gap-1.5 sm:gap-2 bg-white/3 backdrop-blur-md border border-white/15 px-3 sm:px-4 py-1.5 rounded-full text-xs sm:text-sm whitespace-nowrap shrink-0">
                <Award size={14} className="text-orange-500 sm:w-4 sm:h-4" />
                <span>Government Authorized</span>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2 bg-white/3 backdrop-blur-md border border-white/15 px-3 sm:px-4 py-1.5 rounded-full text-xs sm:text-sm whitespace-nowrap shrink-0">
                <CheckCircle size={14} className="text-emerald-500 sm:w-4 sm:h-4" />
                <span>NAPS | NATS | MAPS</span>
              </div>
            </div>
          </div>

          {/* Main Content */}
            <h1 className="mb-6 text-4xl font-bold leading-tight sm:text-5xl md:text-7xl">
              Building India's <br />
              <span className="text-[#FF8C00]">Future Workforce</span>
            </h1>
            
            <p className="mb-10 max-w-2xl text-base leading-relaxed text-gray-300 sm:text-lg md:text-xl">
              India's leading government-authorized staffing partner connecting 40,000+ skilled 
              candidates with top employers through certified apprenticeship programs.
            </p>

            {/* Social Proof */}
            <div className="mb-12 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-6">
              <div className="flex items-center -space-x-3">
                {partnerLogos.map((brand) => (
                  <div
                    key={brand.name}
                    className="h-10 w-10 sm:h-12 sm:w-12 rounded-full border-2 border-[#0f2a4d] bg-white flex items-center justify-center overflow-hidden shadow-md"
                  >
                    <img
                      src={brand.src}
                      alt={`${brand.name} logo`}
                      className={`${brand.name === 'MRF' ? 'h-6 w-6 sm:h-8 sm:w-8' : 'h-5 w-5 sm:h-7 sm:w-7'} object-contain`}
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
              <div className="hidden h-8 w-[1px] bg-white/15 sm:block" />
              <div className="flex flex-col">
                <span className="text-sm font-medium">+400 Companies Trust Us</span>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => <Star key={i} size={14} className="fill-orange-500 text-orange-500" />)}
                  <span className="text-xs text-gray-400 ml-1">4.9/5 Rating</span>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col gap-4 sm:flex-row">
              <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#FF8C00] px-8 py-4 font-semibold text-white transition-all hover:bg-orange-600 sm:w-auto">
                Find Your Dream Job <ArrowRight size={20} />
              </button>
              <button className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/4 px-8 py-4 font-semibold text-white backdrop-blur-md transition-all hover:bg-white/8 sm:w-auto">
                <Briefcase size={20} /> Hire Skilled Talent
              </button>
            </div>
          </div>
        </div>

        <div className="hidden md:block absolute left-1/2 bottom-0 z-30 w-full max-w-6xl -translate-x-1/2 translate-y-1/2 px-6">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {statCards.map((card) => (
              <div
                key={card.label}
                className="rounded-2xl border border-white/45 bg-white/28 p-6 text-center shadow-[0_24px_55px_rgba(7,22,49,0.42)] backdrop-blur-xl"
              >
                <div className="text-3xl font-extrabold tracking-tight text-white md:text-4xl">{card.value}</div>
                <div className="mt-2 text-sm font-bold text-blue-900">
                  {card.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="clients" className="relative overflow-hidden bg-[#dcebff] px-0 pb-20 pt-16 md:pt-40 text-[#0f2a4d]">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              'repeating-linear-gradient(135deg, rgba(17,87,168,0.1) 0px, rgba(17,87,168,0.1) 1px, transparent 1px, transparent 16px)',
          }}
        />

        <div className="relative w-full">
          <h2 className="px-4 text-center text-xl font-bold leading-snug text-[#103f78] sm:px-6 md:px-10 md:text-3xl">
            Trusted by 400+ leading companies across India
          </h2>

          <div
            className="logo-marquee mt-10 overflow-hidden border-y border-[#9fc3ea] py-6"
            style={{
              backgroundImage:
                'repeating-linear-gradient(135deg, rgba(19,93,174,0.08) 0px, rgba(19,93,174,0.08) 1px, rgba(236,245,255,0.35) 1px, rgba(236,245,255,0.35) 14px)',
            }}
          >
            <div className="logo-marquee-track">
              {[...partnerLogos, ...partnerLogos].map((brand, idx) => (
                <div
                  key={`${brand.name}-${idx}`}
                  className="mx-2 flex h-20 w-36 shrink-0 items-center justify-center rounded-xl border border-[#9ec3ea] bg-[#eff6ff]/75 px-4 shadow-sm backdrop-blur-sm sm:w-44 sm:px-5"
                >
                  <img
                    src={brand.src}
                    alt={`${brand.name} logo`}
                    className={`${brand.name === 'MRF' ? 'h-14' : 'h-12'} w-auto object-contain`}
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <WorkforceSection />
      <JobBoard />
      <Testimonials />
      <Footer />
    </div>
  );
};

export default HeroSection;
