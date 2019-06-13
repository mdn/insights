const purgecss = require('@fullhuman/postcss-purgecss');
const autoprefixer = require('autoprefixer');

module.exports = {
  plugins: [
    /* We should remove purgecss if implementing code splitting,
      or when introducing a library like react. */
    purgecss({
      content: ['./**/*.html'],
      whitelistPatterns: [/js-.*/],
      whitelist: [
        'display-none',
        'is-fixed',
        'is-download-button-fixed',
        'is-header-fixed',
        'is-visible'
      ]
    }),
    autoprefixer({
      browsers: 'last 2 versions'
    })
  ]
};
