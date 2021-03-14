# MDN Insights

This repository contains the code that powers the site, https://insights.developer.mozilla.org/
There you will find the results of the MDN Web Docs Web DNA(Developer Needs Assessment) reports in both HTML and PDF.

### Running locally

To run the website locally you will need the following pre-installed:

- [Nodejs](https://nodejs.org/)
- [Yarn](https://yarnpkg.com/)

Once you have the above installed, run the following command to install all required dependencies:

```
yarn
```

Once the above completed, run:

```
yarn start
```

The above will startup a local `http` server and also complete an initial build of the source. Once complete, it will open the landing page in your browser. It will also watch your files for changes, and automatically rebuild the source on save.

### Production

For right now, production builds are created locally and checked into source control. We will improve this soon and update the documentation to reflect the changes.

The command that builds for production is:

```
yarn build:prod
```

The folder that should to serve is `./public`
