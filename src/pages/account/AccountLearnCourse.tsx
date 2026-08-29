import { Link, useParams } from 'react-router'
import CourseQuiz from '../../components/learn/CourseQuiz'
import {
  getCourseLessonCount,
  getCourseQuestionCount,
  getLearnCourse,
} from '../../data/learnContent'
import NotFound from '../NotFound'

const AccountLearnCourse = () => {
  const { courseSlug } = useParams()
  const course = courseSlug ? getLearnCourse(courseSlug) : undefined

  if (!course) return <NotFound />

  const totalQuestions = getCourseQuestionCount(course)
  const totalLessons = getCourseLessonCount(course)

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-blue-100 bg-white p-6 shadow-sm lg:p-8">
        <Link
          to="/account/learn"
          className="text-sm font-semibold text-blue-700 hover:underline"
        >
          ← Back to courses
        </Link>

        <div className="mt-4 flex flex-wrap items-center gap-3">
          <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-bold text-blue-800">
            {course.level}
          </span>
          <span className="text-sm font-medium text-slate-600">{course.duration}</span>
          <span className="rounded-full bg-[#f4f7fc] px-3 py-1 text-xs font-semibold text-slate-600">
            {totalLessons} lessons
          </span>
          <span className="rounded-full bg-[#f4f7fc] px-3 py-1 text-xs font-semibold text-slate-600">
            {totalQuestions} test questions
          </span>
        </div>

        <h1 className="mt-3 text-2xl font-bold text-[#0a1628] sm:text-3xl">{course.title}</h1>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">{course.description}</p>
      </div>

      {course.studySections.map((section, index) => (
        <div key={section.title} className="rounded-2xl border border-blue-100 bg-white p-6 shadow-sm lg:p-8">
          <p className="text-xs font-bold uppercase tracking-widest text-blue-700">
            Lesson {index + 1} of {totalLessons}
          </p>
          <h2 className="mt-2 text-xl font-bold text-[#0a1628]">{section.title}</h2>

          <div className="mt-6 rounded-xl border border-blue-50 bg-[#f4f7fc] p-5 lg:p-6">
            <p className="text-xs font-bold uppercase tracking-widest text-blue-700">Full explanation</p>
            <div className="mt-4 space-y-4">
              {section.explanation.map((paragraph) => (
                <p key={paragraph.slice(0, 48)} className="text-sm leading-7 text-slate-700">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          <div className="mt-8 border-t border-blue-100 pt-8">
            <p className="text-xs font-bold uppercase tracking-widest text-blue-700">Questions for this lesson</p>
            <h3 className="mt-2 text-lg font-bold text-[#0a1628]">
              {section.quiz.length} questions · {section.title}
            </h3>
            <p className="mt-2 text-sm text-slate-600">
              Read the explanation above, then answer each question. Click &quot;Check answer&quot; to see if you are correct and why.
            </p>
            <div className="mt-6">
              <CourseQuiz
                questions={section.quiz}
                pageSize={5}
                label={`Q${index + 1}.`}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default AccountLearnCourse
