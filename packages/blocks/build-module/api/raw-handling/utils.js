import _objectSpread from "@babel/runtime/helpers/esm/objectSpread";
import _toConsumableArray from "@babel/runtime/helpers/esm/toConsumableArray";

/**
 * External dependencies
 */
import { mergeWith, includes, noop } from 'lodash';
/**
 * WordPress dependencies
 */

import { unwrap, insertAfter, remove } from '@wordpress/dom';
import { hasBlockSupport } from '..';
/**
 * Internal dependencies
 */

import { isPhrasingContent } from './phrasing-content';
/**
 * Browser dependencies
 */

var _window$Node = window.Node,
    ELEMENT_NODE = _window$Node.ELEMENT_NODE,
    TEXT_NODE = _window$Node.TEXT_NODE;
/**
 * Given raw transforms from blocks, merges all schemas into one.
 *
 * @param {Array} transforms Block transforms, of the `raw` type.
 *
 * @return {Object} A complete block content schema.
 */

export function getBlockContentSchema(transforms) {
  var schemas = transforms.map(function (_ref) {
    var blockName = _ref.blockName,
        schema = _ref.schema;

    // If the block supports the "anchor" functionality, it needs to keep its ID attribute.
    if (hasBlockSupport(blockName, 'anchor')) {
      for (var tag in schema) {
        if (!schema[tag].attributes) {
          schema[tag].attributes = [];
        }

        schema[tag].attributes.push('id');
      }
    }

    return schema;
  });
  return mergeWith.apply(void 0, [{}].concat(_toConsumableArray(schemas), [function (objValue, srcValue, key) {
    if (key === 'children') {
      if (objValue === '*' || srcValue === '*') {
        return '*';
      }

      return _objectSpread({}, objValue, srcValue);
    } else if (key === 'attributes' || key === 'require') {
      return _toConsumableArray(objValue || []).concat(_toConsumableArray(srcValue || []));
    }
  }]));
}
/**
 * Recursively checks if an element is empty. An element is not empty if it
 * contains text or contains elements with attributes such as images.
 *
 * @param {Element} element The element to check.
 *
 * @return {boolean} Wether or not the element is empty.
 */

export function isEmpty(element) {
  if (!element.hasChildNodes()) {
    return true;
  }

  return Array.from(element.childNodes).every(function (node) {
    if (node.nodeType === TEXT_NODE) {
      return !node.nodeValue.trim();
    }

    if (node.nodeType === ELEMENT_NODE) {
      if (node.nodeName === 'BR') {
        return true;
      } else if (node.hasAttributes()) {
        return false;
      }

      return isEmpty(node);
    }

    return true;
  });
}
/**
 * Checks wether HTML can be considered plain text. That is, it does not contain
 * any elements that are not line breaks.
 *
 * @param {string} HTML The HTML to check.
 *
 * @return {boolean} Wether the HTML can be considered plain text.
 */

export function isPlain(HTML) {
  return !/<(?!br[ />])/i.test(HTML);
}
/**
 * Given node filters, deeply filters and mutates a NodeList.
 *
 * @param {NodeList} nodeList The nodeList to filter.
 * @param {Array}    filters  An array of functions that can mutate with the provided node.
 * @param {Document} doc      The document of the nodeList.
 * @param {Object}   schema   The schema to use.
 */

export function deepFilterNodeList(nodeList, filters, doc, schema) {
  Array.from(nodeList).forEach(function (node) {
    deepFilterNodeList(node.childNodes, filters, doc, schema);
    filters.forEach(function (item) {
      // Make sure the node is still attached to the document.
      if (!doc.contains(node)) {
        return;
      }

      item(node, doc, schema);
    });
  });
}
/**
 * Given node filters, deeply filters HTML tags.
 * Filters from the deepest nodes to the top.
 *
 * @param {string} HTML    The HTML to filter.
 * @param {Array}  filters An array of functions that can mutate with the provided node.
 * @param {Object} schema  The schema to use.
 *
 * @return {string} The filtered HTML.
 */

