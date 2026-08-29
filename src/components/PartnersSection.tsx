import { Link } from 'react-router'
import { partnerLogos } from '../data/site'

const PartnersSection = () => {
  return (
    <section className="border-t border-blue-100 bg-white px-5 py-16 lg:px-6 lg:py-20">
      <div className="mx-auto max-w-[1170px]">
        <div className="text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-blue-700">Partners</p>
          <h2 className="mt-3 text-3xl font-bold text-[#0a1628] sm:text-4xl">Our partners</h2>
          <p className="mx-auto mt-4 max-w-xl text-slate-600">
            AFIAP collaborates with leading institutions and organizations across Azerbaijan.
          </p>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {partnerLogos.map((partner) => (
            <div
              key={partner.name}
              className="flex h-32 items-center justify-center rounded-xl border border-blue-100 bg-[#f4f7fc] p-5"
            >
              <img
                src={partner.logo}
                alt={partner.name}
                className="max-h-20 w-full max-w-[160px] object-contain"
              />
            </div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Link to="/become-a-partner" className="btn-primary">
            Become a Partner
          </Link>
          <p className="mx-auto mt-4 max-w-md text-sm text-slate-600">
            Register your organization and join our growing partner network.
          </p>
        </div>
      </div>
    </section>
  )
}

export default PartnersSection
