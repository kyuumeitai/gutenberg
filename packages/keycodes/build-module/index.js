import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _toConsumableArray from "@babel/runtime/helpers/esm/toConsumableArray";

/**
 * Note: The order of the modifier keys in many of the [foo]Shortcut()
 * functions in this file are intentional and should not be changed. They're
 * designed to fit with the standard menu keyboard shortcuts shown in the
 * user's platform.
 *
 * For example, on MacOS menu shortcuts will place Shift before Command, but
 * on Windows Control will usually come first. So don't provide your own
 * shortcut combos directly to keyboardShortcut().
 */

/**
 * External dependencies
 */
import { get, mapValues, includes, capitalize } from 'lodash';
/**
 * WordPress dependencies
 */

import { __ } from '@wordpress/i18n';
/**
 * Internal dependencies
 */

import { isAppleOS } from './platform';
export var BACKSPACE = 8;
export var TAB = 9;
export var ENTER = 13;
export var ESCAPE = 27;
export var SPACE = 32;
export var LEFT = 37;
export var UP = 38;
export var RIGHT = 39;
export var DOWN = 40;
export var DELETE = 46;
export var F10 = 121;
export var ALT = 'alt';
export var CTRL = 'ctrl'; // Understood in both Mousetrap and TinyMCE.

export var COMMAND = 'meta';
export var SHIFT = 'shift';
var modifiers = {
  primary: function primary(_isApple) {
    return _isApple() ? [COMMAND] : [CTRL];
  },
  primaryShift: function primaryShift(_isApple) {
    return _isApple() ? [SHIFT, COMMAND] : [CTRL, SHIFT];
  },
  primaryAlt: function primaryAlt(_isApple) {
    return _isApple() ? [ALT, COMMAND] : [CTRL, ALT];
  },
  secondary: function secondary(_isApple) {
    return _isApple() ? [SHIFT, ALT, COMMAND] : [CTRL, SHIFT, ALT];
  },
  access: function access(_isApple) {
    return _isApple() ? [CTRL, ALT] : [SHIFT, ALT];
  },
  ctrl: function ctrl() {
    return [CTRL];
  },
  alt: function alt() {
    return [ALT];
  },
  ctrlShift: function ctrlShift() {
    return [CTRL, SHIFT];
  },
  shift: function shift() {
    return [SHIFT];
  },
  shiftAlt: function shiftAlt() {
    return [SHIFT, ALT];
  }
};
/**
 * An object that contains functions to get raw shortcuts.
 * E.g. rawShortcut.primary( 'm' ) will return 'meta+m' on Mac.
 * These are intended for user with the KeyboardShortcuts component or TinyMCE.
 *
 * @type {Object} Keyed map of functions to raw shortcuts.
 */

export var rawShortcut = mapValues(modifiers, function (modifier) {
  return function (character) {
    var _isApple = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : isAppleOS;

    return _toConsumableArray(modifier(_isApple)).concat([character.toLowerCase()]).join('+');
  };
});
/**
 * Return an array of the parts of a keyboard shortcut chord for display
 * E.g displayShortcutList.primary( 'm' ) will return [ '⌘', 'M' ] on Mac.
 *
 * @type {Object} keyed map of functions to shortcut sequences
 */

export var displayShortcutList = mapValues(modifiers, function (modifier) {
  return function (character) {
    var _replacementKeyMap;

    var _isApple = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : isAppleOS;

    var isApple = _isApple();

    var replacementKeyMap = (_replacementKeyMap = {}, _defineProperty(_replacementKeyMap, ALT, isApple ? '⌥' : 'Alt'), _defineProperty(_replacementKeyMap, CTRL, isApple ? '^' : 'Ctrl'), _defineProperty(_replacementKeyMap, COMMAND, '⌘'), _defineProperty(_replacementKeyMap, SHIFT, isApple ? '⇧' : 'Shift'), _replacementKeyMap);
    var modifierKeys = modifier(_isApple).reduce(function (accumulator, key) {
      var replacementKey = get(replacementKeyMap, key, key); // If on the Mac, adhere to platform convention and don't show plus between keys.

      if (isApple) {
        return _toConsumableArray(accumulator).concat([replacementKey]);
      }

      return _toConsumableArray(accumulator).concat([replacementKey, '+']);
    }, []);
    var capitalizedCharacter = capitalize(character);
    return _toConsumableArray(modifierKeys).concat([capitalizedCharacter]);
  };
});
/**
 * An object that contains functions to display shortcuts.
 * E.g. displayShortcut.primary( 'm' ) will return '⌘M' on Mac.
 *
 * @type {Object} Keyed map of functions to display shortcuts.
 */

export var displayShortcut = mapValues(displayShortcutList, function (shortcutList) {
  return function (character) {
    var _isApple = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : isAppleOS;

    return shortcutList(character, _isApple).join('');
  };
});
/**
 * An object that contains functions to return an aria label for a keyboard shortcut.
 * E.g. shortcutAriaLabel.primary( '.' ) will return 'Command + Period' on Mac.
 */

export var shortcutAriaLabel = mapValues(modifiers, function (modifier) {
  return function (character) {
    var _replacementKeyMap2;

    var _isApple = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : isAppleOS;

    var isApple = _isApple();

    var replacementKeyMap = (_replacementKeyMap2 = {}, _defineProperty(_replacementKeyMap2, SHIFT, 'Shift'), _defineProperty(_replacementKeyMap2, COMMAND, isApple ? 'Command' : 'Control'), _defineProperty(_replacementKeyMap2, CTRL, 'Control'), _defineProperty(_replacementKeyMap2, ALT, isApple ? 'Option' : 'Alt'), _defineProperty(_replacementKeyMap2, ',', __('Comma')), _defineProperty(_replacementKeyMap2, '.', __('Period')), _defineProperty(_replacementKeyMap2, '`', __('Backtick')), _replacementKeyMap2);
    return _toConsumableArray(modifier(_isApple)).concat([character]).map(function (key) {
      return capitalize(get(replacementKeyMap, key, key));
    }).join(isApple ? ' ' : ' + ');
  };
});
/**
 * An object that contains functions to check if a keyboard event matches a
 * predefined shortcut combination.
 * E.g. isKeyboardEvent.primary( event, 'm' ) will return true if the event
 * signals pressing ⌘M.
 *
 * @type {Object} Keyed map of functions to match events.
 */

export var isKeyboardEvent = mapValues(modifiers, function (getModifiers) {
  return function (event, character) {
    var _isApple = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : isAppleOS;

    var mods = getModifiers(_isApple);

    if (!mods.every(function (key) {
      return event["".concat(key, "Key")];
    })) {
      return false;
    }

    if (!character) {
      return includes(mods, event.key.toLowerCase());
    }

    return event.key === character;
  };
});
//# sourceMappingURL=index.js.map