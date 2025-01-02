import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Audio = () => {
  const [hoveredStar, setHoveredStar] = useState(null);
  const [selectedStar, setSelectedStar] = useState(null);
  const [randomTransform, setRandomTransform] = useState('');

  const generateRandomShift = () => {
    const randomX = Math.random() < 0.5 ? -20 : 20; // Random left or right
    const randomY = Math.random() < 0.5 ? -20 : 20; // Random up or down
    return `translate(${randomX}px, ${randomY}px)`;
  };

  const handleStarClick = (rating) => {
    if (rating !== 1) {
      setSelectedStar(rating);
    }
  };

  const handleStarMouseEnter = (rating) => {
    if (rating === 1) {
      setRandomTransform(generateRandomShift());
    }
    setHoveredStar(rating);
  };

  const handleStarMouseLeave = () => {
    setHoveredStar(null);
    setRandomTransform('');
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
              <Link to="/audio" className="hover:text-blue-400 transition-colors duration-300">
                Audio
              </Link>
            </li>
            <li>
              <Link to="/video" className="hover:text-purple-400 transition-colors duration-300">
                Video
              </Link>
            </li>
            <li>
              <Link to="/image" className="hover:text-pink-400 transition-colors duration-300">
                Image
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      <section className="bg-gray-900 text-white min-h-screen flex flex-col items-center justify-center">
        <div className="text-center mb-8">
          <h1 className="bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-4xl font-extrabold text-transparent">
            Upload Audio for Fact Checking
          </h1>
          <p className="mt-4 text-lg max-w-xl">
            Submit an audio file, and our advanced AI will analyze it for facts and discrepancies.
          </p>
        </div>

        <div className="bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-md">
          <form className="flex flex-col gap-4">
            <label htmlFor="audioFile" className="block text-sm font-medium text-gray-300">
              Select an audio file:
            </label>
            <input
              type="file"
              id="audioFile"
              accept="audio/*"
              className="block w-full text-sm text-gray-400 border border-gray-600 rounded-lg cursor-pointer bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <button type="submit">
              <a
                className="inline-block w-full rounded bg-blue-600 px-8 py-3 text-sm font-medium text-white transition hover:rotate-2 hover:scale-110 focus:outline-none focus:ring active:bg-blue-500"
                href="#"
              >
                Upload and Analyse
              </a>
            </button>
          </form>
        </div>

        <div className="mt-8">
          <h2 className="text-lg font-semibold mb-4">Rate Your Experience:</h2>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <div
                key={star}
                className={`cursor-pointer text-3xl transition-transform duration-200 ${
                  hoveredStar === star || selectedStar >= star
                    ? 'text-yellow-400'
                    : 'text-gray-500'
                }`}
                style={{
                  transform: star === 1 && hoveredStar === 1 ? randomTransform : 'none',
                }}
                onClick={() => handleStarClick(star)}
                onMouseEnter={() => handleStarMouseEnter(star)}
                onMouseLeave={handleStarMouseLeave}
              >
                ★
              </div>
            ))}
          </div>
          {selectedStar && (
            <p className="mt-4 text-sm text-gray-300">
              Thank you for rating us {selectedStar} star{selectedStar > 1 ? 's' : ''}!
            </p>
          )}
        </div>
      </section>
    </div>
  );
};

export default Audio;
