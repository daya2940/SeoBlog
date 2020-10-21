import { useState,useEffect } from 'react';
import { signup ,isAuth} from '../../actions/auth'
import { Router } from 'next/router';

const SignupComponent = () => {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    error: '',
    loading: false,
    message: '',
    showForm: true
  });


  const { name, email, password, error, loading, message, showForm } = values;

  useEffect(() => {
    isAuth() && Router.push('/');
  })

  const showLoading = () => (loading ? <div className="alert alert-info">Loading...</div> : '');
  const showError = () => (error ? <div className="alert alert-info">{error}</div> : '');
  const showMessage = () => (message ? <div className="alert alert-success">{message}</div> : '');

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log({name, email, password, error, loading, message, showForm });
    setValues({ ...values, loading: true, error: false });
    const user = { name, email, password };

    signup(user).then(data => {
      console.log(data);
      if (data.error) {
        setValues( {...values ,error: data.error,loading:false});
      }
      else {
        setValues({
          ...values,
          name: '',
          email: '',
          password: '',
          error:'',
          loading:false,
          message: data.message
        })
      }
    });
  };


  const handleChange = name => e => {
    setValues({ ...values, error: false, [name]: e.target.value })
  }


  const signUpForm = () => {
    return (
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input value={name} type="text" onChange={handleChange('name')} className="form-control" placeholder="Enter your name" />
        </div>
        <div className="form-group">
          <input value={email} type="email" onChange={handleChange('email')} className="form-control" placeholder="Enter your Email" />
        </div>
        <div className="form-group">
          <input value={password} type="text" onChange={handleChange('password')} className="form-control" placeholder="Enter your password" />
        </div>
        <button type="submit" className="btn btn-primary">SignUp</button>
      </form>
    )
  }
  return (
    <React.Fragment>
      {showLoading()}
      {showError()}
      {showMessage()}
      {showForm && signUpForm()}
    </React.Fragment>
  );
}

export default SignupComponent;