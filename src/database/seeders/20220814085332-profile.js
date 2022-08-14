'use strict';
import { v4 as uuidv4 } from 'uuid';
module.exports = {
  async up(queryInterface, Sequelize) {
    const users = await queryInterface.sequelize.query(
      `SELECT * from "Users";`
    );
    const userId = users[0];
    await queryInterface.bulkInsert('Profiles', [
      {
        profileId: uuidv4(),
        userId: userId[0].userId,
        firstName: 'fabrice',
        lastName: 'ndacyayisenga',
        gender: 'Male',
        dateOfBirth: '2000-12-1',
        martualStatus: 'Single',
        nationality: 'Rwanda',
        age: '22',
        profilePhoto:
          'http://res.cloudinary.com/drpezmjt1/image/upload/v1657295578/ajgnwrfuledutoksmszs.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Profiles', null, {});
  },
};
