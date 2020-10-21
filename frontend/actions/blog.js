import fetch from 'isomorphic-fetch';
import { API } from '../config';
import queryString from 'query-string'

export const createBlog = (blog, token) => {
  return fetch(`${API}/blog`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: blog
  }).then(response => {
    return response.json();
  }).catch(err => {
    console.log(err);
  });
};


export const listBlog = (skip,limit) => {
  const data ={limit,skip}
  return fetch(`${API}/blogs-categories-tags`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type':'application/json'
    },

    body: JSON.stringify(data)
  }).then(response => {
    return response.json();
  }).catch(err => {
    console.log(err);
  });
};


export const singleBlog = slug => {
  return fetch(`${API}/blogs/${slug}`,{
    method: 'GET',
  })
  .then(response => {
    return response.json();
  })
  .catch(e => console.log(e));
}

export const relatedBlog = (blog) => {
  return fetch(`${API}/blogs/related`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type':'application/json'
    },

    body: JSON.stringify(blog)
  }).then(response => {
    return response.json();
  }).catch(err => {
    console.log(err);
  });
};


export const list = () => {
  return fetch(`${API}/blogs`,{
    method: 'GET',
  })
  .then(response => {
    return response.json();
  })
  .catch(e => console.log(e));
}

export const removeBlog = (slug, token) => {
  return fetch(`${API}/blogs/${slug}`, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json','content-type': 'application/json',
      Authorization: `Bearer ${token}`
    },
  }).then(response => {
    return response.json();
  }).catch(err => {
    console.log(err);
  });
};

export const updateBlog = (blog,token,slug) => {
  console.log(blog,token,slug);
  return fetch(`${API}/blog/${slug}`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: blog
  }).then(response => {
    return response.json();
  }).catch(err => {
    console.log(err);
  });
};

export const listSearch = (params) => {
  console.log(para)
  const query = queryString.stringify(params);
  return fetch(`${API}/blog/search?${query}`,{
    method: 'GET',
  })
  .then(response => {
    return response.json();
  })
  .catch(e => console.log(e));
}









