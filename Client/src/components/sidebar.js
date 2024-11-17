import React from 'react'
import Logo from './sidebar-components/logo'
import DashboardLink from './dashboard-components/link'
import { useLocation } from 'react-router-dom'


function SideBar() {


  return (
    <div className='w-[15%] fixed h-[100%] text-[#EBE0FF] bg-[#46325D]'>
      <Logo />
      <div className='flex flex-col gap-y-3 ml-8 mt-14'>
        <DashboardLink name="Dashboard" nav="/dashboard" iconName="ic:sharp-dashboard" />
        <DashboardLink name="Diary" nav="/diary" iconName="mdi:diary" />
        <DashboardLink name="Therapists" nav="/therapists" iconName="fa6-solid:user-doctor" />
        <DashboardLink name="My Profile" nav="/profile" iconName="iconamoon:profile-fill" />
      </div>
    </div>
  )
}

export default SideBar