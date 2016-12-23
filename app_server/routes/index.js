var express = require('express');
var router = express.Router();
var ctrlPosts = require('../controllers/posts');
var ctrlOthers = require('../controllers/others');

/* Locations pages */
router.get('/', ctrlPosts.homelist);
router.get('/posts/:postid', ctrlPosts.postInfo);
router.get('/posts/new', ctrlPosts.addPost);
router.post('/posts/new', ctrlPosts.doAddPost);

/* Other pages */
router.get('/about', ctrlOthers.about);

module.exports = router;
