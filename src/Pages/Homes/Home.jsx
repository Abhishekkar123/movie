import React from 'react'
import './style.scss'
import Banners from './Banner/Banners'
import Trending from './trending/Trending'
import ContentWrapper from '../../component/ContentWrapper/ContentWrapper'
import Popular from './popular/Popular'
import TopRated from './topTrended/TopRated'

const Home = () => {
  return (
    <div className='homePage'>
      <Banners/>
    <Trending/>
    <Popular/>
    <TopRated/>
     
    </div>
  )
}

export default Home;
