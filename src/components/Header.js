import logo from "../images/logo.svg";
import {Link, Route, Routes} from "react-router-dom";

export default function Header({email,onLogout,onMobileButton,isMobileMenuOpen}) {
  return(
    <header className="header">
      <img alt="Логотип сайта" className="header__logo" src={logo}/>
      <Routes>
        <Route path="/" element={
          <div className="header__container">
            <p className="header__mail">{email}</p>
            <button className="header__button" onClick={onLogout}>Выйти</button>
            <button className={`header__menu-button ${isMobileMenuOpen && 'header__menu-button_cross'}`} onClick={onMobileButton}></button>
          </div>
        }/>

        <Route path="/sign-in" element={
          <div className="header__container">
            <Link to='/sign-up' className="header__mail" >Регистрация</Link>
          </div>
        }/>

        <Route path="/sign-up" element={
          <div className="header__container">
            <Link to='/sign-in' className="header__mail" >Вход</Link>
          </div>
        }/>

      </Routes>
    </header>
  )
}