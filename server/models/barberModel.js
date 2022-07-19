const { Sequelize } = require(".")

module.exports = (sequelize, DataTypes) => {

    const Barbers = sequelize.define("barbers", {

        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true

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

        ratings: {
            type: DataTypes.FLOAT,
            allowNull: false
        },


    }, { freezeTableName: true })

    return Barbers

}