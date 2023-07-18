import PopupWithForm from "./PopupWithForm";
import React from "react";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

export default function EditProfilePopup({isOpen, onClose, onUpdateUser}) {

  const [name,setName] = React.useState('');
  const [description ,setDescription ] = React.useState('');
  const currentUser = React.useContext(CurrentUserContext);

  function handleChangeName(e){
    setName(e.target.value);
  }

  function handleChangeDescription(e){
    setDescription(e.target.value);
  }
  
  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name,
      about: description,
    });
  }

  React.useEffect(()=>{
    setName(currentUser.name);
    setDescription(currentUser.about);
  },[currentUser,isOpen]);

  return(
    <PopupWithForm name='edit-profile' buttonText='Сохранить' isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit} title='Редактировать профиль'>
    <input placeholder="Имя" id="form_name" value={name || ''} name="name" onChange={handleChangeName} required minLength="2" maxLength="40" className="popup__input"/>
    <span id="form_name-error" className="popup__span"></span>
    <input placeholder="О себе" id="form_about" name="about" value={description || ''} onChange={handleChangeDescription} required minLength="2" maxLength="200" className="popup__input"/>
    <span id="form_about-error" className="popup__span"></span>
  </PopupWithForm>
  )
}