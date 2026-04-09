import { useEffect, useRef, useState } from 'react'
import {
	ArrowRight,
	Building,
	Building2,
	Car,
	CheckCircle2,
	ChevronLeft,
	ChevronRight,
	Clock,
	Cpu,
	Factory,
	Handshake,
	Mail,
	Package,
	Phone,
	Pill,
	Quote,
	Star,
	TrendingUp,
	Truck,
	Users,
	Wrench,
} from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const stats = [
	{ icon: Building2, value: 500, suffix: '+', label: 'Partner Companies' },
	{ icon: Users, value: 50000, suffix: '+', label: 'Workers Deployed' },
	{ icon: Handshake, value: 15, suffix: '+', label: 'Years Partnership' },
	{ icon: TrendingUp, value: 98, suffix: '%', label: 'Client Retention' },
]

const industries = [
	{
		icon: Factory,
		name: 'Manufacturing',
		image: '/Gemini_Generated_Image_qskougqskougqsko.png',
		clients: 120,
		workers: '15,000+',
		description: 'Steel, metals, plastics, and heavy engineering',
	},
	{
		icon: Pill,
		name: 'Pharmaceutical',
		image: '/happy-excited-executive-business-team-600nw-2424450635.jpg.webp',
		clients: 85,
		workers: '8,000+',
		description: 'Drug manufacturing, labs, and healthcare',
	},
	{
		icon: Car,
		name: 'Automobile',
		image: '/Gemini_Generated_Image_qskougqskougqsko.png',
		clients: 95,
		workers: '12,000+',
		description: 'OEMs, auto parts, and assembly plants',
	},
	{
		icon: Package,
		name: 'FMCG',
		image: '/happy-excited-executive-business-team-600nw-2424450635.jpg.webp',
		clients: 75,
		workers: '6,000+',
		description: 'Food, beverages, and consumer goods',
	},
	{
		icon: Truck,
		name: 'Logistics',
		image: '/Gemini_Generated_Image_qskougqskougqsko.png',
		clients: 60,
		workers: '5,000+',
		description: 'Warehousing, transport, and supply chain',
	},
	{
		icon: Cpu,
		name: 'Electronics',
		image: '/happy-excited-executive-business-team-600nw-2424450635.jpg.webp',
		clients: 45,
		workers: '3,500+',
		description: 'Electronics assembly and manufacturing',
	},
]

const caseStudies = [
	{
		company: 'Major Automobile OEM',
		industry: 'Automobile',
		image: '/Gemini_Generated_Image_qskougqskougqsko.png',
		challenge: 'Needed 500 skilled workers for new assembly line within 30 days',
		solution: 'Deployed trained workforce from our skill centers with pre-verified backgrounds',
		results: [
			{ label: 'Workers Deployed', value: '520' },
			{ label: 'Time to Deploy', value: '25 Days' },
			{ label: 'Retention Rate', value: '94%' },
		],
		testimonial: 'TSPL exceeded our expectations in both speed and quality.',
	},
	{
		company: 'Leading Pharma Company',
		industry: 'Pharmaceutical',
		image: '/happy-excited-executive-business-team-600nw-2424450635.jpg.webp',
		challenge: 'Required compliance-trained staff for GMP facility with zero audit findings',
		solution: 'Provided pre-trained pharma workers with complete documentation and compliance support',
		results: [
			{ label: 'Workers Placed', value: '150' },
			{ label: 'Audit Findings', value: 'Zero' },
			{ label: 'Cost Saved', value: '35%' },
		],
		testimonial: 'Their compliance expertise saved us from potential regulatory issues.',
	},
	{
		company: 'E-commerce Logistics Giant',
		industry: 'Logistics',
		image: '/Gemini_Generated_Image_qskougqskougqsko.png',
		challenge: 'Seasonal surge requiring 2000 workers across 15 warehouses in peak season',
		solution: 'Rapid deployment through our pan-India network with real-time attendance tracking',
		results: [
			{ label: 'Workers Mobilized', value: '2,100' },
			{ label: 'Locations Covered', value: '15' },
			{ label: 'Uptime', value: '99.5%' },
		],
		testimonial: 'They scaled with us seamlessly during our busiest season.',
	},
]

