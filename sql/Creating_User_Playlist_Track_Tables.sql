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
	user_id integer, --not needed
	track_title text,
	track_posted_by text, --need to add this
	stream_url text,
	artwork_url text,
	track_src character(3), --needs to be longer, to just store the entire StateParam
	create_dtm timestamp default current_timestamp
);


create table test.users
(
	user_id integer,
	username varchar(30),
	create_dtm timestamp default current_timestamp
);