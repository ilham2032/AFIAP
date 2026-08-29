import { Link } from 'react-router'
import PageHeader from '../components/PageHeader'

const NotFound = () => {
  return (
    <>
      <PageHeader
        title="Page not found"
        description="The page you are looking for does not exist or may have been moved."
      />
      <section className="mx-auto max-w-6xl px-6 py-16 text-center lg:px-10">
        <Link
          to="/"
          className="inline-flex items-center justify-center rounded-full bg-blue-600 px-8 py-3 text-base font-semibold text-white transition hover:bg-blue-700"
        >
          Back to Home
        </Link>
      </section>
    </>
  )
}

export default NotFound
