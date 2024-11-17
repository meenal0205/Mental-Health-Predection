import React from 'react';
import TherapistEntry from './therapists-components/therapistEntry';

const therapistsData = [
  {
    name: 'Dr. John Doe',
    number: '+91 1234567890'
  },
  {
    name: 'Dr. Ash Brown',
    number: '+91 7894561230'
  },
  {
    name: 'Dr. Penny Smith',
    number: '+91 4561237890'
  },
  {
    name: 'Dr. Jane Carter',
    number: '+91 7891234560'
  }
]

function Therapists() {
  return (
    <div>
      <div className='grid grid-cols-3 gap-3'>
        {therapistsData.map((therapist, index) => (
          <TherapistEntry key={index} name={therapist.name} number={therapist.number} />
        ))}
      </div>
    </div>
  )
}

export default Therapists