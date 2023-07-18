import Header from './Header'
import Main from "./Main";
import Footer from "./Footer";
import React, {useState} from "react";
import ImagePopup from "./ImagePopup";
import {api} from "../utils/api";
import {CurrentUserContext} from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";

export default function App() {

  const [cards, setCards] = useState([]);
  const [isEditAvatarPopupOpen,setEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen,setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen,setAddPlacePopupOpen] = useState(false);
  const [selectedCard,setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({});

  React.useEffect(() =>{

    api.getInitialCards().then(res=>{
      setCards(res)
    }).catch(e =>{
      console.log(e)
    })

    api.getUserInfo().then(res=>{
      setCurrentUser(res);
    }).catch(e =>{
      console.log(e)
    })

    return()=>{
      }
  },[]);

  function handleCardDelete (card) {
    api.deleteCard(card._id).then(() => {
      setCards(cards.filter(el => el._id !== card._id))
    })
      .catch(e =>{
      console.log(e)
    })
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    if(isLiked){
      api.deleteCardLike(card._id).then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      }).catch(e =>{
        console.log(e)
      })
    }
    else{
      api.addCardLike(card._id).then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      }).catch(e =>{
        console.log(e)
      })
    }
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleEditAvatarClick (){
    setEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick (){
    setEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick () {
    setAddPlacePopupOpen(true);
  }
  
  function closeAllPopups() {
    setEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setSelectedCard(null)
  }

  function handleUpdateUser (data) {
    api.sendUserInfo(data).then(res=>{
      setCurrentUser(res);
      closeAllPopups();
    }).catch(err=>{
      console.log(err);
    })
  }

  function handleUpdateAvatar(data) {
    api.sendUserAvatar(data).then(res=>{
      res.json().then(r=>{
        setCurrentUser(r);
        closeAllPopups();
      })
    }).catch(err=>{
      console.log(err);
    })
  }

  function handleAddCard(data) {
    api.postCard(data).then(res=>{
        setCards([res, ...cards]);
        closeAllPopups();
    }).catch(err=>{
      console.log(err);
    })
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header/>
      <Main cards={cards} onCardDelete={handleCardDelete} onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick} onEditProfile={handleEditProfileClick} onCardClick={handleCardClick} onCardLike={handleCardLike}/>
      <Footer/>
      <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
      <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
      <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddCard={handleAddCard} />
      <ImagePopup card={selectedCard} onClose={closeAllPopups}/>
    </CurrentUserContext.Provider>
  );
}