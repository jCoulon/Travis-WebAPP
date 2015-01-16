"use strict";

module.exports = function(sequelize, DataTypes) {
  var usertool = sequelize.define("usertool", {
    Surname: DataTypes.STRING,
    Login: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });

  return usertool;
};
