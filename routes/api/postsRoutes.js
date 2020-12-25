const express = require('express');
const validatorController = require('../../controllers/validatorController');
const authController = require('../../controllers/authController');
const postController = require('../../controllers/postController');

const router = express.Router();

// @route   POST api/posts
// @desc    add new post
// @access  private
router.post(
  '/',
  validatorController.addPostOrCommentRules(),
  validatorController.validate,
  authController.protect,
  postController.addPost
);

// @route   GET api/posts/me
// @desc    get all current user post
// @access  Private
router.get('/me', authController.protect, postController.getAllCurrentUserPost);

// @route   GET api/posts
// @desc    get all post
// @access  public
router.get('/', postController.getAllPost);

// @route   GET api/posts/:postId
// @desc    get all post
// @access  public
router.get('/:postId', postController.getPostById);

// @route   GET api/posts/:postId/like
// @desc    like the post
// @access  private
router.post('/:postId/like', authController.protect, postController.likePost);

// @route   GET api/posts/:postId/dislike
// @desc    dislike the post
// @access  private
router.post(
  '/:postId/dislike',
  authController.protect,
  postController.disLikePost
);

// @route   GET api/posts/:postId/comment
// @desc    add the comment
// @access  private
router.post(
  '/:postId/comment',
  validatorController.addPostOrCommentRules(),
  validatorController.validate,
  authController.protect,
  postController.addComment
);

// @route   DELETE api/posts/:postId
// @desc    delete the comment (only the user which has created the post)
// @access  private
router.delete('/:postId', authController.protect, postController.deletePost);

// @route   DELETE api/posts/:postId/comment/:commentId
// @desc    delete the comment (only the user which has created the comment)
// @access  private
router.delete(
  '/:postId/comment/:commentId',
  authController.protect,
  postController.deleteComment
);

// @route   Patch api/posts/:postId
// @desc    delete the comment (only the user which has created the post)
// @access  private
router.patch(
  '/:postId',
  validatorController.addPostOrCommentRules(),
  validatorController.validate,
  authController.protect,
  postController.updatePost
);

// @route   Update api/posts/:postId/comment/:commentId
// @desc    delete the comment (only the user which has created the comment)
// @access  private
router.patch(
  '/:postId/comment/:commentId',
  validatorController.addPostOrCommentRules(),
  validatorController.validate,
  authController.protect,
  postController.updateComment
);

module.exports = router;
