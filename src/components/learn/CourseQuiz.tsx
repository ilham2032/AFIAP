import { useState } from 'react'
import type { QuizQuestion } from '../../data/learnContent'

type CourseQuizProps = {
  questions: readonly QuizQuestion[]
  pageSize?: number
  label?: string
}

type AnswerState = {
  selectedIndex: number
  checked: boolean
}

const CourseQuiz = ({ questions, pageSize = 10, label = 'Question' }: CourseQuizProps) => {
  const [answers, setAnswers] = useState<Record<number, AnswerState>>({})
  const [page, setPage] = useState(0)

  const totalPages = Math.ceil(questions.length / pageSize)
  const pageStart = page * pageSize
  const pageQuestions = questions.slice(pageStart, pageStart + pageSize)

  const selectOption = (questionIndex: number, optionIndex: number) => {
    setAnswers((current) => ({
      ...current,
      [questionIndex]: { selectedIndex: optionIndex, checked: false },
    }))
  }

  const checkAnswer = (questionIndex: number) => {
    setAnswers((current) => {
      const existing = current[questionIndex]
      if (!existing) return current
      return {
        ...current,
        [questionIndex]: { ...existing, checked: true },
      }
    })
  }

  const checkedCount = Object.values(answers).filter((a) => a.checked).length
  const correctCount = questions.reduce((count, question, index) => {
    const answer = answers[index]
    return answer?.checked && answer.selectedIndex === question.correctIndex ? count + 1 : count
  }, 0)

  return (
    <div className="space-y-6">
      {totalPages > 1 && (
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-blue-100 bg-white px-4 py-3">
          <p className="text-sm font-semibold text-slate-700">
            Page {page + 1} of {totalPages} · {questions.length} questions
          </p>
          <div className="flex gap-2">
            <button
              type="button"
              disabled={page === 0}
              onClick={() => setPage((p) => p - 1)}
              className="btn-outline !px-4 !py-2 text-sm disabled:opacity-50"
            >
              Previous
            </button>
            <button
              type="button"
              disabled={page >= totalPages - 1}
              onClick={() => setPage((p) => p + 1)}
              className="btn-outline !px-4 !py-2 text-sm disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {pageQuestions.map((question, indexOnPage) => {
        const questionIndex = pageStart + indexOnPage
        const answer = answers[questionIndex]
        const isChecked = answer?.checked ?? false
        const isCorrect = isChecked && answer.selectedIndex === question.correctIndex

        return (
          <article
            key={`${questionIndex}-${question.question}`}
            className="rounded-xl border border-blue-100 bg-[#f4f7fc] p-5"
          >
            <p className="text-xs font-bold uppercase tracking-widest text-blue-700">
              {label} {questionIndex + 1}
            </p>
            <h3 className="mt-2 text-base font-bold text-[#0a1628]">{question.question}</h3>

            <div className="mt-4 space-y-2">
              {question.options.map((option, optionIndex) => {
                const isSelected = answer?.selectedIndex === optionIndex
                let optionClass = 'border-blue-100 bg-white hover:border-blue-200'

                if (isChecked) {
                  if (optionIndex === question.correctIndex) {
                    optionClass = 'border-green-300 bg-green-50'
                  } else if (isSelected) {
                    optionClass = 'border-red-300 bg-red-50'
                  }
                } else if (isSelected) {
                  optionClass = 'border-blue-400 bg-blue-50'
                }

                return (
                  <button
                    key={option}
                    type="button"
                    disabled={isChecked}
                    onClick={() => selectOption(questionIndex, optionIndex)}
                    className={`flex w-full items-start gap-3 rounded-xl border px-4 py-3 text-left text-sm transition disabled:cursor-default ${optionClass}`}
                  >
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-current text-xs font-bold">
                      {String.fromCharCode(65 + optionIndex)}
                    </span>
                    <span className="text-slate-700">{option}</span>
                  </button>
                )
              })}
            </div>

            {!isChecked ? (
              <button
                type="button"
                onClick={() => checkAnswer(questionIndex)}
                disabled={answer?.selectedIndex === undefined}
                className="btn-primary mt-4 !px-5 !py-2.5 disabled:opacity-50"
              >
                Check answer
              </button>
            ) : (
              <div
                className={`mt-4 rounded-xl border px-4 py-3 ${
                  isCorrect
                    ? 'border-green-200 bg-green-50'
                    : 'border-red-200 bg-red-50'
                }`}
              >
                <p className={`text-sm font-bold ${isCorrect ? 'text-green-800' : 'text-red-800'}`}>
                  {isCorrect ? 'Correct!' : 'Incorrect'}
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-700">{question.explanation}</p>
              </div>
            )}
          </article>
        )
      })}

      {checkedCount === questions.length && (
        <div className="rounded-xl border border-blue-100 bg-white p-5 text-center">
          <p className="text-sm font-semibold text-slate-700">All questions completed</p>
          <p className="mt-1 text-2xl font-bold text-blue-800">
            {correctCount} / {questions.length} correct
          </p>
        </div>
      )}
    </div>
  )
}

export default CourseQuiz
