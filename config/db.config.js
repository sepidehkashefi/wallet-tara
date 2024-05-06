module.exports = {

  mySql: {
    HOST: "localhost",
    PORT: "3306",
    USER: "sepideh",
    PASSWORD: 'sepideh',
    DB: "tarawalletDB",
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    dialectOptions: {
      instanceName: 'MySQL80',
    }

  },
  anotherDB: {
    HOST: "127.1.1.1",
    PORT: "1433",
    USER: "sa",
    PASSWORD: "123",
    DB: "taraDB",
    dialect: "mssql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    dialectOptions: {
      instanceName: 'sepid',
    }

  }
}