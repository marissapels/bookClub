
module.exports = function(sequelize, DataTypes) {
  var Chat = sequelize.define('Chat', {
    chat_name: DataTypes.STRING,
    chat_firebase_id: DataTypes.STRING
  });

  // // Association with User model
  // Chat.associate = function(models) {
  //   Chat.hasMany(models.User);
  // };

  // // Association with Group model
  // Chat.associate = function(models) {
  //   Chat.belongsTo(models.Group, {
  //     foreignKey: {
  //       allowNull: true
  //     }
  //   });
  // };

  return Chat;
};