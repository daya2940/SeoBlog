import Head from 'next/head';
import Link from 'next/link'
import { listBlog } from '../../../actions/blog';
import Layout from '../../../component/layout';
import Card, { } from '../../../component/blog/card'
import { API, DOMAIN, APP_NAME } from '../../../config';
import { withRouter } from 'next/router';
import { Fragment, useState } from 'react';


const Blog = ({ blogs, categories, tags, totalBlogs, blogsLimit, blogSkip, router }) => {

  const head = () => (
    //this part is for the seo open graph
    <Head>
      <title>programming Blogs | {APP_NAME}</title>
      <meta name="description" content="Programming blogs and tutorials on node react and mongodb, web development" />
      <link rel="canonical" href={`${DOMAIN}${router.pathname}`}></link>
      <meta property="og:title" content={`latest web development tutorials`} />
      <meta property="og:description"
        name="description" content="Programming blogs and tutorials on node react and mongodb, web development" />
      <meta property="og:type" content="website" />
      <meta property="og:type" url={`${DOMAIN}${router.pathname}`} />
      <meta property="og:site_name" content={`${APP_NAME}`} />
      <meta property="og:image" content="/static/images/lion.jpeg" />
      <meta property="og:image:secure_url" content="/static/images/lion.jpeg" />
      <meta property="og:image:type" content={`${APP_NAME}`} />
      <meta property="fb:app_id" content={`${APP_NAME}`} />
      <meta property="og:site_name" content={`${1234}`} />
    </Head>
  )

  const [limit, setlimit] = useState(blogsLimit);
  const [skip, setskip] = useState(0);
  const [size, setsize] = useState(blogsLimit);
  const [loadedBlog, setloadedlimit] = useState([]);

  const loadMore = () => {
    let toSkip = skip + limit;
    listBlog(toSkip, limit).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setloadedlimit([...loadedBlog, ...data.blogs]);
        setsize(data.size);
        setskip(toSkip);
      }
    })
  };


  const loadMoreButton = () => {
    return (
      size > 0 && size >= limit && (<button className="btn btn-outline-primary btn-lg" onClick={loadMore}>Load More</button>)
    )
  }


  const showAllBlogs = () => {
    return blogs.map((blog, index) => {
      return <article key={index}>
        <Card blog={blog} />
      </article>
    })
  }

  const showAllLoadedBlogs = () => {
    return loadedBlog.map((blog, index) => {
      return <article key={index}>
        <Card blog={blog} />
      </article>
    })
  }

  const showAllCategories = () => {
    return categories.map((c, i) => {
      return <Link href={`categories/${c.slug}`} key={i}>
        <a className="btn btn-primary mr-1 ml-1 mt">{c.name}</a>
      </Link>
    })
  }

  const showAllTags = () => {
    return tags.map((t, i) => {
      return <Link href={`tags/${t.slug}`} key={i}>
        <a className="btn btn-outline-primary mr-1 ml-1 mt">{t.name}</a>
      </Link>
    })
  }



  return (
    <Fragment>
      {head()}
      <Layout>
        <main>
          <div className="container-fluid">
            <header>
              <div className="col-md-12 pt-3">
                <h1 className="display-4 font-weight-bold text-center">Programming blogs and tutorials</h1>
              </div>
              <section>
                <div className="py-2 text-center">
                  {showAllTags()}
                  <hr />
                  {showAllCategories()}
                </div>
              </section>
            </header>
          </div>
          <div className="container-fluid">{showAllBlogs()}</div>
          <div className="container-fluid">{showAllLoadedBlogs()}</div>
          <div className="text-center pt-5 pb-5">{loadMoreButton()}
          </div>
        </main>
      </Layout>

    </Fragment>
  )
};

Blog.getInitialProps = () => {
  let skip = 0;
  let limit = 5;
  return listBlog(skip, limit).then((data) => {
    if (data.error) {
      console.log(data.error);
    } else {
      console.log('blog', data.blogs)
      return {
        blogs: data.blogs,
        categories: data.categories,
        tags: data.tags,
        totalBlogs: data.size,
        blogsLimit: limit,
        blogSkip: skip
      };
    }

  })
}

export default withRouter(Blog);