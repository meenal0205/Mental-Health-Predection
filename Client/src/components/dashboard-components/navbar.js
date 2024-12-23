import React from 'react'

import { Icon } from '@iconify/react';
import { getUserdetails } from '../../utils/session';

function Navbar() {
  return (
    <div className='h-[10%] bg-[#fffcf9] shadow-sm top-0 sticky z-20'>
      <div className='flex relative'>
        <p className='text-md font-mono absolute left-8 top-4  text-[#46325d] font-semibold'>Hi, {getUserdetails().username}</p>
        <Icon icon="ix:user-profile-filled" className='p-1 absolute right-5 top-2' color='#46325d' width={40} />
      </div>
    </div>
  )
}

export default Navbar