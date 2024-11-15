import React from 'react'

import { Icon } from '@iconify/react';

function Navbar() {
  return (
    <div className='h-14 bg-[#EBE0FF] shadow-md top-0 sticky'>
      <div className='flex relative'>
        <p className='text-md font-mono absolute left-4 top-4  text-[#46325d] font-semibold'>Hi, Meenal</p>
        <Icon icon="iconamoon:profile-bold" className='text-4xl rounded-full shadow-lg p-1 border-black border-2 absolute right-5 top-2 ' />
      </div>
    </div>
  )
}

export default Navbar