module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('urls', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      url_long: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      url_short: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      url_click: {
        type: Sequelize.INTEGER,
        defaultValue: '0',
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('urls');
  },
};
