import Layout from '../component/layout';
import SignupComponent from '../component/auth/signupcomponent';

const signUp = () => {
  return (
    <Layout>
    <h3 className="text-center py-4"> signup</h3>
    <div className="row justify-content-center">
      <div className="col-md-6">
        <SignupComponent/>
      </div>
    </div>
    </Layout>
  )
}

export default signUp;