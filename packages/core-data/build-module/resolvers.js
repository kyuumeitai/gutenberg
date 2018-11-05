import _objectSpread from "@babel/runtime/helpers/esm/objectSpread";

var _marked =
/*#__PURE__*/
regeneratorRuntime.mark(getAuthors),
    _marked2 =
/*#__PURE__*/
regeneratorRuntime.mark(getEntityRecord),
    _marked3 =
/*#__PURE__*/
regeneratorRuntime.mark(getEntityRecords),
    _marked4 =
/*#__PURE__*/
regeneratorRuntime.mark(getThemeSupports),
    _marked5 =
/*#__PURE__*/
regeneratorRuntime.mark(getEmbedPreview);

/**
 * External dependencies
 */
import { find } from 'lodash';
/**
 * WordPress dependencies
 */

import { addQueryArgs } from '@wordpress/url';
/**
 * Internal dependencies
 */

import { receiveUserQuery, receiveEntityRecords, receiveThemeSupports, receiveEmbedPreview } from './actions';
import { getKindEntities } from './entities';
import { apiFetch } from './controls';
/**
 * Requests authors from the REST API.
 */

export function getAuthors() {
  var users;
  return regeneratorRuntime.wrap(function getAuthors$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return apiFetch({
            path: '/wp/v2/users/?who=authors&per_page=-1'
          });

        case 2:
          users = _context.sent;
          _context.next = 5;
          return receiveUserQuery('authors', users);

        case 5:
        case "end":
          return _context.stop();
      }
    }
  }, _marked, this);
}
/**
 * Requests an entity's record from the REST API.
 *
 * @param {string} kind   Entity kind.
 * @param {string} name   Entity name.
 * @param {number} key    Record's key
 */

export function getEntityRecord(kind, name, key) {
  var entities, entity, record;
  return regeneratorRuntime.wrap(function getEntityRecord$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return getKindEntities(kind);

        case 2:
          entities = _context2.sent;
          entity = find(entities, {
            kind: kind,
            name: name
          });

          if (entity) {
            _context2.next = 6;
            break;
          }

          return _context2.abrupt("return");

        case 6:
          _context2.next = 8;
          return apiFetch({
            path: "".concat(entity.baseURL, "/").concat(key, "?context=edit")
          });

        case 8:
          record = _context2.sent;
          _context2.next = 11;
          return receiveEntityRecords(kind, name, record);

        case 11:
        case "end":
          return _context2.stop();
      }
    }
  }, _marked2, this);
}
/**
 * Requests the entity's records from the REST API.
 *
 * @param {string}  kind   Entity kind.
 * @param {string}  name   Entity name.
 * @param {Object?} query  Query Object.
 */

export function getEntityRecords(kind, name) {
  var query,
      entities,
      entity,
      path,
      records,
      _args3 = arguments;
  return regeneratorRuntime.wrap(function getEntityRecords$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          query = _args3.length > 2 && _args3[2] !== undefined ? _args3[2] : {};
          _context3.next = 3;
          return getKindEntities(kind);

        case 3:
          entities = _context3.sent;
          entity = find(entities, {
            kind: kind,
            name: name
          });

          if (entity) {
            _context3.next = 7;
            break;
          }

          return _context3.abrupt("return");

        case 7:
          path = addQueryArgs(entity.baseURL, _objectSpread({}, query, {
            context: 'edit'
          }));
          _context3.next = 10;
          return apiFetch({
            path: path
          });

        case 10:
          records = _context3.sent;
          _context3.next = 13;
          return receiveEntityRecords(kind, name, Object.values(records), query);

        case 13:
        case "end":
          return _context3.stop();
      }
    }
  }, _marked3, this);
}

getEntityRecords.shouldInvalidate = function (action, kind, name) {
  return action.type === 'RECEIVE_ITEMS' && action.invalidateCache && kind === action.kind && name === action.name;
};
/**
 * Requests theme supports data from the index.
 */


export function getThemeSupports() {
  var activeThemes;
  return regeneratorRuntime.wrap(function getThemeSupports$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return apiFetch({
            path: '/wp/v2/themes?status=active'
          });

        case 2:
          activeThemes = _context4.sent;
          _context4.next = 5;
          return receiveThemeSupports(activeThemes[0].theme_supports);

        case 5:
        case "end":
          return _context4.stop();
      }
    }
  }, _marked4, this);
}
/**
 * Requests a preview from the from the Embed API.
 *
 * @param {string} url   URL to get the preview for.
 */

export function getEmbedPreview(url) {
  var embedProxyResponse;
  return regeneratorRuntime.wrap(function getEmbedPreview$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 3;
          return apiFetch({
            path: addQueryArgs('/oembed/1.0/proxy', {
              url: url
            })
          });

        case 3:
          embedProxyResponse = _context5.sent;
          _context5.next = 6;
          return receiveEmbedPreview(url, embedProxyResponse);

        case 6:
          _context5.next = 12;
          break;

        case 8:
          _context5.prev = 8;
          _context5.t0 = _context5["catch"](0);
          _context5.next = 12;
          return receiveEmbedPreview(url, false);

        case 12:
        case "end":
          return _context5.stop();
      }
    }
  }, _marked5, this, [[0, 8]]);
}
//# sourceMappingURL=resolvers.js.map