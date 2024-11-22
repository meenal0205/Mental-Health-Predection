import { Icon } from '@iconify/react/dist/iconify.js'
import React, { useState } from 'react'
import { getUserdetails, setUser } from '../../utils/session'
import { consultTherapist } from '../../services/services'

const TherapistEntry = ({ name, exp, location }) => {
    const userDetails = getUserdetails();
    const [consulted, setConsulted] = useState(userDetails.therapist === name);

    const handleClick = async (e) => {
        try {
            const response = await consultTherapist(userDetails.username, name);
            if (response.status === 200) {
                setConsulted(true);
                setUser(userDetails.username, userDetails.type, name)
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className='shadow-md rounded-md p-3 bg-white'>
            <div className='flex gap-5 font-mono'>
                <div className='p-2 rounded-full border-2 border-[#46325d] my-auto'>
                    <Icon icon="fa6-solid:user-doctor" className='text-[#46325d]' width={25} />
                </div>
                <div>
                    <h2 className='font-semibold text-xl text-[#46325d]'>{name}</h2>
                    <h3 className=''> Experience: {exp} years</h3>
                    <h3>Location: {location}</h3>
                </div>
            </div>
            <div>
                <button className='bg-[#46325d] text-white rounded-md p-1 mt-2 w-full disabled:bg-gray-400 disabled:cursor-not-allowed' onClick={handleClick} disabled={consulted}>
                    {consulted ? "Consulted" : "Consult"}
                </button>
            </div>
        </div>
    )
}

export default TherapistEntry