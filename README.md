# MDN Insights

## Getting started

### Prequisites

`node` and `npm` are required. Use `nvm`.

### Getting started

    $ npm i
    $ npm start

## Deploying

Jenkins is used for building and pushing the dist/ directory to staging. Changes can be pushed to the `stage-push` branch to kick off the build and deployment to staging. See the `Jenkinsfile` in the root of this repo.

## Workflow

Contribution workflow should look like this:

- Fork this repo to make your respective updates.
- When completed, create a PR to be merged into `stage-push` so your changes can be tested on staging.
- Once confirmed on staging, create a PR from your fork into `master` ready for review.

## Tooling

### Build tools

- [Webpack](http://browserify.org/)

### Linting and formatting

- [eslint](https://eslint.org/)
- [Prettier](https://prettier.io/)
- [stylelint](https://github.com/stylelint/stylelint)

Run `npm run lint` to lint both the JS and the SCSS files. This will also be run as part of the build process, but will not cause it to exit.

### Unit testing

- [Jest](https://jestjs.io/)

Run `npm run test` to execute any unit tests.

## Directory structure

`bin/` - Shell scripts to assist with Jenkins and CI.
`src/` - The main source directory.
- `assets/` - Images, fonts, and other assets.
- `components/` - JavaScript components in vanilla JS.
- `styles/` - SCSS source files.
- `utils/` - JavaScript utility files.
- `index.html` - The main HTML landing page.
- `index.js` - The main entry point for the JavaScript to be built from.
