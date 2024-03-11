CREATE TABLE users (
  id UUID PRIMARY KEY,
  login VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  version INT NOT NULL,
  createdat bigint NOT NULL,
  updatedat bigint NOT NULL
);

CREATE TABLE artists (
  id UUID PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  grammy BOOLEAN NOT NULL
);

CREATE TABLE albums (
  id UUID PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  artistid UUID,
  year INT NOT NULL
);

CREATE TABLE tracks (
  id UUID PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  artistid UUID,
  albumid UUID,
  duration INT NOT NULL
);



CREATE TABLE favartists (
  id UUID PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  grammy BOOLEAN NOT NULL
);

CREATE TABLE favalbums (
  id UUID PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  artistid UUID
);

CREATE TABLE favtracks (
  id UUID PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  artistid UUID,
  albumid UUID,
  duration INT NOT NULL
);