const { Sequelize } = require(".")

module.exports = (sequelize, DataTypes) => {

    const Barbers = sequelize.define("barbers", {


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
        salon_id:{
            type: DataTypes.INTEGER,

        }
        


    }, { freezeTableName: true })

    return Barbers

}