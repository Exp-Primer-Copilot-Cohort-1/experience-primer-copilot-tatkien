// Create web server
// Load modules
var express = require('express');
var app = express();
var fs = require('fs');
var bodyParser = require('body-parser');
var path = require('path');

// Set up body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Serve index.html
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Serve comments
app.get('/comments', function (req, res) {
  fs.readFile('comments.json', 'utf8', function (err, data) {
    if (err) {
      console.log(err);
      res.status(500).send('An error occurred');
    } else {
      res.send(data);
    }
  });
});

// Save comments
app.post('/comments', function (req, res) {
  fs.readFile('comments.json', 'utf8', function (err, data) {
    if (err) {
      console.log(err);
      res.status(500).send('An error occurred');
    } else {
      var comments = JSON.parse(data);
      comments.push(req.body);
      fs.writeFile('comments.json', JSON.stringify(comments, null, 4), function (err) {
        if (err) {
          console.log(err);
          res.status(500).send('An error occurred');
        } else {
          res.send('Comment added');
        }
      });
    }
  });
});

// Start server
var server = app.listen(3000, function () {
  console.log('Server running at http://localhost:' + server.address().port);
}
);