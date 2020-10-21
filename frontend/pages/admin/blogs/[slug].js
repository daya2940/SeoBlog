import Head from 'next/head';
import Link from 'next/link'
import { singleBlog, relatedBlog } from '../../../actions/blog';
import Layout from '../../../component/layout';
import { API, DOMAIN, APP_NAME } from '../../../config';
import { Fragment, useState, useEffect } from 'react';
import moment from 'moment';
import { withRouter } from 'next/router';
import renderHTML from 'react-render-html';
import SmallCard from '../../../component/blog/smallcard';

const SingleBlog = ({ blog, router }) => {

  const [related, setRelated] = useState([]);

  const loadRelated = () => {
    relatedBlog({ blog }).then(data => {
      if (data.error) {
        console.log(data.error);
      }
      else {
        setRelated(data);
      }
    })
  }

  useEffect(() => {
    loadRelated();
  },[]);

  const head = () => {
    return (
      <Head>
        <title>{blog.title}| {APP_NAME}</title>
        <meta name="description" content={blog.mdesc} />
        <link rel="canonical" href={`${DOMAIN}/blog/${router.pathname}`}></link>
        <meta property="og:title" content={blog.title} />
        <meta property="og:description"
          name="description" content={blog.mdesc} />
        <meta property="og:type" content="website" />
        <meta property="og:type" url={`${DOMAIN}${router.pathname}`} />
        <meta property="og:site_name" content={`${APP_NAME}`} />
        <meta property="og:image" content={`${API}/blog/photo/${blog.slug}`} />
        <meta property="og:image:secure_url" content={`${API}/blog/photo/${blog.slug}`} />
        <meta property="og:image:type" content={`${APP_NAME}`} />
        <meta property="fb:app_id" content={`${APP_NAME}`} />
        <meta property="og:site_name" content={`${1234}`} />
      </Head>
    )
  }

  const showBlogCategories = (blog, query) => {
    return blog.categories.map((c, i) => {
      return (
        <Link key={i} href={`admin/categories/${c.slug}`}>
          <a className="btn btn-primary mr-1 ml-1 mt-3">{c.name}</a>
        </Link>
      );
    });
  }

  const showBlogTag = (blog) => {
    return blog.tags.map((t, i) => {
      return (
        <Link key={i} href={`admin/tags/${t.slug}`}>
          <a className="btn btn-primary mr-1 ml-1 mt-3">{t.name}</a>
        </Link>
      );
    });
  }

  const showRelatedBlog = () => {
    return related.map((blog,i) => {
      <div className="col-md-4" key={i}>
        <article>
          <SmallCard blog={blog} />
        </article>
      </div>
    });
  }

  return <Fragment>
    {head()}
    <Layout>
      <main>
        <article>
          <div className="container">
            <section>
              <div className="row">
                <div className="row" style={{ marginTop: '10px' }}>
                  <img src={`${API}/blog/photo/${blog.slug}`} alt="{blog.title}" className="img img-fluid feature-img" />
                </div>
              </div>
            </section>
            <section>
              <h5 className="display-2 pb-3 text-center font-weight-bold">{blog.title}</h5>
              <p className="lead pt-1 pb-1">written by {blog.postedBy.name} | published {moment(blog.updatedAt).fromNow()}</p>
            </section>
            <div className="pb-3">
              {showBlogCategories(blog)}
              {showBlogTag(blog)}
            </div>
          </div>
          <div className="container">
            <section>
              <div className="col-md-12 lead">
                {renderHTML(blog.body)}
              </div>
            </section>
          </div>
          <div className="container pb-5">
            <h4 className="text-center pb-5 pt-5 h2">{JSON.stringify(related)}</h4>
            <hr />
            <p>show related blogs</p>
          </div>
          <div className="container pb-5">
            <h4 className="text-center pb-5 pt-5 h2">Comments</h4>
            <hr />
            <p>comments</p>
          </div>
        </article>
      </main>
    </Layout>
  </Fragment>

}

SingleBlog.getInitialProps = ({ query }) => {
  return singleBlog(query.slug).then(data => {
    if (data.error) {
      console.log(data.error);
    } else {
      return { blog: data }
    }
  });
}

export default withRouter(SingleBlog);