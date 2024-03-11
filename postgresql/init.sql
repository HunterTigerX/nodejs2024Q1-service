CREATE TABLE users (
  id UUID PRIMARY KEY,
  version INT NOT NULL,
  createdAt TIMESTAMP NOT NULL,
  updatedAt TIMESTAMP NOT NULL
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