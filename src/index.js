const { EventEmitter } = require('events');

const { serverSettings } = require('./config/config');
const { startServer } = require('./server/server');

const mediator = new EventEmitter();

// eslint-disable-next-line no-console
console.log('--- PROJECT ---');
// eslint-disable-next-line no-console
console.log('Connecting to respository...');

process.on('uncaughtException', (err) => {
  // eslint-disable-next-line no-console
  console.error('Unhandled Exception', err);
});

process.on('uncaughtRejection', (err) => {
  // eslint-disable-next-line no-console
  console.error('Unhandled Rejection', err);
});

mediator.on('boot.ready', () => {
  startServer({
    port: serverSettings.port,
  })
    .then((app) => {
      // eslint-disable-next-line no-console
      console.log(`Server started succesfully, running on port: ${serverSettings.port}.`);
      app.on('close', () => {
        // eslint-disable-next-line no-console
        console.log('Server closed');
      });
    })
    .catch((err) => {
      // eslint-disable-next-line no-console
      console.error('Server Rejection', err);
    });
});

mediator.emit('boot.ready');
