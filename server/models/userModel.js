const { Sequelize } = require(".")
const bcrypt = require("bcrypt")

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




// Generating JWT Token
/*Users.getJWTToken = function() {
    return jwt.sign({ id: this.id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES })
}

// Comparing Password
Users.comparePassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}*/