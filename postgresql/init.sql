-- CREATE TABLE users (
--   "id" UUID PRIMARY KEY,
--   "login" VARCHAR(255) NOT NULL,
--   "password" VARCHAR(255) NOT NULL,
--   "version" INT NOT NULL,
--   "createdAt" BIGINT NOT NULL,
--   "updatedAt" BIGINT NOT NULL
-- );

-- CREATE TABLE artists (
--   "id" UUID PRIMARY KEY,
--   "name" VARCHAR(255) NOT NULL,
--   "grammy" BOOLEAN NOT NULL
-- );

-- CREATE TABLE albums (
--   "id" UUID PRIMARY KEY,
--   "name" VARCHAR(255) NOT NULL,
--   "artistId" UUID,
--   "year" INT NOT NULL
-- );

-- CREATE TABLE tracks (
--   "id" UUID PRIMARY KEY,
--   "name" VARCHAR(255) NOT NULL,
--   "artistId" UUID,
--   "albumId" UUID,
--   "duration" INT NOT NULL
-- );

-- CREATE TABLE favartists (
--   "id" UUID PRIMARY KEY,
--   "name" VARCHAR(255) NOT NULL,
--   "grammy" BOOLEAN NOT NULL
-- );

-- CREATE TABLE favalbums (
--   "id" UUID PRIMARY KEY,
--   "name" VARCHAR(255) NOT NULL,
--   "artistId" UUID
-- );

-- CREATE TABLE favtracks (
--   "id" UUID PRIMARY KEY,
--   "name" VARCHAR(255) NOT NULL,
--   "artistId" UUID,
--   "albumId" UUID,
--   "duration" INT NOT NULL
-- );

-- CREATE TABLE auth (
--   "login" VARCHAR(255) PRIMARY KEY,
--   "password" VARCHAR(255) NOT NULL,
--   "accessToken" VARCHAR(255),
--   "refreshToken" VARCHAR(255)
-- );