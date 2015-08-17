var express = require('express');
var cors = require('cors'); //Only needed in test environment to bypass cross-origin restrictions
var bodyParser = require('body-parser');
var squel = require('squel');
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
	var trackToAdd = req.body.track;
	var playlists = req.body.playlists;

	pg.connect(pgConnectionString, function(err, client, done) {
		if(err) {
			res.status(500).send(err);
		};

		/*var insertSql = "INSERT INTO test.added_songs" +
						"(track_id, playlist_id, track_title, track_posted_by, stream_url, artwork_url, track_src)" +
						"VALUES ($1, $2, $3, $4, $5, $6, $7)"; */
		var insertSql = buildAddTrackInsertStmt(trackToAdd, playlists);
		client.query(insertSql, [],
			function(err, result) {
				done();

				if (err) {
					console.log(err);
					res.status(500).send(err); //why is the database error not coming back?
				} else {
					res.status(200).send({message: "Track added to playlists"});
				};
		});
	}); 
});

var buildAddTrackInsertStmt = function(trackToAdd, playlists) {
	var insertString = "INSERT INTO test.added_songs" +
						"(track_id, playlist_id, track_title, track_posted_by, stream_url, artwork_url, track_src)" +
						"VALUES ";
	var insertParams = [];
	console.log(playlists);
	//var workingCopy = trackToAdd.slice(0); //creating copy to change
	for (var i = 0; i < playlists.length; i++) {
		insertParams.push({
			track_id: trackToAdd.trackId,
			playlist_id: playlists[i],
			track_title: trackToAdd.trackTitle,
			track_posted_by: trackToAdd.trackPostedBy,
			stream_url: trackToAdd.streamUrl,
			artwork_url: trackToAdd.artworkUrl,
			track_src: trackToAdd.trackSrc
		});
	};
	var insertSql = squel.insert()
						.into("test.added_songs")
						.setFieldsRows(insertParams);
	console.log(insertSql.toString());
	return insertSql.toString();
}

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