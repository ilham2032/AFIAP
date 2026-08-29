import { Link } from 'react-router'
import HeroSection from '../components/HeroSection'
import SectionHeading from '../components/SectionHeading'
import PartnersSection from '../components/PartnersSection'
import { aboutIntro, homeStats, mission, services } from '../data/site'

const Home = () => {
  return (
    <>
      <HeroSection />

      <section className="bg-white px-5 py-16 lg:px-6 lg:py-20">
        <div className="mx-auto max-w-[1170px]">
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-widest text-blue-700">About Us</p>
            <h2 className="mt-3 text-3xl font-bold text-[#0a1628] sm:text-4xl">Who we are</h2>
            <p className="mt-5 text-base leading-8 text-slate-600">{aboutIntro}</p>
          </div>
        </div>
      </section>

      <section className="border-y border-blue-100 bg-[#f4f7fc] px-5 py-12 lg:px-6">
        <div className="mx-auto grid max-w-[1170px] gap-8 sm:grid-cols-3">
          {homeStats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="font-display text-4xl text-blue-800">{stat.value}</p>
              <p className="mt-2 text-sm font-semibold text-slate-700">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white px-5 py-16 lg:px-6 lg:py-20">
        <div className="mx-auto grid max-w-[1170px] gap-10 lg:grid-cols-2 lg:items-start">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-blue-700">Our Mission</p>
            <h2 className="mt-3 text-3xl font-bold text-[#0a1628]">{mission.title}</h2>
            <p className="mt-4 leading-7 text-slate-600">{mission.description}</p>
          </div>
          <ul className="space-y-3">
            {mission.points.map((point) => (
              <li
                key={point}
                className="flex gap-3 rounded-xl border border-blue-100 bg-[#f4f7fc] px-5 py-4"
              >
                <span className="font-bold text-blue-700">✓</span>
                <span className="text-sm font-medium leading-6 text-slate-700">{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-[#f4f7fc] px-5 py-16 lg:px-6 lg:py-20">
        <div className="mx-auto max-w-[1170px]">
          <SectionHeading
            eyebrow="Services"
            title="What we offer"
            description="Technology services tailored for modern businesses and institutions across Azerbaijan."
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <Link
                key={service.slug}
                to={`/services/${service.slug}`}
                className="group rounded-xl border border-blue-100 bg-white p-6 shadow-sm transition hover:border-blue-300 hover:shadow-md"
              >
                <h3 className="text-lg font-bold text-[#0a1628] group-hover:text-blue-800">
                  {service.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{service.description}</p>
                <span className="mt-4 inline-block text-sm font-semibold text-blue-700 group-hover:underline">
                  Learn more →
                </span>
              </Link>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link to="/services" className="btn-primary">View all services</Link>
          </div>
        </div>
      </section>

      <PartnersSection />

      <section className="bg-[#0a1628] px-5 py-16 lg:px-6 lg:py-20">
        <div className="mx-auto max-w-[1170px] text-center">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">Ready to work with AFIAP?</h2>
          <p className="mx-auto mt-4 max-w-lg text-blue-200">
            Join Azerbaijan&apos;s first IT assistance platform and start your project today.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link to="/signup" className="btn-primary !bg-white !text-blue-900 hover:!bg-blue-50">
              Create account
            </Link>
            <Link to="/contact" className="btn-outline-light">Contact us</Link>
          </div>
        </div>
      </section>
    </>
  )
}

export default Home
