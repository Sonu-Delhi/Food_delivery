import React, { useContext, useState } from 'react'
import './Login.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Login = ({setShowLogin}) => {
  const {url,setToken} = useContext(StoreContext)
  const [currenState,setCurrentState]=useState("Login")
    const [data,setData]=useState({
      name: "",
      email: "",
      password: ""
    })

    const handleInputChange=(e)=>{
      const name = e.target.name;
      const value = e.target.value;
      setData(data=>({...data,[name]:value}))
    }

    const onLogin = async (event)=>{
      event.preventDefault()
      let newUrl = url;
      if(currenState==="Login"){
        newUrl += "/api/user/login"

      }else{
        newUrl += "/api/user/register"
      }
      const response = await axios.post(newUrl,data);
      if(response.data.success){
        setToken(response.data.token);
        localStorage.setItem("token",response.data.token)
        setShowLogin(false)
      }
      else{
        toast.error(response.data.message)
      }
    }
    
  return (
    <div className='login-popup'>
      <form className='login-popup-container' onSubmit={onLogin}>
        <div className='login-popup-title'>
          <h2>{currenState}</h2>
          <img onClick={()=>setShowLogin(false)} src={assets.cross_icon} alt='' />
        </div>
        <ToastContainer />
        <div className='login-popup-input'>
        {currenState==="Login"?<></>:<input name='name' onChange={handleInputChange} value={data.name} type='text' placeholder='Your name' required />}
          <input name='email' onChange={handleInputChange} value={data.email} type='email' placeholder='Your email' required />
          <input name='password' onChange={handleInputChange} value={data.password} type='password' placeholder='Password' required />
        </div>
        <button type='submit'>{currenState==="Login"?"Create account":"Sign up"}</button>
        <div className='login-popup-condition'>
          <input type='checkbox' required />
          <p>By continuing, i agree to the terms of use & privacy ploicy</p>
        </div>
        {
          currenState==="Login"?<p>Create a new account? <span onClick={()=>setCurrentState("Sign Up")}>Click here</span></p>:<p>Already have an account? <span onClick={()=>setCurrentState("Login")}>Login here</span></p>
        }


      </form>
    </div>
  )
}

export default Login
