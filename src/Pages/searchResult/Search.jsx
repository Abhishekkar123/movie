import React, { useEffect, useState } from 'react'
import './style.scss'

import { useParams } from 'react-router-dom'
import InfiniteScroll from 'react-infinite-scroll-component'
import ContentWrapper from '../../component/ContentWrapper/ContentWrapper'
import noREsults from '../../assets/no-results.png'
import { fetchData } from '../../utils/api'
import Spinner from '../../component/Spinner/Spinner'
import MovieCard from '../../component/movieCard/MovieCard'
const Search = () => {
  const [data,setData]=useState(null);
  const [pagNum,setPagNum]=useState(1);
  const [loading,setLoading]=useState(false);
  const {query}=useParams();

  const fetchInitial= ()=>{
    setLoading(true);
    fetchData(`/search/multi?query=${query}&page=${pagNum}`).then((res)=>{
      setData(res)
      setPagNum((prev)=>prev+1);
      setLoading(false)
    })
  }
  const fetchNext=()=>{
    fetchData(`/search/multi?query=${query}&page=${pagNum}`).then((res)=>{
      if(data?.results){
        setData({
          ...data,results:[...data?.results,...res?.results]
        })
      }else{
        setData(res)
      }
    })

  }

  useEffect(()=>{
    fetchInitial();

  },[query])
  return (
    <div className='searchResultsPage'>
      {loading && <Spinner initial={true}/>}
      {
        !loading && (
          <ContentWrapper>

            {
              data?.results?.length >0 ? (
             <>
             <div className="pageTitle">
              {`Search 
              ${data.total_results >1
                 ?"results":"result"}
                 of '${query}'`}
             </div>

             <InfiniteScroll className='content'
             dataLength={data?.results.length || []}
             next={fetchNext}
             hasMore={pagNum<=data?.total_pages}
             loader={<Spinner/>}
             
             >
              {data?.results.map((item,ind)=>{
                
                  if(item.media_type==="person")return;
                  return(
                    <MovieCard key={ind} data={item} fromSearch={true}/>
                  )

               
              })}
             </InfiniteScroll>
             </>

              ):(
                <span className="resultNotFound">
                 Sorry,Results not Found!

                </span>
              )
            }
          </ContentWrapper>
        )
      }
     
    </div>
  )
}

export default Search
