const development_env = require('./development.js');
const test_env = require('./test.js');

module.exports = {
    development: development_env,
    test: test_env
}[process.env.NODE_ENV || 'development']