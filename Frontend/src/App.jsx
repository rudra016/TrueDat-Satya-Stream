import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Audio from './pages/Audio';
import Video from './pages/Video';
import Image from './pages/Image';
import VideoUp from './pages/VideoUp';
function App() {
  return (
    <>
     <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/audio" element={<Audio />} />
        <Route path="/video" element={<Video />} />
        <Route path="/image" element={<Image />} />
        <Route path="/video-upload" element={<VideoUp />} />
      </Routes>
    </>
  )
}

export default App
