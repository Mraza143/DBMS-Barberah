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

db.products = require('./productModel.js')(sequelize, DataTypes)
db.users = require('./userModel.js')(sequelize, DataTypes)
db.salons = require('./salonModel.js')(sequelize, DataTypes)
db.barbers = require('./barberModel.js')(sequelize, DataTypes)
db.appointments = require('./appointmentModel.js')(sequelize, DataTypes)
db.reviews = require('./reviewModel.js')(sequelize, DataTypes)
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