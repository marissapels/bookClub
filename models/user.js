'use strict';
module.exports = function (sequelize, DataTypes) {
    var User = sequelize.define('User', {
        userName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        firebaseId: {
            type: DataTypes.STRING,
        },
        photoRef: {
            type: DataTypes.STRING,

        }
    });

    User.associate = function (models) {
        User.belongsToMany(models.Group, { through: models.UserGroup });
    };

    return User;
};
