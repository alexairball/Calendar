'use strict';
module.exports = (sequelize, DataTypes) => {
  const BillBorrower = sequelize.define('BillBorrowers', {
    toPay: {
      type: DataTypes.DECIMAL(19, 4),
      validate: {
        isDecimal: true,
        isNumeric: true
      }
    },
    paidAmount: {
      type: DataTypes.DECIMAL(19, 4),
      validate: {
        notNull: true,
        notEmpty: true,
        isDecimal: true,
        isNumeric: true
      }
    }
  }, {
    timestamps: true,
    paranoid: true,
    underscored: false,
    freezeTableName: false,
    tableName: 'bill_borrowers'
  });
  BillBorrower.associate = function (models) {
    // associations can be defined here
  };
  return BillBorrower;
};