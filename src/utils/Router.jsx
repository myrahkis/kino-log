import { Route, Routes } from "react-router";
import Error from "../pages/Error";
import WatchedList from "../pages/WatchedList";
import Home from "../pages/Home";

function Router({ searchQuery }) {
  return (
    <div>
      <Routes>
        <Route path={"/"} element={<Home query={searchQuery} />} key="home" />
        <Route path={"/watched"} element={<WatchedList />} key="watched" />
        <Route path={"*"} element={<Error />} key="error" />
      </Routes>
    </div>
  );
}

export default Router;
