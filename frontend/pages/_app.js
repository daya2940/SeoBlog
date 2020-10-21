import Head from 'next/head'
import '../node_modules/nprogress/nprogress.css'

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <div>
      <Head>
        <meta name="viewport" content="viewport-fit=cover" />
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"></link>
        <link rel="stylesheet" href="/static/css/style.css"></link>
      </Head>
      </div>
      <Component {...pageProps}/>
    </div>
  )
}

export default MyApp