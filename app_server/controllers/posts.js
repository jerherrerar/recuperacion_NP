var request = require('request');
var apiOptions = {
  server : "http://localhost:3000"
};
if (process.env.NODE_ENV === 'production') {
  apiOptions.server = "https://getting-mean-loc8r.herokuapp.com";
}

var _showError = function (req, res, status) {
  var title, content;
  if (status === 404) {
    title = "404, page not found";
    content = "Al parecer no se puede encontrar esa pagina.";
  } else if (status === 500) {
    title = "500, internal server error";
    content = "Problema con nuestro servidor.";
  } else {
    title = status + ", something's gone wrong";
    content = "Something, somewhere, has gone just a little bit wrong.";
  }
  res.status(status);
  res.render('generic-text', {
    title : title,
    content : content
  });
};

var renderHomepage = function(req, res, responseBody){
  res.render('posts-list', {
    title: 'BlogJerHer - Un lugar para publicar tus posts',
    pageHeader: {
      title: 'BlogJerHer',
      strapline: 'Lee y publica AQUI!'
    },
    sidebar: "Buscando un lugar para publicar y leer posts? BlogJerHer te ayuda a encontrar los mejores posts."
   });
};

/* GET 'home' page */
module.exports.homelist = function(req, res){
  renderHomepage(req, res);
};

var getPostInfo = function (req, res, callback) {
  var requestOptions, path;
  path = "/api/posts/" + req.params.postid;
  requestOptions = {
    url : apiOptions.server + path,
    method : "GET",
    json : {}
  };
  request(
    requestOptions,
    function(err, response, body) {
      var data = body;
      if (response.statusCode === 200) {
        callback(req, res, data);
      } else {
        _showError(req, res, response.statusCode);
      }
    }
  );
};

var renderDetailPage = function (req, res, postDetail) {
  res.render('post-info', {
    title: postDetail.name,
    pageHeader: {title: postDetail.name},
    sidebar: {
      context: '',
      callToAction: ''
    },
    post: postDetail
  });
};

/* GET 'Location info' page */
module.exports.postInfo = function(req, res){
  getPostInfo(req, res, function(req, res, responseData) {
    renderDetailPage(req, res, responseData);
  });
};

var renderPostForm = function (req, res) {
  res.render('post-form', {
    title: 'Crear en BlogJerHer',
    pageHeader: { title: 'Create Post '},
    error: req.query.err,
    url: req.originalUrl
  });
};

/* GET 'Add review' page */
module.exports.addPost = function(req, res){
  // getLocationInfo(req, res, function(req, res, responseData) {
    console.log("------");
    renderPostForm(req, res);
  };
// };

/* POST 'Add review' page */
module.exports.doAddPost = function(req, res){
  var requestOptions, path, postdata;  
  path = "/api/posts/";
  postdata = {
    author: req.body.name,
    title: req.body.title,
    content: req.body.content
  };
  requestOptions = {
    url : apiOptions.server + path,
    method : "POST",
    json : postdata
  };
  if (!postdata.author || !postdata.title || !postdata.content) {
    res.redirect('/posts/');
  } else {
    request(
      requestOptions,
      function(err, response, body) {
        if (response.statusCode === 201) {
          res.redirect('/posts/');
        } else if (response.statusCode === 400 && body.name && body.name === "ValidationError" ) {
          res.redirect('/posts/');
        } else {
          console.log(body);
          _showError(req, res, response.statusCode);
        }
      }
    );
  }
};