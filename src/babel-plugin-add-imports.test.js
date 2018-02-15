import path from 'path';
import pluginTester from 'babel-plugin-tester';
import babelPluginAddImports from './babel-plugin-add-imports';

pluginTester({
    plugin: babelPluginAddImports,
    babelOptions: {
        babelrc: false,
    },
    tests: [
        {
            pluginOptions: ['babel-polyfill', 'some-other-module'],
            fixture: path.join(
                __dirname,
                '__sandbox__',
                'adds_imports_to_top_of_file',
                'code.js',
            ),
            outputFixture: path.join(
                __dirname,
                '__sandbox__',
                'adds_imports_to_top_of_file',
                'output.js',
            ),
        },
        {
            fixture: path.join(
                __dirname,
                '__sandbox__',
                'handle_no_options',
                'code.js',
            ),
        },
        {
            pluginOptions: [''],
            fixture: path.join(
                __dirname,
                '__sandbox__',
                'handle_no_options',
                'code.js',
            ),
        },
    ],
});
