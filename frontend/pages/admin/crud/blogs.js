import Layout from '../../../component/layout';
import Admin from '../../../component/auth/admin';
import ReadBlog from '../../../component/crud/readBlog';
import Tag from '../../../component/crud/tag';

const Blogs = () => {
  return (
    <Layout>
      <Admin>
        <div className="container">
          <div className="row">
            <div className="col-md-12 py-5">
              <h2 className="ml-3">Manage Blogs</h2>
              <ReadBlog />
            </div>
          </div>
        </div>
      </Admin>
    </Layout>
  )
}

export default Blogs;