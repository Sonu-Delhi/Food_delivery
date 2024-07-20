import React, { useContext, useState } from 'react'
import './navbar.css'
import { assets } from '../../assets/assets'
import {Link, useNavigate} from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext'
const Navbar = ({setShowLogin}) => {
  const [menu,setmenu] = useState("Home")
  const {getTotalCartAmount,token,setToken} = useContext(StoreContext)
  const nevigate = useNavigate()
  const logout = ()=>{
    setToken("")
    localStorage.removeItem('token')
    nevigate('/')
    
  }
  return (
    <div className='navbar'>
    <Link to='/'><img src={assets.logo} alt='' className='logo'/></Link>
    <ul className='navbar_menu'>
    <Link to='/' onClick={()=>setmenu("Home")} className={menu==="Home"?"active":""}>Home</Link>
    <a href='#explore-menu' onClick={()=>setmenu("Menu")} className={menu==="Menu"?"active":""}>Menu</a>
    <a href='#app-download' onClick={()=>setmenu("Mobile-app")} className={menu==="Mobile-app"?"active":""}>Mobile-app</a>
    <a href='#footer' onClick={()=>setmenu("contact-us")} className={menu==="contact-us"?"active":""}>Contact us</a>

    </ul>
    <div className='navbar-right'>
      <img src={assets.search_icon} alt=''/>
      <div className='navbar-search-icon'>
        <Link to='/cart'><img src={assets.basket_icon} alt=''/></Link>
        <div className={getTotalCartAmount()===0?"":"dot"}></div>
      </div>
      {
        !token?<button onClick={()=>setShowLogin(true)}>sign in</button>
        :<div className='navbar-prifile'>
          <img src={assets.profile_icon} />
          <ul className='nav-profile-dropdown'>
            <li><img src={assets.bag_icon} alt=''/><p>Orders</p></li>
            <hr/>
            <li onClick={logout}><img src={assets.logout_icon} alt=''/><p>Logout</p></li>
          </ul>
        </div>
      }
    </div>
      
    </div>
  )
}

export default Navbar
