const BASE_URL = 'https://auth.nomoreparties.co'

export function register ({password, email}) {
  return fetch(`${BASE_URL}/signup`,{
    method : 'POST',
    headers : {
      'Content-Type': 'application/json'
    },
    body : JSON.stringify({password: password,email: email})
  })
    .then(res => res.status === 201 && res.json())
    .then(res => res)
    .catch(err => console.log(err))
}

export function authorize(email,password){
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({email: email, password: password})
  }).then(res => res.json())
    .then(data => {
      if (data.token){
        localStorage.setItem('jwt', data.token);
        return data;
      }
    })
    .catch(err => console.log(err))
}

export const getContent = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  }).then(res => res.json()
  ).then(data => data)
}