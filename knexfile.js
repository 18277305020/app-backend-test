const databaseName = "wanhuatong_db";

module.exports = {
  development: {
    client: "postgresql",
    connection: {
      host: 'localhost',
      user: 'wanhuatong',
      password: 'wanhuatong',
      database: databaseName
    },
    migrations: {
      directory: "./server/db/migrations"
    },
    seeds: {
      directory: __dirname + "/reactjs/db/seeds"
    }
  },
  production: {
    client: 'postgresql',
    // connection: `postgres://localhost:5432/${databaseName}`,
    connection: {
      host: 'localhost',
      user: 'wanhuatong',
      password: 'wanhuatong',
      database: databaseName
    },
    migrations: {
      directory: './server/db/migrations'
    },
    seeds: {
      directory: __dirname + '/reactjs/db/seeds'
    }
  },
  staging: {
    client: "postgresql",
    connection: {
      host: "demo.abstracttokenization.com",
      database: databaseName,
      port: 5432,
      user: "dbadmin",
      password: "abstractre2018&"
    },
    migrations: {
      directory: __dirname + "/src/server/db/migrations"
    },
    seeds: {
      directory: __dirname + "/src/server/db/seeds"
    }
  },
  test: {
    client: "postgresql",
    // connection: `postgres://localhost:5432/${databaseName}_test`,
    connection: {
      host: 'localhost',
      user: 'abstractre',
      password: 'abstractre',
      database: databaseName + '_test'
    },
    migrations: {
      directory: __dirname + "/src/server/db/migrations"
    },
    seeds: {
      directory: __dirname + "/src/server/db/seeds"
    }
  }
};
