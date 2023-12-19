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

   The server needs a few environment variables to be defined in order to function:

   | Variable         | Description                                                                                                             |
   | ---------------- | ----------------------------------------------------------------------------------------------------------------------- |
   | `DATABASE_URL`   | A MySQL connection URL, following [this format](https://www.prisma.io/docs/orm/overview/databases/mysql#connection-url) |
   | `ADMIN_PASSWORD` | A password for accessing the admin interface                                                                            |
   | `BASE_URL`       | A well-formed URL where the service is hosted (ex. `https://blinky.example.com`)                                        |

   You can either define these directly in your system environment, or use a `.env` file in the project root:

   ```sh
    # .env
   DATABASE_URL=mysql://user:password@host:port/database
   ADMIN_PASSWORD=password
   BASE_URL=https://blinky.example.com
   ```

   Documentation for how `.env` is parsed is [here](https://nextjs.org/docs/app/building-your-application/configuring/environment-variables#loading-environment-variables).

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
