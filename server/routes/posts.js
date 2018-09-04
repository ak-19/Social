const {Router} = require('express');
const passport = require('passport');
const Post = require('../models/post');
const validator = require('../validation/validator');
const postValidator = require('../validation/post');
const commentValidator = require('../validation/comment');
const postsRouter = Router();

postsRouter.post('/', passport.authenticate('jwt', { session: false }), (req,res) => {
  const {isValid, errors} = validator(req.body, postValidator);
  if (isValid) {
    const {id: user, username: name, avatar} = req.user;
    const {text} = req.body;
    new Post({text, user, avatar, name})
    .save()
    .then(p =>  res.send('You made post succesfully'))
    .catch(e => res.status(400).json(e))
  }else{
    res.status(400).json(errors);
  }
});

postsRouter.get('/', passport.authenticate('jwt', { session: false }), (req,res) => {
    Post.find()
        .sort({date: -1})
        .then(posts =>  res.send(posts))
        .catch(e => res.status(400).json(e))
});

postsRouter.get('/my', passport.authenticate('jwt', { session: false }), (req,res) => {
    const {id: user} = req.user;
    Post.find({user})
        .sort({date: -1})
        .then(posts =>  res.send(posts))
        .catch(e => res.status(400).json(e))
});

postsRouter.get('/:id', passport.authenticate('jwt', { session: false }), (req,res) => {
    Post.findById(req.params.id)
        .then(post =>  res.send(post))
        .catch(e => res.status(400).json(e))
});

postsRouter.delete('/:id', passport.authenticate('jwt', { session: false }), (req,res) => {
    const {id: _id} = req.params;
    const {id: user} = req.user;
    Post.findOneAndDelete({_id, user})
        .then(post =>  {
          if (post) {
            res.send({msg: 'Post deleted', post})
          }else{
            res.send({msg: `Couldn't find post to delete`})
          }
        })
        .catch(e => res.status(400).json(e))
});

postsRouter.post('/hate/:postId', passport.authenticate('jwt', { session: false }), (req,res) => {
  const {postId: id} = req.params;
  const {id: user} = req.user;
  if (id) {
    Post.findById(id)
        .then(post =>  {
            const found = post.hates.find(item =>  JSON.stringify(user) === JSON.stringify(item._id));
            if (found) {
                post.hates.remove(user);
            } else {
                post.hates.push(user);
            }
            post.save()
                .then(p => res.send('You liked post succesfully'))
                .catch(e => res.status(400).json(e));
        })
        .catch(e => res.status(404).json(e))
  }else{
    res.status(404);
  }
});

postsRouter.get('/unlike/:postId', passport.authenticate('jwt', { session: false }), (req,res) => {
  const {postId: id} = req.params;
  const {id: user} = req.user;
  if (id) {
    Post.findById(id)
        .then(post =>  {
            post.likes = post.likes.filter(item => !item.toString().localeCompare(user));
            post.save()
                .then(p => res.send('You unliked post succesfully'))
                .catch(e => res.status(400).json(e));
        })
        .catch(e => res.status(404).json({error: 'Post not found'}))
  }else{
    res.status(404);
  }
});

postsRouter.post('/comment/:postId', passport.authenticate('jwt', { session: false }), (req,res) => {
  const {isValid, errors} = validator(req.body, commentValidator);
  if (isValid) {
      const {comment} = req.body;
      const {id: user, avatar, username: name} = req.user;
      const {postId} = req.params;
      if (postId) {
        Post.findById(postId)
        .then(post =>  {
          post.comments.push({user, comment, name, avatar});
          post.save()
          .then(p => res.send('You posted comment succesfully'))
          .catch(e => res.status(400).json(e));
        })
        .catch(e => res.status(404).json({error: 'Post not found'}))
      }else{
        res.status(404);
      }
  }else{
     res.status(400).json(errors)
  }
});

postsRouter.delete('/comment/:postId/:commentId', passport.authenticate('jwt', { session: false }), (req,res) => {
  const {postId, commentId} = req.params;
  if (postId) {
    Post.findById(postId)
        .then(post =>  {
            post.comments = post.comments.filter(c => !c.id.toString().localeCompare(commentId));
            post.save()
                .then(p => res.send('You deleted comment succesfully'))
                .catch(e => res.status(400).json(e));
        })
        .catch(e => res.status(404).json({error: 'Post not found'}))
  }else{
    res.status(404);
  }
});

module.exports = postsRouter;
