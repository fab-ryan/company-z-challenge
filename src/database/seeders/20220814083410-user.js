'use strict';
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
module.exports = {
  async up(queryInterface, Sequelize) {
    
    await queryInterface.bulkInsert(
      'Users',
      [
        {
          userId: uuidv4(),
          email: 'admin@admin.com',
          role: 'admin',
          password: await bcrypt.hash('Admin@123', 12),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],

      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Users', null, {});
  },
};
