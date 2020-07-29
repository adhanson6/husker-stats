# Husker Stats

The backend for the Husker Stats project.

## Tech Stack

- Node.js - https://nodejs.org/en/
- Knex - http://knexjs.org
- Docker - https://www.docker.com
- PostgreSQL - https://www.postgresql.org

## Getting Started

- Clone the repository
- cd into the backend directory
- Execute npm install
- Copy the .env.sample file into a new .env file and fill it out
- Execute docker-compose up -d
  - Launches in the background. Will kick off a postgresql database container and an adminer instance on port 8080. Logins are what were used in the .env file
- Run the db migrations with npm run migrate
- Seed the db with npm run seed

Note: npm run rollback will perform a rollback, multiple needed if multiple migrations ran.
