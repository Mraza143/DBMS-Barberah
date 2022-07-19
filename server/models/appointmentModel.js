const { Sequelize } = require(".")

module.exports = (sequelize, DataTypes) => {

    const Appointments = sequelize.define("appointments", {

        // id: {
        //     type: Sequelize.UUID,
        //     defaultValue: Sequelize.UUIDV4,
        //     primaryKey: true

        // },

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
        }


    }, { freezeTableName: true })

    return Appointments

}