import { Icon } from '@iconify/react/dist/iconify.js';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function DashboardLink({ name, nav, iconName }) {
  const location = useLocation();
  let isActive = false;

  if (location.pathname === nav) {
    isActive = true;
  }

  return (
    <Link to={nav} className={`hover:translate-x-[1px] text-lg hover:text-xl ${isActive && "border-r-4 border-[#EBE0FF]"} py-2`} >
      <div className='flex items-center gap-2'>
        <Icon icon={iconName} width={25} />
        <div className='font-mono cursor-pointer' >
          {name}
        </div>
      </div>
    </Link>
  )
}

export default DashboardLink