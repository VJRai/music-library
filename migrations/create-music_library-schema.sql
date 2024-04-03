CREATE TABLE public.albums (
	created_at timestamp(6) NOT NULL,
	id SERIAL PRIMARY KEY,
	"name" varchar(255) NOT NULL
);

CREATE TABLE public.artists (
	created_at timestamp(6) NOT NULL,
	id SERIAL PRIMARY KEY,
	"name" varchar(255) NOT NULL,
	CONSTRAINT artists_name_key UNIQUE (name)
);

CREATE TABLE public.genres (
	created_at timestamp(6) NOT NULL,
	id SERIAL PRIMARY KEY,
	"name" varchar(255) NOT NULL
);

CREATE TABLE public.songs (
	duration int4 NULL,
	created_at timestamp(6) NULL,
	id SERIAL PRIMARY KEY,
	release_date int8 NULL,
	title varchar(255) NULL
);

CREATE TABLE public.songs_albums (
	track_number int4 NOT NULL,
	album_id int8 NOT NULL,
	created_at timestamp(6) NULL,
	song_id int8 NOT NULL,
	CONSTRAINT songs_albums_pkey PRIMARY KEY (album_id, song_id)
);

-- public.songs_albums foreign keys
ALTER TABLE public.songs_albums ADD CONSTRAINT fkiymn5troa5jqhgchn8b4hwq8p FOREIGN KEY (album_id) REFERENCES public.albums(id);
ALTER TABLE public.songs_albums ADD CONSTRAINT fkjkh18jn8gfljw3yb5xsd58qyf FOREIGN KEY (song_id) REFERENCES public.songs(id);

CREATE TABLE public.songs_artists (
	artist_id int8 NOT NULL,
	created_at timestamp(6) NOT NULL,
	song_id int8 NOT NULL,
	artist_credit varchar(255) NOT NULL,
	CONSTRAINT songs_artists_artist_credit_check CHECK (((artist_credit)::text = ANY ((ARRAY['PRIMARY'::character varying, 'FEATURED'::character varying])::text[]))),
	CONSTRAINT songs_artists_pkey PRIMARY KEY (artist_id, song_id)
);


-- public.songs_artists foreign keys
ALTER TABLE public.songs_artists ADD CONSTRAINT fk3rfcypc1jhdn68x9q7du7ofhn FOREIGN KEY (song_id) REFERENCES public.songs(id);
ALTER TABLE public.songs_artists ADD CONSTRAINT fkf7qhcl6teb1qulu87gbfrwp6s FOREIGN KEY (artist_id) REFERENCES public.artists(id);


CREATE TABLE public.songs_genres (
	genre_id int8 NOT NULL,
	song_id int8 NOT NULL,
	CONSTRAINT songs_genres_pkey PRIMARY KEY (genre_id, song_id)
);


-- public.songs_genres foreign keys
ALTER TABLE public.songs_genres ADD CONSTRAINT fke9j0j50c3i76ex0owuug5u1gn FOREIGN KEY (song_id) REFERENCES public.songs(id);
ALTER TABLE public.songs_genres ADD CONSTRAINT fks02tnp6d1vs4go7cltqfdou0d FOREIGN KEY (genre_id) REFERENCES public.genres(id);