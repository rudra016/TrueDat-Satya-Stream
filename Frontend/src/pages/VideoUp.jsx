import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const VideoUp = () => {
  const [videoFile, setVideoFile] = useState(null);
  const [responseMessage, setResponseMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate that the file is a video and within 30 seconds (optional server-side validation can also be done)
      const fileType = file.type.startsWith('video/');
      if (!fileType) {
        setResponseMessage('Please upload a valid video file.');
        setVideoFile(null);
        return;
      }
      setVideoFile(file); 
      setResponseMessage('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!videoFile) {
      setResponseMessage('Please select a video file to upload.');
      return;
    }

    setIsLoading(true);
    setResponseMessage('');

    const formData = new FormData();
    formData.append('video', videoFile);

    try {
      const response = await fetch('http://127.0.0.1:8000/video_check', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to upload and analyze the video.');
      }

      const data = await response.json();
      setResponseMessage(data.message || 'Video analysis complete!');
    } catch (error) {
      setResponseMessage('An error occurred while analyzing the video.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
       <nav className="bg-gray-800 text-white">
              <div className="mx-auto max-w-screen-xl px-4 py-4 flex justify-between items-center">
                <div className="text-lg font-bold bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                TrueDat
                </div>
                <ul className="flex gap-6 text-sm font-medium">
                  
                  <li>
                    <Link
                      to="/audio"
                      className="hover:text-blue-400 transition-colors duration-300"
                    >
                      Audio
                    </Link>
                  </li>
                   <li>
                                <Link
                                  to="/text"
                                  className="hover:text-blue-400 transition-colors duration-300"
                                >
                                  Text
                                </Link>
                              </li>
                  <li>
                    <Link
                      to="/video-upload"
                      className="hover:text-blue-400 transition-colors duration-300"
                    >
                      Video upload
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/video"
                      className="hover:text-purple-400 transition-colors duration-300"
                    >
                      Realtime Check
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/image"
                      className="hover:text-pink-400 transition-colors duration-300"
                    >
                      Image
                    </Link>
                  </li>
                </ul>
              </div>
            </nav>

      <section className="bg-gray-900 text-white min-h-screen flex flex-col items-center justify-center">
        <div className="text-center mb-8">
          <h1 className="bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-4xl font-extrabold text-transparent">
            Upload Video for Fact Checking
          </h1>
          <p className="mt-4 text-lg max-w-xl">
            Submit a video file (max 30 seconds), and our advanced AI will analyze it for facts and discrepancies.
          </p>
        </div>

        <div className="bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-md">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <label htmlFor="videoFile" className="block text-sm font-medium text-gray-300">
              Select a video file:
            </label>
            <input
              type="file"
              id="videoFile"
              accept="video/*"
              onChange={handleFileChange}
              className="block w-full text-sm text-gray-400 border border-gray-600 rounded-lg cursor-pointer bg-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 p-2"
              required
            />
            <button
              type="submit"
              className="inline-block w-full rounded bg-purple-600 px-8 py-3 text-sm font-medium text-white transition hover:rotate-2 hover:scale-110 focus:outline-none focus:ring active:bg-purple-500"
            >
              {isLoading ? 'Uploading...' : 'Submit and Analyse'}
            </button>
          </form>
        </div>

        {responseMessage && (
          <div className="mt-8 bg-gray-800 rounded-lg shadow-lg p-4 w-full max-w-md text-center text-sm text-gray-300">
            {responseMessage}
          </div>
        )}
      </section>
    </div>
  );
};

export default VideoUp;
