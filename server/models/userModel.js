module.exports = (sequelize, DataTypes) => {

    const Users = sequelize.define("users", {
        name: {
            type: DataTypes.STRING
        },

        email: {
            type: DataTypes.STRING
        },
        password: {
            type: DataTypes.STRING
        },
        role: {
            type: DataTypes.STRING
        }

    }, { freezeTableName: true })

    return Users

}