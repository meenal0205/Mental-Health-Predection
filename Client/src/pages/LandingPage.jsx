import React from 'react'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
const LandingPage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    // fetch("http://localhost:8000/api/home").then(
    //   response => response.json()
    // ).then((data) => {
    //   setMessage(data.message);
    // }
    // )
    navigate('/login')
  }, [navigate])
  return (
    <div>LandingPage</div>
  )
}

export default LandingPage