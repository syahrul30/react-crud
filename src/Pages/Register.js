import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { API } from '../const/endpoint';
import './Register.css'

const Register = () => {
    const [email, setEmail] = useState("")
    const handleEmail = (e) => {
        setEmail(e.target.value)
    }

    const [password, setPassword] = useState("")
    const handlePassword = (e) => {
        setPassword(e.target.value)
    }

    const navigate = useNavigate()

    const handleRegis = () => {
        const payLoad = {
            email : email,
            password : password,
            role : "Admin",
        }

        axios
            .post(API.REGISTER, payLoad)
            .then((res) => { 
                console.log(res)
                navigate("/login")
            })
            .catch((err) => console.log(err.message))
    }

    return ( 
        <div>
            <Navbar />
            <div className="regis-wrapped">
                <div className='regis-container'>
                    <h1>Register Admin</h1>
                    <input onChange={handleEmail} placeholder='email'type='email' className='register-input'/>
                    <input onChange={handlePassword} placeholder='password' type='password' className='register-input'/>
                    <button 
                        onClick={handleRegis} className='register-button'>Register
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Register;