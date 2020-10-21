import Link from 'next/link'
import { useEffect, useState, Fragment } from 'react';
import Router from 'next/router'
import { getCookie, isAuth } from '../../actions/auth'
import { getAllCategories } from '../../actions/category'
import { getAllTags } from '../../actions/tag'
import { updateBlog, list, removeBlog } from '../../actions/blog';
import moment from 'moment';

const ReadBlog = () => {

  const [blogs, setBlogs] = useState([]);
  const [message, setMessage] = useState('');
  const token = getCookie('token');

  useEffect(() => {
    loadBlogs();
  }, []);

  const loadBlogs = () => {
    list().then(data => {
      console.log(data);
      if (data.error) {
        console.log(data.error);
      }
      setBlogs(data);
    });
  }

  const showUpdateButton = (blog) => {
      if(isAuth() && isAuth().role===0){
        return(
          <Link href={`/user/crud/${blog.slug}`}>
            <a className="btn btn-sm btn-warning">Update</a>
          </Link>
        )
      }
      else if(isAuth() && isAuth().role===1){
        console.log(blog);

        return(
          <Link href={`/admin/crud/${blog.slug}`}>
            <a className="btn btn-sm btn-warning">Update</a>
          </Link>
        )
      }
  }

  const showAllBlogs = () => {
    return blogs.map((blog, i) => (
      <div className="mt-5" key={i}>
        <h3>{blog.title}</h3>
        <p className="mark">Written by {blog.postedBy.name}| Published on {moment(blog.updateAt).fromNow()}</p>
        <button className="btn btn-sm btn-danger" onClick={() => deleteConfirm(blog.slug)}>Delete</button>
        <span className="ml-2 ">{showUpdateButton(blog)}</span>
      </div>
    ))
  }

  const deleteBlog = (slug) => {
    removeBlog(slug, token).then(data => {
      console.log(data);
      if (data.error) {
        console.log(data.error);
      }
      setMessage(data.message);
      loadBlogs();
    })
  }

  const deleteConfirm = (slug) => {
    let answer = window.confirm('Are you sure you want to delete the blog?');
    if (answer) {
      deleteBlog(slug);
    }
  }

  return (
    <Fragment>
      <div className="col-md-12 mb-0">
        {message && <div className="alert alert-warning">{message}</div>}
        {showAllBlogs()}
      </div>
    </Fragment>
  )
}

export default ReadBlog
