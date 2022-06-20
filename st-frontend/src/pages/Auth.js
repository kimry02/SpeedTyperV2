import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signin, signup } from '../actions/auth';

const initialState = { username: '', password: ''};

const Auth = () => {
    const dispatch = useDispatch();
    const nav = useNavigate();
    const [formData, setFormData] = useState(initialState);
    const [register, registerSetter] = useState(false);
  
    const registerHere = () => {
        registerSetter(prevValue => !prevValue);
    }

    const handleRegister = (event) => {
        event.preventDefault();
        dispatch(signup(formData, nav))
        nav('/')
    }

    const handleLogin = (event) => {
        event.preventDefault();
        dispatch(signin(formData, nav))
        nav('/')
    }

    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value})
    }

    return (
        <div>
        {!register ? 
            <div className="grid grid-cols-4">
                <div className='mx-auto col-start-2 col-end-4 mt-40'>
                    <div className="rounded-sm bg-slate-200">
                        <div className="p-4">
                            <div className='font-bold text-center text-3xl mx-8 m-4'>
                                SPEED TYPER v2
                            </div>
                            <form onSubmit={handleLogin} className='w-64 flex flex-col place-content-evenly content-center mx-auto'>
                                <label className="text-center" >Username:</label>
                                <input onChange={handleChange} className="w-48 rounded-md m-2 self-center" type="text" id="username" name="username" placeholder="  Enter username here..."></input>
                                <label className="text-center" >Password:</label>
                                <input onChange={handleChange} className='w-48 rounded-md m-2 self-center' type="password" id="password" name="password" placeholder="  Enter password here..."></input>
                                <button className='bg-green-500 text-white text-center m-2 p-2 px-4 rounded-lg self-center' type="submit">Log In</button>
                            </form>
                            <div onClick={registerHere} className='text-center hover:cursor-pointer underline'>
                                Not a user? Register now.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        :
            <div className="grid grid-cols-4">
                <div className='mx-auto col-start-2 col-end-4 mt-40'>
                    <div className="rounded-sm bg-slate-200">
                        <div className="p-4">
                            <div className='font-bold text-center text-3xl mx-8 m-4'>
                                SPEED TYPER v2
                            </div>
                            <form onSubmit={handleRegister} className='w-64 flex flex-col place-content-evenly content-center mx-auto'>
                                <label className="text-center">Username:</label>
                                <input onChange={handleChange} className="w-48 rounded-md m-2 self-center" type="text" id="username" name="username" placeholder="  Enter username here..."></input>
                                <label className="text-center">Password:</label>
                                <input onChange={handleChange} className='w-48 rounded-md m-2 self-center' type="password" id="password" name="password" placeholder="  Enter password here..."></input>
                                <button className='bg-green-500 text-white text-center m-2 p-2 px-4 rounded-lg self-center' type="submit">Register</button>
                            </form>
                            <div onClick={registerHere} className='text-center hover:cursor-pointer underline'>
                                Need to log in? Log in here.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        }
        </div>
  )
}

export default Auth