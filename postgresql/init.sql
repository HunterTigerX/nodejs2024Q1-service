-- CREATE TABLE users (
--   id UUID PRIMARY KEY,
--   version INT NOT NULL,
--   createdAt TIMESTAMP NOT NULL,
--   updatedAt TIMESTAMP NOT NULL
-- );

-- CREATE TABLE artists (
--   id UUID PRIMARY KEY,
--   name VARCHAR(255) NOT NULL,
--   grammy BOOLEAN NOT NULL
-- );

-- CREATE TABLE albums (
--   id UUID PRIMARY KEY,
--   name VARCHAR(255) NOT NULL,
--   artistId UUID REFERENCES artists(id)
-- );

-- CREATE TABLE tracks (
--   id UUID PRIMARY KEY,
--   name VARCHAR(255) NOT NULL,
--   artistId UUID REFERENCES artists(id),
--   albumId UUID REFERENCES albums(id),
--   duration INT NOT NULL
-- );

-- CREATE TABLE favorites (
--   userId UUID REFERENCES users(id),
--   artistId UUID REFERENCES artists(id),
--   albumId UUID REFERENCES albums(id),
--   trackId UUID REFERENCES tracks(id)
-- );