# babel-plugin-add-imports

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

* [chocolateboy/babel-plugin-source-map-support](https://github.com/chocolateboy/babel-plugin-source-map-support)
