import { Routes, Route } from "react-router-dom";
import type { Location } from "react-router-dom";
import HomePage from "../pages/HomePage";
import GamePage from "../pages/GamePage";
import TodoPage from "../pages/TodoPage";
import NoMatch from "../pages/NoMatch";
import Layout from "../components/common/Layout";

type RoutesComponentProps = {
  count: number;
  location: Location
};

const RoutesComponent =
  ({ count, location }: RoutesComponentProps) =>
    (
      <Routes>
        <Route path="/" element = {<Layout location={location} />}> 
          <Route index element={<HomePage count={count} />} />
          <Route path="/game" element={<GamePage />} />
          <Route path="/todo" element={<TodoPage />} />
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    );

export default RoutesComponent;
