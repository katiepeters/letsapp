'use strict';

module.exports = function(sequelize, DataTypes) {
  var Event = sequelize.define('Event', {
    _id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    title: DataTypes.STRING,
    senderName: DataTypes.STRING,
    senderEmail: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true
      }
    },
    description: DataTypes.TEXT,
    location: DataTypes.STRING,
    onlyDays: DataTypes.BOOLEAN,
    isPrivate: DataTypes.BOOLEAN,
    timeIncrement: DataTypes.BIGINT,
    adminURL: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false
    }
  }, {
    classMethods: {
      associate: function(models){
        Event.belongsTo(models.User);
        Event.hasMany(models.Time, {as: 'times'});
        Event.belongsToMany(models.Contact, {through: 'EventContacts'});
      },
      saveNewEvent: function(reqBody, creator){
        var event = reqBody.event;
        var user = creator.dataValues;
       return Event.create({
          title: event.title,
          senderName: user.name,
          senderEmail: user.email,
          description: event.description,
          location: event.location,
          onlyDays: false,
          isPrivate: event.isPrivate,
          UserId: user._id
        })
          .then(function(newEvent){
            //console.log('new Event',newEvent);
            return newEvent;
            //Time.saveEventTimes(reqBody,creator,newEvent);
          });
      }
    }
  });

  return Event;
};
