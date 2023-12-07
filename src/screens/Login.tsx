
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    
    const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // console.log(username, password);
        
        // db.get('login').then((doc) => {
        //     console.log(doc);
        // });
        try {
            if(username === "_onflow" && password === "_onflow123")
            {
                toast.success("Login Successful");
                navigate('/home');
                
            }
            else{
                toast.error("Wrong Credentials");
            }
        } catch (error) {
           console.log(error.message);
        }
    };

    return (
        <div className='gap-16 w-full flex flex-col align-middle justify-center items-center h-screen'>
            <h1 className='font-bold text-4xl '>Welcome Back</h1>
            <form onSubmit={handleSubmit} className='w-2/6 flex flex-col  gap-5'>
                
                    <div className=' flex flex-col items-center justify-center'>
                        <p className= 'justify-start w-full text-gray-500'>Username</p>
                        <input className=' w-full border-2 border-slate-500 rounded-sm p-2' type='text' value={username} onChange={handleUsernameChange} />
                    </div>
                    <div className=' flex flex-col items-center justify-center'>
                        <p className= 'justify-start w-full text-gray-500'>Password</p>
                        <input className='w-full border-2 border-slate-500 rounded-sm p-2' type='password' value={password} onChange={handlePasswordChange} />
                    </div>
                    <div className='flex flex-row items-center justify-center'>
                    <button className='bg-[#60AFF8] text-slate-800 w-1/2 p-3 rounded-lg font-semibold text-xl '  >Submit</button>

                    </div>
            </form>
        </div>
    );
};


export default Login;
