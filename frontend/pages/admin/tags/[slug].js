import Head from 'next/head';
import Link from 'next/link'
import Layout from '../../../component/layout';
import { API, DOMAIN, APP_NAME } from '../../../config';
import moment from 'moment';
import { withRouter } from 'next/router';
import renderHTML from 'react-render-html';
import { Fragment } from 'react';
import Card from '../../../component/blog/card';
import { singleTag } from '../../../actions/tag';


const Blog = ({tag,blog,query,router}) => {
  const head = () => {
    return (
      <Head>
        <title>{tag.name}| {APP_NAME}</title>
        <meta name="description" content={`Best programming tutorial${tag.name}`} />
        <link rel="canonical" href={`${DOMAIN}/categories/${router.pathname}`}></link>
        <meta property="og:title" content={tag.name} />
        <meta property="og:description"
          name="description" content={`Best programming tutorial${tag.name}`} />
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
              <h1 className="display-4 font-weight-bold">{tag.name}</h1>
            </header>
            {blog && blog.map((b,i) => <Card key={i} blog={b} />)}
          </div>
        </main>
      </Layout>
    </Fragment>
  )
};

Blog.getInitialProps = ({ query }) => {
  return singleTag(query.slug).then(data => {
    console.log(data);
    if (data.error) {
      console.log(data.error);
    } else {
      return { tag: data.tag,blog: data.blogs,query}
    }
  })
}

export default withRouter(Blog)