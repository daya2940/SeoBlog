import fetch from 'isomorphic-fetch';
import { API } from '../config';

export const create = (category, token) => {
  return fetch(`${API}/category`, {
    method: 'POST',
    headers: {
      Accept: 'application/json', 'content-type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(category)
  }).then(response => {
    return response.json();
  }).catch(err => {
    console.log(err);
  });
};

export const getAllCategories = () => {
  return fetch(`${API}/categories`, {
    method: 'GET',
  }).then(response => {
    return response.json();
  }).catch(err => {
    console.log(err);
  });
};

export const getSingleCategories = (slug) => {
  return fetch(`${API}/category/${slug}`, {
    method: 'GET',
  }).then(response => {
    return response.json();
  }).catch(err => {
    console.log(err);
  });
};


export const removeCategories = (slug, token) => {
  return fetch(`${API}/category/${slug}`, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json', 'content-type': 'application/json',
      Authorization: `Bearer ${token}`
    },
  }).then(response => {
    return response.json();
  }).catch(err => {
    console.log(err);
  });
};




