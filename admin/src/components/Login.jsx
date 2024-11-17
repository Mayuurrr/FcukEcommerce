import React, { useState } from 'react';
import axios from 'axios'
import { backendURL } from '../App';
import { toast } from 'react-toastify';

const Login = ({setToken}) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const onSubmitHandler = async (e) => {
        try {
            e.preventDefault();
            const response = await axios.post(backendURL + '/api/user/admin',{email,password})
            if(response.data.success) {
                setToken(response.data.token)
            }
            else {
                toast.error(response.data.message)
            }
            
        } catch (error) {

        }
    }

    return (
        <div className='min-h-screen flex items-center justify-center w-full bg-gray-100'>
            <div className='border border-white shadow-md rounded-lg px-8 py-6 max-w-md w-full bg-white'>
                <h1 className='text-2xl font-bold mb-4 text-center'>Admin Panel</h1>
                <form onSubmit={onSubmitHandler}>
                    <div className='mb-3 min-w-72'>
                        <p className='text-sm font-medium text-gray-800 mb-2'>Email Address</p>
                        <input
                        onChange={(e)=>setEmail(e.target.value)} value= {email}
                            className='rounded-md w-full px-3 py-2 border border-gray-400 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200'
                            type="email"
                            placeholder="your@email.com"
                            required
                        />
                    </div>
                    <div className='mb-3 min-w-72'>
                        <p className='text-sm font-medium text-gray-800 mb-2'>Password</p>
                        <input
                        onChange={(e)=>setPassword(e.target.value)} value= {password}
                            className='rounded-md w-full px-3 py-2 border border-gray-400 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200'
                            type="password"
                            placeholder="Enter your password"
                            required
                        />
                    </div>
                    <button
                        className='mt-2 w-full py-2 px-4 rounded-md text-white bg-black'
                        type='submit'
                    >Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;