import React, { useRef } from "react";
import Controls from "./components/Controls/Controls";
import PlayList from "./components/PlayList/PlayList";
import ProgressArea from "./components/ProgrssArea/ProgressArea";
import SongDetail from "./components/SongDetail/SongDetail";
import "./App.scss";

function App() {
  const audioRef = useRef();
  const onPlay = () => {
    audioRef.current.play();
  };
  const onPause = () => {
    audioRef.current.pause();
  };

  return (
    <div className="App">
      <div className="container">
        <SongDetail />
        <ProgressArea ref={audioRef} />
        <Controls play={onPlay} pause={onPause} />
        <PlayList />
      </div>
    </div>
  );
}

export default App;
