# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.
- Docker - [Download & Install Docker](https://www.docker.com/products/docker-desktop/)

## Downloading

```
git clone https://github.com/HunterTigerX/nodejs2024Q1-service/tree/develop_part_2
```

## Installing NPM modules

```
npm install
```

## Running application

```
At first, start docker
Don't forget to purge / clean data in docker in troubleshoot menu
Then run in the console
docker-compose up or npm run docker:up
```

App port is 5000. To change the app port, open .env file and change the PORT value.
Database port is 6000 and to change the port, open .env file and change the DB_PORT value. 

## Testing
After docker and application is running open new terminal and enter:

To run all tests without authorization

```
npm run test
```

To run only one of all test suites

```
npm run test -- <path to suite>
```

To run all test with authorization

```
npm run test:auth
```

To run only specific test suite with authorization

```
npm run test:auth -- <path to suite>
```

### Auto-fix and format prettier and lint errors

To fix linter errors, open new terminal and enter:

```
npm run lint
```

To fix prettier errors, open new terminal and enter:

```
npm run format
```

## Docker vulnerability scanner
You need to be logged in in docker app to run vulnerability tests.
To scan docker images for vulnerabilities you can run 2 commands:

1. To scan database image for vulnerability, open new terminal and enter:

```
npm run docker:scoutdb
```

2. To scan home library image for vulnerability, open new terminal and enter:

```
npm run docker:scoutapp
```

## Project vulnerability fix
To attempt to automatically fix detected vulnerabilities in a project and its dependencies, open new terminal and enter:

```
npm run scan:vuln
```
## Important Comments
- 1.1 Tests folder was accidentally changed when I replaced a capitalization of a few names in all files in the project and noticed that test folder was changed too late, but then replaced files back with the originals test folder, so all tests are original but have commits in them. This is not prohibited in part 2 and part 3 since there are no forefit like `-670 Changes in tests` which we had in part 1. You can double check if you want that all test are original and good by replacing test folder with you own test folder.

## Comments about Containerization, Docker
- 1.1 `Readme.md` has instruction how to run application
- 1.2 You are currently reading readme.md with all important instructions
- 2.1 `user-defined bridge` is created and configured
- 2.2 You can check that user-defined bridge was created using command `docker network inspect hls`
- 3.1 container auto restart after crash
- 3.2 `restart: unless-stopped` was implemented in docker-compose file to auto restart container after crash.
- 4.1 application is restarting upon changes implemented into `src` folder
- 4.2 using volumes and --watch allows the app to restart upon changes implemented into `src` folder
- 5.1 database files and logs to be stored in volumes instead of container
- 5.2 database files and logs are stored in db-data and db-logs
- 6.1 Migrations are used to create database entities 
- 6.2 Migrations are used to create database entities.
- 7.1 Variables used for connection to database to be stored in `.env`
- 7.2 All variables like port, host and etc used for connection to database are in .env file.
- 8.1 `typeorm` [decorators](https://typeorm.io/#/relations) or `prisma` relations create relations between entities
- 8.2 OneToOne was used to create relations between entities
- 9.1 Local **PostgreSQL** installation is not required for task check, connection is implemented to database stored in `docker` container  (on the basis of the previous task)
- 9.2 Database is stored in `postgresql` container. No **PostgreSQL** is required.


## Comments about Database (PostgreSQL) & ORM
- 1.1 `Users` data is stored in **PostgreSQL** database and `typeorm` / `prisma`  interacts with the database to manipulate data.  
- 1.2 Hardcoded database from task 1 was removed, typeorm was implemented.
- 2.1 `Artists` data is stored in **PostgreSQL** database and `typeorm` / `prisma`  interacts with the database to manipulate data.
- 2.2 Hardcoded database from task 1 was removed, typeorm was implemented.
- 3.1 `Albums` data is stored in **PostgreSQL** database and `typeorm` / `prisma`  interacts with the database to manipulate data.
- 3.2 Hardcoded database from task 1 was removed, typeorm was implemented.
- 4.1 `Tracks` data is stored in **PostgreSQL** database and `typeorm` / `prisma`  interacts with the database to manipulate data.
- 4.2 Hardcoded database from task 1 was removed, typeorm was implemented.
- 5.1 `Favorites` data is stored in **PostgreSQL** database and `typeorm` / `prisma`  interacts with the database to manipulate data.
- 5.2 Hardcoded database from task 1 was removed, typeorm was implemented.
- 6.1 Final size of the Docker image with application is less than 500 MB
- 6.2 Final size of the Docker image with application at huntertigerx/homelibrary is 141.43MB and is 410.98 MB in local repo.
- 7.1 Implemented npm script for vulnerabilities scanning (free solution)
- 7.2 npm run docker:scoutdb and npm run docker:scoutapp are used for vulnerabilities scanning
- 8.1 Your built image is pushed to DockerHub
- 8.2 huntertigerx/homelibrary is my app and huntertigerx/homelibrary is my database


## Comments about forfeits
- 1.1 In case specific image is not used (it is required to use images like `postgres` and `node`, but not `ubuntu` with installation of `node` or `postgres`)
- 1.2 postgres:15-alpine and node:18-alpine were used.
- 2.1 Postgres container is not configured as dependency for application container
- 2.2 Postgres container is configured as dependency for application container (app container depends on postgres container)
- 3.1 for each failing test with `npm run test`
- 3.2 No test errors were found, image was included to pull request.
- 4.1 `docker-compose.yml` contains hardcoded variables
- 4.2 `docker-compose.yml` is using variables from env file
- 5.1 Commits after deadline, except commits that affect only Readme.md, .gitignore, etc.
- 5.2 No commits after deadline were made
- 6.1 No Pull Request created 
- 6.2 Pull request was created and you can check it at https://github.com/HunterTigerX/nodejs2024Q1-service/pull/2
- 7.1 PR description is incorrect
- 7.2 PR description was made using RSS template
- 8.1 No separate development branch
- 8.2 Project is using separate “develop_part_2” branch
- 9.1 Less than 3 commits in the development branch, not taking into account commits, making changes only in `Readme.md` or similar files (`tsconfig.json`, `.gitignore`, `.prettierrc.json`, etc.)
- 9.2 In the development branch there are much more than 3 commits
- 10.1 for each error either on `npm run lint` on the basis of the **local config** or for compilation errors on the basis of the **local tsconfig** (`errors` not `warnings`).
- 10.2 No lint errors were found