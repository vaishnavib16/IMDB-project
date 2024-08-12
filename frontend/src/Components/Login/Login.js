import React,{useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import './Login.css'

function Login() {

  const [email, setEmail] = useState("admin@test.com")
  const [password, setPassword] = useState("123")
  const navigate=useNavigate();

  useEffect(()=>{
    const auth=localStorage.getItem('User');
    if(auth){
      navigate('/')
    }

  },[])

  const handleclick=async()=>{
    console.log({email,password});
    let result=await fetch('http://localhost:8000/api/login',{
      method:'POST',
      body:JSON.stringify({email,password}),
      headers:{
        'Content-Type':'Application/JSON'
      }
    })
    result=await result.json();
    console.log(result)

    if(result.user){
      localStorage.setItem('User',JSON.stringify(result.user));
      localStorage.setItem('token',JSON.stringify(result.auth));
      navigate("/")
    }
    else{
      alert("Please Enter Valid details")
    }
  }

  return (
    
    <div className='form'>
      <h2>Login</h2>
      <input type="email" placeholder='Enter Your Email' value={email} onChange={(e)=>setEmail(e.target.value)}/>
      <input type="password" placeholder='Enter Your Password' value={password} onChange={(e)=>setPassword(e.target.value)}/>
      <button type='submit' onClick={handleclick}>Login</button>
    </div>
  )
}

export default Login
