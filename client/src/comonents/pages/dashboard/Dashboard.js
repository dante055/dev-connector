import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  getCurrentProfile,
  deleteAccount,
} from '../../../stateManager/actions/profileAction';
import Spinner from '../../utilityComponents/Spinner';
import { Link } from 'react-router-dom';
import Education from './Education';
import Experience from './Experience';

const Dashboard = ({
  getCurrentProfile,
  auth: { user },
  profile: { profile, loading },
  deleteAccount,
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, []);

  return loading && profile === null ? (
    <Spinner />
  ) : (
    <section className='container'>
      <h1 className='large text-primary'>Dashboard</h1>
      <p className='lead'>
        <i className='fas fa-user'></i>
        Welcome {user && user.name}
      </p>
      {profile ? (
        <>
          <div className='dash-buttons'>
            <Link to='/dashboard/edit-profile' className='btn'>
              <i className='fas fa-user-circle text-primary'></i>
              Edit Profile
            </Link>
            <Link to='/dashboard/add-experience' className='btn'>
              <i className='fab fa-black-tie text-primary'></i>
              Add Experience
            </Link>
            <Link to='/dashboard/add-education' className='btn'>
              <i className='fas fa-graduation-cap text-primary'></i>
              Add Education
            </Link>
          </div>

          <Experience experience={profile.experience} />

          <Education education={profile.education} />

          <div className='my-2'>
            <button onClick={() => deleteAccount()} className='btn btn-danger'>
              <i className='fas fa-user-minus'></i>
              Delete My Account
            </button>
          </div>
        </>
      ) : (
        <>
          <p>You have not yet setup a profile, please add some info!</p>
          <Link to='/create-profile' className='btn btn-primary my-1'>
            Create Profile
          </Link>
        </>
      )}
    </section>
  );
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  deleteAccount: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(
  Dashboard
);
