import axios from "axios";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { API } from "../const/endpoint";
import { Navigate, useNavigate } from "react-router-dom";
import './Login.css'

const Login = () => {
    const [email, setEmail] = useState("")
    const handleEmail = (e) => {
        setEmail(e.target.value)
    }

    const [password, setPassword] = useState("")
    const handlePassword = (e) => { 
        setPassword(e.target.value)
    }

    const navigate = useNavigate()

    const [isLogin, setIsLogin] = useState(false)

    useEffect (() => {
        const token = localStorage.getItem("token")
        if (!token){
            setIsLogin(false)
        } else{
            setIsLogin(true)
        }
    })

    const handleLogin = () => {
        const payLoad = {
            email: email,
            password: password
        }

        axios
            .post(API.LOGIN, payLoad)
            .then((ress) => {
                console.log(ress)
                localStorage.setItem("token", ress.data.access_token);
                navigate("/discovery")
            })
            .catch((err) => console.log(err.message))
    }

    const handleLogout = (() => {
        localStorage.removeItem("token")
        Navigate("/")
    })

    return ( 
        <div>
            <Navbar />
            {
                isLogin ? (
                    <div className="logout-button">
                        <button onClick={handleLogout}>Log Out</button>
                    </div>
                    ) : (
                    <div className="login-wrapped">
                        <div className="login-container">
                            <h1>Login Admin</h1>
                            <input onChange={handleEmail} placeholder='email'type='email' className='register-input'/>
                            <input onChange={handlePassword} placeholder='password' type='password' className='register-input'/>
                            <button onClick={handleLogin} className='register-button'>Login</button>
                        </div>
                    </div>)
            }
            
        </div>
        
    );
}

export default Login;