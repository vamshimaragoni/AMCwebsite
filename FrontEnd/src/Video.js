

import React, { useState } from 'react';

const Video = ({ url }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    const video = document.getElementById('movieVideo');

    if (isPlaying) {
      video.pause();
    } else {
      video.play();
    }

    setIsPlaying(!isPlaying);
  };

  return (
    <div className="video-container">
      <video id="movieVideo" width="500" height="340" controls>
        <source src={url} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className={`play-button ${isPlaying ? 'hidden' : ''}`} onClick={togglePlay}>
        <svg height="50" width="50" xmlns="http://www.w3.org/2000/svg" fill="#fff" viewBox="0 0 24 24">
        
        </svg>
      </div>
    </div>
  );
};

export default Video;
