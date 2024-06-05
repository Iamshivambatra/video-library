// src/App.js

import React, { useState } from 'react';
import Modal from 'react-modal';
import './App.css';

Modal.setAppElement('#root');

const App = () => {
    const [videos, setVideos] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentVideo, setCurrentVideo] = useState(null);
    const [showBookmarkedOnly, setShowBookmarkedOnly] = useState(false);

    const handleUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const newVideo = { name: file.name, file, bookmarked: false };
            setVideos([...videos, newVideo]);
        }
    };

    const handlePlay = (video) => {
        setCurrentVideo(video.file);
        setIsModalOpen(true);
    };

    const toggleBookmark = (index) => {
        const updatedVideos = videos.map((video, i) =>
            i === index ? { ...video, bookmarked: !video.bookmarked } : video
        );
        setVideos(updatedVideos);
    };

    const filteredVideos = showBookmarkedOnly
        ? videos.filter(video => video.bookmarked)
        : videos;

    return (
        <div className="App">
            <h1>Video Library</h1>
            <input type="file" onChange={handleUpload} accept="video/*" />
            <button onClick={() => setShowBookmarkedOnly(!showBookmarkedOnly)}>
                {showBookmarkedOnly ? 'Show All Videos' : 'Show Bookmarked Only'}
            </button>
            <div>
                {filteredVideos.map((video, index) => (
                    <div key={index}>
                        <h3>{video.name}</h3>
                        <button onClick={() => handlePlay(video)}>Play</button>
                        <button onClick={() => toggleBookmark(index)}>
                            {video.bookmarked ? 'Unbookmark' : 'Bookmark'}
                        </button>
                    </div>
                ))}
            </div>
            <Modal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)}>
            <button onClick={() => setIsModalOpen(false)}>Close</button>
                {currentVideo && <video controls src={URL.createObjectURL(currentVideo)} style={{ width: '100%' }} />}
               
            </Modal>
        </div>
    );
};

export default App;
