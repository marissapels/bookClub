'use strict';
module.exports = function (sequelize, DataTypes) {
    var User = sequelize.define('User', {
        email:{
            type: DataTypes.STRING
        },
        name:{
            type: DataTypes.STRING
        },
        password:{
            type: DataTypes.STRING
        }
    });

    // User.associate = function (models) {
    //     User.belongsToMany(models.Group, { through: models.UserGroup });
    // };

    // User.associate = function (models) {
    //     User.hasMany(models.Library);
    // };

    return User;
};
