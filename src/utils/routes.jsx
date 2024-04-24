import Home from "../pages/Home";
import WatchedList from "../pages/WatchedList";
import Error from "../pages/Error";

export const routes = [
  { path: "/", element: <Home /> },
  { path: "/watched", element: <WatchedList /> },
  { path: "*", element: <Error /> },
];
