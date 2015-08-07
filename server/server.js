var express = require('express');
var cors = require('cors'); //Only needed in test environment to bypass cross-origin restrictions
var bodyParser = require('body-parser');
//DB setup
var pg = require('pg');
var pgConnectionString = 'postgres://pfagan:archmere09@playthist-db.cy8flcjp70zs.us-west-2.rds.amazonaws.com:5432/playthist';

var app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.send('Hello World!');
});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});

app.post('/addtrack', function(req,res) {
	console.log(req.body);
	//res.send('POST received');

	//values from POST request
	var track_id = req.body.track.track_id;
	var playlist_id = req.body.playlists; //will be array
	var track_title = req.body.track.track_title;
	var track_posted_by = req.body.track.track_posted_by;
	var stream_url = req.body.track.stream_url;
	var artwork_url = req.body.track.artwork_url;
	var track_src = req.body.track.track_src;

	pg.connect(pgConnectionString, function(err, client, done) {
		if(err) {
			res.status(500).send(err);
		};

		var insertSql = "INSERT INTO test.added_songs" +
						"(track_id, playlist_id, track_title, track_posted_by, stream_url, artwork_url, track_src)" +
						"VALUES ($1, $2, $3, $4, $5, $6, $7)";
		client.query(insertSql, [track_id, playlist_id, track_title, track_posted_by, stream_url, artwork_url, track_src],
			function(err, result) {
				done();

				if (err) {
					res.status(500).send(err); //why is the database error not coming back?
				} else {
					res.status(200).send({message: "Track added to playlists"});
				};
		});
	}); 
});