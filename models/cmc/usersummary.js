"use strict";

module.exports = function(sequelize, DataTypes) {
  var Usersummary = sequelize.define("Usersummary", {
    User: DataTypes.STRING,
    Nbconnect: DataTypes.INTEGER,
    Nbforumsub: DataTypes.INTEGER,
    Nbmsgpost: DataTypes.INTEGER,
    Nbmsgread: DataTypes.INTEGER,
    Nbmsgcited: DataTypes.INTEGER,
    Nbthread: DataTypes.INTEGER,
    Nbfileup: DataTypes.INTEGER,
    Nbfiledown: DataTypes.INTEGER,
    Nbchat: DataTypes.INTEGER,
    Nbbrowse: DataTypes.INTEGER



  },{

   // don't add the timestamp attributes (updatedAt, createdAt)
  timestamps: false,
 
  // don't delete database entries but set the newly added attribute deletedAt
  // to the current date (when deletion was done). paranoid will only work if
  // timestamps are enabled
  paranoid: true,
 
  // don't use camelcase for automatically added attributes but underscore style
  // so updatedAt will be updated_at
  underscored: true,
 
  // disable the modification of tablenames; By default, sequelize will automatically
  // transform all passed model names (first parameter of define) into plural.
  // if you don't want that, set the following
  freezeTableName: true,
 
  // define the table's name
  tableName: 'usersummary',


id:'ID'

  })

  return Usersummary;
};

