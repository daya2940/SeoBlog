import React, { Component } from 'react'
import moment from 'moment';
import Link from 'next/link';
import renderHTML from 'react-render-html';
import { API } from '../../config';


const Card = ({ blog }) => {

  const showBlogCategories = (blog) => {
    return blog.categories.map((c, i) => {
      return (
        <Link key={i} href={`categories/${c.slug}`}>
          <a className="btn btn-primary mr-1 ml-1 mt-3">{c.name}</a>
        </Link>
      );
    });
  }

  const showBlogTag = (blog) => {
    return blog.tags.map((t, i) => {
      return (
        <Link key={i} href={`tags/${t.slug}`}>
          <a className="btn btn-primary mr-1 ml-1 mt-3">{t.name}</a>
        </Link>
      );
    });
  }

  return (
    <div>
      <div className="lead pb-4">
        <header>
          <Link href={`blogs/${blog.slug}`} >
            <a><h2 className="pt-3 pb-3 font-weight-bold">{blog.title}</h2></a>
          </Link>
        </header>
        <section>
          <p className="mark ml-1 pt-2 pb-2">written by {blog.postedBy.name} | published {moment(blog.updatedAt).fromNow()}</p>
        </section>
        <section>
          <div>
            <p>Categories</p>
            {showBlogCategories(blog)}
          </div>
          <div>
            <p>Tags</p>
            {showBlogTag(blog)}
          </div>
        </section>
        <div className="row">
          <div className="col-md-4">
            <section className="mt-2">
              <img src={`${API}/blog/photo/${blog.slug}`} alt={blog.title} className="img img-fluid" style={{ maxHeight: 'auto', width: '100%' }}></img>
            </section>
          </div>
          <div className="col-md-8">
            <section>
              <div className="pb-3">
                {renderHTML(blog.excerpt)}
              </div>
              <Link href={`/blogs/${blog.slug}`}>
                <a className="btn btn-primary mt-2">Read More</a>
              </Link>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Card
