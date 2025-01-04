import React, { useState, useEffect } from "react";
import { Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  LineElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  PointElement,
} from "chart.js";

ChartJS.register(BarElement, LineElement, CategoryScale, LinearScale, Title, Tooltip, Legend, PointElement);

const AdvanceDash = () => {
  const [activeTab, setActiveTab] = useState("reddit");
  const [postURL, setPostURL] = useState("");
  const [showGraphs, setShowGraphs] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [graphData, setGraphData] = useState(null);
  const [falseClaimData, setFalseClaimData] = useState(null);

  // Function to simulate API fetching
  const fetchGraphData = () => {
    setIsFetching(true);
    setTimeout(() => {
      if (activeTab === "reddit") {
        const redditMockData = {
          labels: ["Score", "Comments"],
          datasets: [
            {
              label: "Reddit Post Metrics",
              data: [
                Math.floor(Math.random() * 1000),
                Math.floor(Math.random() * 500),
              ],
              backgroundColor: ["#4ade80", "#38bdf8"],
              borderWidth: 1,
            },
          ],
        };

        const falseClaimMockData = {
          labels: Array.from({ length: 10 }, (_, i) => `Day ${i + 1}`),
          datasets: [
            {
              label: "False Claim Trends",
              data: Array.from({ length: 10 }, () => Math.floor(Math.random() * 100)),
              borderColor: "#ef4444",
              borderWidth: 2,
              fill: false,
            },
          ],
        };

        setGraphData(redditMockData);
        setFalseClaimData(falseClaimMockData);
      } else if (activeTab === "instagram") {
        const instagramMockData = {
          labels: ["Likes", "Comments", "Shares"],
          datasets: [
            {
              label: "Instagram Post Metrics",
              data: [
                Math.floor(Math.random() * 1000),
                Math.floor(Math.random() * 500),
                Math.floor(Math.random() * 200),
              ],
              backgroundColor: ["#f472b6", "#22d3ee", "#a78bfa"],
              borderWidth: 1,
            },
          ],
        };

        const falseClaimMockData = {
          labels: Array.from({ length: 10 }, (_, i) => `Day ${i + 1}`),
          datasets: [
            {
              label: "False Claim Trends",
              data: Array.from({ length: 10 }, () => Math.floor(Math.random() * 100)),
              borderColor: "#ef4444",
              borderWidth: 2,
              fill: false,
            },
          ],
        };

        setGraphData(instagramMockData);
        setFalseClaimData(falseClaimMockData);
      }
      setIsFetching(false);
    }, 2000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (postURL.trim() !== "") {
      setShowGraphs(true);
      fetchGraphData();
    }
  };

  useEffect(() => {
    // Reset graphs and data when switching tabs
    setShowGraphs(false);
    setGraphData(null);
    setFalseClaimData(null);
    setPostURL("");
  }, [activeTab]);

  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 p-6">
        <div className="text-lg font-bold bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-transparent">
          TrueDat Dashboard
        </div>
        <nav className="mt-8">
          <ul className="flex flex-col gap-4">
            <li>
              <button
                onClick={() => setActiveTab("reddit")}
                className={`w-full text-left px-4 py-2 rounded-lg transition-colors duration-300 ${
                  activeTab === "reddit" ? "bg-blue-600" : "hover:bg-gray-700"
                }`}
              >
                Reddit Analysis
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab("instagram")}
                className={`w-full text-left px-4 py-2 rounded-lg transition-colors duration-300 ${
                  activeTab === "instagram" ? "bg-pink-600" : "hover:bg-gray-700"
                }`}
              >
                Instagram Analysis
              </button>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-transparent">
            {activeTab === "reddit" ? "Reddit Dashboard" : "Instagram Dashboard"}
          </h1>
          <p className="mt-2 text-gray-400">
            View and analyze mock data for {activeTab === "reddit" ? "Reddit" : "Instagram"} posts.
          </p>
        </header>

        {/* Input Section */}
        <section className="mb-8">
          <form onSubmit={handleSubmit} className="flex gap-4">
            <input
              type="text"
              value={postURL}
              onChange={(e) => setPostURL(e.target.value)}
              placeholder="Enter Post URL"
              className="flex-1 px-4 py-2 text-sm text-gray-400 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="px-6 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-500"
            >
              Analyze
            </button>
          </form>
        </section>

        {/* Graphs Section */}
        {showGraphs && (
          <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {isFetching ? (
              <p className="text-center col-span-full">Fetching data, please wait...</p>
            ) : (
              graphData && falseClaimData && (
                <>
                  <div className="bg-gray-800 rounded-lg shadow-lg p-6">
                    <h2 className="text-lg font-bold mb-4">Engagement Analysis</h2>
                    <Bar
                      data={graphData}
                      options={{
                        responsive: true,
                        plugins: {
                          legend: { display: false },
                          title: { display: true, text: "Engagement Metrics" },
                        },
                      }}
                    />
                  </div>

                  <div className="bg-gray-800 rounded-lg shadow-lg p-6 md:col-span-2">
                    <h2 className="text-lg font-bold mb-4">False Claim Analysis</h2>
                    <Line
                      data={falseClaimData}
                      options={{
                        responsive: true,
                        plugins: {
                          legend: { display: false },
                          title: { display: true, text: "False Claim Trends" },
                        },
                      }}
                    />
                  </div>
                </>
              )
            )}
          </section>
        )}
      </main>
    </div>
  );
};

export default AdvanceDash;
