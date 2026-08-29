import PageHeader from '../components/PageHeader'
import { partners } from '../data/site'

const Partners = () => {
  return (
    <>
      <PageHeader
        title="Our Partners"
        description="We collaborate with industry-leading platforms and technology providers to deliver the best solutions."
      />
      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
          {partners.map((partner) => (
            <div
              key={partner}
              className="flex items-center justify-center rounded-2xl border border-blue-200 bg-white px-6 py-10 text-center font-semibold text-blue-800 transition hover:border-blue-200 hover:shadow-sm"
            >
              {partner}
            </div>
          ))}
        </div>
      </section>
    </>
  )
}

export default Partners
