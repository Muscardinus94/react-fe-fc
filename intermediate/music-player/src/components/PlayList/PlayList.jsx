import React from "react";
import { useSelector, useDispatch } from "react-redux";
import SortableList from "@shelvy/sortable-list";
import classNames from "classnames";
import QueueMusic from "@mui/icons-material/QueueMusic";
import Close from "@mui/icons-material/Close";
import PlayListItem from "./PlayListItem";
import "./PlayList.scss";
import {
  setCurrentIndex,
  updatePlayList,
} from "../../store/musicPlayerReducer";

const PlayList = ({ showPlayList, setShowPlayList }) => {
  const onClickClosePlayList = () => {
    setShowPlayList(false);
  };
  const playList = useSelector((state) => state.playList);
  const dispatch = useDispatch();
  const renderItem = (item, index) => {
    return <PlayListItem item={item} index={index} />;
  };
  const onClickItem = (index) => {
    dispatch(setCurrentIndex(index));
  };
  const onDropItem = (newPlayList) => {
    dispatch(updatePlayList(newPlayList));
  };

  return (
    <div className={classNames("play-list", { show: showPlayList })}>
      <div className="header">
        <div className="row">
          <QueueMusic className="list" />
          <span>Play list</span>
        </div>
        <Close
          sx={{ fontSize: 22, cursor: "pointer" }}
          onClick={onClickClosePlayList}
        />
      </div>
      <SortableList
        data={playList}
        onDropItem={onDropItem}
        renderItem={renderItem}
        onClickItem={onClickItem}
      />
    </div>
  );
};

export default PlayList;
