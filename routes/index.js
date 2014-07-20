var express = require('express');
var socketServer = require('./../lib/socket-server');
var router = express.Router();

/* Update iphone animation */
router.post('/update', function(req, res) {
  console.log(req.body.roll + ', ' + req.body.yaw + ', ' + req.body.pitch);
  console.log(req.body.quaternion);
  socketServer.updateAnimation(req.body.roll, req.body.pitch, req.body.yaw, req.body.quaternion); 
  res.end();
});

router.post('/screencast', function(req, res) {
  console.log(req.files);
  res.end();
});

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
