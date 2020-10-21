import fetch from 'isomorphic-fetch';
import cookie from 'js-cookie';
import { API } from '../config';

export const signup = (user) => {
  return fetch(`${API}/signup`, {
    method: 'POST',
    headers: {
      Accept: 'application/json', 'content-type': 'application/json'
    },
    body: JSON.stringify(user)
  }).then(response => {
    return response.json();
  }).catch(err => {
    console.log(err);
  });
};

export const signin = (user) => {
  return fetch(`${API}/signin`, {
    method: 'POST',
    headers: {
      Accept: 'application/json', 'content-type': 'application/json'
    },
    body: JSON.stringify(user)
  }).then(response => {
    return response.json();
  }).catch(err => {
    console.log(err);
  });
};

export const signout = (next) => {
  removeCookie('token');
  removeSLocalStorage('user');
  next();

  return fetch(`${API}/signout`, {
    method: 'GET'
  }).then(response => {
    console.log('logout successful')
  }).catch(err => console.log(err));
}

//set cookie

export const setCookie = (key, value) => {
  if (process.browser) {
    cookie.set(key, value, { expires: 1 });
  }
}

//remove cookie

export const removeCookie = (key) => {
  if (process.browser) {
    cookie.remove(key, {
      expires: 1
    });
  }
}

//get cookie

export const getCookie = (key) => {
  if (process.browser) {
    return cookie.get(key);
  }
}

// set localstorage

export const setLocalStorage = (key, value) => {
  if (process.browser) {
    localStorage.setItem(key, JSON.stringify(value));
  }
}

//remove localStorage

export const removeSLocalStorage = (key) => {
  if (process.browser) {
    localStorage.removeItem(key);
  }
}

//authenticate
export const authenticate = (data, next) => {
  setCookie('token', data.token);
  setLocalStorage('user', {user: data.user,role: data.role,name: data.name});
  next();
}

export const isAuth = () => {
  if (process.browser) {
    const cookieChecked = getCookie('token');
    if (cookieChecked) {
      if (localStorage.getItem('user')) {
        return JSON.parse(localStorage.getItem('user'));
      }
      else {
        return false;
      }
    }
  }
}