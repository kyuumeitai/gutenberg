/**
 * WordPress dependencies
 */
import { speak } from '@wordpress/a11y';
export default {
  SPEAK: function SPEAK(action) {
    speak(action.message, 'assertive');
  }
};
//# sourceMappingURL=controls.js.map