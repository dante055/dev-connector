import React from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import useInputHook from '../../../hooks/useInputHook';
import { login } from '../../../stateManager/actions/authAction';
import PropTypes from 'prop-types';

function Login({ login, isAuthenticated }) {
  const [email, bindEmail, resetEmail] = useInputHook('');
  const [password, bindPassword, resetPassword] = useInputHook('');

  const handleSubmit = e => {
    e.preventDefault();
    login({ email, password });
  };

  // redirect if logged in
  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <section className='container'>
      <h1 className='large text-primary'>Log In</h1>
      <p className='lead'>
        <i className='fas fa-user'></i>
        Sign into your account
      </p>
      <form onSubmit={handleSubmit} className='form'>
        <div className='form-group'>
          <input
            type='email'
            placeholder='Email Address'
            {...bindEmail}
            required
          />
        </div>
        <div className='form-group'>
          <input
            type='password'
            placeholder='Password'
            {...bindPassword}
            minLength='8'
            required
          />
        </div>
        <input type='submit' value='Login' className='btn btn-primary' />
      </form>
      <p className='my-1'>
        Don't have an account?
        <Link to='signup'>Sign Up</Link>
      </p>
    </section>
  );
}

Login.prototype = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
  };
};

export default connect(mapStateToProps, { login })(Login);
