'use strict';

module.exports = function (sequelize, DataTypes) {
    var User = sequelize.define('User', {
        userName: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    User.associate = function (models) {
        User.belongsToMany(models.Group, { through: models.UserGroup });
    };

    return User;
};
