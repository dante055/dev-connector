import React from 'react';
import Moment from 'react-moment';

const ProfileExperience = ({ experiences }) => {
  return (
    <div className='profile-exp bg-white p-2'>
      <h2 className='text-primary'>Experiences</h2>
      {experiences.length ? (
        experiences.map(exp => (
          <div key={exp._id}>
            <h3 className='text-dark'>{exp.company}</h3>
            <p>
              <Moment format='D MMM YYYY' date={exp.from} /> -{' '}
              {exp.to ? (
                <Moment format='D MMM YYYY' date={exp.to} />
              ) : (
                'Current'
              )}
            </p>
            <p>
              <strong>Position:</strong> {exp.title}
            </p>
            {exp.description && (
              <p>
                <strong>Description:</strong> {exp.description}
              </p>
            )}
          </div>
        ))
      ) : (
        <h4>No experience credentials...</h4>
      )}
    </div>
  );
};

export default ProfileExperience;
