'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user',
        targetKey: 'userId',
      });
    }
  }
  Profile.init(
    {
      profileId: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      userId: {
        allowNull: false,
        type: DataTypes.UUID,
      },
      firstName: {
        type: DataTypes.STRING,
      },
      lastName: {
        type: DataTypes.STRING,
      },
      gender: {
        type: DataTypes.ENUM('Male', 'Female', 'Prefer not to say'),
        defaultValue: 'Prefer not to say',
      },
      age: {
        type: DataTypes.INTEGER,
      },
      dateOfBirth: {
        type: DataTypes.DATEONLY,
      },
      martualStatus: {
        type: DataTypes.ENUM('Single', 'Married', 'Divorced', 'Widowed'),
        defaultValue: 'Single',
      },
      nationality: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      profilePhoto: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      nationalIdNumber: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      passportNumber: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      documentPhoto: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      verified: {
        allowNull: false,
        type: DataTypes.ENUM('UNVERIFIED', 'PENDING', 'VERIFIED'),
        defaultValue: 'UNVERIFIED',
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: 'Profile',
    }
  );
  Profile.removeAttribute('id');
  return Profile;
};
