import React from 'react'

import { Icon } from '@iconify/react';

function Navbar() {
  return (
    <div className='h-[10%] bg-[#fffcf9] shadow-sm top-0 sticky z-20'>
      <div className='flex relative'>
        <p className='text-md font-mono absolute left-8 top-4  text-[#46325d] font-semibold'>Hi, Meenal</p>
        <Icon icon="ix:user-profile-filled" className='p-1 absolute right-5 top-2 text-[#46325d]' width={40} />
      </div>
    </div>
  )
}

export default Navbar