import { NavLink } from "react-router-dom";
import type { Location } from "react-router-dom";
import style from "../../App.module.css";

type HeaderProps = {
  location : Location
}

const Header = ({location}: HeaderProps) => (
  <header className = {style.header}>
    <div className = {style.logo} >MyApp</div>
    <nav className = {style.nav}>
      {location.pathname !== "/" && <NavLink className = {style.link} to="/" end>Home</NavLink>}
      {location.pathname !== "/game" && <NavLink className = {style.link} to="/game">Game</NavLink>}
      {location.pathname !== "/todo" && <NavLink className = {style.link} to="/todo">Todo</NavLink>}
    </nav>
  </header>
);

export default Header;