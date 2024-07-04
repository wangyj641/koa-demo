# Server
- Back-end app

### Key Skills
- Koa, Prisma, PostgreSQL, Docker, JWT, mocha

### Key Features
- Provide RESTful API for front-end app
- Provide RESTful API to receive sensor data
- Provide RESTful API to handle CSV files
- Manage data with PostgreSQL DB

### Getting Started

- Clone the code and install, Be sure to install multer@1.4.3, the latest version will cause crash.
  ```shell
  npm install
  ```
- create docker PostgreSQL DB
  Start docker
  Ensure that port 5432 is not allocated, then run the command to create container:
  ```shell
  docker-compose up -d
  ```
  Ensure that the container is created, then run the command to init DB:
  ```shell
  npx prisma migrate dev --name "init"
  ```
  Check http://localhost:8080/
  ```shell
  user: admin
  password: 123456
  ```

  Ensure that the DB is created, then run the command to insert the fake data to DB:
  ```shell
  npx node ./prisma/seed.js
  ```
  Check http://localhost:8080/?pgsql=db&username=admin&db=radix-db&ns=public&select=Data

  Ensure that the fake data is inserted into DB, then start the app:
  ```shell
  npm start
  ```
  Ensure that the app is running.
  ```shell
  Running Koa App on port 8081...
  ```

  ### How to test
  ```shell
  npm test
  ```