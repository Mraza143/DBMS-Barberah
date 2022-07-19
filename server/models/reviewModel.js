const { Sequelize } = require(".")

module.exports = (sequelize, DataTypes) => {

    const Reviews = sequelize.define("reviews", {

<<<<<<< HEAD
        // id: {
        //     type: Sequelize.UUID,
        //     defaultValue: Sequelize.UUIDV4,
        //     primaryKey: true

        // },
=======

>>>>>>> 6fe39a2f59370e91b211e87de825c3bcb2df442e

        barberId: {
            type: DataTypes.STRING,
        },

        customerName: {
            type: DataTypes.STRING,
        },

        rating: {
            type: DataTypes.FLOAT,
        },

        comment: {
            type: DataTypes.STRING,
        },

        average: {
            type: DataTypes.FLOAT,
        }


    }, { freezeTableName: true })

    return Reviews

}