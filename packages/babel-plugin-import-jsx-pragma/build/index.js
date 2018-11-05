"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

/**
 * Default options for the plugin.
 *
 * @property {string}  scopeVariable Name of variable required to be in scope
 *                                   for use by the JSX pragma. For the default
 *                                   pragma of React.createElement, the React
 *                                   variable must be within scope.
 * @property {string}  source        The module from which the scope variable
 *                                   is to be imported when missing.
 * @property {boolean} isDefault     Whether the scopeVariable is the default
 *                                   import of the source module.
 */
var DEFAULT_OPTIONS = {
  scopeVariable: 'React',
  source: 'react',
  isDefault: true
};
/**
 * Babel transform plugin for automatically injecting an import to be used as
 * the pragma for the React JSX Transform plugin.
 *
 * @see http://babeljs.io/docs/en/babel-plugin-transform-react-jsx
 *
 * @param {Object} babel Babel instance.
 *
 * @return {Object} Babel transform plugin.
 */

function _default(babel) {
  var t = babel.types;

  function getOptions(state) {
    if (!state._options) {
      state._options = (0, _objectSpread2.default)({}, DEFAULT_OPTIONS, state.opts);
    }

    return state._options;
  }

  return {
    visitor: {
      JSXElement: function JSXElement(path, state) {
        state.hasJSX = true;
      },
      ImportDeclaration: function ImportDeclaration(path, state) {
        if (state.hasImportedScopeVariable) {
          return;
        }

        var _getOptions = getOptions(state),
            scopeVariable = _getOptions.scopeVariable,
            isDefault = _getOptions.isDefault; // Test that at least one import specifier exists matching the
        // scope variable name. The module source is not verified since
        // we must avoid introducing a conflicting import name, even if
        // the scope variable is referenced from a different source.


        state.hasImportedScopeVariable = path.node.specifiers.some(function (specifier) {
          switch (specifier.type) {
            case 'ImportSpecifier':
              return !isDefault && specifier.imported.name === scopeVariable;

            case 'ImportDefaultSpecifier':
              return isDefault;
          }
        });
      },
      Program: {
        exit: function exit(path, state) {
          if (!state.hasJSX || state.hasImportedScopeVariable) {
            return;
          }

          var _getOptions2 = getOptions(state),
              scopeVariable = _getOptions2.scopeVariable,
              source = _getOptions2.source,
              isDefault = _getOptions2.isDefault;

          var specifier;

          if (isDefault) {
            specifier = t.importDefaultSpecifier(t.identifier(scopeVariable));
          } else {
            specifier = t.importSpecifier(t.identifier(scopeVariable), t.identifier(scopeVariable));
          }

          var importDeclaration = t.importDeclaration([specifier], t.stringLiteral(source));
          path.unshiftContainer('body', importDeclaration);
        }
      }
    }
  };
}
//# sourceMappingURL=index.js.map