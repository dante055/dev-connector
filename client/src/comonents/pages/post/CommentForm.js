import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { addComment } from '../../../stateManager/actions/postAction';
import { connect } from 'react-redux';

const CommentForm = ({ postId, addComment }) => {
  const [text, setText] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    addComment(postId, text);
    setText('');
  };

  return (
    <div className='post-form'>
      <div className='post-form-header bg-primary'>
        <h3>Leave A Comment</h3>
      </div>

      <form onSubmit={handleSubmit} className='form my-1'>
        <textarea
          cols='30'
          rows='5'
          placeholder='Comment on this post'
          value={text}
          onChange={e => setText(e.target.value)}
          required
        ></textarea>
        <input type='submit' value='Submit' className='btn btn-dark my-1' />
      </form>
    </div>
  );
};

CommentForm.propTypes = {
  addComment: PropTypes.func.isRequired,
};

export default connect(null, { addComment })(CommentForm);
