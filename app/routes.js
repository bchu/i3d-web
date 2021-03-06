var express = require('express');
var router = express.Router();
module.exports = router;

var socketServer = require('./socket-server');
var app = require('./app');
var busboy = require('connect-busboy');
app.use(busboy());

// gyro update fallback
router.post('/update', function(req, res) {
  socketServer.updateAnimation(req.body); 
  res.end();
});

// video update fallback:
router.post('/video', function(req, res) {
  req.pipe(req.busboy);
  var data;
  req.busboy.on('file', function (fieldname, filestream, filename) {
    filestream.on('data', function(chunk) {
      if (!data) { data = chunk; }
      else {
        data = Buffer.concat([data, chunk]);
      }
    });
    filestream.on('end', function() {
      socketServer.updateVideo(data);
    });
  });
  res.end();
});


// views:

router.get('/', function(req, res) {
  res.render('index');
  res.end();
});

router.get('/video', function(req, res) {
  res.render('video');
  res.end();
});

