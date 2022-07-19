const { Sequelize } = require(".")

module.exports = (sequelize, DataTypes) => {

    const Barbers = sequelize.define("barbers", {

<<<<<<< HEAD
        // id: {
        //     type: Sequelize.UUID,
        //     defaultValue: Sequelize.UUIDV4,
        //     primaryKey: true

        // },
=======
>>>>>>> 6fe39a2f59370e91b211e87de825c3bcb2df442e

        name: {
            type: DataTypes.STRING,
            allowNull: false
        },

        worksAt: {
            type: DataTypes.STRING,
            allowNull: false
        },

        timings: {
            type: DataTypes.STRING,
            allowNull: false
        },

        ratings: {
            type: DataTypes.FLOAT,
            allowNull: false
        },


    }, { freezeTableName: true })

    return Barbers

}