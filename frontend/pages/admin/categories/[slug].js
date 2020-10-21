import Head from 'next/head';
import Link from 'next/link'
import Layout from '../../../component/layout';
import { API, DOMAIN, APP_NAME } from '../../../config';
import moment from 'moment';
import { withRouter } from 'next/router';
import renderHTML from 'react-render-html';
import { Fragment } from 'react';
import { getSingleCategories } from '../../../actions/category';
import Card from '../../../component/blog/card';


const Category = ({ category,blog,query,router }) => {
  const head = () => {
    return (
      <Head>
        <title>{category.name}| {APP_NAME}</title>
        <meta name="description" content={`Best programming tutorial${category.name}`} />
        <link rel="canonical" href={`${DOMAIN}/categories/${router.pathname}`}></link>
        <meta property="og:title" content={category.name} />
        <meta property="og:description"
          name="description" content={`Best programming tutorial${category.name}`} />
        <meta property="og:type" content="website" />
        <meta property="og:type" url={`${DOMAIN}${router.pathname}`} />
        <meta property="og:site_name" content={`${APP_NAME}`} />
        <meta property="og:image" content={`${API}/blog/photo/${query.slug}`} />
        <meta property="og:image:secure_url" content={`${API}/blog/photo/${query.slug}`} />
        <meta property="og:image:type" content={`${APP_NAME}`} />
        <meta property="fb:app_id" content={`${APP_NAME}`} />
        <meta property="og:site_name" content={`${1234}`} />
      </Head>
    )
  }
  return (
    <Fragment>
      {head()}
      <Layout>
        <main>
          <div className="container-fluid text-center">
            <header className="col-md-12 pt-3">
              <h1 className="display-4 font-weight-bold">{category.name}</h1>
            </header>
            {blog && blog.map((b,i) => <Card key={i} blog={b} />)}
          </div>
        </main>
      </Layout>
    </Fragment>
  )
};

Category.getInitialProps = ({ query }) => {
  return getSingleCategories(query.slug).then(data => {
    if (data.error) {
      console.log(data.error);
    } else {
      return { category: data.category,blog: data.blogs,query}
    }
  })
}

export default withRouter(Category)