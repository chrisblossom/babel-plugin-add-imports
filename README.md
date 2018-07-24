# babel-plugin-add-imports

[![npm](https://img.shields.io/npm/v/babel-plugin-add-imports.svg?label=npm%20version)](https://www.npmjs.com/package/babel-plugin-add-imports)
[![Linux Build Status](https://img.shields.io/circleci/project/github/chrisblossom/babel-plugin-add-imports/master.svg?label=linux%20build)](https://circleci.com/gh/chrisblossom/babel-plugin-add-imports/tree/master)
[![Windows Build Status](https://img.shields.io/appveyor/ci/chrisblossom/babel-plugin-add-imports/master.svg?label=windows%20build)](https://ci.appveyor.com/project/chrisblossom/babel-plugin-add-imports/branch/master)
[![Code Coverage](https://img.shields.io/codecov/c/github/chrisblossom/babel-plugin-add-imports/master.svg)](https://codecov.io/gh/chrisblossom/babel-plugin-add-imports/branch/master)

Add imports to the top of files.

## Installation

`npm install --save babel-plugin-add-imports`

## Usage

```js
'use strict';

const babelConfig = {
    plugins: [
        /**
         * Add the following to the top of each file
         *
         * import 'source-map-support/register';
         * import 'babel-polyfill';
         */
        ['add-imports', ['source-map-support/register', 'babel-polyfill']],
    ],
};

module.exports = babelConfig;
```

## Thanks To

This package was created with the great work / lessons learned from:

-   [chocolateboy/babel-plugin-source-map-support](https://github.com/chocolateboy/babel-plugin-source-map-support)
