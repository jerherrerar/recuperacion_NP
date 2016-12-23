var mongoose = require('mongoose');
var Pos = mongoose.model('Post');

var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

/* GET list of posts */
module.exports.getPosts = function (req, res){
  Pos
    .find()
    .exec(function(err, posts) {
      if (!posts) {
        sendJsonResponse(res, 404, {
          "message": "posts not found"
        });
        return;
      } else if (err) {
        //console.log(err);
        sendJsonResponse(res, 404, err);
        return;
      }
      //console.log(users);
      sendJsonResponse(res, 200, posts);
    });  
  return;
}

//Get a specific post
module.exports.getPost = function (req, res) { 
  if (req.params && req.params.postid) {
    Pos
      .findById(req.params.postid)
      .exec(function(err, post){
        if (!post) {
          sendJsonResponse(res, 404, {
            "message": "postid not found"
          });
        }
        else if (err) {
          sendJsonResponse(res, 404, err);
          return;
        } 
        sendJsonResponse(res, 200, post);
    }); 
  } else {
    sendJsonResponse(res, 404, {
      "message": "postid is required"
    });
  } 
};

//Add new post 
module.exports.createPost = function(req, res){
	Pos.create({
    author: req.body.author, 
		title: req.body.title, 
		content: req.body.content
	},function(err, post){
		if (err){
      sendJsonResponse(res, 400, err);
    }else{
      sendJsonResponse(res, 201, post);
    }
	});
};

//Update a specific post
module.exports.updatePost = function (req, res) { 
  if (!req.params || !req.params.postid) {
    sendJsonResponse(res, 404, {
      "message" : "postid is required"});
    return;
  }
  Pos
    .findById(req.params.postid)
    .exec(
      function(err, post){
        if (!post) {
          sendJsonResponse(res, 404, {
            "message" : "postid not found"
          });
          return;
        }
        else if (err) {
          sendJsonResponse(res, 200, err);
          return;
        }
        post.content = req.body.content;
        post.save(function(err, post){
          if (err) {
            sendJsonResponse(res, 404, err);
          }
          else{
            sendJsonResponse(res, 200, post);
          }
        });       
      }
  );
};

//Delete a specific post
module.exports.deletePost = function (req, res) { 
  var postid = req.params.postid;
  if (postid) {
    Pos
      .findByIdAndRemove(postid)
      .exec(
        function(err, post){
          if (err) {
            sendJsonResponse(res, 404, err);
            return;
          }
          sendJsonResponse(res, 204, null);
        }
    );
  }
  else{
    sendJsonResponse(res, 404, {
      "message": "postid is required"
    });
  }
};

