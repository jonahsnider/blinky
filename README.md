# Blinky

![Blinky](./src/assets/blinky.png)

Blinky is a minimal URL shortener/manager.

You can map long urls to specific subpaths (ex. `/docs` -> `https://example.com`).

## Hosting

### Docker

A Docker image is available on [Docker Hub](https://hub.docker.com/r/jonahsnider/blinky) as `jonahsnider/blinky`.

It requires the following environment variables to be set:

- `DATABASE_URL`
- `ADMIN_PASSWORD`
- `BASE_URL`

Please see below installation instructions for information on what these should be defined as.

### Without Docker

#### First time setup

0. [Install Node.js v20](https://nodejs.org/en/download/)

1. Clone the project

   ```sh
   git clone https://github.com/jonahsnider/blinky.git
   ```

2. Install dependencies

   ```sh
   npm ci
   ```

3. Build the project

   ```sh
   npm run build
   ```

4. Set environment variables

   1. Create a `.env` file in the root of this repository
   2. Set `DATABASE_URL` to a MySQL connection URL, following [this format](https://www.prisma.io/docs/orm/overview/databases/mysql#connection-url)
   3. Set `ADMIN_PASSWORD` to a password for accessing the admin interface
   4. Set `BASE_URL` to a well-formed URL where the service is hosted (ex. `https://blinky.example.com`)
   5. Set `NODE_ENV` to `production` so the server framework takes advantage of non-development features

5. Run database migrations

   ```sh
   npm run migrate
   ```

#### Updating

1. Pull the latest changes

   ```sh
   git pull
   ```

2. Install dependencies

   ```sh
    npm ci
   ```

3. Build the project

   ```sh
   npm run build
   ```

4. Run database migrations

   ```sh
   npm run migrate
   ```

#### Starting the server

Start the server:

```sh
npm start
```

The `PORT` environment variable can be defined (not in `.env`) to set what port the server will listen on:

```sh
PORT=8080 npm start
```
