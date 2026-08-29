import { Link } from 'react-router'
import { aboutIntro, aboutStory, aboutValues, homeStats, mission } from '../data/site'

const About = () => {
  return (
    <>
      <section className="bg-[#0a1628]">
        <div className="mx-auto max-w-[1170px] px-5 py-14 lg:px-6 lg:py-16">
          <p className="text-xs font-bold uppercase tracking-widest text-blue-400">About us</p>
          <h1 className="font-display mt-3 text-4xl text-white sm:text-5xl">About AFIAP</h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-blue-200">
            Azerbaijan&apos;s first IT assistance platform — building professional digital products
            and intelligent systems for businesses and institutions.
          </p>
        </div>
      </section>

      <section className="bg-white px-5 py-16 lg:px-6 lg:py-20">
        <div className="mx-auto grid max-w-[1170px] gap-12 lg:grid-cols-2 lg:items-start">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-blue-700">Who we are</p>
            <h2 className="mt-3 text-3xl font-bold text-[#0a1628] sm:text-4xl">
              Technology built for real business needs
            </h2>
            <p className="mt-5 text-base leading-8 text-slate-600">{aboutIntro}</p>
          </div>
          <div className="space-y-5">
            {aboutStory.map((paragraph) => (
              <p key={paragraph.slice(0, 40)} className="text-base leading-8 text-slate-600">
                {paragraph}
              </p>
            ))}
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
            <p className="text-xs font-bold uppercase tracking-widest text-blue-700">Our mission</p>
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
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-widest text-blue-700">Our values</p>
            <h2 className="mt-3 text-3xl font-bold text-[#0a1628] sm:text-4xl">What guides our work</h2>
            <p className="mt-4 text-base leading-7 text-slate-600">
              These principles shape how we build technology and how we work with every client and partner.
            </p>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            {aboutValues.map((value) => (
              <div
                key={value.title}
                className="rounded-xl border border-blue-100 bg-white p-6 shadow-sm"
              >
                <h3 className="text-lg font-bold text-[#0a1628]">{value.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#0a1628] px-5 py-16 lg:px-6 lg:py-20">
        <div className="mx-auto max-w-[1170px] text-center">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">Want to learn more?</h2>
          <p className="mx-auto mt-4 max-w-lg text-blue-200">
            Explore our services or get in touch to discuss how AFIAP can support your next project.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link to="/services" className="btn-primary !bg-white !text-blue-900 hover:!bg-blue-50">
              Our services
            </Link>
            <Link to="/contact" className="btn-outline-light">Contact us</Link>
          </div>
        </div>
      </section>
    </>
  )
}

export default About
