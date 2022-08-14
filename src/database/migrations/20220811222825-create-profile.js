'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Profiles', {
      profileId: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      userId: {
        allowNull: false,
        type: Sequelize.UUID,
        references: {
          model: 'Users',
          key: 'userId',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      firstName: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      lastName: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      gender: {
        allowNull: false,
        type: Sequelize.ENUM('Male', 'Female', 'Prefer not to say'),
        defaultValue: 'Prefer not to say',
      },
      age: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      dateOfBirth: {
        allowNull: false,
        type: Sequelize.DATEONLY,
      },
      martualStatus: {
        allowNull: false,
        type: Sequelize.ENUM('Single', 'Married', 'Divorced', 'Widowed'),
        defaultValue: 'Single',
      },
      nationality: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      profilePhoto: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      verified: {
        allowNull: true,
        type: Sequelize.ENUM('UNVERIFIED', 'PENDING', 'VERIFIED'),
        defaultValue: 'UNVERIFIED',
      },
      nationalIdNumber: {
        allowNull: true,
        type: Sequelize.STRING,
        validate: {
          isNumeric: true,
          len: [16, 16],
          msg: 'National ID must be 16 digits',
        },
      },
      passportNumber: {
        allowNull: true,
        type: Sequelize.STRING,
        validate: {
          isNumeric: true,
          len: [12, 12],
          msg: 'Passport number must be 8 digits',
        },
      },
      documentPhoto: {
        allowNull: true,
        type: Sequelize.STRING,
      },

      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Profiles');
  },
};
