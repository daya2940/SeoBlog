import Layout from '../../component/layout';
import Private from '../../component/auth/private';


const UserIndex = () => {
  return (
    <Layout>
      <Private>
        <h1>user dashboard</h1>
      </Private>
    </Layout>
  )
}

export default UserIndex;