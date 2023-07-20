import {useState} from "react";
import {Link} from "react-router-dom";
import {register} from '../utils/auth'

export default function Register({onRegister}) {

  const [formValue,setFormValue] = useState({
    username : '',
    email : '',
    password : ''
  })


  function handleChange(e) {
    const {name,value} = e.target;

    setFormValue({
      ...formValue,
      [name]: value,
    })
  }

  function handleSubmit(e) {
    e.preventDefault();
      register(formValue).then(res => {onRegister(res)})
  }

  return(
    <div className="auth">
      <h2 className="auth__title">Регистрация</h2>
      <form id="form-reg" className="auth__form">
        <input id="reg-email" value={formValue.email} onChange={handleChange} name="email" className="auth__input" type="email" placeholder="Email"/>
        <input id="reg-password" value={formValue.password} onChange={handleChange} name="password" className="auth__input"type="password" placeholder="Пароль"/>
        <button className="auth__button" onClick={handleSubmit} type="button">Зарегистрироваться</button>
          <p className="auth__text">Уже зарегистрированы? <Link to="/sign-in" className="auth__link">Войти</Link></p>
      </form>
    </div>
  )
}