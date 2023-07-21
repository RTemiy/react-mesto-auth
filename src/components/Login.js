import {useState} from "react";
import {authorize} from "../utils/auth"

export default function Login ({handleLogin}) {

  const [formValue,setFormValue] = useState({
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
    if (!formValue.email || !formValue.password){
      return;
    }
    authorize(formValue.email, formValue.password)
      .then(data => {
          setFormValue({email: '', password: ''});
          handleLogin(data.token);
      })
      .catch(err => console.log(err));
  }

  return(
    <div className="auth">
      <h2 className="auth__title">Вход</h2>
      <form id="form-log" className="auth__form">
        <input id="log-email" value={formValue.email} onChange={handleChange} name="email" className="auth__input" type="email" placeholder="Email"/>
        <input id="log-password" value={formValue.password} onChange={handleChange} name="password" className="auth__input"type="password" placeholder="Пароль"/>
        <button className="auth__button" onClick={handleSubmit} type="button">Войти</button>
      </form>
    </div>
  )
}