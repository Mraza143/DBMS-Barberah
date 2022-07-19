const { Sequelize } = require(".")

module.exports = (sequelize, DataTypes) => {

    const Salons = sequelize.define("salons", {

        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true

        },

        name: {
            type: DataTypes.STRING,
            allowNull: false
        },

        location: {
            type: DataTypes.STRING,
            allowNull: false
        },
        timings: {
            type: DataTypes.STRING,
            allowNull: false
        },


    }, { freezeTableName: true })

    return Salons

}