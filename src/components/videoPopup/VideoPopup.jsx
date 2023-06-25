import React from "react";
import ReactPlayer from "react-player/youtube";


const VideoPopup = ({ show, setShow, videoId, setVideoId }) => {
    const hidePopup = () => {
        setShow(false);
        setVideoId(null);
    };
    return (
        <div className={`flex items-center justify-center w-full h-full fixed top-0 lef-0 ${show ? "opacity-100 visible z-[100]" : "opacity-0 invisible"}`}>
            <div className={`absolute top-0 left-0 w-full h-full bg-black/50 backdrop-filter-sm opacity-layer ${show ? "opacity-100" : "opacity-0"}`} onClick={hidePopup}></div>
            <div className={`relative w-[800px] aspect-video bg-white videoPlayer ${show ? "scale-100" : "scale-50"}`}>
                <span className="absolute top-[-20px] right-0 text-white cursor-pointer" onClick={hidePopup}>
                    Close
                </span>
                <ReactPlayer
                    url={`https://www.youtube.com/watch?v=${videoId}`}
                    controls
                    width="100%"
                    height="100%"
                    // playing={true}
                />
            </div>
        </div>
    );
};

export default VideoPopup;
