create table test.playlists
(
	playlist_id varchar(50),
	user_id integer,
	playlist_name varchar(50) NOT NULL,
	create_dtm timestamp default current_timestamp
);


create table test.added_songs
(
	track_added_id serial,
	track_id integer,
	playlist_id varchar(50),
	track_title text,
	track_posted_by varchar(100),
	stream_url text,
	artwork_url text,
	track_src varchar(20),
	create_dtm timestamp default current_timestamp
);


create table test.users
(
	user_id integer,
	username varchar(30),
	create_dtm timestamp default current_timestamp
);