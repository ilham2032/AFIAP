import { learnCourses } from '../../data/site'

const AccountLearn = () => {
  return (
    <div className="rounded-2xl border border-blue-100 bg-white p-6 shadow-sm lg:p-8">
      <p className="text-xs font-bold uppercase tracking-widest text-blue-700">AFIAP Learn</p>
      <h1 className="mt-2 text-2xl font-bold text-[#0a1628] sm:text-3xl">Your learning hub</h1>
      <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">
        Access courses and learning resources included with your AFIAP account.
      </p>

      <div className="mt-8 grid gap-4">
        {learnCourses.map((course) => (
          <article key={course.title} className="rounded-xl border border-blue-100 bg-[#f4f7fc] p-5">
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-bold text-blue-800">
                {course.level}
              </span>
              <span className="text-sm font-medium text-slate-600">{course.duration}</span>
            </div>
            <h2 className="mt-3 text-lg font-bold text-[#0a1628]">{course.title}</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">{course.description}</p>
            <button type="button" className="btn-primary mt-4 !px-5 !py-2.5">
              Continue learning
            </button>
          </article>
        ))}
      </div>
    </div>
  )
}

export default AccountLearn
