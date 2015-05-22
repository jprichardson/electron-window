if (global.constructor.name === 'Window') {
  module.exports = require('./renderer')
} else {
  module.exports = require('./main')
}
