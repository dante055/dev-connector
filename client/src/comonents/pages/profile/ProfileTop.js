import React from 'react';

const ProfileTop = ({
  profile: { user, status, company, location, website, social },
}) => {
  const urlReplace = url =>
    url.replace(/^(?:https?:\/\/)?(?:www\.)?/i, '').split('/')[0];
  return (
    <div className='profile-top bg-primary p-2'>
      <img className='round-img my-1' src={user.avatar} alt='' />

      <h1 className='large'>{user.name}</h1>
      <p className='lead'>
        {status} {company && `at ${company}`}
      </p>
      {location && <p>{location}</p>}
      <div className='icons my-1'>
        {website && (
          <a
            href={`//${urlReplace(website)}`}
            target='_blank'
            rel='noopener noreferrer'
          >
            <i className='fas fa-globe fa-2x'></i>
          </a>
        )}
        {social.twitter && (
          <a
            href={`//${urlReplace(social.twitter)}`}
            target='_blank'
            rel='noopener noreferrer'
          >
            <i className='fab fa-twitter fa-2x'></i>
          </a>
        )}
        {social.facebook && (
          <a
            href={`//${urlReplace(social.facebook)}`}
            target='_blank'
            rel='noopener noreferrer'
          >
            <i className='fab fa-facebook fa-2x'></i>
          </a>
        )}
        {social.youtube && (
          <a
            href={`//${urlReplace(social.youtube)}`}
            target='_blank'
            rel='noopener noreferrer'
          >
            <i className='fab fa-youtube fa-2x'></i>
          </a>
        )}
        {social.linkedin && (
          <a
            href={`//${urlReplace(social.linkedin)}`}
            target='_blank'
            rel='noopener noreferrer'
          >
            <i className='fab fa-linkedin fa-2x'></i>
          </a>
        )}
        {social.instagram && (
          <a
            href={`//${urlReplace(social.instagram)}`}
            target='_blank'
            rel='noopener noreferrer'
          >
            <i className='fab fa-instagram fa-2x'></i>
          </a>
        )}
      </div>
    </div>
  );
};

export default ProfileTop;
