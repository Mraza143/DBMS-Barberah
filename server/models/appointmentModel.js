const { Sequelize } = require(".")

module.exports = (sequelize, DataTypes) => {

    const Appointments = sequelize.define("appointments", {

<<<<<<< HEAD
        // id: {
        //     type: Sequelize.UUID,
        //     defaultValue: Sequelize.UUIDV4,
        //     primaryKey: true

        // },
=======

>>>>>>> 6fe39a2f59370e91b211e87de825c3bcb2df442e

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