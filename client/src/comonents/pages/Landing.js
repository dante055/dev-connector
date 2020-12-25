import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

function Landing({ isAuthenticated }) {
  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <section className='landing'>
      <div className='dark-overlay'>
        <div className='landing-inner'>
          <div className='x-large'>Developer Connector</div>
          <p className='lead'>
            Create developer profile/portfofio share posts and get help from
            other developers
          </p>
          <div className='buttons'>
            <Link to='signup' className='btn btn-primary'>
              Sign Up
            </Link>
            <Link to='login' className='btn'>
              Login
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

Landing.prototype = {
  isAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(Landing);
