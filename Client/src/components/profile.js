import { Icon } from '@iconify/react/dist/iconify.js'
import React from 'react'
import { getUserdetails } from '../utils/session'



function Profile() {
    const userDetails = getUserdetails();
    return (
        <div className='m-auto mt-20 w-80 h-80 bg-white rounded-md shadow-md'>
            <Icon icon="ix:user-profile-filled" width={70} className='m-auto relative top-10' />
            <div className='relative left-20 top-20'>
                <p> Username : {userDetails.username}</p>
                <p>Therpist Consulted : {userDetails.therapist = '' ? "No Consultations" : userDetails.therapist}</p>
            </div>
        </div>
    )
}

export default Profile