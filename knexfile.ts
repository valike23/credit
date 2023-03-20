let {MYSQL_HOST, MYSQL_USER, MYSQL_PASSWORD, DEMO_CREDIT_DB}  = process.env;
module.exports = {
    development: {
      client: 'mysql',
      connection: {
        host: MYSQL_HOST,
        user: MYSQL_USER,
        password: MYSQL_PASSWORD || '',
        database: DEMO_CREDIT_DB,
        port: 3306,
      },
      migrations: {
        tableName: 'knex_migrations',
        directory: `${__dirname}/src/database/migrations`,
      },
    },
  };