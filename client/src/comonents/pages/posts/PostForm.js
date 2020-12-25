import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { addPost } from '../../../stateManager/actions/postAction';
import { connect } from 'react-redux';

const PostForm = ({ addPost }) => {
  const [text, setText] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    addPost(text);
    setText('');
  };

  return (
    <div className='post-form'>
      <div className='post-form-header bg-primary'>
        <h3>Say Something...</h3>
      </div>

      <form onSubmit={handleSubmit} className='form my-1'>
        <textarea
          cols='30'
          rows='5'
          placeholder='Create a post'
          value={text}
          onChange={e => setText(e.target.value)}
          required
        ></textarea>
        <input type='submit' value='Submit' className='btn btn-dark my-1' />
      </form>
    </div>
  );
};

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired,
};

export default connect(null, { addPost })(PostForm);
