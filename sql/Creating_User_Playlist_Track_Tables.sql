create table test.playlists
(
	playlist_id serial,
	user_id integer,
	playlist_name varchar(50) NOT NULL,
	create_dtm timestamp default current_timestamp
);


create table test.added_songs
(
	track_added_id serial,
	track_id integer,
	playlist_id integer,
	user_id integer,
	track_title text,
	stream_url text,
	artwork_url text,
	track_src character(3),
	create_dtm timestamp default current_timestamp
);


create table test.users
(
	user_id integer,
	username varchar(30),
	create_dtm timestamp default current_timestamp
);