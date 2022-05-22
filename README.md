# polimi-hyp-project-2022 [![CircleCI](https://circleci.com/gh/QUB3X/polimi-hyp-project-2022/tree/main.svg?style=svg&circle-token=6685188cd9c7a918d4b27068f208345ec1546cbb)](https://circleci.com/gh/QUB3X/polimi-hyp-project-2022/tree/main)

**Team AACF**:

-   Alessio Hu (10683050)
-   Andrea Franchini (10560276)
-   Carlo L. Reinotti (10840446)
-   Fabio Camerota (10864017)

<hr />

## Setup 🔨

```bash
# install dependencies
$ npm install
```

> At this point you should setup the database if you haven't done so.

### Database Setup (manual 😑🙅)

1. Install [Postgres](https://www.postgresql.org/download/) and [pgAdmin](https://www.pgadmin.org/).
2. Create a database, and call it `hyp`.

3. Duplicate `.env.template` and rename its copy to `.env`. It won't be committed.
4. Put your credentials in the `.env` file (they must match the one you choose in step 1).
5. _(Optional)_ Populate the database with preset data from `_initdb/`.

### Database Setup (Docker 🐋👌)

1. Install [Docker](https://docs.docker.com/get-docker/).
2. Duplicate `.env.template` and rename its copy to `.env`. It won't be committed.
3. Change `.env` variables (you should?)
4. From inside the project root folder, run
    ```bash
    docker compose up -d
    ```
5. Wait until the containers are online, then navigate to [http://localhost:8001](http://localhost:8001) and access pgAdmin with the credentials you set in step 3.
6. Connect to the Postgres instance by using as URL: `db`
    - _Add new server_
    - Under _General_: choose a _Name_
    - Under _Connection_: in _Host name/address_ type `db`, fill _Username_ and _Password_ according to the variables you set for **Postgres** in `.env`. You should also enable _Save Password_
    - Click _Save_

If you've done everything correctly, now your database should be up and running. and you can start developing!

> Docker will automatically runs any `.sql` script put into `_initdb/` folder when initializing the database.

## Develop 🚧

```bash
# serve with hot reload at localhost:8000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start
```

## NuxtJS Docs 📗

Please see the [DOCS page](./DOCS.md).
