type PageHeaderProps = {
  title: string
  description: string
}

const PageHeader = ({ title, description }: PageHeaderProps) => {
  return (
    <section className="border-b border-blue-100 bg-blue-50">
      <div className="mx-auto max-w-6xl px-6 py-14 lg:px-10">
        <div className="max-w-3xl space-y-3">
          <h1 className="font-display text-4xl text-blue-950 sm:text-5xl">{title}</h1>
          <p className="text-base font-semibold leading-8 text-blue-800">{description}</p>
        </div>
      </div>
    </section>
  )
}

export default PageHeader
