import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Video = () => {
  const [videoLink, setVideoLink] = useState('');
  const [responseMessage, setResponseMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [potentialFalseClaim, setPotentialFalseClaim] = useState(false);
  const [newsData, setNewsData] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setResponseMessage('');
    setPotentialFalseClaim(false);

    try {
      const response = await fetch(`http://127.0.0.1:8000/video_check?youtube_url=${videoLink}`);
      if (!response.ok) {
        throw new Error('Failed to fetch analysis');
      }
      const data = await response.json();

      if (data?.initial_check?.result?.prediction[0] === "false") {
        setPotentialFalseClaim(true);
        setNewsData(data?.fast_check?.news);
      }

      if (data?.fast_check?.news) {
        const topNews = Object.values(data?.fast_check?.news).slice(0, 3);
        const formattedResponse = topNews
          .map((item, index) => `<strong>${index + 1}. ${item.title}</strong>: <a href="${item.link}" target="_blank">${item.link}</a>`)
          .join('<br />');
        setResponseMessage(formattedResponse);
      } else {
        setResponseMessage('No relevant news articles found.');
      }
    } catch (error) {
      setResponseMessage('An error occurred while analyzing the video.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleViewFullResults = () => {
    navigate('/fact-check', { state: { newsData } });
  };

  return (
    <div>
      <nav className="bg-gray-800 text-white">
             <div className="mx-auto max-w-screen-xl px-4 py-4 flex justify-between items-center">
               <div className="text-lg font-bold bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-transparent">
               <a href="/">TrueDat</a> 
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
            Submit Video Link for Fact Checking
          </h1>
          <p className="mt-4 text-lg max-w-xl">
            Paste a video link below, and our advanced AI will analyze it for facts and discrepancies.
          </p>
        </div>

        <div className="bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-md">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <label htmlFor="videoLink" className="block text-sm font-medium text-gray-300">
              Enter a video link:
            </label>
            <input
              type="url"
              id="videoLink"
              value={videoLink}
              onChange={(e) => setVideoLink(e.target.value)}
              placeholder="https://example.com/video"
              className="block w-full text-sm text-gray-400 border border-gray-600 rounded-lg cursor-pointer bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 p-2"
              required
            />
            <button
              type="submit"
              className="inline-block w-full rounded bg-purple-600 px-8 py-3 text-sm font-medium text-white transition hover:rotate-2 hover:scale-110 focus:outline-none focus:ring active:bg-purple-500"
            >
              {isLoading ? 'Analyzing...' : 'Submit and Analyse'}
            </button>
          </form>
        </div>

        {potentialFalseClaim && (
          <div className="mt-8 bg-red-800 rounded-lg shadow-lg p-4 w-full max-w-md text-center">
            <h2 className="text-lg font-bold text-white mb-4">Potential False Claim Detected</h2>
            <button
              onClick={handleViewFullResults}
              className="inline-block w-full rounded bg-red-600 px-8 py-3 text-sm font-medium text-white transition hover:rotate-2 hover:scale-110 focus:outline-none focus:ring active:bg-red-500"
            >
              View Full Results
            </button>
          </div>
        )}
      
        {/* {responseMessage && (
          <div
            className="mt-8 bg-gray-800 rounded-lg shadow-lg p-4 w-full max-w-md text-center text-sm text-gray-300"
            dangerouslySetInnerHTML={{ __html: responseMessage }}
          />
        )} */}
      </section>
    </div>
  );
};

export default Video;
