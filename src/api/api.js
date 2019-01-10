const { scrapLoginPage } = require('./../jobs/scrapping');

const buildAPI = (app) => {
  app.use((err, req, res, next) => {
    /* eslint-disable-next-line no-console */
    console.error(`Error from route ${req.originalUrl}`, err);
    return res.status(500).end();
  });
  app.get('/facebook-scrap', (req, res) => {
    scrapLoginPage()
      .then(response => res.status(200).send(response))
      .catch(() => res.status(500).end());
  });
};

module.exports = Object.assign({}, { buildAPI });
