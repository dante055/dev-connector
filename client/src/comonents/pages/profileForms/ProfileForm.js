import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  createEditProfile,
  getCurrentProfile,
} from '../../../stateManager/actions/profileAction';
import { Link } from 'react-router-dom';

const initialState = {
  company: '',
  website: '',
  location: '',
  status: '',
  skills: '',
  githubusername: '',
  bio: '',
  twitter: '',
  facebook: '',
  linkedin: '',
  youtube: '',
  instagram: '',
};

const ProfileForm = ({
  profile: { profile, loading },
  createEditProfile,
  getCurrentProfile,
  history,
}) => {
  const [formData, setFormData] = useState(initialState);
  const [displaySoialInput, toggleSocialInput] = useState(false);

  useEffect(() => {
    if (!profile) getCurrentProfile();
    if (!loading && profile) {
      const profileData = { ...initialState };
      for (const key in profile) {
        if (key in profileData) profileData[key] = profile[key];
      }
      for (const key in profile.social) {
        if (key in profileData) profileData[key] = profile.social[key];
      }
      if (Array.isArray(profileData.skills))
        profileData.skills = profileData.skills.join(', ');
      setFormData(profileData);
    }
  }, [loading, getCurrentProfile, profile]);

  const {
    company,
    website,
    location,
    status,
    skills,
    githubusername,
    bio,
    twitter,
    facebook,
    linkedin,
    youtube,
    instagram,
  } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    createEditProfile(formData, history, profile ? true : false);
  };

  const input = (type, placeholder, name, value, isRequired) => (
    <input
      type={type}
      placeholder={placeholder}
      name={name}
      value={value}
      onChange={onChange}
      required={isRequired ? true : false}
    />
  );

  return (
    <section className='container'>
      <h1 className='large text-primary'>Create Your Profile</h1>
      <p className='lead'>
        <i className='fas fa-user'></i>
        Let's get some information to make your profile stand out
      </p>
      <small>* = required fields</small>
      <form onSubmit={handleSubmit} className='form'>
        <div className='form-group'>
          <select name='status' value={status} onChange={onChange} required>
            <option value=''>* Select Professional Status</option>
            <option value='Developer'>Developer</option>
            <option value='Junior Developer'>Junior Developer</option>
            <option value='Senior Developer'>Senior Developer</option>
            <option value='Manager'>Manager</option>
            <option value='Student or Learning'>Student or Learning</option>
            <option value='Instructor'>Instructor or Teacher</option>
            <option value='Intern'>Intern</option>
            <option value='Other'>Other</option>
          </select>
          <small className='form-text'>
            Give us an idea of where you are at in your career
          </small>
        </div>
        <div className='form-group'>
          {input('text', 'Company', 'company', company)}
          <small className='form-text'>
            Could be your own company or one you work for
          </small>
        </div>
        <div className='form-group'>
          {input('text', 'Website', 'website', website)}
          <small className='form-text'>
            Could be your own or a company website
          </small>
        </div>
        <div className='form-group'>
          {input('text', 'Location', 'location', location)}
          <small className='form-text'>
            City & state suggested (eg. Boston, MA)
          </small>
        </div>
        <div className='form-group'>
          {input('text', '* Skills', 'skills', skills, true)}
          <small className='form-text'>
            Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)
          </small>
        </div>
        <div className='form-group'>
          {input('text', 'Github Username', 'githubusername', githubusername)}
          <small className='form-text'>
            If you want your latest repos and a Github link, include your
            username
          </small>
        </div>

        <div className='form-group'>
          <textarea
            placeholder='A short bio of yourself'
            name='bio'
            value={bio}
            onChange={onChange}
          ></textarea>
          <small className='form-text'>Tell us a little about yourself</small>
        </div>

        <div className='my-2'>
          <button
            type='button'
            onClick={() => toggleSocialInput(!displaySoialInput)}
            className='btn btn-light'
          >
            Add Social Network Links
          </button>
          <span>Optional</span>
        </div>

        {displaySoialInput && (
          <>
            <div className='form-group social-input'>
              <i className='fab fa-twitter fa-2x'></i>
              {input('text', 'Twitter URL', 'twitter', twitter)}
            </div>

            <div className='form-group social-input'>
              <i className='fab fa-facebook fa-2x'></i>
              {input('text', 'Facebook URL', 'facebook', facebook)}
            </div>

            <div className='form-group social-input'>
              <i className='fab fa-youtube fa-2x'></i>
              {input('text', 'Youtube URL', 'youtube', youtube)}
            </div>

            <div className='form-group social-input'>
              <i className='fab fa-linkedin fa-2x'></i>
              {input('text', 'Linkedin URL', 'linkendin', linkedin)}
            </div>

            <div className='form-group social-input'>
              <i className='fab fa-instagram fa-2x'></i>
              {input('text', 'Instagram URL', 'instagram', instagram)}
            </div>
          </>
        )}

        <input type='submit' className='btn btn-primary my-1' />
        <Link to='dashboard' className='btn btn-light my-1'>
          Go Back
        </Link>
      </form>
    </section>
  );
};

ProfileForm.propTypes = {
  createEditProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  profile: state.profile,
});

export default connect(mapStateToProps, {
  createEditProfile,
  getCurrentProfile,
})(ProfileForm);
