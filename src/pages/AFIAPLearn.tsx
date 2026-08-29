import { Link } from 'react-router'
import { learnBenefits, learnCourses, learnIntro } from '../data/site'

const AFIAPLearn = () => {
  return (
    <>
      <section className="bg-[#0a1628]">
        <div className="mx-auto max-w-[1170px] px-5 py-14 lg:px-6 lg:py-16">
          <p className="text-xs font-bold uppercase tracking-widest text-blue-400">Education</p>
          <h1 className="font-display mt-3 text-4xl text-white sm:text-5xl">AFIAP Learn</h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-blue-200">
            Free and premium courses to help you master web development, robotics, AI, and programming.
          </p>
        </div>
      </section>

      <section className="bg-white px-5 py-16 lg:px-6 lg:py-20">
        <div className="mx-auto max-w-[1170px]">
          <p className="text-xs font-bold uppercase tracking-widest text-blue-700">Overview</p>
          <h2 className="mt-3 max-w-2xl text-3xl font-bold text-[#0a1628] sm:text-4xl">
            Learn technology with AFIAP
          </h2>
          <p className="mt-5 max-w-3xl text-base leading-8 text-slate-600">{learnIntro}</p>
        </div>
      </section>

      <section className="bg-[#f4f7fc] px-5 py-16 lg:px-6 lg:py-20">
        <div className="mx-auto max-w-[1170px]">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-widest text-blue-700">Courses</p>
            <h2 className="mt-3 text-3xl font-bold text-[#0a1628] sm:text-4xl">Available courses</h2>
            <p className="mt-4 text-base leading-7 text-slate-600">
              Choose a course to start learning. Create an account to enroll and track your progress.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {learnCourses.map((course) => (
              <article
                key={course.title}
                className="rounded-xl border border-blue-100 bg-white p-6 shadow-sm transition hover:border-blue-300 hover:shadow-md"
              >
                <div className="flex flex-wrap items-center gap-3">
                  <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-bold text-blue-800">
                    {course.level}
                  </span>
                  <span className="text-sm font-medium text-slate-600">{course.duration}</span>
                </div>
                <h3 className="mt-4 text-xl font-bold text-[#0a1628]">{course.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{course.description}</p>
                <Link
                  to="/signup"
                  className="mt-5 inline-block text-sm font-semibold text-blue-700 hover:underline"
                >
                  Enroll now →
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-16 lg:px-6 lg:py-20">
        <div className="mx-auto max-w-[1170px]">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-widest text-blue-700">Why learn with us</p>
            <h2 className="mt-3 text-3xl font-bold text-[#0a1628] sm:text-4xl">Built for real-world skills</h2>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {learnBenefits.map((benefit) => (
              <div
                key={benefit.title}
                className="rounded-xl border border-blue-100 bg-[#f4f7fc] p-6"
              >
                <h3 className="text-lg font-bold text-[#0a1628]">{benefit.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#0a1628] px-5 py-16 lg:px-6 lg:py-20">
        <div className="mx-auto max-w-[1170px] text-center">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">Ready to start learning?</h2>
          <p className="mx-auto mt-4 max-w-lg text-blue-200">
            Create your AFIAP account to enroll in courses and access your learning dashboard.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link to="/signup" className="btn-primary !bg-white !text-blue-900 hover:!bg-blue-50">
              Create account
            </Link>
            <Link to="/login" className="btn-outline-light">Log in</Link>
          </div>
        </div>
      </section>
    </>
  )
}

export default AFIAPLearn
