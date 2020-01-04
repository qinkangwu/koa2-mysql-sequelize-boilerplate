const Sequelize = require("sequelize");
const conf = require('./conf');
const isDev = process.env.npm_lifecycle_event === 'dev';
const dbConf = isDev && conf.devDb || conf.proDb;

const sequelize = new Sequelize(dbConf.database, dbConf.username, dbConf.password, {
    // the sql dialect of the database
    // currently supported: 'mysql', 'sqlite', 'postgres', 'mssql'
    dialect: 'mysql',
  
    // for postgres, you can also specify an absolute path to a directory
    // containing a UNIX socket to connect over
    // host: '/sockets/psql_sockets'.
  
    // custom port; default: dialect default
    port: dbConf.port,
  
    // custom protocol; default: 'tcp'
    // postgres only, useful for Heroku
    protocol: null,
  
    // disable logging or provide a custom logging function; default: console.log
    logging: false,

  
    // disable inserting undefined values as NULL
    // - default: false
    omitNull: true,
    timezone : '+08:00',
    // a flag for using a native library or not.
    // in the case of 'pg' -- set this to true will allow SSL support
    // - default: false
    native: true,
  
    // Specify options, which are used when sequelize.define is called.
    // The following example:
    //   define: { timestamps: false }
    // is basically the same as:
    //   Model.init(attributes, { timestamps: false });
    //   sequelize.define(name, attributes, { timestamps: false });
    // so defining the timestamps for each model will be not necessary
    define: {
      underscored: false,
      freezeTableName: false,
      charset: 'utf8',
      dialectOptions: {
        collate: 'utf8_general_ci'
      },
      timestamps: true
    },
  
    // similar for sync: you can define this to always force sync for models
    sync: { force: true },
  
    // pool configuration used to pool database connections
    pool: {
      max: 5,
      idle: 30000,
      acquire: 60000,
    },
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = sequelize;