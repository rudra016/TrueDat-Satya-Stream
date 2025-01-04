import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Audio from "./pages/Audio";
import Video from "./pages/Video";
import Image from "./pages/Image";
import VideoUp from "./pages/VideoUp";
import FactCheck from "./pages/FactCheck";
import Text from "./pages/Text";
import AdvanceDash from "./pages/AdvanceDash";

function App() {
  // const [showModal, setShowModal] = useState(false);

  // useEffect(() => {
  //   const handleBeforeUnload = (e) => {
  //    openCustomModal();
  //     const message = "Are you sure you want to leave? Your work may be lost.";
  //     e.preventDefault();
  //     e.returnValue = message; // This triggers the default confirmation dialog
  //     return message;
  //   };
    
  //   // Add event listener to handle tab close/refresh
  //   window.addEventListener("beforeunload", handleBeforeUnload);

  //   // Cleanup on component unmount
  //   return () => {
      
  //     window.removeEventListener("beforeunload", handleBeforeUnload);
  //   };
  // }, []);

  // const openCustomModal = () => {
  //   setShowModal(true);
  // };

  // const closeModal = () => {
  //   setShowModal(false);
  // };

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
        <Route path="/advance-features" element={<AdvanceDash />} />
      </Routes>
      {/* {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg text-center max-w-sm mx-auto">
            <h2 className="text-2xl font-bold mb-4">Thank you for not leaving :)</h2>
      
            <img
              className="w-full h-auto mb-4"
              src="https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExaHZ0bGVxY3RpMDZ0N25ncm9mNTE4dTFpcndsbHI0NWdwbTU0dmphMCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/BMR4cgypuglVu/giphy.gif"
              alt="Cool GIF"
            />
            <button
              className="bg-red-500 text-white py-2 px-6 rounded hover:bg-red-700"
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        </div>
      )} */}
    </>
  );
}

export default App;
