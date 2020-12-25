import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../../utilityComponents/Spinner';
import {
  getPostById,
  deletePost,
} from '../../../stateManager/actions/postAction';
import CommentForm from './CommentForm';
import PostDetails from './PostDetails';
import { Link } from 'react-router-dom';
import CommentItem from './CommentItem';

const Post = ({
  getPostById,
  deletePost,
  match,
  auth,
  post: { post, loading },
  history,
}) => {
  useEffect(() => {
    getPostById(match.params.postId);
  }, [match.params.postId]);

  return loading && !post ? (
    <Spinner />
  ) : (
    <section className='container'>
      <Link to='/posts' className='btn'>
        Back To Posts
      </Link>
      {post && (
        <>
          {!auth.loading && post.user === auth.user._id && (
            <button
              onClick={() => deletePost(post._id, history, true)}
              className='btn btn-danger'
            >
              Delete Post
            </button>
          )}
          <PostDetails post={post} />

          <CommentForm postId={post._id} />

          {/* comment */}
          {post.comments.length > 0 && (
            <div className='posts'>
              {post.comments.map(comment => (
                <CommentItem
                  key={comment._id}
                  postId={post._id}
                  comment={comment}
                />
              ))}
            </div>
          )}
        </>
      )}
    </section>
  );
};

Post.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  getPostById: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  post: state.post,
  auth: state.auth,
});

export default connect(mapStateToProps, { getPostById, deletePost })(Post);
