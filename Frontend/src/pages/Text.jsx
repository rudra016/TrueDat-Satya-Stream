import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Text = () => {
  const [textInput, setTextInput] = useState('');
  const [responseMessage, setResponseMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [potentialFalseClaim, setPotentialFalseClaim] = useState(false);
  const [newsData, setNewsData] = useState(null);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!textInput.trim()) {
      setResponseMessage('Please enter text to analyze.');
      return;
    }

    setIsLoading(true);
    setResponseMessage('');

    try {
      const response = await fetch('https://truedat-satya-stream.onrender.com/text_check', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: textInput }),
      });

      if (!response.ok) {
        throw new Error('Failed to analyze the text.');
      }

      
      const data = await response.json();

     
      if (data?.result?.initial_check?.result?.prediction[0] === "false") {
        setPotentialFalseClaim(true); 
        setNewsData(data?.result?.fast_check?.news);
      }

      if (data?.result?.fast_check?.news) {
        const topNews = Object.values(data?.result?.fast_check?.news).slice(0, 3);
        const formattedResponse = topNews
          .map((item, index) => `<strong>${index + 1}. ${item.title}</strong>: <a href="${item.link}" target="_blank">${item.link}</a>`)
          .join('<br />');
        setResponseMessage(formattedResponse);
      } else {
        setResponseMessage('No relevant news articles found.');
      }
    } catch (error) {
      setResponseMessage('An error occurred while analyzing the text.');
      console.error(error);
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
            Enter Text for Fact Checking
          </h1>
          <p className="mt-4 text-lg max-w-xl">
            Submit your text below, and our advanced AI will analyze it for facts and discrepancies.
          </p>
        </div>

        <div className="bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-md">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <label htmlFor="textInput" className="block text-sm font-medium text-gray-300">
              Enter text to analyze:
            </label>
            <textarea
              id="textInput"
              rows="4"
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              className="block w-full text-sm text-gray-400 border border-gray-600 rounded-lg bg-gray-900 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 p-2"
              placeholder="Type or paste your text here..."
            />
            <button
              type="submit"
              className="inline-block w-full rounded bg-pink-600 px-8 py-3 text-sm font-medium text-white transition hover:rotate-2 hover:scale-110 focus:outline-none focus:ring active:bg-pink-500"
            >
              {isLoading ? 'Analyzing...' : 'Analyze Text'}
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
      </section>
    </div>
  );
};

export default Text;
