module.exports=function(sequelize, DataTypes){
	var Library = sequelize.define("Library", {
    // Giving the Author model a name of type STRING
    title: {
    	type: DataTypes.STRING
  	},

  	author: {
  		type: DataTypes.STRING
  	},

  	comments: {
  		type: DataTypes.TEXT
  	}
  });
  return Library;
};

