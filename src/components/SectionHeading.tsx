type SectionHeadingProps = {
  eyebrow?: string
  title: string
  description?: string
  align?: 'left' | 'center'
}

const SectionHeading = ({ eyebrow, title, description, align = 'center' }: SectionHeadingProps) => {
  const alignment = align === 'center' ? 'text-center mx-auto' : 'text-left'

  return (
    <div className={`max-w-2xl space-y-3 ${alignment}`}>
      {eyebrow && (
        <p className="text-xs font-bold uppercase tracking-widest text-blue-700">{eyebrow}</p>
      )}
      <h2 className="text-3xl font-bold text-[#0a1628] sm:text-4xl">{title}</h2>
      {description && (
        <p className="text-base leading-7 text-slate-600">{description}</p>
      )}
    </div>
  )
}

export default SectionHeading
