const User = require('../models/User');
const Post = require('../models/Post');
const AppError = require('../utills/appError');
const catchAsync = require('../utills/catchAsync');

exports.addPost = catchAsync(async (req, res, next) => {
  const post = await Post.create({
    text: req.body.text,
    user: req.user.id,
    name: req.user.name,
    avatar: req.user.avatar,
  });

  res.status(201).json({
    status: 'success',
    post,
  });
});

exports.addComment = catchAsync(async (req, res, next) => {
  const post = await Post.findByIdAndUpdate(
    req.params.postId,
    {
      $push: {
        comments: {
          $each: [
            {
              text: req.body.text,
              user: req.user.id,
              name: req.user.name,
              avatar: req.user.avatar,
            },
          ],
          $position: 0,
        },
      },
    },
    {
      new: true,
    }
  );

  if (!post) return next(new AppError('No post exist with this Id!', 404));

  res.status(201).json({
    status: 'success',
    post,
  });
});

exports.getAllCurrentUserPost = catchAsync(async (req, res, next) => {
  const posts = await Post.find({ user: req.user.id });

  if (!posts.length)
    return next(new AppError('No post submitted by this user!', 404));

  res.json({
    status: 'succes',
    results: posts.length,
    posts,
  });
});

exports.getAllPost = catchAsync(async (req, res, next) => {
  let query = Post.find();

  if (req.query.sort) {
    query = query.sort(req.query.sort);
  } else {
    query = query.sort('-date');
  }
  if (req.query.user) query = query.find({ name: req.query.user });
  if (req.query.userId) query = query.find({ user: req.query.userId });

  const posts = await query;

  if (!posts.length) return next(new AppError('No post found!', 404));

  res.json({
    status: 'succes',
    results: posts.length,
    posts,
  });
});

exports.getPostById = catchAsync(async (req, res, next) => {
  const post = await Post.findById(req.params.postId);

  if (!post) return next(new AppError('No post exist with this Id!', 404));

  res.json({
    status: 'succes',
    post,
  });
});

exports.likePost = catchAsync(async (req, res, next) => {
  let post = await Post.findById(req.params.postId);

  if (!post) return next(new AppError('No post exist with this Id!', 404));

  let removeIndex = post.disLikes.findIndex(
    disLike => disLike.user.toString() === req.user.id
  );

  if (removeIndex === -1) {
    removeIndex = post.likes.findIndex(
      like => like.user.toString() === req.user.id
    );

    if (removeIndex === -1) {
      post.likes.unshift({ user: req.user.id });
    } else {
      post.likes.splice(removeIndex, 1);
    }
  } else {
    post.disLikes.splice(removeIndex, 1);
  }

  await post.save();

  res.json({
    status: 'succes',
    post,
  });
});

exports.disLikePost = catchAsync(async (req, res, next) => {
  let post = await Post.findById(req.params.postId);

  if (!post) return next(new AppError('No post exist with this Id!', 404));

  let removeIndex = post.likes.findIndex(
    like => like.user.toString() === req.user.id
  );

  if (removeIndex === -1) {
    removeIndex = post.disLikes.findIndex(
      disLike => disLike.user.toString() === req.user.id
    );

    if (removeIndex === -1) {
      post.disLikes.unshift({ user: req.user.id });
    } else {
      post.disLikes.splice(removeIndex, 1);
    }
  } else {
    post.likes.splice(removeIndex, 1);
  }

  await post.save();

  res.json({
    status: 'succes',
    post,
  });
});

exports.updatePost = catchAsync(async (req, res, next) => {
  const post = await Post.findOneAndUpdate(
    { _id: req.params.postId, user: req.user.id },
    {
      text: req.body.text,
    },
    { new: true }
  );

  if (!post)
    return next(
      new AppError('You dont own this post or the post does not exist!', 404)
    );

  res.status(201).json({
    status: 'success',
    post,
  });
});

exports.updateComment = catchAsync(async (req, res, next) => {
  const post = await Post.findOneAndUpdate(
    {
      _id: req.params.postId,
      comments: {
        $elemMatch: {
          _id: req.params.commentId,
          user: req.user.id,
        },
      },
    },
    {
      $set: {
        'comments.$.text': req.body.text,
      },
    },
    { new: true }
  );

  if (!post) {
    return next(
      new AppError('You dont own this comment or the post does not exist!', 400)
    );
  }

  res.status(201).json({
    status: 'success',
    post,
  });
});

exports.deletePost = catchAsync(async (req, res, next) => {
  const post = await Post.findOneAndDelete({
    _id: req.params.postId,
    user: req.user.id,
  });

  if (!post) {
    return next(
      new AppError('You dont own this post or the post does not exist!', 400)
    );
  }

  res.status(204).json({
    status: 'succes',
    data: null,
  });
});

exports.deleteComment = catchAsync(async (req, res, next) => {
  const post = await Post.findOneAndUpdate(
    {
      _id: req.params.postId,
      comments: {
        $elemMatch: {
          _id: req.params.commentId,
          user: req.user.id,
        },
      },
    },
    {
      $pull: {
        comments: { _id: req.params.commentId },
      },
    }
  );

  if (!post) {
    return next(
      new AppError('You dont own this comment or the post does not exist!', 400)
    );
  }

  res.status(204).json({
    status: 'succes',
    data: null,
  });
});
