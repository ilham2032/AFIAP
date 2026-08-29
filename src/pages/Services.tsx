import { Link } from 'react-router'
import { services, servicesIntro } from '../data/site'

const processSteps = [
  {
    title: 'Consultation',
    description: 'We discuss your goals, requirements, and timeline to understand what you need.',
  },
  {
    title: 'Planning & design',
    description: 'We define scope, architecture, and deliverables before development begins.',
  },
  {
    title: 'Delivery & support',
    description: 'We build, test, and launch your solution with ongoing support when you need it.',
  },
]

const Services = () => {
  return (
    <>
      <section className="bg-[#0a1628]">
        <div className="mx-auto max-w-[1170px] px-5 py-14 lg:px-6 lg:py-16">
          <p className="text-xs font-bold uppercase tracking-widest text-blue-400">What we do</p>
          <h1 className="font-display mt-3 text-4xl text-white sm:text-5xl">Our services</h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-blue-200">
            Comprehensive technology solutions designed to help your business grow, automate,
            and stand out online.
          </p>
        </div>
      </section>

      <section className="bg-white px-5 py-16 lg:px-6 lg:py-20">
        <div className="mx-auto max-w-[1170px]">
          <p className="text-xs font-bold uppercase tracking-widest text-blue-700">Overview</p>
          <h2 className="mt-3 max-w-2xl text-3xl font-bold text-[#0a1628] sm:text-4xl">
            Technology services for modern businesses
          </h2>
          <p className="mt-5 max-w-3xl text-base leading-8 text-slate-600">{servicesIntro}</p>
        </div>
      </section>

      <section className="bg-[#f4f7fc] px-5 py-16 lg:px-6 lg:py-20">
        <div className="mx-auto max-w-[1170px]">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-widest text-blue-700">Services</p>
            <h2 className="mt-3 text-3xl font-bold text-[#0a1628] sm:text-4xl">What we offer</h2>
            <p className="mt-4 text-base leading-7 text-slate-600">
              Select a service to learn more about how AFIAP can support your project.
            </p>
          </div>

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
        </div>
      </section>

      <section className="bg-white px-5 py-16 lg:px-6 lg:py-20">
        <div className="mx-auto max-w-[1170px]">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-widest text-blue-700">Our process</p>
            <h2 className="mt-3 text-3xl font-bold text-[#0a1628] sm:text-4xl">How we work</h2>
            <p className="mt-4 text-base leading-7 text-slate-600">
              A clear, structured approach from first conversation to final delivery.
            </p>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {processSteps.map((step, index) => (
              <div
                key={step.title}
                className="rounded-xl border border-blue-100 bg-[#f4f7fc] p-6"
              >
                <p className="font-display text-2xl text-blue-800">
                  {String(index + 1).padStart(2, '0')}
                </p>
                <h3 className="mt-3 text-lg font-bold text-[#0a1628]">{step.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#0a1628] px-5 py-16 lg:px-6 lg:py-20">
        <div className="mx-auto max-w-[1170px] text-center">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">Ready to start your project?</h2>
          <p className="mx-auto mt-4 max-w-lg text-blue-200">
            Tell us about your goals and we will recommend the right service for your needs.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link to="/contact" className="btn-primary !bg-white !text-blue-900 hover:!bg-blue-50">
              Request a quote
            </Link>
            <Link to="/faq" className="btn-outline-light">View FAQ</Link>
          </div>
        </div>
      </section>
    </>
  )
}

export default Services
