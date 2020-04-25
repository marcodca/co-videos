import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectWantToWatch } from "../../store/reducers/wantToWatchSlice";

export const Header = () => {
  const wantToWatchData = useSelector(selectWantToWatch);

  return (
    <header>
      <Link to="/">Co-videos</Link>
      <Link to="/want-to-watch">
        Want to watch. {wantToWatchData.length} movies
      </Link>
    </header>
  );
};
