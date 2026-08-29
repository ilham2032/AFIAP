import PageHeader from '../components/PageHeader'
import { reviews } from '../data/site'

const Reviews = () => {
  return (
    <>
      <PageHeader
        title="Client Reviews"
        description="Real feedback from businesses that have worked with AFIAP."
      />
      <section className="mx-auto max-w-3xl space-y-6 px-6 py-16 lg:px-10">
        {reviews.map((review) => (
          <article key={review.author} className="rounded-2xl border border-blue-200 bg-white p-6">
            <div className="flex gap-1 text-amber-400">
              {Array.from({ length: review.rating }).map((_, i) => (
                <span key={i}>★</span>
              ))}
            </div>
            <p className="mt-3 text-blue-800">&ldquo;{review.text}&rdquo;</p>
            <p className="mt-4 text-sm font-medium text-blue-700">— {review.author}</p>
          </article>
        ))}
      </section>
    </>
  )
}

export default Reviews
