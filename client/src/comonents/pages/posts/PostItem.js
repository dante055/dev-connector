import React from 'react';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  likePosts,
  dislikePosts,
  deletePost,
} from '../../../stateManager/actions/postAction';

const PostItem = ({
  auth,
  post: { _id, text, likes, disLikes, avatar, name, date, user },
  likePosts,
  dislikePosts,
  deletePost,
}) => {
  return (
    <div className='post bg-white my-1 p-1'>
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
        <Link to={`/post/${_id}`} className='btn btn-primary'>
          Discussion
        </Link>
        {!auth.loading && user === auth.user._id && (
          <button
            onClick={() => deletePost(_id)}
            type='button'
            className='btn btn-danger'
          >
            <i className='fas fa-times' />
          </button>
        )}
      </div>
    </div>
  );
};

PostItem.prototype = {
  auth: PropTypes.object.isRequired,
  likePosts: PropTypes.func.isRequired,
  dislikePosts: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {
  likePosts,
  dislikePosts,
  deletePost,
})(PostItem);
