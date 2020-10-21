import Layout from '../../../component/layout';
import Admin from '../../../component/auth/admin';
import Tag from '../../../component/crud/tag';

const Tags = () => {
  return (
    <Layout>
      <Admin>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12 py-5">
              <h2>Manage Tag</h2>
            </div>
            <div className="col-md-6">
              <Tag />
            </div>
          </div>
        </div>
      </Admin>
    </Layout>
  )
}

export default Tags ;