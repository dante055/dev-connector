import React from 'react';
import Moment from 'react-moment';
import { deleteExperience } from '../../../stateManager/actions/profileAction';
import { connect } from 'react-redux';

const Experience = ({ experience, deleteExperience }) => {
  const createRow = () => {
    return experience.map(exp => (
      <tr key={exp._id}>
        <td>{exp.company}</td>
        <td className='hide-sm'>{exp.title}</td>
        <td className='hide-sm'>
          <Moment format='D MMM YYYY' date={exp.from} /> -{' '}
          {exp.to ? <Moment format='D MMM YYYY' date={exp.to} /> : 'Current'}
        </td>
        <td>
          <button
            onClick={() => deleteExperience(exp._id)}
            className='btn btn-danger'
          >
            Delete
          </button>
        </td>
      </tr>
    ));
  };

  return (
    <>
      <h2 className='my-2'>Experience Credentials</h2>
      <table className='table'>
        <thead>
          <tr>
            <th>Company</th>
            <th className='hide-sm'>Title</th>
            <th className='hide-sm'>Years</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{createRow()}</tbody>
      </table>
    </>
  );
};

Experience.propTypes = {};

export default connect(null, { deleteExperience })(Experience);
