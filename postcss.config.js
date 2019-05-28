const purgecss = require('@fullhuman/postcss-purgecss');
const autoprefixer = require('autoprefixer');

module.exports = {
  plugins: [
    purgecss({
      content: ['./**/*.html'],
      whitelistPatterns: [
        /js-.*/,
      ],
      whitelist: [
        'display-none'
      ]
    }),
    autoprefixer({
      browsers: 'last 2 versions'
    })
  ]
};
