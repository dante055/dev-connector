import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../../utilityComponents/Spinner';
import { getPosts } from '../../../stateManager/actions/postAction';
import PostItem from './PostItem';
import PostForm from './PostForm';

const Posts = ({ getPosts, post: { posts, loading } }) => {
  useEffect(() => {
    console.log('run hook');
    getPosts();
  }, []);

  return loading ? (
    <Spinner />
  ) : (
    <section className='container'>
      <h1 className='large text-primary'>Posts</h1>
      <p className='lead'>
        <i className='fas fa-user'></i>
        Welcome to the community
      </p>

      <PostForm />

      <div className='posts'>
        {posts && posts.length ? (
          posts.map(post => <PostItem key={post._id} post={post} />)
        ) : (
          <h4>No posts exist yet...</h4>
        )}
      </div>
    </section>
  );
};

Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  post: state.post,
});

export default connect(mapStateToProps, { getPosts })(Posts);
