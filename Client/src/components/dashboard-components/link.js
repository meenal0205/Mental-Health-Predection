import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom';
function DashboardLink( {name, nav} ) {
  const navigate = useNavigate();
  
    
  return (
    <Link to={nav} className='hover:translate-x-[1px]' >
    <div className='font-semibold font-mono cursor-pointer ' >
      
     {name} 
      </div>
      </Link>
  )
}

export default DashboardLink