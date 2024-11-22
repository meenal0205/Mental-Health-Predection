import { getUserdetails } from '../../utils/session';
import React, { useState } from 'react'
import { createDiaryEntry } from '../../services/services';

const Modal = ({ closeModal }) => {
    const username = getUserdetails().username;
    const [title, setTitle] = useState("")
    const [content, setcontent] = useState("")

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        console.log(title);
        console.log(content)
        const response = await createDiaryEntry(title, username, content)
        console.log(response.data);
        closeModal()
    }
    return (
        <div className="fixed w-full h-full bg-black bg-opacity-60 flex z-50 items-center justify-center top-0 left-0">
            <div className="flex flex-col items-center w-1/3 bg-white rounded-md p-10">
                <div className='w-full'>
                    <h4 className='text-lg text-[#46325D] font-semibold w-fit'>
                        Create Diary Entry
                    </h4>
                    <br />
                    <form onSubmit={handleFormSubmit} className='w-full'>
                        <p
                            className='italic text-[#46325D]'
                        >
                            Title
                        </p>
                        <div className='relative'>
                            <input
                                id='title'
                                type='text'
                                className='rounded-md px-6 pt-6 pb-1 w-full text-lg focus:outline-none text-[#46325D] bg-zinc-200 peer'
                                value={title}
                                placeholder=''
                                onChange={(e) => { setTitle(e.target.value) }}

                            />
                            <label
                                htmlFor='code'
                                className='absolute text-md text-zinc-400 duration-150 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-6 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3'
                            >
                                Title
                            </label>
                        </div>
                        <br />
                        <p
                            className='italic text-[#46325D]'
                        >
                            Content
                        </p>
                        <div className='relative'>
                            <textarea
                                id='comtent'
                                type='text'
                                className='rounded-md px-6 pt-6 pb-1 w-full text-lg focus:outline-none text-[#46325D] bg-zinc-200 peer'
                                value={content}
                                placeholder=''
                                onChange={(e) => { setcontent(e.target.value) }}

                            />
                            <label
                                htmlFor='code'
                                className='absolute text-md text-zinc-400 duration-150 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-6 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3'
                            >
                                Content
                            </label>
                        </div>


                        <br />
                        <button
                            className='bg-[#46325D] text-white rounded-md px-6 py-2 w-full text-lg focus:outline-none mb-3'
                            type="submit"
                        >
                            Create
                        </button>

                        <br />
                        <button
                            className='bg-white text-[#46325D] border-2 border-[#46325D] rounded-md px-6 py-2 w-full text-lg focus:outline-none'
                            type="submit"
                            onClick={() => { closeModal() }}
                        >
                            Close
                        </button>
                    </form>
                </div>

            </div>
        </div>
    )
}

export default Modal