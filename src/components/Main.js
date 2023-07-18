import React from "react";

import edit from "../images/edit.svg";

import Card from "./Card";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

export default function Main({cards, onEditProfile, onAddPlace ,onEditAvatar, onCardClick, onCardLike, onCardDelete}) {

  const currentUserContext = React.useContext(CurrentUserContext);

  return(
    <main className="content">
      <section className="profile">
        <div className="profile__avatar-container">
          <img alt="Аватар профиля" style={{ backgroundImage: `url(${currentUserContext.avatar})` }} className="profile__avatar"/>
          <img alt="Редактировать профиль" className="profile__edit-avatar" src={edit} onClick={onEditAvatar}/>
        </div>
        <div className="profile__data-block">
          <div className="profile__info-block">
            <h1 className="profile__name">{currentUserContext.name}</h1>
            <button type="button" className="profile__edit hover-anim" onClick={onEditProfile}></button>
          </div>
          <p className="profile__about">{currentUserContext.about}</p>
        </div>
        <button type="button" className="profile__add hover-anim" onClick={onAddPlace}></button>
      </section>
      <section className="cards">
        {cards.map((cardInfo) => (
          <Card key={cardInfo._id} card={cardInfo} onCardClick={onCardClick} onCardLike={onCardLike} onCardDelete={onCardDelete} />
        ))}
      </section>
    </main>
  )
}