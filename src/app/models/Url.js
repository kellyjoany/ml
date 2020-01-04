import Sequelize, { Model } from 'sequelize';

class Url extends Model {
  static init(sequelize) {
    super.init(
      {
        url_long: Sequelize.STRING,
        url_short: Sequelize.STRING,
        url_click: Sequelize.INTEGER,
      },
      {
        sequelize,
      }
    );
  }
}

export default Url;
