import React, { useEffect, useState } from 'react'
import DiaryEntry from './diary-components/diaryEntry'
import { getAllDiaryEntriesByUsername } from '../services/services'
import { getUserdetails } from '../utils/session'
import Modal from './diary-components/modal'

const Diary = () => {
  const [diaryEntries, setDiaryEntries] = useState([])
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const username = getUserdetails().username;
    async function getAllDiaryEntries(username) {
      let response = await getAllDiaryEntriesByUsername(username);
      setDiaryEntries(response.data);
      console.log(response.data);

    }
    getAllDiaryEntries(username);
  }, [])

  return (
    <div>
      <div className='flex justify-between items-end relative mb-4'>
        <h1 className='text-xl font-bold'>Diary Entries</h1>
        <button className='right-0 shadow-md rounded-md p-2 bg-[#46325D] text-white font-bold' onClick={() => setShowModal(true)}>+ CREATE</button>
      </div>
      <div>
        {diaryEntries.map((entry, index) => (
          <div>
            <DiaryEntry key={index} title={entry.title} content={entry.content} date={entry.created_at} sentiment={entry.sentiment} />
          </div>
        ))}
      </div>
      {showModal &&
        <Modal
          closeModal={() => setShowModal(false)}
        />
      }
    </div>
  )
}

export default Diary;