'use strict';
module.exports = function (sequelize, DataTypes) {
    var User = sequelize.define('User', {
        username : {
            type: DataTypes.STRING,
            allowNull: false
        },
        email : {
            type: DataTypes.STRING,
        },
        password : {
            type: DataTypes.STRING,

        }
    });

    User.associate = function (models) {
        User.belongsToMany(models.Group, { through: models.UserGroup });
    };

    // User.associate = function (models) {
    //     User.hasMany(models.Library);
    // };

    return User;
};
