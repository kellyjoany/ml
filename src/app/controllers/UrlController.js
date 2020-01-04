import * as Yup from 'yup';
import Url from '../models/Url';
import { query } from '../services/UrlServices';

const redis = require('redis');
require('dotenv/config');

const uri = process.env.APP_URL;

class UserController {
  async store(req, res) {
    const { connectRedis } = req;

    if (connectRedis) {
      connectRedis.set(
        'http://localhost:3333/XXYYZZ',
        'https://eletronicos.mercadolivre.com.br/seguranca-casa/#menu=categories',
        redis.print
      );

      connectRedis.get('http://localhost:3333/XXYYZZ', function(error, result) {
        if (error) {
          console.log(error);
          throw error;
        }
        console.log(`GET result ->${result}`);
      });
      connectRedis.quit();
    }

    const obj = {
      url_long:
        'https://eletronicos.mercadolivre.com.br/seguranca-casa/#menu=categories',
      url_short: 'http://localhost:3333/XXYYZZ',
    };

    const urlExists = await Url.findOne({
      where: { url_short: obj.url_short },
    });

    if (urlExists) {
      return res.status(400).json({
        error: 'URL already exists.',
        url: urlExists,
      });
    }

    const url = await Url.create(obj);

    return res.json(url);
  }

  async index(req, res) {
    const { connectRedis } = req;

    let result = null;
    if (connectRedis) {
      result = await query(req.params.id, connectRedis);
      connectRedis.quit();
    }

    if (result != null) {
      res.redirect(result);
    } else {
      const urlExists = await Url.findOne({
        where: { url_short: `${uri}/${req.params.id}` },
      });

      if (!urlExists) {
        return res.status(400).json({
          error: 'URL not exists.',
        });
      }

      if (connectRedis) {
        connectRedis.set(urlExists.url_short, urlExists.url_long, redis.print);
        connectRedis.quit();
      }

      res.redirect(urlExists.url_long);
    }
  }
}

export default new UserController();