const clients = [
	{ name: 'Tata Motors', industry: 'Automobile' },
	{ name: 'Mahindra', industry: 'Automobile' },
	{ name: 'Reliance Industries', industry: 'Manufacturing' },
	{ name: 'Larsen & Toubro', industry: 'Infrastructure' },
	{ name: 'Cipla', industry: 'Pharma' },
	{ name: 'Sun Pharma', industry: 'Pharma' },
	{ name: 'Bajaj Auto', industry: 'Automobile' },
	{ name: 'Godrej', industry: 'FMCG' },
	{ name: 'Asian Paints', industry: 'Manufacturing' },
	{ name: 'Hindustan Unilever', industry: 'FMCG' },
	{ name: 'ITC Limited', industry: 'FMCG' },
	{ name: 'Adani Ports', industry: 'Logistics' },
	{ name: 'JSW Steel', industry: 'Manufacturing' },
	{ name: 'Havells', industry: 'Electronics' },
	{ name: 'Blue Star', industry: 'HVAC' },
	{ name: 'Voltas', industry: 'HVAC' },
]

const testimonials = [
	{
		quote: 'TSPL has been our trusted manpower partner for over 8 years. Their workers are skilled, reliable, and professional. They understand our requirements perfectly.',
		author: 'Rajesh Sharma',
		position: 'HR Director',
		company: 'Tata Motors',
		rating: 5,
	},
	{
		quote: 'The compliance management by TSPL is exceptional. Zero legal issues in 5 years of partnership. They handle PF, ESI, and all statutory requirements flawlessly.',
		author: 'Priya Mehta',
		position: 'Operations Head',
		company: 'Cipla Ltd',
		rating: 5,
	},
	{
		quote: 'When we needed 200 workers for our new plant within 2 weeks, TSPL delivered. Their quick deployment and quality workforce helped us meet our production targets.',
		author: 'Amit Patel',
		position: 'Plant Manager',
		company: 'JSW Steel',
		rating: 5,
	},
	{
		quote: 'Professional team, transparent billing, and consistent quality. TSPL is not just a vendor, they are a strategic partner in our growth journey.',
		author: 'Sunita Reddy',
		position: 'VP Human Resources',
		company: 'Mahindra & Mahindra',
		rating: 5,
	},
]

const benefits = [
	'Dedicated Account Manager',
	'24/7 Support & Replacement',
	'Complete Compliance Management',
	'Transparent Pricing',
	'Pan-India Coverage',
	'Skilled & Verified Workforce',
]

function AnimatedCounter({ value, suffix }) {
	const [count, setCount] = useState(0)
	const ref = useRef(null)
	const [hasAnimated, setHasAnimated] = useState(false)

	useEffect(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting && !hasAnimated) {
					setHasAnimated(true)
					let start = 0
					const duration = 2000
					const increment = value / (duration / 16)

					const timer = window.setInterval(() => {
						start += increment
						if (start >= value) {
							setCount(value)
							window.clearInterval(timer)
						} else {
							setCount(Math.floor(start))
						}
					}, 16)
				}
			},
			{ threshold: 0.5 }
		)

		if (ref.current) observer.observe(ref.current)
		return () => observer.disconnect()
	}, [value, hasAnimated])

	return <span ref={ref}>{count.toLocaleString()}{suffix}</span>
}

