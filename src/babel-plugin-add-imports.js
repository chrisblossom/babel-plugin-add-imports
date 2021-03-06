import isMatch from 'lodash.ismatch';
import isPlainObject from 'lodash.isplainobject';

/**
 * 95% of the code came from github.com/chocolateboy/babel-plugin-source-map-support/
 *
 * See https://github.com/babel/babel/pull/6022 for Babel 7.0 support
 */

/*
 * XXX Babel doesn't currently provide a way to add import statements with no
 * specifiers [1], so we have to work around that by first creating an import
 * statement with a dummy specifier and then removing the specifier. this
 * works as long as we can always distinguish our import statements from import
 * statements supplied by the user.
 *
 * we could do this by passing a dummy identifier to `addImport` and then
 * looking for the exact node it returns in the AST e.g.:
 *
 *     let localIdentifier
 *
 *     Program (path, { file }) {
 *         localIdentifier = file.addImport(
 *             'source-map-support/register',
 *             'dummy'
 *         )
 *     }
 *
 *     ImportDeclaration (path) {
 *         if (path.node.local === localIdentifier) { ... }
 *     }
 *
 * but it's potentially fragile (e.g. if nodes are cloned or replaced), so
 * instead we pass an empty string as the identifier name; this
 * creates an import statement with an empty `imported` identifier e.g.:
 *
 *     import { <empty string> as whatever } from 'source-map-support/register';
 *
 * i.e.:
 *
 *     import { as whatever } from 'source-map-support/register';
 *
 * these nodes can be created by `addImport` but are otherwise invalid (the
 * rendered statements are syntactically invalid and Babylon can't parse them)
 * so they can't conflict with anything created by the user
 *
 * [1] https://github.com/babel/babel/issues/6021
 */

const DUMMY_SPECIFIER = {
    type: 'ImportSpecifier',
    imported: {
        type: 'Identifier',
        name: '',
    },
};

function normalizeOptions(options = []) {
    if (isPlainObject(options)) {
        return [];
    }

    const normalized = Array.isArray(options) ? options : [options];

    /**
     * Reverse array to keep import order
     */
    return normalized.filter(Boolean).reverse();
}

function babelPluginAddImports() {
    return {
        name: 'add-imports',
        visitor: {
            Program(path, { file, opts }) {
                const importModules = normalizeOptions(opts);

                importModules.forEach((module) => {
                    file.addImport(module, '');
                });
            },

            ImportDeclaration(path, { opts }) {
                const { source, specifiers } = path.node;

                const importModules = normalizeOptions(opts);

                if (
                    importModules.indexOf(source.value) !== -1 &&
                    specifiers.length === 1 &&
                    isMatch(specifiers[0], DUMMY_SPECIFIER)
                ) {
                    specifiers.length = 0;
                }
            },
        },
    };
}

// eslint-disable-next-line import/no-default-export
export default babelPluginAddImports;
