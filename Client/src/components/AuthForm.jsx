import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { createUser, login } from '../services/services';
import { getUserdetails, setUser } from '../utils/session';
const AuthForm = ({ type }) => {
    const navigate = useNavigate();
    const [userType, setUserType] = useState('patient');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [location, setlocation] = useState('')
    const [exp, setExp] = useState()

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        let response;
        if (type === "login") {
            try {
                response = await login(username, password, userType)
                if (response.status === 200) {
                    setUser(response.data.username, response.data.type, response.data.therapist ? response.data.therapist : "")
                    console.log(getUserdetails());
                    navigate('/dashboard')
                }
            }
            catch (error) {
                console.error(error);
                setMessage(error.response?.data.error)
            }
        }
        else {
            if (password === confirmPassword) {
                response = await createUser(username, password, userType, location, exp)
                if (response.status === 202) {
                    navigate('/login')
                }
                else {
                    setMessage("Something went wrong. Cant create user")
                }
                setMessage("")
            }
            else {
                setMessage("Password and confirmed password do not match")
            }
        }
    }

    return (
        <div>
            <div className='fixed flex items-center justify-center -z-10'>
                <img
                    className='h-screen w-screen'
                    src='https://images.unsplash.com/photo-1564121211835-e88c852648ab?ixid=M3wzOTE5Mjl8MHwxfHNlYXJjaHw5fHxtZW50YWwlMjBoZWFsdGh8ZW58MHx8fHwxNzMxMjU5MjgxfDA&ixlib=rb-4.0.3&auto=format&fit=clip&h=432&q=100'
                    alt='classroom'
                />
            </div>

            <div className='bg-black bg-opacity-40 h-screen flex items-center justify-center'>
                <h2 className='absolute top-4 left-4 text-3xl text-[#916DD5] font-semibold w-fit'>
                    MyTherapist
                </h2>
                <div className='bg-white p-12 rounded-lg shadow-xl w-1/3'>
                    <h2 className='text-3xl text-[#916DD5] font-semibold mb-10'>{type === 'register' ? 'Register' : 'Login'}</h2>
                    <form onSubmit={handleFormSubmit}>
                        <div className='relative'>
                            <div className="flex gap-1 w-full">
                                <label className={`w-1/2 text-center p-2 cursor-pointer ${userType === 'patient' ? "bg-[#916DD5] text-white" : "border-2"} rounded-md`} >
                                    <input
                                        type="radio"
                                        value="patient"
                                        checked={userType === 'patient'}
                                        onChange={() => setUserType('patient')}
                                        className="mr-2 leading-tight appearance-none "
                                    />
                                    <span className="text-lg">Patient</span>
                                </label>
                                <label className={`w-1/2 text-center p-2 cursor-pointer ${userType === 'therapist' ? "bg-[#916DD5] text-white" : "border-2"} rounded-md`} >
                                    <input
                                        type="radio"
                                        value="therapist"
                                        checked={userType === 'therapist'}
                                        onChange={() => setUserType('therapist')}
                                        className="mr-2 leading-tight appearance-none"
                                    />
                                    <span className="text-lg">Therapist</span>
                                </label>
                            </div>
                        </div>
                        <br />
                        <div className='relative'>
                            <input
                                id='username'
                                type='text'
                                value={username}
                                className='rounded-md px-6 pt-6 pb-1 w-full text-lg focus:outline-none text-[#916DD5] bg-zinc-200 peer'
                                placeholder=' '
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            <label
                                htmlFor='username'
                                className='absolute text-md text-zinc-400 duration-150 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-6 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3'
                            >
                                Username
                            </label>
                        </div>
                        <br />
                        <div className='relative'>
                            <input
                                id='password'
                                type='password'
                                value={password}
                                className='rounded-md px-6 pt-6 pb-1 w-full text-lg focus:outline-none text-[#916DD5] bg-zinc-200 peer'
                                placeholder=' '
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <label
                                htmlFor='password'
                                className='absolute text-md text-zinc-400 duration-150 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-6 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3'
                            >
                                Password
                            </label>
                        </div>
                        {type === 'register' && (<>
                            <br />
                            <div className='relative'>
                                <input
                                    id='confirmPassword'
                                    type='password'
                                    value={confirmPassword}
                                    className='rounded-md px-6 pt-6 pb-1 w-full text-lg focus:outline-none text-[#916DD5] bg-zinc-200 peer'
                                    placeholder=' '
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                                <label
                                    htmlFor='confirmPassword'
                                    className='absolute text-md text-zinc-400 duration-150 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-6 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3'
                                >
                                    Confirm Password
                                </label>
                            </div>
                            <br />
                            <div className='relative'>
                                <input
                                    id='location'
                                    type='text'
                                    value={location}
                                    className='rounded-md px-6 pt-6 pb-1 w-full text-lg focus:outline-none text-[#916DD5] bg-zinc-200 peer'
                                    placeholder=' '
                                    onChange={(e) => setlocation(e.target.value)}
                                />
                                <label
                                    htmlFor='confirmPassword'
                                    className='absolute text-md text-zinc-400 duration-150 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-6 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3'
                                >
                                    Location
                                </label>
                            </div>
                            <br />
                            {userType === 'therapist' &&
                                <div className='relative'>
                                    <input
                                        id='exp'
                                        type='text'
                                        value={exp}
                                        className='rounded-md px-6 pt-6 pb-1 w-full text-lg focus:outline-none text-[#916DD5] bg-zinc-200 peer'
                                        placeholder=' '
                                        onChange={(e) => setExp(e.target.value)}
                                    />
                                    <label
                                        htmlFor='exp'
                                        className='absolute text-md text-zinc-400 duration-150 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-6 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3'
                                    >
                                        Years of Expirience
                                    </label>
                                </div>
                            }
                        </>)}
                        <br />
                        <p className='italic text-[#916DD5]'>
                            {message}
                        </p>
                        <button
                            className='bg-[#916DD5] text-white rounded-md px-6 py-2 w-full text-lg focus:outline-none'
                            type="submit"
                        >
                            {type === 'register' ? 'Register' : 'Login'}
                        </button>
                    </form>
                    <br />
                    <h2>
                        {type === 'register' ? 'Already a user? ' : "Don't have an account? "}
                        <span
                            className='text-[#916DD5] underline cursor-pointer'
                            onClick={() => navigate(`/${type === 'register' ? 'login' : 'register'}`)}
                        >
                            Click here
                        </span>
                    </h2>
                </div>
            </div>
        </div>
    );
}

export default AuthForm