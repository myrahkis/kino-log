import { Route, Routes } from "react-router";
import { routes } from "./routes";

function Router() {
  return (
    <div>
      <Routes>
        {routes.map((route) => (
          <Route path={route.path} element={route.element} key={route.path} />
        ))}
      </Routes>
    </div>
  );
}

export default Router;
