const purgecss = require('@fullhuman/postcss-purgecss');
const autoprefixer = require('autoprefixer');

module.exports = {
  plugins: [
    purgecss({
      content: ['./**/*.html']
    }),
    autoprefixer({
      browsers: 'last 2 versions'
    })
  ]
};
