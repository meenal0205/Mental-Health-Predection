import React from 'react'
import Logo from './sidebar-components/logo'
import DashboardLink from './dashboard-components/link'

function SideBar() {
  return (
    <div className='w-[15%] fixed h-[100%] bg-[#EBE0FF] '>
      <Logo />
      <div className='flex flex-col gap-y-7  place-items-center mt-14'>
        <DashboardLink name={"Dashboard"} nav={"/dashboard"} />
        <DashboardLink name={"Diary"} nav={"/diary"} />
        <DashboardLink name={"Therapists"} nav={"/therapists"} />
      </div>
    </div>
  )
}

export default SideBar