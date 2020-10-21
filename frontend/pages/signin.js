import Layout from '../component/layout';
import SigninComponent from '../component/auth/signincomponent';


const Signin = () => {
  return (
    <Layout>
      <h1 className="text-center"> Signin</h1>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <SigninComponent />
        </div>
      </div>
    </Layout>
  )
}

export default Signin;