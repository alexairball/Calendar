'use strict';
module.exports = (sequelize, DataTypes) => {
  const Setting = sequelize.define('Setting', {
    code: {
      type: DataTypes.STRING,
      validate: {
        notNull: true,
        notEmpty: true
      }
    },
    settingMethod: {
      type: DataTypes.STRING,
      validate: {
        notNull: true,
        notEmpty: true
      }
    },
    name: {
      type: DataTypes.STRING,
      validate: {
        notNull: true,
        notEmpty: true
      }
    },
    description: {
      type: DataTypes.TEXT
    },
    values: {
      type: DataTypes.STRING,
      validate: {
        notNull: true,
        notEmpty: true
      }
    },
    defaultValue: {
      type: DataTypes.STRING,
      validate: {
        notNull: true,
        notEmpty: true
      }
    },
    type: {
      type: DataTypes.STRING,
      validate: {
        notNull: true,
        notEmpty: true
      }
    }
  }, {
    timestamps: true,
    paranoid: true,
    underscored: false,
    freezeTableName: false,
    tableName: 'settings'
  });
  Setting.associate = function (models) {
    Setting.belongsTo(models.SettingSection, {
      foreignKey: 'sectionId',
      sourceKey: 'id'
    });
    Setting.belongsToMany(models.User, {
      as: 'Users',
      through: models.UserSettings,
      foreignKey: 'settingId',
      otherKey: 'userId'
    });
  };
  return Setting;
};