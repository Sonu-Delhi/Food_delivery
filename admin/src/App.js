import React from 'react'
import Navbar from './Components/Navbar/Navbar'
import Sidebar from './Components/SideBar/Sidebar'
import { Route, Routes } from 'react-router-dom'
import Add from '../src/Pages/Add/Add'
import List from '../src/Pages/List/List'
import Orders from '../src/Pages/Orders/Orders'
const App = () => {
  return (
    <div>
      <Navbar />
      <hr />
      <div className='app-content'>
        <Sidebar />
        <Routes>
          <Route path='/add' element={<Add />} />
          <Route path='/list' element={<List />} />
          <Route path='/orders' element={<Orders />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
