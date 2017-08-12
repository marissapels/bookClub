'use strict';
module.exports = function (sequelize, DataTypes) {
    var User = sequelize.define('User', {
        userName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        firebase : {
            type: DataTypes.STRING,
        },
        photoRef: {
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
