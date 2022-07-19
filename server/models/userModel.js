const { Sequelize } = require(".")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
    // const uuid = require('uuid');

// const { Sequelize } = require("sequelize")

module.exports = (sequelize, DataTypes) => {

    const Users = sequelize.define("users", {

<<<<<<< HEAD
        // _id: {
        //     type: Sequelize.UUID,
        //     defaultValue: Sequelize.UUIDV4,
        //     primaryKey: true,
        //     allowNull: false,

        // },
=======

>>>>>>> 6fe39a2f59370e91b211e87de825c3bcb2df442e

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
<<<<<<< HEAD
// Users.getJWTToken = function() {
//     return jwt.sign({ id: this.id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES })
// }
=======
/*Users.getJWTToken = function() {
    return jwt.sign({ id: this.id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES })
}

// Comparing Password
Users.comparePassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}*/
>>>>>>> 6fe39a2f59370e91b211e87de825c3bcb2df442e
