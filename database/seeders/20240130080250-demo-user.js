const bcrypt = require("bcrypt");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    let users = [];
    let salt = await bcrypt.genSalt(10); // Use await here

    users.push({
      name: 'admin project',
      role: 'admin',
      email: 'admin@gmail.com',
      password: await bcrypt.hash("rahasia", salt), // Use await here
      createdAt: new Date(),
      updatedAt: new Date()
    });

    users.push({
      name: 'member Project',
      role: 'member',
      email: 'member@gmail.com',
      password: await bcrypt.hash("rahasia", salt), // Use await here
      createdAt: new Date(),
      updatedAt: new Date()
    });

    return queryInterface.bulkInsert('Users', users, {});
  },

  async down(queryInterface, Sequelize) {
    // Implementation for reverting the data insertion if needed
  }
};
