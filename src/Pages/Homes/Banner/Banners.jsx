import React, { useState,useEffect } from 'react'
import {useNavigate} from 'react-router-dom'
import './style.scss'
import useFetch from '../../../hooks/useFetch'
import {useSelector} from 'react-redux'
import Img from '../../../component/LazyLoad/Img'
import ContentWrapper from '../../../component/ContentWrapper/ContentWrapper'
const Banners = () => {

    const [back,setBack]=useState("");
    const [query,setQuery]=useState("");
    const navigate=useNavigate()
     const {url}=useSelector((state)=>state.home);
    const {data,loading}=useFetch("/movie/upcoming")

    useEffect(()=>{
          const bg=url.backdrop+data?.results?.[Math.floor(Math.random()*20)]?.backdrop_path;
          setBack(bg)
    },[data])

    const searchQueryHandler=(e)=>{
      if(e.key==="Enter"  && query.length>0){
        navigate(`/search/${query}`)

      }
 
    }
  return (
   <>
   <div className="Banner">

   { !loading &&  <div className="backImg">
    <Img src={back} />
      </div>}
      <div className="opacity-layer">
        
      </div>

      <ContentWrapper>
        <div className="BannerContent">
            <span className="title">Welcome</span>
               <span className="subtitle">Millions of Tv show and popular to discover.
                 Explore Now.
              </span>
              <div className='searchinput'>
                <input
                 type='text'  
                 placeholder='Search for movies or tv show...'
                 onChange={(e)=>setQuery(e.target.value)}
                 onKeyUp={searchQueryHandler}
                 />
                 <button>Search</button>
              </div>
        </div>

      </ContentWrapper>
      

   </div>
   </>
  )
}

export default Banners
