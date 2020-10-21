import React, { Component, Fragment } from 'react'
import moment from 'moment';
import Link from 'next/link';
import renderHTML from 'react-render-html';
import { API } from '../../config';


const SmallCard = ({ blog }) => {

  return (
    <div>
      <div className="card">
        <section>
          <Link href={`/blogs/${blog.slug}`}>
            <a>
              <section>
                <img src={`${API}/blog/photo/${blog.slug}`} alt={blog.title} className="img img-fluid" style={{ maxHeight: '150px', width: 'auto' }}></img>
              </section>
            </a>
          </Link>
        </section>
        <div className="card-body">
          <section>
            <Link href={`/blogs/${blog.slug}`}>
              <h5 className="card-title">{blog.title}</h5>
            </Link>
            <p className="card-text">{renderHTML(blog.excerpt)}</p>
          </section>
        </div>
        <div className="card-body">
          <Link href={`/blogs/${blog.slug}`}>
            <a className="btn btn-primary mt-2">Read More</a>
          </Link>
          Posted {moment(blog.updatedAt).fromNow()} by {blog.postedBy.name}
        </div>
      </div>
    </div >
  )
}

export default SmallCard;
