import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Audio from './pages/Audio';
import Video from './pages/Video';
import Image from './pages/Image';
function App() {
  return (
    <>
     <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/audio" element={<Audio />} />
        <Route path="/video" element={<Video />} />
        <Route path="/image" element={<Image />} />
      </Routes>
    </>
  )
}

export default App
