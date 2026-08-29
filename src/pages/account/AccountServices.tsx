import { Link } from 'react-router'
import { services } from '../../data/site'

const AccountServices = () => {
  return (
    <div className="rounded-2xl border border-blue-100 bg-white p-6 shadow-sm lg:p-8">
      <p className="text-xs font-bold uppercase tracking-widest text-blue-700">Services</p>
      <h1 className="mt-2 text-2xl font-bold text-[#0a1628] sm:text-3xl">Your services</h1>
      <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">
        Browse AFIAP services available to your account. Select a service to view details or request support.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {services.map((service) => (
          <Link
            key={service.slug}
            to={`/services/${service.slug}`}
            className="group rounded-xl border border-blue-100 bg-[#f4f7fc] p-5 transition hover:border-blue-300 hover:bg-white hover:shadow-sm"
          >
            <h2 className="text-lg font-bold text-[#0a1628] group-hover:text-blue-800">{service.title}</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">{service.description}</p>
            <span className="mt-4 inline-block text-sm font-semibold text-blue-700 group-hover:underline">
              View service →
            </span>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default AccountServices
