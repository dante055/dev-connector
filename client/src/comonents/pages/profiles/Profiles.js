import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Spinner from '../../utilityComponents/Spinner';
import { getAllProfiles } from '../../../stateManager/actions/profileAction';
import { connect } from 'react-redux';
import { ProfileItem } from './ProfileItem';

const Profiles = ({ getAllProfiles, profile: { profiles, loading } }) => {
  useEffect(() => {
    getAllProfiles();
  }, []);

  return loading ? (
    <Spinner />
  ) : (
    <section className='container'>
      <h1 className='large text-primary'>Developers</h1>
      <p className='lead'>
        <i className='fab fa-connectdevelop'></i>
        Browse and connect with developers
      </p>
      {profiles.length ? (
        <div className='profiles'>
          {profiles.map(profile => (
            <ProfileItem key={profile._id} profile={profile} />
          ))}
        </div>
      ) : (
        <h1>There is no profile present...</h1>
      )}
    </section>
  );
};

Profiles.propTypes = {
  getAllProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { getAllProfiles })(Profiles);
