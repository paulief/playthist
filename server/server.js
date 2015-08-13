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

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});

//test to check if server is live
app.get('/', function (req, res) {
  res.send('Hello World!');
});

/*
adding to tracks to one or many playlists
*/
app.post('/addTrack', function(req,res) {
	//values from POST request
	var track_id = req.body.track.trackId;
	var playlist_id = req.body.playlists; //will be array
	var track_title = req.body.track.trackTitle;
	var track_posted_by = req.body.track.trackPostedBy;
	var stream_url = req.body.track.streamUrl;
	var artwork_url = req.body.track.artworkUrl;
	var track_src = req.body.track.trackSrc;

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

/*
creating a new playlist
*/
app.post('/createPlaylist', function(req,res) {
	//values from POST request
	var playlist_id = req.body.playlistId;
	var user_id = req.body.userId;
	var playlist_name = req.body.playlistName;

	pg.connect(pgConnectionString, function(err, client, done) {
		if (err) {
			res.status(500).send(err);
			console.log(err);
		};

		var insertSql = "INSERT INTO test.playlists" +
						"(playlist_id, playlist_name, user_id)" +
						"VALUES ($1, $2, $3)";
		client.query(insertSql, [playlist_id, playlist_name, user_id], function(err, result) {
			done();

			if (err) {
				res.status(500).send(err);
				console.log(err);
			} else {
				res.status(200).send({message: "Playlist created: " + playlist_name});
			};
		})
	});
});

app.get('/getUserPlaylists/:user_id', function(req, res) {
	var user_id = req.params.user_id;
	var results = [];

	pg.connect(pgConnectionString, function(err, client, done) {
		if (err) {
			res.status(500).send(err);
			console.log(err);
		};

		var selectSql = "SELECT playlist_id, playlist_name, create_dtm " +
						"FROM test.playlists " + 
						"WHERE user_id = $1";
		var query = client.query(selectSql, [user_id], function(err) {
			if (err) {
				res.status(500).send(err);
				console.log(err);
			}
		});

		query.on('row', function(row) {
			results.push({
				playlistId: row.playlist_id,
				playlistName: row.playlist_name,
				playlistCreateDtm: row.create_dtm
			});
		});
		query.on('end', function() {
			done();
			res.json(results);
		});
	});
});