function ClientsHero() {
	const [isVisible, setIsVisible] = useState(false)

	useEffect(() => {
		setIsVisible(true)
	}, [])

	return (
		<section className="relative min-h-[90vh] overflow-hidden bg-white pt-24">
			<div className="absolute inset-0">
				<img
					src="/happy-excited-executive-business-team-600nw-2424450635.jpg.webp"
					alt="Partnership"
					className="h-full w-full object-cover"
				/>
				<div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-white/60" />
				<div className="absolute inset-0 bg-gradient-to-b from-white/50 via-transparent to-white" />
			</div>

			<div className="absolute inset-0 bg-[linear-gradient(to_right,#2563eb08_1px,transparent_1px),linear-gradient(to_bottom,#2563eb08_1px,transparent_1px)] bg-[size:4rem_4rem]" />

			<div className="relative z-10 container mx-auto px-4 py-16 lg:py-24">
				<div className="max-w-3xl">
					<div className={`inline-flex items-center gap-2 rounded-full bg-blue-600 px-4 py-2 text-sm font-medium text-white mb-6 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
						<Handshake className="h-4 w-4" />
						Our Trusted Partners
					</div>

					<h1 className={`mb-6 text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
						Building Success
						<br />
						<span className="bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">Together</span>
					</h1>

					<p className={`mb-8 max-w-xl text-lg md:text-xl text-gray-600 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
						Trusted by 500+ companies across India. We provide skilled manpower solutions that drive growth and efficiency.
					</p>

					<div className={`flex flex-wrap gap-4 transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
						<button className="h-12 rounded-xl bg-blue-600 px-8 text-white shadow-lg shadow-blue-500/25 transition-colors hover:bg-blue-700">Become a Partner</button>
						<button className="h-12 rounded-xl border border-gray-300 px-8 text-gray-700 transition-colors hover:bg-gray-50">View Case Studies</button>
					</div>
				</div>

				<div className={`mt-16 grid max-w-4xl grid-cols-2 gap-4 md:grid-cols-4 md:gap-6 transition-all duration-700 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
					{stats.map((stat) => (
						<div key={stat.label} className="group relative rounded-2xl border border-gray-100 bg-white/80 p-6 shadow-lg transition-all duration-300 hover:border-blue-200 hover:shadow-xl">
							<div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-50 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
							<div className="relative">
								<div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 transition-transform group-hover:scale-110">
									<stat.icon className="h-5 w-5 text-blue-600" />
								</div>
								<p className="text-2xl md:text-3xl font-bold text-gray-900">
									<AnimatedCounter value={stat.value} suffix={stat.suffix} />
								</p>
								<p className="mt-1 text-sm text-gray-500">{stat.label}</p>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	)
}

function Industries() {
	const [isVisible, setIsVisible] = useState(false)
	const [activeIndustry, setActiveIndustry] = useState(0)
	const ref = useRef(null)

	useEffect(() => {
		const observer = new IntersectionObserver(([entry]) => {
			if (entry.isIntersecting) setIsVisible(true)
		}, { threshold: 0.2 })

		if (ref.current) observer.observe(ref.current)
		return () => observer.disconnect()
	}, [])

	return (
		<section ref={ref} className="bg-white py-20">
			<div className="container mx-auto px-4">
				<div className={`mb-16 text-center transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
					<p className="mb-2 font-semibold text-blue-600">INDUSTRIES WE SERVE</p>
					<h2 className="mb-4 text-3xl md:text-4xl font-bold text-gray-900">Across Every Sector</h2>
					<p className="mx-auto max-w-2xl text-gray-500">From manufacturing to healthcare, we provide tailored workforce solutions.</p>
				</div>

				<div className={`grid gap-8 lg:grid-cols-2 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
					<div className="space-y-3">
						{industries.map((industry, index) => (
							<button
								key={industry.name}
								onClick={() => setActiveIndustry(index)}
								className={`group w-full rounded-xl border p-4 text-left transition-all duration-300 ${
									activeIndustry === index
										? 'border-blue-600 bg-blue-600 shadow-lg shadow-blue-500/20'
										: 'border-gray-200 bg-white hover:border-blue-300 hover:bg-blue-50/50'
								}`}
							>
								<div className="flex items-center gap-4">
									<div className={`flex h-12 w-12 items-center justify-center rounded-xl ${activeIndustry === index ? 'bg-white/20' : 'bg-blue-100'}`}>
										<industry.icon className={`h-6 w-6 ${activeIndustry === index ? 'text-white' : 'text-blue-600'}`} />
									</div>
									<div className="flex-1">
										<h3 className={`text-lg font-semibold ${activeIndustry === index ? 'text-white' : 'text-gray-900'}`}>{industry.name}</h3>
										<p className={`text-sm ${activeIndustry === index ? 'text-blue-100' : 'text-gray-500'}`}>
											{industry.clients} clients | {industry.workers} workers
										</p>
									</div>
									<ArrowRight className={`h-5 w-5 transition-all ${activeIndustry === index ? 'translate-x-0 text-white opacity-100' : '-translate-x-2 text-gray-400 opacity-0 group-hover:translate-x-0 group-hover:opacity-100'}`} />
								</div>
							</button>
						))}
					</div>

					<div className="relative min-h-[400px] overflow-hidden rounded-2xl bg-gray-100 lg:min-h-0">
						{industries.map((industry, index) => (
							<div key={industry.name} className={`absolute inset-0 transition-all duration-500 ${activeIndustry === index ? 'opacity-100 scale-100' : 'opacity-0 scale-105'}`}>
								<img src={industry.image} alt={industry.name} className="h-full w-full object-cover" />
								<div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/20 to-transparent" />

								<div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
									<div className="mb-2 flex items-center gap-2">
										<industry.icon className="h-5 w-5 text-blue-400" />
										<span className="font-medium text-blue-400">Industry Focus</span>
									</div>
									<h3 className="mb-2 text-2xl md:text-3xl font-bold text-white">{industry.name}</h3>
									<p className="mb-4 text-gray-300">{industry.description}</p>

									<div className="flex gap-6">
										<div>
											<p className="text-3xl font-bold text-white">{industry.clients}+</p>
											<p className="text-sm text-gray-400">Partner Companies</p>
										</div>
										<div>
											<p className="text-3xl font-bold text-white">{industry.workers}</p>
											<p className="text-sm text-gray-400">Workers Placed</p>
										</div>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	)
}

function CaseStudies() {
	const [isVisible, setIsVisible] = useState(false)
	const [activeCase, setActiveCase] = useState(0)
	const ref = useRef(null)

	useEffect(() => {
		const observer = new IntersectionObserver(([entry]) => {
			if (entry.isIntersecting) setIsVisible(true)
		}, { threshold: 0.2 })

		if (ref.current) observer.observe(ref.current)
		return () => observer.disconnect()
	}, [])

	return (
		<section ref={ref} className="bg-white py-20">
			<div className="container mx-auto px-4">
				<div className={`mb-16 text-center transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
					<p className="mb-2 font-semibold text-blue-600">SUCCESS STORIES</p>
					<h2 className="mb-4 text-3xl md:text-4xl font-bold text-gray-900">Real Results, Real Impact</h2>
				</div>

				<div className={`mb-12 flex flex-wrap justify-center gap-3 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
					{caseStudies.map((study, index) => (
						<button
							key={study.industry}
							onClick={() => setActiveCase(index)}
							className={`rounded-full px-6 py-3 font-medium transition-all ${
								activeCase === index
									? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25'
									: 'bg-gray-100 text-gray-600 hover:bg-gray-200'
							}`}
						>
							{study.industry}
						</button>
					))}
				</div>

				<div className={`transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
					<div className="grid items-center gap-8 lg:grid-cols-2">
						<div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
							<img src={caseStudies[activeCase].image} alt={caseStudies[activeCase].company} className="h-full w-full object-cover" />
							<div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent" />
							<div className="absolute bottom-6 left-6">
								<span className="rounded-full bg-blue-600 px-3 py-1 text-sm text-white">{caseStudies[activeCase].industry}</span>
								<h3 className="mt-3 text-2xl font-bold text-white">{caseStudies[activeCase].company}</h3>
							</div>
						</div>

						<div className="space-y-6">
							<div className="rounded-xl border border-red-100 bg-red-50 p-6">
								<h4 className="mb-2 flex items-center gap-2 font-semibold text-red-800">
									<span className="h-2 w-2 rounded-full bg-red-500" />
									The Challenge
								</h4>
								<p className="text-gray-700">{caseStudies[activeCase].challenge}</p>
							</div>

							<div className="rounded-xl border border-blue-100 bg-blue-50 p-6">
								<h4 className="mb-2 flex items-center gap-2 font-semibold text-blue-800">
									<CheckCircle2 className="h-4 w-4 text-blue-600" />
									Our Solution
								</h4>
								<p className="text-gray-700">{caseStudies[activeCase].solution}</p>
							</div>

							<div className="grid grid-cols-3 gap-4">
								{caseStudies[activeCase].results.map((result) => (
									<div key={result.label} className="rounded-xl bg-gray-50 p-4 text-center">
										<p className="text-2xl md:text-3xl font-bold text-blue-600">{result.value}</p>
										<p className="mt-1 text-sm text-gray-500">{result.label}</p>
									</div>
								))}
							</div>

							<div className="border-l-4 border-blue-500 pl-4 italic text-gray-600">
								&ldquo;{caseStudies[activeCase].testimonial}&rdquo;
							</div>

							<button className="group inline-flex items-center rounded-xl bg-blue-600 px-6 py-3 text-white transition-colors hover:bg-blue-700">
								Read Full Case Study
								<ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
							</button>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

function LogoCard({ name, industry }) {
	return (
		<div className="group mx-3 flex h-24 w-48 shrink-0 flex-col items-center justify-center gap-2 rounded-xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:border-blue-200 hover:shadow-md">
			<div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-50 to-blue-100 transition-transform group-hover:scale-110">
				<Building2 className="h-5 w-5 text-blue-600" />
			</div>
			<div className="text-center">
				<p className="text-sm font-semibold text-gray-800">{name}</p>
				<p className="text-xs text-gray-400">{industry}</p>
			</div>
		</div>
	)
}

function LogoMarquee() {
	const [isVisible, setIsVisible] = useState(false)
	const ref = useRef(null)

	useEffect(() => {
		const observer = new IntersectionObserver(([entry]) => {
			if (entry.isIntersecting) setIsVisible(true)
		}, { threshold: 0.2 })

		if (ref.current) observer.observe(ref.current)
		return () => observer.disconnect()
	}, [])

	return (
		<section ref={ref} className="overflow-hidden bg-gradient-to-b from-white to-gray-50/50 py-16">
			<div className="container mx-auto mb-10 px-4">
				<div className={`text-center transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
					<p className="mb-2 font-semibold text-blue-600">TRUSTED BY INDUSTRY LEADERS</p>
					<h2 className="mb-2 text-3xl md:text-4xl font-bold text-gray-900">Our Valued Clients</h2>
				</div>
			</div>

			<div className={`relative mb-6 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
				<div className="absolute left-0 top-0 bottom-0 z-10 w-32 bg-gradient-to-r from-white to-transparent" />
				<div className="absolute right-0 top-0 bottom-0 z-10 w-32 bg-gradient-to-l from-white to-transparent" />
				<div className="flex animate-marquee-slow">
					{[...clients, ...clients].map((client, index) => (
						<LogoCard key={`row1-${index}`} name={client.name} industry={client.industry} />
					))}
				</div>
			</div>

			<div className={`relative transition-all duration-700 delay-400 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
				<div className="absolute left-0 top-0 bottom-0 z-10 w-32 bg-gradient-to-r from-white to-transparent" />
				<div className="absolute right-0 top-0 bottom-0 z-10 w-32 bg-gradient-to-l from-white to-transparent" />
				<div className="flex animate-marquee-slow-reverse">
					{[...clients.slice().reverse(), ...clients.slice().reverse()].map((client, index) => (
						<LogoCard key={`row2-${index}`} name={client.name} industry={client.industry} />
					))}
				</div>
			</div>
		</section>
	)
}

function Testimonials() {
	const [isVisible, setIsVisible] = useState(false)
	const [currentIndex, setCurrentIndex] = useState(0)
	const ref = useRef(null)

	useEffect(() => {
		const observer = new IntersectionObserver(([entry]) => {
			if (entry.isIntersecting) setIsVisible(true)
		}, { threshold: 0.2 })

		if (ref.current) observer.observe(ref.current)
		return () => observer.disconnect()
	}, [])

	const nextTestimonial = () => {
		setCurrentIndex((prev) => (prev + 1) % testimonials.length)
	}

	const prevTestimonial = () => {
		setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
	}

	return (
		<section ref={ref} className="relative overflow-hidden bg-gradient-to-b from-gray-50 to-white py-20">
			<div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,#2563eb10_1px,transparent_0)] bg-[size:32px_32px]" />
			<div className="absolute left-10 top-20 opacity-5"><Quote className="h-40 w-40 text-blue-600" /></div>
			<div className="absolute bottom-20 right-10 rotate-180 opacity-5"><Quote className="h-40 w-40 text-blue-600" /></div>

			<div className="container relative z-10 mx-auto px-4">
				<div className={`mb-16 text-center transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
					<p className="mb-2 font-semibold text-blue-600">CLIENT TESTIMONIALS</p>
					<h2 className="mb-4 text-3xl md:text-4xl font-bold text-gray-900">What Our Partners Say</h2>
				</div>

				<div className={`mx-auto max-w-4xl transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
					<div className="relative rounded-3xl border border-gray-100 bg-white p-8 shadow-xl md:p-12">
						<div className="absolute -top-6 left-8 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 shadow-lg">
							<Quote className="h-6 w-6 text-white" />
						</div>

						<div className="pt-4">
							<div className="mb-6 flex gap-1">
								{Array.from({ length: testimonials[currentIndex].rating }).map((_, i) => (
									<Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
								))}
							</div>

							<blockquote className="mb-8 text-xl md:text-2xl leading-relaxed text-gray-800">
								&ldquo;{testimonials[currentIndex].quote}&rdquo;
							</blockquote>

							<div className="flex flex-wrap items-center justify-between gap-4">
								<div className="flex items-center gap-4">
									<div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-blue-600 text-xl font-bold text-white">
										{testimonials[currentIndex].author.charAt(0)}
									</div>
									<div>
										<p className="font-semibold text-gray-900">{testimonials[currentIndex].author}</p>
										<p className="text-sm text-gray-500">{testimonials[currentIndex].position}</p>
										<div className="mt-1 flex items-center gap-2">
											<Building2 className="h-4 w-4 text-blue-600" />
											<span className="text-sm font-medium text-blue-600">{testimonials[currentIndex].company}</span>
										</div>
									</div>
								</div>

								<div className="flex items-center gap-3">
									<button
										type="button"
										onClick={prevTestimonial}
										className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 transition-colors hover:border-blue-300 hover:bg-blue-50"
									>
										<ChevronLeft className="h-5 w-5" />
									</button>
									<div className="flex gap-2">
										{testimonials.map((_, index) => (
											<button
												key={index}
												type="button"
												onClick={() => setCurrentIndex(index)}
												className={`h-2 rounded-full transition-all ${index === currentIndex ? 'w-6 bg-blue-600' : 'w-2 bg-gray-300 hover:bg-gray-400'}`}
												aria-label={`Show testimonial ${index + 1}`}
											/>
										))}
									</div>
									<button
										type="button"
										onClick={nextTestimonial}
										className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 transition-colors hover:border-blue-300 hover:bg-blue-50"
									>
										<ChevronRight className="h-5 w-5" />
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

function ClientsCTA() {
	const [isVisible, setIsVisible] = useState(false)
	const ref = useRef(null)

	useEffect(() => {
		const observer = new IntersectionObserver(([entry]) => {
			if (entry.isIntersecting) setIsVisible(true)
		}, { threshold: 0.2 })

		if (ref.current) observer.observe(ref.current)
		return () => observer.disconnect()
	}, [])

	return (
		<section ref={ref} className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 py-20">
			<div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:4rem_4rem]" />
			<div className="absolute left-10 top-20 h-40 w-40 rounded-full bg-white/5 blur-3xl" />
			<div className="absolute bottom-20 right-10 h-60 w-60 rounded-full bg-white/5 blur-3xl" />

			<div className="container relative z-10 mx-auto px-4">
				<div className="grid items-center gap-12 lg:grid-cols-2">
					<div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
						<h2 className="mb-6 text-3xl md:text-4xl lg:text-5xl font-bold text-white">
							Ready to Partner
							<br />
							<span className="text-blue-200">With Us?</span>
						</h2>
						<p className="mb-8 text-lg text-blue-100">
							Join 500+ companies who trust TSPL for their workforce needs. Get a customized solution for your business today.
						</p>

						<div className="mb-8 grid grid-cols-2 gap-3">
							{benefits.map((benefit) => (
								<div key={benefit} className="flex items-center gap-2">
									<CheckCircle2 className="h-5 w-5 shrink-0 text-blue-300" />
									<span className="text-sm text-white">{benefit}</span>
								</div>
							))}
						</div>

						<div className="flex flex-wrap gap-6 text-white">
							<div className="flex items-center gap-2">
								<Phone className="h-5 w-5 text-blue-300" />
								<span>+91 98765 43210</span>
							</div>
							<div className="flex items-center gap-2">
								<Mail className="h-5 w-5 text-blue-300" />
								<span>partners@tsplgroup.com</span>
							</div>
						</div>
					</div>

					<div className={`transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
						<div className="rounded-2xl bg-white p-8 shadow-2xl">
							<div className="mb-6 flex items-center gap-3">
								<div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100">
									<Building2 className="h-6 w-6 text-blue-600" />
								</div>
								<div>
									<h3 className="font-bold text-gray-900">Become a Partner</h3>
									<p className="text-sm text-gray-500">Fill the form and we&apos;ll get back within 24 hours.</p>
								</div>
							</div>

							<form className="space-y-4">
								<div className="grid gap-4 md:grid-cols-2">
									<input type="text" placeholder="Company Name" className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20" />
									<input type="text" placeholder="Your Name" className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20" />
								</div>

								<div className="grid gap-4 md:grid-cols-2">
									<input type="email" placeholder="Email Address" className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20" />
									<input type="tel" placeholder="Phone Number" className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20" />
								</div>

								<select className="w-full rounded-xl border border-gray-200 px-4 py-3 text-gray-500 outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20">
									<option value="">Select Industry</option>
									<option value="manufacturing">Manufacturing</option>
									<option value="automobile">Automobile</option>
									<option value="pharma">Pharmaceutical</option>
									<option value="fmcg">FMCG</option>
									<option value="logistics">Logistics</option>
									<option value="other">Other</option>
								</select>

								<select className="w-full rounded-xl border border-gray-200 px-4 py-3 text-gray-500 outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20">
									<option value="">Workforce Requirement</option>
									<option value="1-50">1 - 50 Workers</option>
									<option value="50-100">50 - 100 Workers</option>
									<option value="100-500">100 - 500 Workers</option>
									<option value="500+">500+ Workers</option>
								</select>

								<textarea rows={3} placeholder="Tell us about your requirements..." className="w-full resize-none rounded-xl border border-gray-200 px-4 py-3 outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20" />

								<button type="submit" className="group inline-flex w-full items-center justify-center rounded-xl bg-blue-600 py-4 text-lg font-semibold text-white transition-colors hover:bg-blue-700">
									Request Partnership
									<ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
								</button>
							</form>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

export default function ClientPage() {
	return (
		<div className="min-h-screen bg-white text-slate-800">
			<Navbar />
			<main>
				<ClientsHero />
                <LogoMarquee />
				<Industries />
				<CaseStudies />		
				<Testimonials />
				<ClientsCTA />
			</main>
			<Footer />
		</div>
	)
}
