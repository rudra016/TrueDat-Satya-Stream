import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Audio from './pages/Audio';
import Video from './pages/Video';
import Image from './pages/Image';
import VideoUp from './pages/VideoUp';
import FactCheck from './pages/FactCheck';
import Text from './pages/Text';
function App() {
  return (
    <>
     <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/audio" element={<Audio />} />
        <Route path="/video" element={<Video />} />
        <Route path="/image" element={<Image />} />
        <Route path="/video-upload" element={<VideoUp />} />
        <Route path="/text" element={<Text />} />
        <Route path="/fact-check" element={<FactCheck />} />
      </Routes>
    </>
  )
}

export default App
