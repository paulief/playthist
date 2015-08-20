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

  console.log('Playthist app listening at http://%s:%s', host, port);
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
	/*
	DB IS NOT CURRENTLY NORMALIZED. NEED TO CONSIDER TRADEOFFS OF CREATING TRACK TABLE
	FOR NOW, IT WILL STAY DENORMALIZED  AS I FOCUS ON OTHER FEATURES
	*/

	var insertParams = [];

	//PLACE FOR REFACTORING? DOESN'T SEEM EFFICIENT (use of Array.map or Object.create?)
	for (var i = 0; i < playlists.length; i++) {
		insertParams.push({
			track_id: trackToAdd.trackId,
			playlist_id: playlists[i],
			track_title: trackToAdd.trackTitle,
			track_posted_by: trackToAdd.trackPostedBy || null,
			stream_url: trackToAdd.streamUrl || null,
			artwork_url: trackToAdd.artworkUrl || null,
			track_src: trackToAdd.trackSrc
		});
	};
	console.log(insertParams);
	var insertSql = squel.insert()
						.into("test.added_songs")
						.setFieldsRows(insertParams); //takes array and creates multi-row insert
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

app.get('/getUserPlaylistTracks/:playlist_id', function(req, res) {
	var playlist_id = req.params.playlist_id;
	var results = [];

	pg.connect(pgConnectionString, function(err, client, done) {
		if (err) {
			res.status(500).send(err);
			console.log(err);
		};
		
		var selectSql = squel.select()
							.from('test.added_songs')
							.field('track_id')
							.field('track_title')
							.field('stream_url')
							.field('artwork_url')
							.field('track_src')
							.field('create_dtm') //need to pull this back? for ordering maybe
							.field('track_posted_by')	
							.where('playlist_id = ?',playlist_id)
							.toString();

		var query = client.query(selectSql, [], function(err) {
			if(err) {
				res.status(500).send(err);
				console.log(err);
			};
		});

		query.on('row', function(row) {
			results.push({
				trackId: row.track_id,
				trackTitle: row.track_title,
				streamUrl: row.stream_url,
				artworkUrl: row.artwork_url,
				trackSrc: row.track_src,
				trackPostedBy: row.track_posted_by,
				trackCreateDtm: row.create_dtm
			});
		});
		query.on('end', function() {
			done();
			res.json(results);
		});

	});
});