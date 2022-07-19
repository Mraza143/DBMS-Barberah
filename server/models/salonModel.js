module.exports = (sequelize, DataTypes) => {

    const Salons = sequelize.define("salons", {


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