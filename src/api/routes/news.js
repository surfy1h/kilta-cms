const Joi = require('joi');
const Boom = require('boom');
const R = require('ramda');

const newsService = require('../../services/news');

module.exports.getNewsArticles = {
  description: 'Get list of news',
  validate: {
    query: {
      page: Joi.number().integer().min(0),
    },
  },
  handler(request, reply) {
    return newsService.fetchNewsArticles(request.query.page)
      .then(reply)
      .catch(err => reply(Boom.badImplementation('Fetching news failed', err)));
  },
};

module.exports.getNewsArticle = {
  description: 'Get list of news',
  validate: {
    params: {
      id: Joi.number().integer().min(0).required(),
    },
  },
  handler(request, reply) {
    return newsService.fetchNewsArticle(request.params.id)
      .then((news) => {
        if (R.isEmpty(news)) {
          return reply(Boom.notFound(`News article ${request.params.id} was not found!`));
        }
        return reply(news);
      })
      .catch(err => reply(Boom.badImplementation('Fetching news failed', err)));
  },
};

module.exports.getNewsCategories = {
  description: 'Get list of news categories',
  handler(request, reply) {
    return newsService.fetchNewsCategories()
      .then((categories) => {
        if (R.isEmpty(categories)) {
          return reply(Boom.notFound('No categories found!'));
        }
        return reply(categories);
      })
      .catch(err => reply(Boom.badImplementation('Fetching news failed', err)));
  },
};
