const { Sequelize } = require(".")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
    // const uuid = require('uuid');

// const { Sequelize } = require("sequelize")

module.exports = (sequelize, DataTypes) => {

    const Users = sequelize.define("users", {

        // _id: {
        //     type: Sequelize.UUID,
        //     defaultValue: Sequelize.UUIDV4,
        //     primaryKey: true,
        //     allowNull: false,

        // },

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
// Users.getJWTToken = function() {
//     return jwt.sign({ id: this.id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES })
// }