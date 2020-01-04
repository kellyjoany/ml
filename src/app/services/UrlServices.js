require('dotenv/config');

const uri = process.env.APP_URL;

module.exports = {
  query: async function query(url, connectRedis) {
    return new Promise((resolve, reject) => {
      connectRedis.get(`${uri}/${url}`, (error, result) => {
        if (error) {
          return null;
        }
        if (result) {
          resolve(result);
        } else {
          resolve(null);
        }
        return result;
      });
    });
  },
};
