import { Link, useParams } from 'react-router'
import { services } from '../data/site'
import NotFound from './NotFound'

const deliverables = [
  'End-to-end project planning and execution',
  'Dedicated support throughout the engagement',
  'Scalable solutions tailored to your business goals',
]

const ServiceDetail = () => {
  const { slug } = useParams()
  const service = services.find((item) => item.slug === slug)

  if (!service) return <NotFound />

  return (
    <>
      <section className="bg-[#0a1628]">
        <div className="mx-auto max-w-[1170px] px-5 py-14 lg:px-6 lg:py-16">
          <p className="text-xs font-bold uppercase tracking-widest text-blue-400">Service</p>
          <h1 className="font-display mt-3 text-4xl text-white sm:text-5xl">{service.title}</h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-blue-200">{service.description}</p>
        </div>
      </section>

      <section className="bg-white px-5 py-16 lg:px-6 lg:py-20">
        <div className="mx-auto grid max-w-[1170px] gap-12 lg:grid-cols-5 lg:gap-16">
          <div className="lg:col-span-3">
            <p className="text-xs font-bold uppercase tracking-widest text-blue-700">Overview</p>
            <h2 className="mt-3 text-2xl font-bold text-[#0a1628]">About this service</h2>
            <p className="mt-4 text-base leading-8 text-slate-600">{service.description}</p>
            <p className="mt-5 text-base leading-8 text-slate-600">
              AFIAP works with businesses and institutions to deliver reliable, professional
              results — from initial consultation through launch and ongoing support.
            </p>
          </div>

          <div className="lg:col-span-2">
            <div className="rounded-xl border border-blue-100 bg-[#f4f7fc] p-6">
              <h3 className="text-lg font-bold text-[#0a1628]">What we deliver</h3>
              <ul className="mt-4 space-y-3">
                {deliverables.map((item) => (
                  <li key={item} className="flex gap-3 text-sm leading-6 text-slate-700">
                    <span className="font-bold text-blue-700">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6 flex flex-col gap-3">
              <Link to="/contact" className="btn-primary justify-center">
                Request a quote
              </Link>
              <Link to="/services" className="btn-outline justify-center">
                All services
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default ServiceDetail
