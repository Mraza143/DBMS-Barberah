

module.exports = (sequelize, DataTypes) => {

    const Salons = sequelize.define("salons", {

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

        },

        location: {
            type: DataTypes.STRING,

        },
        timings: {
            type: DataTypes.STRING,
        },


    }, { freezeTableName: true })

    return Salons

}