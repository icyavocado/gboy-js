const pino = require('pino');
const path = require('path');

const transport = pino.transport({
  targets: [
    {
      target: 'pino/file',
      options: {
        destination: path.resolve('logs/processor.log'),
        mkdir: true
      }
    },
    {
      target: 'pino-pretty',
      options: {
        colorize: true,
        destination: 1
      }
    }
  ]
});

const logger = pino(transport);

export default logger;
