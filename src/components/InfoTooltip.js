import React from "react";
import accepted from '../images/accepted.svg';
import denied from '../images/denied.svg';

export default function InfoTooltip({isOpen, onClose}) {
  return(
    <div id="popup_tooltip" className={`popup ${ isOpen !== null ? isOpen === true ? 'popup_opened' : 'popup_opened' : ''}`}>
      <div className="popup__container popup__tooltip">
        <button type="button" onClick={onClose} className="popup__cross hover-anim"></button>
        <img alt='Статус' src={isOpen !== null ? isOpen === true ? accepted : denied : ''} className="popup__tooltip-image"/>
        <p className="popup__tooltip-text">{isOpen !== null ? isOpen === true ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.' : ''}</p>
      </div>
    </div>
  )
}