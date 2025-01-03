# TrueDagt: *Satya Stream, AI powered truth,one stream at a time*

## Introduction

In the era of rapid information dissemination, especially on social media and live broadcasts, false claims and misinformation spread quickly. Verifying the authenticity of such claims in real-time is critical to ensure that people are not misled by unreliable or fraudulent information, 
so there must be a solution developed to detect false information in real time. Our project addresses this challenge by developing an advanced real-time system that can detect and verify false claims across multiple data formats, such as live streams, videos, images, audio, and text.

## Key Features

### 1. **Handling Different Formats (Image, Text, Video, and Live Streams)**

Our system is designed to process a wide variety of data formats to detect and verify false claims. Whether the claim is made in an image, text, video, or live stream, the system is capable of:

- **Image Processing**: Using Optical Character Recognition (OCR) to extract text from images such as memes, screenshots, and infographics for verification.
- **Text Processing**: Analyzing written claims in articles, social media posts, and user input for accuracy and truthfulness.
- **Video Processing**: Handling live streams and recorded video data to extract relevant information, analyze the context, and verify claims made during the video.
- **Live Stream Data**: Real-time analysis of live streams and broadcasts to identify and validate claims as they occur.

### 2. **Simple User Interface**

The system includes an intuitive and user-friendly interface that allows users to easily interact with the platform. The UI is designed to streamline the claim verification process by providing clear feedback and real-time results. Key aspects include:

- **Easy Claim Submission**: Users can quickly submit claims for verification by uploading images, videos, or entering text.
- **Clear Results**: Verified claims are presented with an easy-to-understand verdict (True/False) along with supporting evidence.
- **User Alerts**: If a false claim is detected, users are immediately alerted with recommendations for further actions.


### 3. **Scalable Architecture (Apache Kafka & FastAPI)**

To handle large volumes of real-time data, the system is built with scalability in mind. The following technologies ensure that the system can scale effortlessly:

- **Apache Kafka**: Used for real-time data streaming, allowing the system to process large amounts of incoming data without delays. Kafka ensures that the system can handle high-throughput streams such as live broadcasts and social media feeds.
- **FastAPI**: Provides a fast, asynchronous web framework to serve the system’s APIs, enabling the seamless integration of new data processing routes. FastAPI allows the system to handle multiple routes efficiently, making it easy to add additional endpoints for data collection or verification services.


### 4. **Real-Time Article and Link Retrieval for Verification**

When a claim cannot be verified against existing data, the system uses live data retrieval to find the most recent, relevant information. Features include:
- **Serper API Integration**: The system uses the Serper API to fetch real-time articles, news, and links from trusted sources on the internet. This helps in verifying claims by matching them against the latest available information.
- **Recent Articles Search**: The system identifies and retrieves the most recent and relevant articles that can help verify the claim.
- **User Alerts for Verification**: If the system finds conflicting or unverified claims, it alerts the user with links to trusted sources and articles, enabling them to check the claim's validity.
