import PageHeader from '../components/PageHeader'
import { team } from '../data/site'

const Team = () => {
  return (
    <>
      <PageHeader
        title="Our Team"
        description="Meet the people behind AFIAP — experienced professionals dedicated to delivering exceptional results."
      />
      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((member) => (
            <article key={member.name} className="rounded-2xl border border-blue-200 bg-white p-6 text-center">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-blue-100 text-2xl font-bold text-blue-600">
                {member.name.split(' ').map((n) => n[0]).join('')}
              </div>
              <h2 className="mt-4 text-lg font-semibold text-blue-950">{member.name}</h2>
              <p className="text-sm font-medium text-blue-600">{member.role}</p>
              <p className="mt-3 text-sm leading-6 text-blue-800">{member.bio}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  )
}

export default Team
