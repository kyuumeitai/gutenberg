"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createNotice = createNotice;
exports.createSuccessNotice = createSuccessNotice;
exports.createInfoNotice = createInfoNotice;
exports.createErrorNotice = createErrorNotice;
exports.createWarningNotice = createWarningNotice;
exports.removeNotice = removeNotice;

var _lodash = require("lodash");

var _constants = require("./constants");

var _marked =
/*#__PURE__*/
regeneratorRuntime.mark(createNotice);

/**
 * Yields action objects used in signalling that a notice is to be created.
 *
 * @param {?string}                status                Notice status.
 *                                                       Defaults to `info`.
 * @param {string}                 content               Notice message.
 * @param {?Object}                options               Notice options.
 * @param {?string}                options.context       Context under which to
 *                                                       group notice.
 * @param {?string}                options.id            Identifier for notice.
 *                                                       Automatically assigned
 *                                                       if not specified.
 * @param {?boolean}               options.isDismissible Whether the notice can
 *                                                       be dismissed by user.
 *                                                       Defaults to `true`.
 * @param {?Array<WPNoticeAction>} options.actions       User actions to be
 *                                                       presented with notice.
 */
function createNotice() {
  var status,
      content,
      options,
      _options$isDismissibl,
      isDismissible,
      _options$context,
      context,
      _options$id,
      id,
      _options$actions,
      actions,
      _args = arguments;

  return regeneratorRuntime.wrap(function createNotice$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          status = _args.length > 0 && _args[0] !== undefined ? _args[0] : 'info';
          content = _args.length > 1 ? _args[1] : undefined;
          options = _args.length > 2 && _args[2] !== undefined ? _args[2] : {};
          _options$isDismissibl = options.isDismissible, isDismissible = _options$isDismissibl === void 0 ? true : _options$isDismissibl, _options$context = options.context, context = _options$context === void 0 ? _constants.DEFAULT_CONTEXT : _options$context, _options$id = options.id, id = _options$id === void 0 ? (0, _lodash.uniqueId)(context) : _options$id, _options$actions = options.actions, actions = _options$actions === void 0 ? [] : _options$actions;
          _context.next = 6;
          return {
            type: 'SPEAK',
            message: content
          };

        case 6:
          _context.next = 8;
          return {
            type: 'CREATE_NOTICE',
            context: context,
            notice: {
              id: id,
              status: status,
              content: content,
              isDismissible: isDismissible,
              actions: actions
            }
          };

        case 8:
        case "end":
          return _context.stop();
      }
    }
  }, _marked, this);
}
/**
 * Returns an action object used in signalling that a success notice is to be
 * created. Refer to `createNotice` for options documentation.
 *
 * @see createNotice
 *
 * @param {string}  content Notice message.
 * @param {?Object} options Optional notice options.
 *
 * @return {Object} Action object.
 */


function createSuccessNotice(content, options) {
  return createNotice('success', content, options);
}
/**
 * Returns an action object used in signalling that an info notice is to be
 * created. Refer to `createNotice` for options documentation.
 *
 * @see createNotice
 *
 * @param {string}  content Notice message.
 * @param {?Object} options Optional notice options.
 *
 * @return {Object} Action object.
 */


function createInfoNotice(content, options) {
  return createNotice('info', content, options);
}
/**
 * Returns an action object used in signalling that an error notice is to be
 * created. Refer to `createNotice` for options documentation.
 *
 * @see createNotice
 *
 * @param {string}  content Notice message.
 * @param {?Object} options Optional notice options.
 *
 * @return {Object} Action object.
 */


function createErrorNotice(content, options) {
  return createNotice('error', content, options);
}
/**
 * Returns an action object used in signalling that a warning notice is to be
 * created. Refer to `createNotice` for options documentation.
 *
 * @see createNotice
 *
 * @param {string}  content Notice message.
 * @param {?Object} options Optional notice options.
 *
 * @return {Object} Action object.
 */


function createWarningNotice(content, options) {
  return createNotice('warning', content, options);
}
/**
 * Returns an action object used in signalling that a notice is to be removed.
 *
 * @param {string}  id      Notice unique identifier.
 * @param {?string} context Optional context (grouping) in which the notice is
 *                          intended to appear. Defaults to default context.
 *
 * @return {Object} Action object.
 */


function removeNotice(id) {
  var context = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _constants.DEFAULT_CONTEXT;
  return {
    type: 'REMOVE_NOTICE',
    id: id,
    context: context
  };
}
//# sourceMappingURL=actions.js.map