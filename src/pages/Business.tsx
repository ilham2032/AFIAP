import { Link } from 'react-router'
import PageHeader from '../components/PageHeader'

const Business = () => {
  return (
    <>
      <PageHeader
        title="Business Solutions"
        description="Enterprise-grade technology services designed to streamline operations, reduce costs, and accelerate growth."
      />
      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: 'Digital Transformation',
              description: 'Modernize legacy systems and workflows with cloud-native, scalable architecture.',
            },
            {
              title: 'Process Automation',
              description: 'Robotics and AI solutions that eliminate repetitive tasks and improve accuracy.',
            },
            {
              title: 'Custom Development',
              description: 'Tailored web applications and APIs built to your exact specifications.',
            },
          ].map((item) => (
            <div key={item.title} className="rounded-2xl border border-blue-200 bg-white p-8">
              <h2 className="text-xl font-semibold text-blue-950">{item.title}</h2>
              <p className="mt-3 text-sm leading-7 text-blue-800">{item.description}</p>
            </div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Link
            to="/contact"
            className="inline-flex items-center justify-center rounded-full bg-blue-600 px-8 py-3 font-semibold text-white transition hover:bg-blue-700"
          >
            Discuss your project
          </Link>
        </div>
      </section>
    </>
  )
}

export default Business
