import { Link } from 'react-router'

const HeroSection = () => {
  return (
    <section className="bg-[#0a1628]">
      <div className="mx-auto grid max-w-[1170px] items-center gap-10 px-5 py-16 lg:grid-cols-2 lg:gap-14 lg:px-6 lg:py-24">
        <div>
          <p className="text-sm font-semibold tracking-wide text-blue-300">
            Azerbaijan&apos;s First IT Assistance Platform
          </p>
          <h1 className="font-display mt-4 text-4xl leading-tight text-white sm:text-5xl lg:text-[3.25rem]">
            AFIAP
          </h1>
          <p className="mt-4 text-xl font-semibold text-blue-200">
            Build, innovate, and grow with professional technology.
          </p>
          <p className="mt-5 max-w-lg text-base leading-7 text-blue-300/90">
            Web development, robotics, AI solutions, and custom software for businesses
            and institutions across Azerbaijan.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/services" className="btn-primary">Our services</Link>
            <Link to="/contact" className="btn-outline-light">Contact us</Link>
          </div>
        </div>

        <div className="rounded-2xl border border-blue-800/60 bg-blue-900/30 p-8 lg:p-10">
          <p className="text-xs font-bold uppercase tracking-widest text-blue-400">Why AFIAP</p>
          <ul className="mt-6 space-y-4">
            {[
              'Professional web & software development',
              'Robotics and AI for modern business',
              'Trusted by institutions nationwide',
            ].map((item) => (
              <li key={item} className="flex items-start gap-3 text-blue-100">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-700 text-[10px] font-bold text-white">
                  ✓
                </span>
                <span className="text-sm leading-6">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
