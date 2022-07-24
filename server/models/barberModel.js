const { Sequelize } = require(".")

module.exports = (sequelize, DataTypes) => {

    const Barbers = sequelize.define("barbers", {

        image: {
            type: DataTypes.STRING,
        },

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

        experience: {
            type: DataTypes.STRING,
            allowNull: false
        },

        ratings: {
            type: DataTypes.FLOAT,
            // allowNull: false
        },




    }, { freezeTableName: true })

    return Barbers

}