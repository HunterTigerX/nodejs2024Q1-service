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
docker-compose up
```

After starting the app on port (5000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:5000/doc/.
For more information about OpenAPI/Swagger please visit https://swagger.io/.
To change the port, open .env file and change the PORT value.
Database port is 6000 and to change the port, open .env file and change the DB_PORT value. 

## Testing
After application is running open new terminal and enter:

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

### Auto-fix and format

```
npm run lint
```

```
npm run format
```

## Comments about forfeits
- 1.1 In case specific image is not used (it is required to use images like `postgres` and `node`, but not `ubuntu` with installation of `node` or `postgres`)
- 1.2 postgres:15-alpine and node:18-alpine were used.
- 2.1 Postgres container is not configured as dependency for application container
- 2.2  Only application container is configured to depend on database
- 3.1 for each failing test with `npm run test` 
- 3.2 No test errors were found
- 4.1 `docker-compose.yml` contains hardcoded variables
- 4.2  docker-compose.yml is using variables from env file
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