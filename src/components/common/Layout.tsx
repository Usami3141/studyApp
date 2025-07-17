import { Outlet } from "react-router-dom";
import type { Location } from "react-router-dom";
import Header from "./Header";

type LayoutProps = {
  location: Location;
}

const Layout = ({location}: LayoutProps) => (
  <>
    <Header location={location} />
    <Outlet />
  </>
);

export default Layout;