import React, { useState, useEffect } from 'react';

const App = () => {
  const [playlist, setPlaylist] = useState([]);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [audioRef, setAudioRef] = useState(null);

  useEffect(() => {
    const storedPlaylist = JSON.parse(localStorage.getItem('playlist')) || [];
    const lastPlayingIndex = parseInt(localStorage.getItem('lastPlayingIndex'), 10) || 0;
    setPlaylist(storedPlaylist);
    setCurrentTrackIndex(lastPlayingIndex);
  }, []);

  useEffect(() => {
    localStorage.setItem('playlist', JSON.stringify(playlist));
    localStorage.setItem('lastPlayingIndex', currentTrackIndex);
  }, [playlist, currentTrackIndex]);

  const handleFileChange = (e) => {
    const newPlaylist = [...playlist, ...e.target.files];
    setPlaylist(newPlaylist);
  };

  const handlePlay = () => {
    if (audioRef) {
      audioRef.play();
    }
  };

  const handlePause = () => {
    if (audioRef) {
      audioRef.pause();
    }
  };

  const handleEnded = () => {
    setCurrentTrackIndex((prevIndex) => (prevIndex + 1) % playlist.length);
  };

  const handleTimeUpdate = () => {
  };

  const playSelectedTrack = (index) => {
    setCurrentTrackIndex(index);
  };

  return (
    <div>
      <input type="file" accept="audio/*" onChange={handleFileChange} multiple />
      <div>
        <h3>Playlist</h3>
        <ul>
          {playlist.map((track, index) => (
            <li key={index} onClick={() => playSelectedTrack(index)}>
              {index === currentTrackIndex ? 'Now Playing: ' : ''}
              {track.name}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3>Now Playing</h3>
        <audio
          ref={(audio) => setAudioRef(audio)}
          src={playlist[currentTrackIndex] && URL.createObjectURL(playlist[currentTrackIndex])}
          controls
          onPlay={handlePlay}
          onPause={handlePause}
          onEnded={handleEnded}
          onTimeUpdate={handleTimeUpdate}
        />
      </div>
    </div>
  );
};

export default App;