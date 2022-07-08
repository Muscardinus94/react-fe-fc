import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import RepeatIcon from "@mui/icons-material/Repeat";
import RepeatOneIcon from "@mui/icons-material/RepeatOne";
import PauseIcon from "@mui/icons-material/Pause";
import SkipPrevious from "@mui/icons-material/SkipPrevious";
import PlayArrow from "@mui/icons-material/PlayArrow";
import SkipNext from "@mui/icons-material/SkipNext";
import QueueMusic from "@mui/icons-material/QueueMusic";
import ShuffleIcon from "@mui/icons-material/Shuffle";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import "./Controls.scss";
import {
  prevMusic,
  nextMusic,
  setRepeat,
} from "../../store/musicPlayerReducer";

const RepeatButton = ({ repeat, onClick, ...props }) => {
  switch (repeat) {
    case "ALL":
      return (
        <RepeatIcon
          sx={{ fontSize: 30, cursor: "pointer" }}
          onClick={onClick}
        />
      );
    case "ONE":
      return (
        <RepeatOneIcon
          sx={{ fontSize: 30, cursor: "pointer" }}
          onClick={onClick}
        />
      );
    case "SHUFFLE":
      return (
        <ShuffleIcon
          sx={{ fontSize: 30, cursor: "pointer" }}
          onClick={onClick}
        />
      );
    default:
      return null;
  }
};

const Controls = ({
  setShowPlayList,
  resetDuration,
  play,
  pause,
  changeVolume,
}) => {
  const { playing, repeat } = useSelector((state) => state);
  const dispatch = useDispatch();

  const onClickPlay = () => {
    play();
  };
  const onClickPause = () => {
    pause();
  };
  const onChangeVolume = (event) => {
    changeVolume(event.target.value);
  };
  const onClickPrevious = useCallback(() => {
    if (repeat === "ONE") {
      resetDuration();
    } else dispatch(prevMusic());
  }, [repeat, resetDuration, dispatch]);
  const onClickNext = useCallback(() => {
    if (repeat === "ONE") {
      resetDuration();
    } else dispatch(nextMusic());
  }, [repeat, resetDuration, dispatch]);
  const onClickRepeat = () => {
    dispatch(setRepeat());
  };
  const onClickShowPlayList = () => {
    setShowPlayList(true);
  };

  return (
    <div className="control-area">
      <QueueMusic
        sx={{ fontSize: 30, cursor: "pointer" }}
        onClick={onClickShowPlayList}
      />
      {<RepeatButton repeat={repeat} onClick={onClickRepeat} />}
      <SkipPrevious
        sx={{ fontSize: 30, cursor: "pointer" }}
        onClick={onClickPrevious}
      />
      {playing ? (
        <PauseIcon
          sx={{ fontSize: 30, cursor: "pointer" }}
          onClick={onClickPause}
        />
      ) : (
        <PlayArrow
          className="play"
          sx={{ fontSize: 30, cursor: "pointer" }}
          onClick={onClickPlay}
        />
      )}
      <SkipNext
        sx={{ fontSize: 30, cursor: "pointer" }}
        onClick={onClickNext}
      />
      <div className="volume-container">
        <VolumeUpIcon sx={{ fontSize: 20 }} />
        <input
          type="range"
          style={{ cursor: "pointer" }}
          defaultValue={1}
          onChange={onChangeVolume}
          min="0"
          max="1"
          step="0.1"
        />
      </div>
    </div>
  );
};

export default Controls;
