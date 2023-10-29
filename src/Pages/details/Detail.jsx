import React from 'react'
import './style.scss'
import { useParams } from 'react-router-dom'
import useFetch from '../../hooks/useFetch'
import DetailsBanner from './DetailBanner/DetailBanner'
import Cast from './cast/Cast'
import VideosSection from './videoSection/VideoSection'
import Similar from './carousels/Similar'
import Recommendation from './carousels/Recommendation'

const Detail = () => {
 const {mediaType,id}=useParams();
//  console.log(mediaType)
  const {data,loading}=useFetch(`/${mediaType}/${id}/videos`)
  const {data:credits,loading:creditLoading}=useFetch(`/${mediaType}/${id}/credits`)
  // console.log("video nmae",data?.results[0])
  // console.log("cre",credits,creditLoading)


  return (
    <div>
      <DetailsBanner video={data?.results?.[0]} crew={credits?.crew}/>
      <Cast data={credits?.cast} loading={creditLoading}/>
     <VideosSection data={data} loading={loading}/>
     <Similar  mediaType={mediaType} id={id}/>
     <Recommendation mediaType={mediaType} id={id}/>
    </div>
  )
}

export default Detail
