const dbConfig = require('../config/dbConfig.js');

const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD, {
        host: dbConfig.HOST,
        dialect: dbConfig.dialect,
        operatorsAliases: 0,

        pool: {
            max: dbConfig.pool.max,
            min: dbConfig.pool.min,
            acquire: dbConfig.pool.acquire,
            idle: dbConfig.pool.idle

        }
    }
)

sequelize.authenticate()
    .then(() => {
        console.log('connected..')
    })
    .catch(err => {
        console.log('Error' + err)
    })

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

db.users = require('./userModel.js')(sequelize, DataTypes)

/* CREATE TABLE IF NOT EXISTS `users` (`id` INTEGER NOT NULL auto_increment , `image` VARCHAR(255), `name` VARCHAR(255), `email` VARCHAR(255),
 `password` VARCHAR(255), `role` VARCHAR(255), `createdAt` DATETIME NOT NULL, `updatedAt`
  DATETIME NOT NULL, PRIMARY KEY (`id`))*/
db.salons = require('./salonModel.js')(sequelize, DataTypes)

/*CREATE TABLE IF NOT EXISTS `salons` (`id` INTEGER NOT NULL auto_increment , `image` VARCHAR(255), `name` VARCHAR(255), `location` VARCHAR(255), `timings` VARCHAR(255), `createdAt` DATETIME NOT 
NULL, `updatedAt` DATETIME NOT NULL, PRIMARY KEY (`id`))*/

db.barbers = require('./barberModel.js')(sequelize, DataTypes)

 /*CREATE TABLE IF NOT EXISTS `barbers` (`id` INTEGER NOT NULL auto_increment , `image` VARCHAR(255), `name` VARCHAR(255) NOT NULL, `worksAt` VARCHAR(255) NOT NULL, `timings` VARCHAR(255) NOT NULL, 
 `experience` VARCHAR(255) NOT NULL, `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL,
  `salonId` INTEGER, PRIMARY KEY (`id`), FOREIGN KEY (`salonId`) REFERENCES `salons` (`id`) ON DELETE SET NULL ON UPDATE CASCADE)*/
db.appointments = require('./appointmentModel.js')(sequelize, DataTypes)

 /*CREATE TABLE IF NOT EXISTS `appointments` (`id` INTEGER NOT NULL auto_increment , `customerName` VARCHAR(255) NOT NULL, `barberName` VARCHAR(255) NOT NULL, 
 `salonName` VARCHAR(255) NOT NULL, `date` DATE, `price` INTEGER NOT NULL, `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL, `userId` INTEGER, PRIMARY KEY (`id`), FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE)*/
db.reviews = require('./reviewModel.js')(sequelize, DataTypes)

/*CREATE TABLE IF NOT EXISTS `reviews` (`id` INTEGER NOT NULL auto_increment , `barberName` VARCHAR(255), `customerName` VARCHAR(255), 
`rating` FLOAT, `comment` VARCHAR(255), `average` FLOAT, `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, `barberId` INTEGER, PRIMARY KEY (`id`), FOREIGN KEY (`barberId`) REFERENCES `barbers` (`id`) ON DELETE SET NULL ON UPDATE CASCADE)
 */    



//db.reviews = require('./reviewModel.js')(sequelize, DataTypes)

db.sequelize.sync({ force: false })
    .then(() => {
        console.log('yes re-sync done!')
    })



//code for establising relationships 


// // Salon has many barbers
// // barber belongs to a single salon
db.salons.hasMany(db.barbers, {
    foreignKey: 'salonId'
        //as: 'barber'
})
db.barbers.belongsTo(db.salons)
    //, {
    //foreignKey: 'salon_id',
    //as: 'salon'
    //})

// // user has many appointments      ++++++
// // appointment belong to a single user
db.users.hasMany(db.appointments, {
    foreignKey: 'userId',
    as: 'appointments'
})
db.appointments.belongsTo(db.users)


// // barber has many reviews  
// // review belong to a single barber
db.barbers.hasMany(db.reviews, {
    foreignKey: 'barberId',
    as: "reviews"
})
db.reviews.belongsTo(db.barbers)

// // user has many reviews   ++++++
// // review belong to a single user
// db.users.hasMany(db.reviews, {
//     foreignKey: 'user_id'
// })
// db.reviews.belongsTo(db.users)


module.exports = db