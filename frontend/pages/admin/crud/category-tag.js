import Layout from '../../../component/layout';
import Admin from '../../../component/auth/admin';
import Link from 'next/link';
import Category from '../../../component/crud/category';
import Tag from '../../../component/crud/tag';

const CategoryTag = () => {
  return (
    <Layout>
      <Admin>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12 py-5">
              <h2>Manage category and tags</h2>
            </div>
            <div className="col-md-6">
              <Category />
            </div>
            {/* <div className="col-md-6">
              <Tag />
            </div> */}
          </div>
        </div>
      </Admin>
    </Layout>
  )
}

export default CategoryTag ;