import React from 'react';
import { Link } from 'react-router-dom';

export const ProfileItem = ({
  profile: { _id, company, status, location, skills, user },
}) => {
  return (
    <div className='profile bg-light'>
      <img className='round-img' src={user.avatar} alt='' />

      <div>
        <h2>{user.name}</h2>
        <p>
          {status} {company && `at ${company}`}
        </p>
        <p>{location && `${location}`}</p>
        <Link to={`profile/${user._id}`} className='btn btn-primary'>
          View Profile
        </Link>
      </div>

      <ul>
        {skills.slice(0, 4).map((skill, index) => (
          <li className='text-primary' key={index}>
            <i className='fas fa-check'></i>
            {skill}
          </li>
        ))}
      </ul>
    </div>
  );
};
