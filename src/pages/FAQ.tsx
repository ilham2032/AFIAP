import { Link } from 'react-router'
import { contactInfo, faqs } from '../data/site'

const FAQ = () => {
  return (
    <>
      <section className="bg-[#0a1628]">
        <div className="mx-auto max-w-[1170px] px-5 py-14 lg:px-6 lg:py-16">
          <p className="text-xs font-bold uppercase tracking-widest text-blue-400">Help center</p>
          <h1 className="font-display mt-3 text-4xl text-white sm:text-5xl">Frequently asked questions</h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-blue-200">
            Find answers to common questions about our services, process, and support.
          </p>
        </div>
      </section>

      <section className="bg-white px-5 py-16 lg:px-6 lg:py-20">
        <div className="mx-auto grid max-w-[1170px] gap-12 lg:grid-cols-5 lg:gap-16">
          <div className="lg:col-span-2">
            <p className="text-xs font-bold uppercase tracking-widest text-blue-700">FAQ</p>
            <h2 className="mt-3 text-2xl font-bold text-[#0a1628]">Common questions</h2>
            <p className="mt-4 text-sm leading-7 text-slate-600">
              Browse the questions below. If you cannot find what you are looking for, our team is
              happy to help.
            </p>
            <div className="mt-8 rounded-xl border border-blue-100 bg-[#f4f7fc] p-5">
              <p className="text-xs font-bold uppercase tracking-widest text-blue-700">Need more help?</p>
              <p className="mt-2 text-sm leading-6 text-slate-600">{contactInfo.responseTime}</p>
              <Link to="/contact" className="btn-primary mt-4 inline-flex !px-5 !py-2.5">
                Contact us
              </Link>
            </div>
          </div>

          <div className="space-y-3 lg:col-span-3">
            {faqs.map((faq) => (
              <details
                key={faq.question}
                className="group rounded-xl border border-blue-100 bg-[#f4f7fc] open:border-blue-300 open:bg-white open:shadow-sm"
              >
                <summary className="cursor-pointer list-none px-5 py-4 marker:content-none">
                  <span className="flex items-center justify-between gap-4">
                    <span className="text-sm font-semibold text-[#0a1628] sm:text-base">
                      {faq.question}
                    </span>
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-800 transition group-open:rotate-45">
                      +
                    </span>
                  </span>
                </summary>
                <p className="border-t border-blue-100 px-5 pb-5 pt-4 text-sm leading-7 text-slate-600">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#0a1628] px-5 py-16 lg:px-6 lg:py-20">
        <div className="mx-auto max-w-[1170px] text-center">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">Still have questions?</h2>
          <p className="mx-auto mt-4 max-w-lg text-blue-200">
            Reach out to our team and we will help you find the right solution for your project.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link to="/contact" className="btn-primary !bg-white !text-blue-900 hover:!bg-blue-50">
              Get in touch
            </Link>
            <Link to="/services" className="btn-outline-light">View services</Link>
          </div>
        </div>
      </section>
    </>
  )
}

export default FAQ
