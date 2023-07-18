import React from "react";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

export default function Card({card, onCardClick, onCardLike, onCardDelete}) {
  const currentUser = React.useContext(CurrentUserContext);

  const isOwn = card.owner._id === currentUser._id;

  const isLiked = card.likes.some(i => i._id === currentUser._id);



  const cardLikeButtonClassName = (
    `card__like ${isLiked && 'card__like_active'}`
  );

  function handleClick() {
    onCardClick(card);
  }

  function handleCardDelete() {
    onCardDelete(card);
  }

  function handleCardLike() {
    onCardLike(card);
  }

  return(
    <article className="card">
      <div style={{backgroundImage: `url(${card.link})`}} onClick={handleClick} className="card__image"></div>
      {isOwn && <button className="card__delete" onClick={handleCardDelete}/>}
      <div className="card__info">
        <h2 className="card__title">{card.name}</h2>
        <div className="card__like-container">
          <button type="button" className={cardLikeButtonClassName} onClick={handleCardLike}></button>
          <p className="card__like-amount">{card.likes.length}</p>
        </div>
      </div>
    </article>
  )
}