import React, { useState } from "react";

import "./style.scss";

import ContentWrapper from "../../../component/ContentWrapper/ContentWrapper";
import { PlayButton } from "../PlayButton";
import VideoPopup from "../../../component/Videopopup/VideoPopup";
import Img from "../../../component/LazyLoad/Img";

const VideosSection = ({ data, loading }) => {
    const [show, setShow] = useState(false);
    const [videoId, setVideoId] = useState(null);
    console.log(data)

    const loadingSkeleton = () => {
        return (
            <div className="skItem">
                <div className="thumb skeleton"></div>
                <div className="row skeleton"></div>
                <div className="row2 skeleton"></div>
            </div>
        );
    };

    return (
        <div className="videosSection">
            <ContentWrapper>
                <div className="sectionHeading">Official Videos</div>
                {!loading ? (
                    <div className="videos">
                        {
                            data?.results?.map((video)=>{
                                return(
                                    <div key={video.id} 
                                    className="videoItem"
                                    onClick={()=>{
                                        setVideoId(video.key)
                                        setShow(true)
                                    }}>
                                        <div className="videoThumbnail">
                                            <Img src={`https://img.youtube.com/vi/${video.key}/mqdefault.jpg`}/>
                                            <PlayButton/>
                                        </div>

                                        </div>
                                )
                            })
                        }
                    
                    </div>
                ) : (
                    <div className="videoSkeleton">
                        {loadingSkeleton()}
                        {loadingSkeleton()}
                        {loadingSkeleton()}
                        {loadingSkeleton()}
                    </div>
                )}
            </ContentWrapper>
            <VideoPopup
                show={show}
                setShow={setShow}
                videoId={videoId}
                setVideoId={setVideoId}
            />
        </div>
    );
};

export default VideosSection;