export function deepFilterHTML(HTML) {
  var filters = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var schema = arguments.length > 2 ? arguments[2] : undefined;
  var doc = document.implementation.createHTMLDocument('');
  doc.body.innerHTML = HTML;
  deepFilterNodeList(doc.body.childNodes, filters, doc, schema);
  return doc.body.innerHTML;
}
/**
 * Given a schema, unwraps or removes nodes, attributes and classes on a node
 * list.
 *
 * @param {NodeList} nodeList The nodeList to filter.
 * @param {Document} doc      The document of the nodeList.
 * @param {Object}   schema   An array of functions that can mutate with the provided node.
 * @param {Object}   inline   Whether to clean for inline mode.
 */

function cleanNodeList(nodeList, doc, schema, inline) {
  Array.from(nodeList).forEach(function (node) {
    var tag = node.nodeName.toLowerCase(); // It's a valid child.

    if (schema.hasOwnProperty(tag)) {
      if (node.nodeType === ELEMENT_NODE) {
        var _schema$tag = schema[tag],
            _schema$tag$attribute = _schema$tag.attributes,
            attributes = _schema$tag$attribute === void 0 ? [] : _schema$tag$attribute,
            _schema$tag$classes = _schema$tag.classes,
            classes = _schema$tag$classes === void 0 ? [] : _schema$tag$classes,
            children = _schema$tag.children,
            _schema$tag$require = _schema$tag.require,
            require = _schema$tag$require === void 0 ? [] : _schema$tag$require; // If the node is empty and it's supposed to have children,
        // remove the node.


        if (isEmpty(node) && children) {
          remove(node);
          return;
        }

        if (node.hasAttributes()) {
          // Strip invalid attributes.
          Array.from(node.attributes).forEach(function (_ref2) {
            var name = _ref2.name;

            if (name !== 'class' && !includes(attributes, name)) {
              node.removeAttribute(name);
            }
          }); // Strip invalid classes.

          if (node.classList.length) {
            var mattchers = classes.map(function (item) {
              if (typeof item === 'string') {
                return function (className) {
                  return className === item;
                };
              } else if (item instanceof RegExp) {
                return function (className) {
                  return item.test(className);
                };
              }

              return noop;
            });
            Array.from(node.classList).forEach(function (name) {
              if (!mattchers.some(function (isMatch) {
                return isMatch(name);
              })) {
                node.classList.remove(name);
              }
            });

            if (!node.classList.length) {
              node.removeAttribute('class');
            }
          }
        }

        if (node.hasChildNodes()) {
          // Do not filter any content.
          if (children === '*') {
            return;
          } // Continue if the node is supposed to have children.


          if (children) {
            // If a parent requires certain children, but it does
            // not have them, drop the parent and continue.
            if (require.length && !node.querySelector(require.join(','))) {
              cleanNodeList(node.childNodes, doc, schema, inline);
              unwrap(node);
            }

            cleanNodeList(node.childNodes, doc, children, inline); // Remove children if the node is not supposed to have any.
          } else {
            while (node.firstChild) {
              remove(node.firstChild);
            }
          }
        }
      } // Invalid child. Continue with schema at the same place and unwrap.

    } else {
      cleanNodeList(node.childNodes, doc, schema, inline); // For inline mode, insert a line break when unwrapping nodes that
      // are not phrasing content.

      if (inline && !isPhrasingContent(node) && node.nextElementSibling) {
        insertAfter(doc.createElement('br'), node);
      }

      unwrap(node);
    }
  });
}
/**
 * Given a schema, unwraps or removes nodes, attributes and classes on HTML.
 *
 * @param {string} HTML   The HTML to clean up.
 * @param {Object} schema Schema for the HTML.
 * @param {Object} inline Whether to clean for inline mode.
 *
 * @return {string} The cleaned up HTML.
 */


export function removeInvalidHTML(HTML, schema, inline) {
  var doc = document.implementation.createHTMLDocument('');
  doc.body.innerHTML = HTML;
  cleanNodeList(doc.body.childNodes, doc, schema, inline);
  return doc.body.innerHTML;
}
//# sourceMappingURL=utils.js.map