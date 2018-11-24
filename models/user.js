const phoneFormatter = require('phone-formatter');
'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstname: {
      type: DataTypes.STRING,
      validate: {
        notNull: true,
        notEmpty: true
      }
    },
    lastname: {
      type: DataTypes.STRING,
      validate: {
        notNull: true,
        notEmpty: true
      }
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        notNull: true,
        notEmpty: true,
        isEmail: true
      }
    },
    phone: {
      type: DataTypes.STRING,
      validate: {
        notNull: true,
        notEmpty: true,
      },
      get() {
        return this.getDataValue('number');
      },
      set(val) {
        let phone = phoneFormatter.normalize(val);
        let regionnalCode = phone.lenght() - 10;
        let n = "+";
        for (let i = 0; i < regionnalCode; ++i)
          n += "N";
        n += "(NNN) NNN-NNNN";
        this.setDataValue('number', phoneFormatter.format(phone, n));
      }
    },
    birthdate: {
      type: DataTypes.DATE
    },
    admin: {
      type: DataTypes.BOOLEAN,
      validate: {
        notNull: true,
        notEmpty: true
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notNull: true,
        notEmpty: true
      }
    },
    emailVerifiedAt: {
      type: DataTypes.DATE,
      validate: {
        isDate: true
      }
    }
  }, {
    timestamps: true,
    paranoid: true,
    underscored: false,
    freezeTableName: false,
    tableName: 'users'
  });
  User.associate = function (models) {
    User.hasMany(models.PaidBill, {
      foreignKey: 'paidByUserId',
      sourceKey: 'id'
    });
    User.hasMany(models.Notification, {
      foreignKey: 'userId',
      sourceKey: 'id'
    });
    User.hasMany(models.Semester, {
      foreignKey: 'userId',
      sourceKey: 'id'
    });
    User.belongsToMany(models.PaidBill, {
      as: 'BillsToPay',
      through: models.BillBorrowers,
      foreignKey: 'userId',
      otherKey: 'paidBillId'
    });
    User.belongsToMany(models.Task, {
      as: 'Tasks',
      through: models.TaskDates,
      foreignKey: 'userId',
      otherKey: 'taskId'
    });
    User.belongsToMany(models.Address, {
      as: 'Addresses',
      through: models.UserAddresses,
      foreignKey: 'userId',
      otherKey: 'addressId'
    });
    User.belongsToMany(models.App, {
      as: 'Apps',
      through: models.UserApps,
      foreignKey: 'userId',
      otherKey: 'appId'
    });
    User.belongsToMany(models.User, {
      as: 'Friends',
      through: models.UserFriends,
      foreignKey: 'userId',
      otherKey: 'friendId'
    }); // working?? self-referencing belongsToMany..
    User.belongsToMany(models.Setting, {
      as: 'Settings',
      through: models.UserSettings,
      foreignKey: 'userId',
      otherKey: 'settingId'
    });
  };
  return User;
};