import React from 'react';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { deleteComment } from '../../../stateManager/actions/postAction';
import PropTypes from 'prop-types';

const CommentItem = ({
  postId,
  comment: { _id, user, name, avatar, text, date },
  deleteComment,
  auth,
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
        {!auth.loading && user === auth.user._id && (
          <div className='my-1'>
            <button
              onClick={() => deleteComment(postId, _id)}
              type='button'
              className='btn btn-danger'
            >
              <i className='fas fa-times' />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

CommentItem.prototype = {
  deleteComment: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { deleteComment })(CommentItem);
