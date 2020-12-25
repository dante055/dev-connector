import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import useInputHook from '../../../hooks/useInputHook';
import { setAlert } from '../../../stateManager/actions/alertAction';
import { register } from '../../../stateManager/actions/authAction';

const initialState = {
  name: '',
  email: '',
  password: '',
  passwordConfirmation: '',
};

function Register({ setAlert, register, isAuthenticated }) {
  const [formData, bindFormData, resetFormdata] = useInputHook(initialState);

  const { name, email, password, passwordConfirmation } = formData;

  const handleSubmit = e => {
    e.preventDefault();
    if (password !== passwordConfirmation) {
      setAlert('Passwords do not match', 'danger');
    } else {
      register({ name, email, password, passwordConfirmation });
    }
  };

  // redirect if logged in
  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <section className='container'>
      <h1 className='large text-primary'>Sign Up</h1>
      <p className='lead'>
        <i className='fas fa-user'></i>
        Create Your Account
      </p>
      <form onSubmit={handleSubmit} className='form'>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Name'
            name='name'
            value={name}
            onChange={bindFormData.onChange}
            required
          />
        </div>
        <div className='form-group'>
          <input
            type='email'
            placeholder='Email Address'
            name='email'
            value={email}
            onChange={bindFormData.onChange}
            required
          />
          <small className='form-text'>
            This site uses Gravatar, so if you want a profile image, use a
            Gravatar email
          </small>
        </div>
        <div className='form-group'>
          <input
            type='password'
            placeholder='Password'
            name='password'
            value={password}
            onChange={bindFormData.onChange}
            minLength='8'
            required
          />
        </div>
        <div className='form-group'>
          <input
            type='password'
            placeholder='Confirm Password'
            name='passwordConfirmation'
            value={passwordConfirmation}
            onChange={bindFormData.onChange}
            minLength='8'
            required
          />
        </div>
        <input type='submit' value='Register' className='btn btn-primary' />
      </form>
      <p className='my-1'>
        Already have an account?
        <Link to='login'>Sign In</Link>
      </p>
    </section>
  );
}

Register.prototype = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { setAlert, register })(Register);
