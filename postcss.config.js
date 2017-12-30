var safe   = require('postcss-safe-parser');

module.exports = {
  parser: safe,
  sourceMap: 'inline',
  plugins: {
    'autoprefixer': {}
  }
}
