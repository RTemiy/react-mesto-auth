import React from "react";

export default function ImagePopup({card, onClose}) {
  return(
    <div id="popup_zoom-image" className={`popup ${card? 'popup_opened' : ''}`}>
      <div className="popup__zoom-container">
        <button id="popup-zoom_close" type="button" onClick={onClose} className="popup__cross hover-anim"></button>
        <img alt={card && card.name} src={card && card.link} className="popup__image"/>
        <p className="popup__caption">{card && card.name}</p>
      </div>
    </div>
  )
}