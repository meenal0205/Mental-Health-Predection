import React, { useEffect, useState } from 'react'
import { getUserdetails } from '../utils/session'
import { getPatientsByTherapist } from '../services/services';
import PatientEntry from '../components/PatientEntry';

const TherapistDashboard = () => {
    const [patients, setPatients] = useState([]);

    useEffect(() => {
        const userDetails = getUserdetails();
        const fetchPatients = async () => {
            try {
                const response = await getPatientsByTherapist(userDetails.username);
                setPatients(response.data);
            } catch (error) {
                console.error(error);
            }
        }
        fetchPatients();
    }, [])

    return (
        <div className='grid grid-cols-3 gap-3'>
            {patients.map((patient, index) => (
                <PatientEntry key={index} name={patient.username} location={patient.location} />
            ))}
        </div>
    )
}

export default TherapistDashboard