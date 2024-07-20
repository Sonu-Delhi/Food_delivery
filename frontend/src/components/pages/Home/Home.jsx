import React, { useState } from 'react'
import './home.css'
import Header from '../../header/Header'
import ExploreMenu from '../../Exploremenu/ExploreMenu'
import FoodDisplay from '../../food display/FoodDisplay'
import AppDownload from '../../AppDownload/AppDownload'


const Home = () => {
  const [category,setCategory]=useState("All")
  return (
    <div>
      <Header/>
      <ExploreMenu category={category} setCategory={setCategory}/>
      <FoodDisplay category={category}/>
      <AppDownload />
    </div>
  )
}

export default Home
