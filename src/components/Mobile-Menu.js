import {Route, Routes} from "react-router-dom";

export default function MobileMenu({isOpen, email, onLogout}) {
  return(
    <Routes>
      <Route path="/" element={
        <div className={`mobile-menu ${isOpen && 'mobile-menu_active'}`}>
          <p className="mobile-menu__mail">{email}</p>
          <button className="mobile-menu__button" onClick={onLogout}>Выйти</button>
        </div>
      }/>
    </Routes>
  )
}