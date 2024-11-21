import React, { useState, useEffect } from 'react';
import TherapistEntry from './therapists-components/therapistEntry';
import { getAllTherapists } from '../services/services';








function Therapists() {
  const [therapists, setTherapists] = useState([])
  useEffect(() => {
    async function TherapistList() {
      const response = await getAllTherapists();
      setTherapists(response.data)
    };

    TherapistList();


  }, [])

  return (
    <div>
      <div className='grid grid-cols-3 gap-3'>
        {therapists.map((therapist, index) => (
          <TherapistEntry key={index} name={therapist.username} exp={therapist.exp} location={therapist.location} />
        ))}
      </div>
    </div>
  )
}

export default Therapists