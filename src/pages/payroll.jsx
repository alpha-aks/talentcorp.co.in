import React, { useEffect, useState } from 'react';
import {
  ArrowRight,
  BadgeCheck,
  Banknote,
  Calculator,
  CheckCircle2,
  ChevronDown,
  Clock,
  CreditCard,
  FileText,
  HeartHandshake,
  MessageCircleQuestion,
  Shield,
  TrendingUp,
  Users,
  Wallet,
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const benefits = {
  forCompanies: [
    {
      icon: Clock,
      title: 'Save Time',
      titleHindi: 'समय बचाएं',
      description: 'No more manual calculations. We automate everything.',
    },
    {
      icon: Shield,
      title: 'Zero Compliance Risk',
      titleHindi: 'कोई जोखिम नहीं',
      description: 'Stay protected from government penalties and legal issues.',
    },
    {
      icon: TrendingUp,
      title: 'Reduce Costs',
      titleHindi: 'खर्चे कम करें',
      description: 'No need for an in-house payroll team. Pay only for what you use.',
    },
  ],
  forWorkers: [
    {
      icon: Banknote,
      title: 'On-Time Salary',
      titleHindi: 'समय पर सैलरी',
      description: 'Your salary reaches your account on the same date every month.',
    },
    {
      icon: BadgeCheck,
      title: 'PF & ESI Benefits',
      titleHindi: 'पीएफ और ईएसआई लाभ',
      description: 'Proper PF deductions mean secure retirement and health coverage.',
    },
    {
      icon: HeartHandshake,
      title: 'Fair Treatment',
      titleHindi: 'उचित व्यवहार',
      description: 'Transparent salary slips. Know exactly what you earn.',
    },
  ],
};

const steps = [
  {
    number: '01',
    icon: FileText,
    title: 'Share Employee Data',
    titleHindi: 'कर्मचारी जानकारी दें',
    description: 'Send us your employee list, attendance, and salary structure. We make it simple.',
    color: '#2563EB',
  },
  {
    number: '02',
    icon: Users,
    title: 'We Process Everything',
    titleHindi: 'हम सब संभाल लेते हैं',
    description: 'Our team calculates salaries, deductions, PF, ESI, and all compliances.',
    color: '#F97316',
  },
  {
    number: '03',
    icon: CreditCard,
    title: 'Salaries Get Credited',
    titleHindi: 'सैलरी खाते में आ जाती है',
    description: 'Money reaches your workers bank accounts on time, every time.',
    color: '#22C55E',
  },
  {
    number: '04',
    icon: CheckCircle2,
    title: 'Reports and Compliance',
    titleHindi: 'रिपोर्ट और अनुपालन',
    description: 'Get detailed reports. All government filings done automatically.',
    color: '#8B5CF6',
  },
];

const services = [
  {
    id: 1,
    title: 'Salary Processing',
    titleHindi: 'वेतन प्रसंस्करण',
    description: 'Accurate and on-time salary disbursement to all your employees every month',
    icon: Wallet,
    color: '#2563EB',
    size: 'large',
  },
  {
    id: 2,
    title: 'PF Management',
    titleHindi: 'पीएफ प्रबंधन',
    description: 'Complete Provident Fund registration, filing and compliance',
    icon: Shield,
    color: '#22C55E',
    size: 'small',
  },
  {
    id: 3,
    title: 'ESI Compliance',
    titleHindi: 'ईएसआई अनुपालन',
    description: 'Employee State Insurance management for worker healthcare',
    icon: HeartHandshake,
    color: '#EF4444',
    size: 'small',
  },
  {
    id: 4,
    title: 'Statutory Compliance',
    titleHindi: 'वैधानिक अनुपालन',
    description: 'All government filings, returns and legal compliance handled professionally',
    icon: FileText,
    color: '#F97316',
    size: 'large',
  },
  {
    id: 5,
    title: 'Tax Deductions',
    titleHindi: 'कर कटौती',
    description: 'TDS calculation, filing and employee tax documentation',
    icon: Calculator,
    color: '#8B5CF6',
    size: 'small',
  },
  {
    id: 6,
    title: 'Employee Benefits',
    titleHindi: 'कर्मचारी लाभ',
    description: 'Insurance, bonuses and benefits administration for your workforce',
    icon: Users,
    color: '#EC4899',
    size: 'medium',
  },
];

const faqs = [
  {
    question: 'What is Payroll Staffing?',
    questionHindi: 'पेरोल स्टाफिंग क्या है?',
    answer:
      'Payroll Staffing means we become the official employer for your workers. We handle their salaries, PF, ESI, and all legal requirements. You just pay us one amount, and we take care of everything else.',
    answerHindi:
      'इसका मतलब है कि हम आपके कर्मचारियों के आधिकारिक नियोक्ता बन जाते हैं। हम उनकी सैलरी, पीएफ, ईएसआई और सभी कानूनी आवश्यकताएं संभालते हैं।',
  },
  {
    question: 'How does salary reach workers?',
    questionHindi: 'कर्मचारियों को सैलरी कैसे मिलती है?',
    answer:
      "We transfer salary directly to each worker's bank account. Every month, on the agreed date, the money is credited. Workers also get salary slips showing all details.",
    answerHindi: 'हम हर कर्मचारी के बैंक खाते में सीधे सैलरी भेजते हैं। हर महीने तय तारीख पर पैसा जमा हो जाता है।',
  },
  {
    question: 'What about PF and ESI?',
    questionHindi: 'पीएफ और ईएसआई का क्या?',
    answer:
      'We handle complete PF and ESI compliance. We register workers, make monthly contributions, file returns, and ensure they get all benefits.',
    answerHindi: 'हम पूरा पीएफ और ईएसआई अनुपालन संभालते हैं - रजिस्ट्रेशन, मासिक योगदान, रिटर्न फाइलिंग सब कुछ।',
  },
  {
    question: 'How much does it cost?',
    questionHindi: 'इसकी कीमत कितनी है?',
    answer:
      'Our pricing is simple and transparent. We charge a small percentage per worker per month. The exact amount depends on the number of workers and services you need. Contact us for a free quote.',
    answerHindi: 'हमारी फीस सरल और पारदर्शी है। प्रति कर्मचारी प्रति महीने छोटा सा शुल्क। मुफ्त कोट के लिए संपर्क करें।',
  },
];

function PayrollSection() {
  const [activeTab, setActiveTab] = useState('companies');
  const currentBenefits = activeTab === 'companies' ? benefits.forCompanies : benefits.forWorkers;

  return (
    <section id="payroll-benefits" className="relative overflow-hidden bg-[#0A0A0B] py-24 text-white">
      <div className="absolute inset-0">
        <div className="absolute left-0 top-1/4 h-[500px] w-[500px] rounded-full bg-[#2563EB]/10 blur-[120px]" />
        <div className="absolute bottom-1/4 right-0 h-[400px] w-[400px] rounded-full bg-[#F97316]/10 blur-[100px]" />
      </div>

      <div className="relative z-10 mx-auto grid max-w-7xl gap-16 px-6 lg:grid-cols-2">
        <div className="space-y-8">
          <div>
            <span className="mb-4 inline-block rounded-full bg-[#22C55E]/20 px-4 py-1.5 text-sm font-semibold text-[#22C55E]">
              Benefits
            </span>
            <h1 className="mb-4 text-4xl font-bold md:text-5xl">
              Everyone Wins with
              <span className="block bg-gradient-to-r from-[#2563EB] to-[#60A5FA] bg-clip-text text-transparent">
                TSPL Payroll
              </span>
            </h1>
            <p className="max-w-xl text-white/70">
              Payroll management built for companies and workers. We handle the process, compliance, and payouts.
            </p>
          </div>

          <div className="inline-flex rounded-xl bg-white/10 p-1.5 backdrop-blur-sm">
            <button
              type="button"
              onClick={() => setActiveTab('companies')}
              className={`rounded-lg px-6 py-3 text-sm font-semibold transition-all ${activeTab === 'companies' ? 'bg-[#2563EB] text-white' : 'text-white/60 hover:text-white'}`}
            >
              For Companies
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('workers')}
              className={`rounded-lg px-6 py-3 text-sm font-semibold transition-all ${activeTab === 'workers' ? 'bg-[#F97316] text-white' : 'text-white/60 hover:text-white'}`}
            >
              For Workers
            </button>
          </div>

          <div className="space-y-4">
            {currentBenefits.map((benefit) => {
              const Icon = benefit.icon;
              return (
                <div key={benefit.title} className="rounded-2xl border border-white/10 bg-white/5 p-5 transition-colors hover:bg-white/10">
                  <div className="flex items-start gap-4">
                    <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${activeTab === 'companies' ? 'bg-[#2563EB]/20' : 'bg-[#F97316]/20'}`}>
                      <Icon className="h-6 w-6" style={{ color: activeTab === 'companies' ? '#2563EB' : '#F97316' }} />
                    </div>
                    <div>
                      <h2 className="mb-1 text-lg font-bold">{benefit.title}</h2>
                      <p className="mb-2 text-sm text-white/40">{benefit.titleHindi}</p>
                      <p className="text-sm text-white/70">{benefit.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="rounded-2xl bg-white/5 p-4">
              <div className="text-2xl font-bold text-white">500+</div>
              <div className="text-xs text-white/60">Companies Trust Us</div>
            </div>
            <div className="rounded-2xl bg-white/5 p-4">
              <div className="text-2xl font-bold text-white">15+</div>
              <div className="text-xs text-white/60">Years Experience</div>
            </div>
            <div className="rounded-2xl bg-white/5 p-4">
              <div className="text-2xl font-bold text-[#22C55E]">100%</div>
              <div className="text-xs text-white/60">Compliance Rate</div>
            </div>
          </div>
          <div className="mt-6 rounded-2xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5 p-6">
            <p className="text-sm uppercase tracking-[0.25em] text-white/45">Payroll Service</p>
            <h2 className="mt-2 text-2xl font-bold">Accurate salaries. Clean compliance. On-time payouts.</h2>
            <p className="mt-3 text-sm text-white/70">
              A modern payroll workflow designed to reduce admin work and keep workers confident.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function PayrollHowItWorks() {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 3000);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <section id="payroll-process" className="bg-white py-24">
      <div className="mx-auto grid max-w-7xl gap-16 px-6 lg:grid-cols-2 lg:items-center">
        <div className="relative mx-auto h-[320px] w-[320px]">
          <div className="absolute inset-0 rounded-full border-2 border-dashed border-[#2563EB]/20" style={{ animation: 'spin 20s linear infinite' }} />
          <div className="absolute inset-4 rounded-full border-2 border-[#F97316]/20" style={{ animation: 'spin 15s linear infinite reverse' }} />
          <div className="absolute inset-8 rounded-full border-2 border-dashed border-[#22C55E]/20" style={{ animation: 'spin 25s linear infinite' }} />
          <div className="absolute inset-12 flex items-center justify-center rounded-full bg-gradient-to-br from-[#2563EB] to-[#1D4ED8] text-center text-white shadow-2xl shadow-[#2563EB]/30">
            <div>
              <div className="text-4xl font-bold">TSPL</div>
              <div className="text-sm opacity-80">Payroll</div>
            </div>
          </div>
          {steps.map((step, index) => {
            const Icon = step.icon;
            const angle = index * 90 - 45;
            const radius = 140;
            const x = Math.cos((angle * Math.PI) / 180) * radius;
            const y = Math.sin((angle * Math.PI) / 180) * radius;

            return (
              <button
                key={step.number}
                type="button"
                onClick={() => setActiveStep(index)}
                className={`absolute flex h-14 w-14 items-center justify-center rounded-xl transition-all ${activeStep === index ? 'scale-125 shadow-lg' : 'scale-100'}`}
                style={{
                  left: `calc(50% + ${x}px - 28px)`,
                  top: `calc(50% + ${y}px - 28px)`,
                  backgroundColor: activeStep === index ? step.color : `${step.color}20`,
                }}
              >
                <Icon className="h-6 w-6" style={{ color: activeStep === index ? 'white' : step.color }} />
              </button>
            );
          })}
        </div>

        <div>
          <span className="mb-4 inline-block rounded-full bg-[#F97316]/10 px-4 py-1.5 text-sm font-semibold text-[#F97316]">
            Simple Process
          </span>
          <h2 className="mb-4 text-4xl font-bold text-[#0A0A0B] md:text-5xl">
            How Payroll
            <span className="block text-[#2563EB]">Staffing Works</span>
          </h2>
          <p className="mb-8 text-lg text-[#64748B]">
            Simple 4-step process. You focus on work, we handle salaries.
          </p>

          <div className="space-y-4">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = activeStep === index;
              return (
                <button
                  key={step.number}
                  type="button"
                  onClick={() => setActiveStep(index)}
                  className={`w-full rounded-2xl border p-5 text-left transition-all ${isActive ? 'border-transparent bg-white shadow-lg shadow-black/5' : 'border-transparent bg-transparent hover:bg-[#F8FAFC]'}`}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl"
                      style={{ backgroundColor: isActive ? step.color : '#F1F5F9' }}
                    >
                      {isActive ? <Icon className="h-5 w-5 text-white" /> : <span className="text-sm font-bold text-[#64748B]">{step.number}</span>}
                    </div>
                    <div className="flex-1">
                      <h3 className="mb-1 text-lg font-bold text-[#0A0A0B]">{step.title}</h3>
                      <p className="mb-1 text-sm text-[#94A3B8]">{step.titleHindi}</p>
                      <p className={`text-sm text-[#64748B] transition-all ${isActive ? 'max-h-20 opacity-100' : 'max-h-0 overflow-hidden opacity-0'}`}>
                        {step.description}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function PayrollServices() {
  return (
    <section id="payroll-services" className="bg-[#FAFAFA] py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 text-center">
          <span className="mb-4 inline-block rounded-full bg-[#2563EB]/10 px-4 py-1.5 text-sm font-semibold text-[#2563EB]">
            Our Services
          </span>
          <h2 className="mb-4 text-4xl font-bold text-[#0A0A0B] md:text-5xl">
            Everything You Need for
            <span className="block text-[#2563EB]">Payroll Management</span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-[#64748B]">
            From salary processing to compliance, we handle it all so you can focus on growing your business.
          </p>
        </div>

        <div className="grid auto-rows-[180px] grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.id}
                className={`group relative overflow-hidden rounded-2xl border transition-all duration-500 hover:scale-[1.02] hover:shadow-xl ${service.size === 'large' ? 'md:col-span-2 md:row-span-2' : ''} ${service.size === 'medium' ? 'md:col-span-2' : ''}`}
                style={{ backgroundColor: `${service.color}10`, borderColor: `${service.color}20` }}
              >
                <div className="relative h-full p-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110" style={{ backgroundColor: `${service.color}20` }}>
                    <Icon className="h-6 w-6" style={{ color: service.color }} />
                  </div>
                  <h3 className="mb-1 text-xl font-bold text-[#0A0A0B]">{service.title}</h3>
                  <span className="mb-2 block text-sm text-[#64748B]">{service.titleHindi}</span>
                  {(service.size === 'large' || service.size === 'medium') && <p className="text-sm leading-relaxed text-[#64748B]">{service.description}</p>}
                  <div className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-[#0A0A0B]/10 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
                    <ArrowRight className="h-4 w-4 text-[#0A0A0B]" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function PayrollFAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="payroll-faq" className="bg-[#F8FAFC] py-24">
      <div className="mx-auto max-w-4xl px-6">
        <div className="mb-16 text-center">
          <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-[#2563EB]/10">
            <MessageCircleQuestion className="h-8 w-8 text-[#2563EB]" />
          </div>
          <h2 className="mb-4 text-4xl font-bold text-[#0A0A0B] md:text-5xl">Common Questions</h2>
          <p className="text-lg text-[#64748B]">Got questions? We have answers. Simple and clear.</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={faq.question}
              className={`overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white transition-all ${openIndex === index ? 'shadow-lg shadow-black/5' : 'hover:shadow-md'}`}
            >
              <button
                type="button"
                onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
                className="flex w-full items-center justify-between gap-4 p-6 text-left"
              >
                <div>
                  <h3 className="text-lg font-bold text-[#0A0A0B]">{faq.question}</h3>
                  <p className="mt-1 text-sm text-[#94A3B8]">{faq.questionHindi}</p>
                </div>
                <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-all ${openIndex === index ? 'rotate-180 bg-[#2563EB] text-white' : 'bg-[#F1F5F9] text-[#64748B]'}`}>
                  <ChevronDown className="h-5 w-5" />
                </div>
              </button>
              <div className={`overflow-hidden transition-all duration-300 ${openIndex === index ? 'max-h-96' : 'max-h-0'}`}>
                <div className="px-6 pb-6 pt-0">
                  <div className="mb-4 h-px bg-[#E2E8F0]" />
                  <p className="leading-relaxed text-[#64748B]">{faq.answer}</p>
                  <p className="mt-3 rounded-xl bg-[#F8FAFC] p-3 text-sm text-[#94A3B8]">{faq.answerHindi}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PayrollCTA() {
  return (
    <section className="bg-gradient-to-br from-[#2563EB] via-[#1D4ED8] to-[#1E40AF] py-24 text-white">
      <div className="mx-auto max-w-6xl px-6 text-center">
        <h2 className="mb-6 text-4xl font-bold md:text-5xl lg:text-6xl">
          Ready to Simplify Your
          <span className="block">Payroll Management?</span>
        </h2>
        <p className="mx-auto mb-10 max-w-2xl text-xl text-white/80">
          Join 500+ companies who trust TSPL for their payroll needs.
        </p>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-3xl border border-white/20 bg-white/10 p-8 backdrop-blur-md">
            <span className="mb-4 inline-block rounded-full bg-white/20 px-4 py-1.5 text-sm font-semibold">For Companies</span>
            <h3 className="mb-2 text-2xl font-bold">Get a Free Quote</h3>
            <p className="mb-6 text-white/70">Tell us about your workforce. We will create a custom proposal.</p>
            <a
              href="/contact-us"
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white px-6 py-4 font-semibold text-[#2563EB] transition-colors hover:bg-white/90"
            >
              Request Quote
              <ArrowRight className="h-5 w-5" />
            </a>
          </div>

          <div className="rounded-3xl border border-[#F97316]/30 bg-[#F97316]/20 p-8 backdrop-blur-md">
            <span className="mb-4 inline-block rounded-full bg-[#F97316]/30 px-4 py-1.5 text-sm font-semibold">For Workers | कर्मचारियों के लिए</span>
            <h3 className="mb-2 text-2xl font-bold">Salary Related Help</h3>
            <p className="mb-6 text-white/70">Questions about your salary, PF, or ESI? Call our helpline.</p>
            <a
              href="tel:+919876543210"
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#F97316] px-6 py-4 font-semibold text-white transition-colors hover:bg-[#EA580C]"
            >
              Call Helpline
            </a>
          </div>
        </div>

        <div className="mt-12 flex flex-wrap justify-center gap-8 text-white/80">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10">
              <Clock className="h-5 w-5" />
            </div>
            <div className="text-left">
              <div className="text-sm text-white/60">Working Hours</div>
              <div className="font-semibold">Mon-Sat, 9AM-6PM</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10">
              <Wallet className="h-5 w-5" />
            </div>
            <div className="text-left">
              <div className="text-sm text-white/60">Email</div>
              <div className="font-semibold">payroll@tspl.co.in</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function PayrollPage() {
  return (
    <div className="bg-white text-[#0A0A0B]">
      <Navbar />
      <main>
        <PayrollSection />
        <PayrollHowItWorks />
        <PayrollServices />
        <PayrollFAQ />
        <PayrollCTA />
      </main>
      <Footer />
    </div>
  );
}