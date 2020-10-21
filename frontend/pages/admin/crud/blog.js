import Layout from '../../../component/layout';
import Admin from '../../../component/auth/admin';
import BlogCreate from '../../../component/crud/BlogCreate';
import Tag from '../../../component/crud/tag';

const Blog = () => {
  return (
    <Layout>
      <Admin>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12 py-5">
              <h2>Create a new blog</h2>
            </div>
            <div className="col-md-6">
              <BlogCreate />
            </div>
          </div>
        </div>
      </Admin>
    </Layout>
  )
}

export default Blog;