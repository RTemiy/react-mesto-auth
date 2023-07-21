import Header from './Header'
import Main from "./Main";
import Footer from "./Footer";
import React, {useState} from "react";
import {Routes, Route, useNavigate} from 'react-router-dom';
import ImagePopup from "./ImagePopup";
import {api} from "../utils/api";
import {CurrentUserContext} from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import Login from "./Login";
import Register from "./Register";
import InfoTooltip from "./InfoTooltip";
import {getContent} from "../utils/auth";
import MobileMenu from "./Mobile-Menu";
import ProtectedRoute from "./ProtectedRoute";

export default function App() {

  const navigate = useNavigate();
  const [cards, setCards] = useState([]);
  const [isEditAvatarPopupOpen,setEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen,setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen,setAddPlacePopupOpen] = useState(null);
  const [isTooltipOpen,setIsTooltipOpen] = useState(null);
  const [selectedCard,setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [email, setEmail] = useState('');
  const [loggedIn,setLoggedIn] = useState(null);
  const [isMobileMenuOpen,setIsMobileMenuOpen] = useState(false);

  React.useEffect(() =>{
    tokenCheck();

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

  function tokenCheck() {
    const jwt = localStorage.getItem('jwt');
    if (jwt){
      getContent(jwt).then((res) => {
        if (res){
          setLoggedIn(true);
          setEmail(res.data.email)
          navigate("/", {replace: true})
        }
      });
    }
  }

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
    setIsTooltipOpen(null);
    setSelectedCard(null);
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
    api.sendUserAvatar(data).then(r=>{
        setCurrentUser(r);
        closeAllPopups();
      })
    .catch(err=>{
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

  function handleLogin(token) {
    getContent(token).then((res) => {
      if (res){
        setLoggedIn(true);
        setEmail(res.data.email)
        navigate("/", {replace: true})
      }
    });
  }

  function handleRegister(status) {
    setIsTooltipOpen(status.data !== undefined);
    navigate('/sign-in', {replace: true})
  }

  function handleLogOut() {
    localStorage.removeItem('jwt');
    setLoggedIn(false);
    navigate('/sign-in');
    setIsMobileMenuOpen(false);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <MobileMenu onLogout={handleLogOut} email={email} isOpen={isMobileMenuOpen}/>
      <Header
        email={email}
        onLogout={handleLogOut}
        isMobileMenuOpen={isMobileMenuOpen}
        onMobileButton={
        ()=>{setIsMobileMenuOpen(!isMobileMenuOpen)}
      }/>
      <Routes>
        <Route
          path="/"
          element={
          <ProtectedRoute
            element={Main}
            loggedIn={loggedIn}
            cards={cards}
            onCardDelete={handleCardDelete}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onEditProfile={handleEditProfileClick}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}/>}
        />
        <Route path="/sign-up" element={<Register onRegister={handleRegister}/>} />
        <Route path="/sign-in" element={<Login handleLogin={handleLogin}/>}/>
        </Routes>
      <Footer/>
      <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
      <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
      <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddCard={handleAddCard} />
      <ImagePopup card={selectedCard} onClose={closeAllPopups}/>
      <InfoTooltip isOpen={isTooltipOpen} onClose={closeAllPopups}/>
    </CurrentUserContext.Provider>
  );
}