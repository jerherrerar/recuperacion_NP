var express = require('express');
var router = express.Router();
var ctrlPosts = require('../controllers/posts');

router.get('/posts', ctrlPosts.getPosts);
router.post('/posts', ctrlPosts.createPost);
router.get('/posts/:postid', ctrlPosts.getPost);
router.put('/posts/:postid', ctrlPosts.updatePost);
router.delete('/posts/:postid', ctrlPosts.deletePost);

module.exports = router;
