import React, { useState } from 'react'
import ContentWrapper from '../../../component/ContentWrapper/ContentWrapper'
import SwitchTabs from '../../../component/switchtabs/SwitchTabs'
import useFetch from '../../../hooks/useFetch'
import Carousel from '../../../component/carousel/Carousel'

const TopRated = () => {
   const [endPoint,setEndPoint]=useState("movie")
   const {data,loading}=useFetch(`/${endPoint}/top_rated`)
console.log("trending",data)
  const onTabChange=(tab)=>{

    setEndPoint(tab=="Movies"?"movie":"tv")
   }

  return (
    <div className='carouselSection'>

      <ContentWrapper>
          <span className="carouselTitle">
            TopRated
          </span>
          <SwitchTabs data={["Movies","Tv Shows"]} onTabChange={onTabChange}/>
      </ContentWrapper>
      <Carousel data={data?.results} loading={loading} endPoint={endPoint}/>

    </div>
  )
}

export default TopRated;
