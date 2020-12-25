import PropTypes from 'prop-types';
import React from 'react';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  dislikePosts,
  likePosts,
} from '../../../stateManager/actions/postAction';

const PostDetails = ({
  post: { _id, text, likes, disLikes, avatar, name, date, user },
  likePosts,
  dislikePosts,
}) => {
  return (
    <div className='post bg-white p-1 my-1'>
      <div>
        <Link to={`/profile/${user}`}>
          <img className='round-img' src={avatar} alt='' />
          <h4>{name}</h4>
        </Link>
      </div>
      <div>
        <p className='my-1'>{text}</p>
        <p className='post-date'>
          Posted on <Moment format='D MMM YYYY' date={date} />
        </p>
        <button onClick={() => likePosts(_id)} className='btn'>
          <i className='fas fa-thumbs-up'></i>{' '}
          {likes.length > 0 && <span>{likes.length}</span>}
        </button>
        <button onClick={() => dislikePosts(_id)} className='btn'>
          <i className='fas fa-thumbs-down'></i>{' '}
          {disLikes.length > 0 && <span>{disLikes.length}</span>}
        </button>
      </div>
    </div>
  );
};

PostDetails.prototype = {
  likePosts: PropTypes.func.isRequired,
  dislikePosts: PropTypes.func.isRequired,
};

export default connect(null, {
  likePosts,
  dislikePosts,
})(PostDetails);
