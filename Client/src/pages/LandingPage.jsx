import React from 'react'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
const LandingPage = () => {
    const navigate = useNavigate();
    useEffect(() => {
      
        navigate('/login')
    }, [navigate])
  return (
    <div>LandingPage</div>
  )
}

export default LandingPage