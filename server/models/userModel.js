const { Sequelize } = require(".")
const bcrypt = require("bcrypt")

module.exports = (sequelize, DataTypes) => {

    const Users = sequelize.define("users", {

        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true

        },

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




// Generating JWT Token
Users.getJWTToken = function() {
    return jwt.sign({ id: this.id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES })
}

// Comparing Password
Users.comparePassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}