import { Icon } from '@iconify/react/dist/iconify.js'
import React from 'react'
import { getUserdetails } from '../utils/session'



function Profile() {
    const userDetails = getUserdetails();
    return (
        <div className='m-auto p-20 px w-fit h-fit bg-white rounded-md shadow-md'>
            <div className='flex flex-col items-center'>
                <Icon icon="ix:user-profile-filled" width={100} color='#46325d' />
                <p className='text-[#46325d]'>{userDetails.username}</p>
            </div>
            <div className='mt-10'>
                <p><span className='font-semibold'>Therapist Consulted:</span> {userDetails.therapist == '' ? "No Consultations" : userDetails.therapist}</p>
            </div>
        </div>
    )
}

export default Profile