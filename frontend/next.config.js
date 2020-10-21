const withCss = require('@zeit/next-css');
// This is used to export the css for the nprogress

module.exports = withCss({
  publicRuntimeConfig: {
    APP_NAME: 'SEOBLOG',
    API_DEVELOPMENT: 'http://localhost:8000/api',
    PRODUCTION: false,
    DOMAIN_DEVELOPMENT: 'http//localhost:3000',
    DOMAIN_PRODUCTION: 'www.seoBlog.com'
  }
});