import { Outlet } from 'react-router'
import AccountSidebar from './AccountSidebar'

const AccountLayout = () => {
  return (
    <section className="bg-[#f4f7fc] px-5 py-10 lg:px-6 lg:py-14">
      <div className="mx-auto grid max-w-[1170px] gap-8 lg:grid-cols-[280px_1fr] lg:gap-10">
        <AccountSidebar />
        <div className="min-w-0">
          <Outlet />
        </div>
      </div>
    </section>
  )
}

export default AccountLayout
