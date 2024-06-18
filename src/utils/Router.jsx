/* eslint-disable react/prop-types */
import { Route, Routes } from "react-router";
import Error from "../pages/Error";
import WatchedList from "../pages/WatchedList";
import Home from "../pages/Home";
import Details from "../pages/Details";

function Router({
  searchQuery,
  selected,
  setSelected,
  watchedList,
  onWatched,
  onDelete
}) {
  return (
    <div>
      <Routes>
        <Route
          path={"/"}
          element={<Home query={searchQuery} setSelected={setSelected} />}
          key="home"
        />
        <Route path={"watched"} element={<WatchedList watchedList={watchedList} onDelete={onDelete}/>} key="watched" />
        <Route
          path={"film-detail"}
          element={
            <Details
              selected={selected}
              setSelected={setSelected}
              watchedList={watchedList}
              onWatched={onWatched}
              key={selected?.id}
            />
          }
          key="details"
        />
        <Route path={"*"} element={<Error />} key="error" />
      </Routes>
    </div>
  );
}

export default Router;
