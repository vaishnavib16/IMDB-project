
import React,{useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import './Signup.css'


function Signup() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate=useNavigate();

    useEffect(()=>{
      const auth=localStorage.getItem('User')
      if(auth){
        navigate('/')
      }
    })

    const handleClick=async()=>{
        console.log(name,email,password);
        let result=await fetch('http://localhost:8000/api/register',{
            method:'Post',
            body: JSON.stringify({name,email,password}),
            headers:{
              'Content-Type': 'application/json'
            }

        })
        result=await result.json();
        console.log(result);
        localStorage.setItem('User',JSON.stringify(result.user));
        localStorage.setItem('token',JSON.stringify(result.auth));

        if(result){
          navigate('/')        
        }
    }
    
  return (
    <div className='form'>
        <h2>Register</h2>

      <input type="text" placeholder='Enter your name' value={name} onChange={(e)=>setName(e.target.value)}/>

      <input type="email" placeholder='Enter your email' value={email} onChange={(e)=>setEmail(e.target.value)} />

      <input type="password" placeholder='Enter your password' value={password} onChange={(e)=>setPassword(e.target.value)} />

      <button type='submit' onClick={handleClick} >Submit</button>
    </div>
  )
}

export default Signup
