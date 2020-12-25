import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getProfileById } from '../../../stateManager/actions/profileAction';
import Spinner from '../../utilityComponents/Spinner';
import ProfileAbout from './ProfileAbout';
import ProfileExperience from './ProfileExperience';
import ProfileTop from './ProfileTop';
import ProfileEducation from './ProfileEducation';
import ProfileGithub from './ProfileGithub';

const Profile = ({
  match,
  getProfileById,
  auth,
  profile: { profile, loading },
}) => {
  useEffect(() => {
    getProfileById(match.params.userId);
  }, [match.params.userId]);

  return loading && !profile ? (
    <Spinner />
  ) : (
    <section className='container'>
      <Link to='/profiles' className='btn btn-light'>
        Back To Profiles
      </Link>
      {profile && (
        <>
          {auth.isAuthenticated &&
            !auth.loading &&
            auth.user._id === profile.user._id && (
              <Link to='/dashboard/edit-profile' className='btn btn-dark'>
                Edit Profile
              </Link>
            )}
          <div className='profile-grid my-1'>
            <ProfileTop profile={profile} />
            <ProfileAbout profile={profile} />
            <ProfileExperience experiences={profile.experience} />
            <ProfileEducation education={profile.education} />
            {profile.githubusername && (
              <ProfileGithub username={profile.githubusername} />
            )}
          </div>
        </>
      )}
    </section>
  );
};

Profile.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { getProfileById })(Profile);
