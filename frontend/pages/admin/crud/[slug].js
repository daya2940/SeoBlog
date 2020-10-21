import Layout from '../../../component/layout';
import Admin from '../../../component/auth/admin';
import Tag from '../../../component/crud/tag';
import BlogUpdate from '../../../component/crud/blogupdate';

const Blog = () => {
  return (
    <Layout>
      <Admin>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12 py-5">
              <h2>Update blog</h2>
            </div>
            <div className="col-md-12">
              <BlogUpdate />
            </div>
          </div>
        </div>
      </Admin>
    </Layout>
  )
}

export default Blog;