import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

import "./style.scss";

import ContentWrapper from "../../../component/ContentWrapper/ContentWrapper";
import useFetch from "../../../hooks/useFetch";
import Genre from "../../../component/Genres/Genre";
import CircleRating from "../../../component/circleRating/CircleRating.jsx";
import Img from "../../../component/LazyLoad/Img";
import PosterFallback from "../../../assets/no-poster.png";
import { PlayButton } from "../PlayButton";
import VideoPopup from "../../../component/Videopopup/VideoPopup";


const DetailsBanner = ({ video, crew }) => {
    // console.log("video",parseInt(video?.id))

    const [show,setShow]=useState(false);

    const [videoId,setVideoId]=useState(null)
    const {mediaType,id}=useParams();
//  console.log(mediaType)
  const {data,loading}=useFetch(`/${mediaType}/${id}`);

  const {url}=useSelector((state)=>state.home);
  const _genres=data?.genres?.map((g)=> g.id
  )
   
  const director=crew?.filter((f)=>f.job==="Director")
  const writer=crew?.filter((w)=>w.job==="Screenplay"||w.job==="Writer")



    const toHoursAndMinutes = (totalMinutes) => {
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
        return `${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`;
    };

    return (
        <div className="detailsBanner">
            {!loading ? (
                <>
                {!!data && (
                    <React.Fragment>
                       
                            <div className="backdrop-img">
                                <Img src={url.backdrop + data.backdrop_path}/>
                                </div>
                          <div className="opacity-layer"></div>
                          <ContentWrapper>
                            <div className="content">
                                <div className="left">
                                    {data.poster_path?(
                                   <Img 
                                   className="posterImg"
                                   src={url.backdrop + data.poster_path}/>

                                    ):(<Img 
                                        className="posterImg"
                                        src={PosterFallback}/>)}
                                </div>
                                <div className="right">
                                    <div className="title">
                                        {
                                            `${data.name || data.title} (${dayjs(data?.release_date).format("YYYY")})`
                                        }
                                    </div>
                                    <div className="subtitle">
                                        {data.tagline}
                                    </div>
                                    <Genre data={_genres}/>
                                    <div className="row">
                                        <CircleRating rating={data.vote_average.toFixed(1)}/>
                                      <div className="playbtn" onClick={()=>{
                                        setShow(true)
                                        setVideoId(video.id)
                                      }}>
                                        <PlayButton/>
                                        <span className="text">
                                            Watch Trailer
                                        </span>
                                      </div>
                                    </div>
                                   <div className="overview">
                                    <div className="heading">
                                        OverView
                                    </div>
                                    <div className="description">
                                        {data.overview}
                                    </div>
                                   </div>

                                   <div className="info">
                                    {data?.status &&(
                                        <div className="ifoItem">
                                            <span className="text bold">
                                                Status: {""}
                                            </span>
                                            <span className="text">
                                                {data.status}
                                            </span>
                                        </div>
                                    )}

                                      {data?.release_date &&(
                                        <div className="ifoItem">
                                            <span className="text bold">
                                                Release Date: {""}
                                            </span>
                                            <span className="text">
                                                {dayjs(data.release_date).format("MMM D, YYYY")}
                                            </span>
                                        </div>
                                    )}
                                    
                                    {data?.runtime &&(
                                        <div className="ifoItem">
                                            <span className="text bold">
                                              Run time: {""}
                                            </span>
                                            <span className="text">
                                                {toHoursAndMinutes(data.runtime)}
                                            </span>
                                        </div>
                                    )}
                                   </div>

                               {
                                director?.length > 0 &&(
                                    <div className="info">
                                        <span className="text bold">
                                            Director:{""}

                                        </span>
                                        <span className="text">
                                            {director?.map((d,i)=>{
                                                return(
                                                    <span key={i}>
                                                        {d.name}
                                                        {director.length-1 !== i && ", "}
                                                     </span>
                                                )
                                            })}
                                        </span>
                                    </div>
                                )
                               }
                                {
                                writer?.length > 0 &&(
                                    <div className="info">
                                        <span className="text bold">
                                            writer:{""}

                                        </span>
                                        <span className="text">
                                            {writer?.map((d,i)=>{
                                                console.log("writer",writer.length-1 !== i)
                                                return(
                                                    <span key={i}>
                                                        {d.name}
                                                        {writer.length-1 !== i && ", "}
                                                     </span>
                                                )
                                            })}
                                        </span>
                                    </div>
                                )
                               }

                                {
                                data?.created_by?.length > 0 &&(
                                    <div className="info">
                                        <span className="text bold">
                                            Creator:{""}

                                        </span>
                                        <span className="text">
                                            {data?.created_by?.map((d,i)=>{
                                                // console.log("writer",writer.length-1 !== i)
                                                return(
                                                    <span key={i}>
                                                        {d.name}
                                                        {data?.created_by.length-1 !== i && ", "}
                                                     </span>
                                                )
                                            })}
                                        </span>
                                    </div>
                                )
                               }


                              
                                </div>
                            </div>
                            <VideoPopup
                            show={show}
                            setShow={setShow}
                            videoId={videoId}
                            setVideoId={setVideoId}
                            />
                          </ContentWrapper>
                          
                    </React.Fragment>
                )}
                </>
            ) : (
                <div className="detailsBannerSkeleton">
                    <ContentWrapper>
                        <div className="left skeleton"></div>
                        <div className="right">
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                        </div>
                    </ContentWrapper>
                </div>
            )}
        </div>
    );
};

export default DetailsBanner;