const { Sequelize } = require(".")

module.exports = (sequelize, DataTypes) => {

    const Appointments = sequelize.define("appointments", {


        customerName: {
            type: DataTypes.STRING,
            allowNull: false
        },

        barberName: {
            type: DataTypes.STRING,
            allowNull: false
        },

        salonName: {
            type: DataTypes.STRING,
            allowNull: false
        },

        date: {
            type: DataTypes.DATEONLY
        },

        price: {
            type: DataTypes.INTEGER,
            allowNull: false
        },

        // barber_id: {
        //     type: DataTypes.INTEGER
        // },

        // user_id: {
        //     type: DataTypes.INTEGER
        // }


    }, { freezeTableName: true })

    return Appointments

}