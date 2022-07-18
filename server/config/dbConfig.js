module.exports = {
    HOST: 'localhost',
    USER: 'root',
    PASSWORD: 'beflam123',
    DB: 'barberah',
    dialect: 'mysql',

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
}