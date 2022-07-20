const { Sequelize } = require(".")

module.exports = (sequelize, DataTypes) => {

    const Reviews = sequelize.define("reviews", {


        barberName: {
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
        },




    }, { freezeTableName: true })

    return Reviews

}