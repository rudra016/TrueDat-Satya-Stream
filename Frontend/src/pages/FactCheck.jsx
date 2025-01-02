import React from 'react';
import { useLocation, Link } from 'react-router-dom';

const FactCheck = () => {
  const location = useLocation();
  const newsData = location.state?.newsData;

  return (
    <div>
      {/* Navigation */}
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
            Fact Check Results
          </h1>
          <p className="mt-4 text-lg max-w-xl">
            Here are the detailed results for the analyzed video.
          </p>
        </div>

        <div className="bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-md">
          {newsData && Object.values(newsData).length > 0 ? (
            Object.values(newsData).map((item, index) => (
              <div key={index} className="mb-4">
                <h2 className="text-lg font-bold text-white">{item.title}</h2>
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:underline"
                >
                  {item.link}
                </a>
                <p className="text-sm text-gray-400">{item.date}</p>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-400">No detailed results found.</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default FactCheck;
