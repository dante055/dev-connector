import React from 'react';
import Moment from 'react-moment';

const ProfileEducation = ({ education }) => {
  return (
    <div className='profile-edu bg-white p-2'>
      <h2 className='text-primary'>Education</h2>
      {education.length ? (
        education.map(edu => (
          <div key={edu._id}>
            <h3>{edu.school}</h3>
            <p>
              <Moment format='D MMM YYYY' date={edu.from} /> -{' '}
              {edu.to ? (
                <Moment format='D MMM YYYY' date={edu.to} />
              ) : (
                'Current'
              )}
            </p>
            <p>
              <strong>Degree:</strong> {edu.degree}
            </p>
            {edu.fieldofstudy && (
              <p>
                <strong>Field Of Study:</strong> {edu.fieldofstudy}
              </p>
            )}
            {edu.description && (
              <p>
                <strong>Description:</strong> {edu.description}
              </p>
            )}
          </div>
        ))
      ) : (
        <h4>No education credentials...</h4>
      )}
    </div>
  );
};

export default ProfileEducation;
