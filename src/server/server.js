const express = require('express');

const { buildAPI } = require('./../api/api');

const startServer = options => new Promise((resolve, reject) => {
  if (!options.port) {
    reject(new Error('The server must be started with an available port'));
  }
  const app = express();
  buildAPI(app);
  const server = app.listen(options.port, () => resolve(server));
});

module.exports = Object.assign({}, { startServer });
