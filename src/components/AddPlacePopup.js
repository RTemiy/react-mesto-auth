import PopupWithForm from "./PopupWithForm";
import React from "react";

export default function AddPlacePopup({isOpen, onClose, onAddCard}) {
  const [name,setName] = React.useState('');
  const [link,setLink] = React.useState('');

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeLink(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e){
    e.preventDefault();
    onAddCard({
      name : name,
      link : link,
    })
  }

  React.useEffect(() => {
    setName('');
    setLink('');
  }, [isOpen]);

  return(
    <PopupWithForm name='add-place' buttonText='Создать' isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit} title='Новое место'>
      <input placeholder="Название" id="form_place-name" onChange={handleChangeName} required minLength="2" value={name} maxLength="30" name="name" className="popup__input"/>
      <span id="form_place-name-error" className="popup__span"></span>
      <input placeholder="Ссылка на картинку" required type="url" onChange={handleChangeLink} id="form_place-link" value={link} name="link" className="popup__input"/>
      <span id="form_place-link-error" className="popup__span"></span>
    </PopupWithForm>
  )
}