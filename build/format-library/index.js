this.wp=this.wp||{},this.wp.formatLibrary=function(t){var e={};function n(r){if(e[r])return e[r].exports;var o=e[r]={i:r,l:!1,exports:{}};return t[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=t,n.c=e,n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{configurable:!1,enumerable:!0,get:r})},n.r=function(t){Object.defineProperty(t,"__esModule",{value:!0})},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=207)}({0:function(t,e){!function(){t.exports=this.wp.element}()},1:function(t,e){!function(){t.exports=this.wp.i18n}()},10:function(t,e,n){"use strict";function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}n.d(e,"a",function(){return r})},11:function(t,e,n){"use strict";n.d(e,"a",function(){return i});var r=n(28),o=n(3);function i(t,e){return!e||"object"!==Object(r.a)(e)&&"function"!=typeof e?Object(o.a)(t):e}},12:function(t,e,n){"use strict";function r(t,e){return(r=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function o(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&r(t,e)}n.d(e,"a",function(){return o})},13:function(t,e,n){"use strict";function r(t){return(r=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}n.d(e,"a",function(){return r})},17:function(t,e){!function(){t.exports=this.wp.keycodes}()},20:function(t,e,n){"use strict";function r(t,e){if(null==t)return{};var n,r,o=function(t,e){if(null==t)return{};var n,r,o={},i=Object.keys(t);for(r=0;r<i.length;r++)n=i[r],e.indexOf(n)>=0||(o[n]=t[n]);return o}(t,e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(t);for(r=0;r<i.length;r++)n=i[r],e.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(t,n)&&(o[n]=t[n])}return o}n.d(e,"a",function(){return r})},207:function(t,e,n){"use strict";n.r(e);var r=n(20),o=n(0),i=n(1),a=n(21),c={name:"core/bold",title:Object(i.__)("Bold"),match:{tagName:"strong"},edit:function(t){var e=t.isActive,n=t.value,r=t.onChange,c=t.ToolbarButton,u=t.Shortcut,s=function(){return r(Object(a.toggleFormat)(n,{type:"core/bold"}))};return Object(o.createElement)(o.Fragment,null,Object(o.createElement)(u,{type:"primary",character:"b",onUse:s}),Object(o.createElement)(c,{name:"bold",icon:"editor-bold",title:Object(i.__)("Bold"),onClick:s,isActive:e,shortcutType:"primary",shortcutCharacter:"b"}))}},u={name:"core/code",title:Object(i.__)("Code"),match:{tagName:"code"},edit:function(t){var e=t.value,n=t.onChange,r=t.Shortcut;return Object(o.createElement)(o.Fragment,null,Object(o.createElement)(r,{type:"access",character:"x",onUse:function(){return n(Object(a.toggleFormat)(e,{type:"core/code"}))}}))}},s=n(10),l=n(9),b=n(11),p=n(13),f=n(12),d=n(3),m=n(4),h=n(7),O=["image"],j={name:"core/image",title:Object(i.__)("Image"),keywords:[Object(i.__)("photo"),Object(i.__)("media")],object:!0,match:{tagName:"img"},attributes:{className:"class",style:"style",url:"src",alt:"alt"},edit:function(t){function e(){var t;return Object(s.a)(this,e),(t=Object(b.a)(this,Object(p.a)(e).apply(this,arguments))).openModal=t.openModal.bind(Object(d.a)(Object(d.a)(t))),t.closeModal=t.closeModal.bind(Object(d.a)(Object(d.a)(t))),t.state={modal:!1},t}return Object(f.a)(e,t),Object(l.a)(e,[{key:"openModal",value:function(){this.setState({modal:!0})}},{key:"closeModal",value:function(){this.setState({modal:!1})}},{key:"render",value:function(){var t=this,e=this.props,n=e.value,r=e.onChange,c=e.InserterListItem;return Object(o.createElement)(o.Fragment,null,Object(o.createElement)(c,{icon:Object(o.createElement)(m.SVG,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"},Object(o.createElement)(m.Path,{d:"M4 16h10c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v9c0 1.1.9 2 2 2zM4 5h10v9H4V5zm14 9v2h4v-2h-4zM2 20h20v-2H2v2zm6.4-8.8L7 9.4 5 12h8l-2.6-3.4-2 2.6z"})),title:Object(i.__)("Inline Image"),onClick:this.openModal}),this.state.modal&&Object(o.createElement)(h.MediaUpload,{allowedTypes:O,onSelect:function(e){var o=e.id,i=e.url,c=e.alt,u=e.width;t.closeModal(),r(Object(a.insertObject)(n,{type:"core/image",attributes:{className:"wp-image-".concat(o),style:"width: ".concat(Math.min(u,150),"px;"),url:i,alt:c}}))},onClose:this.closeModal,render:function(t){return(0,t.open)(),null}}))}}]),e}(o.Component)},y={name:"core/italic",title:Object(i.__)("Italic"),match:{tagName:"em"},edit:function(t){var e=t.isActive,n=t.value,r=t.onChange,c=t.ToolbarButton,u=t.Shortcut,s=function(){return r(Object(a.toggleFormat)(n,{type:"core/italic"}))};return Object(o.createElement)(o.Fragment,null,Object(o.createElement)(u,{type:"primary",character:"i",onUse:s}),Object(o.createElement)(c,{name:"italic",icon:"editor-italic",title:Object(i.__)("Italic"),onClick:s,isActive:e,shortcutType:"primary",shortcutCharacter:"i"}))}},v=n(29),g=n(17),k=n(22);var _=function(t){function e(){var t;return Object(s.a)(this,e),(t=Object(b.a)(this,Object(p.a)(e).apply(this,arguments))).state={style:function(){var t=window.getSelection();if(0===t.rangeCount)return{};var e=Object(k.getRectangleFromRange)(t.getRangeAt(0)),n=e.top+e.height,r=e.left+e.width/2,o=Object(k.getOffsetParent)(t.anchorNode);if(o){var i=o.getBoundingClientRect();n-=i.top,r-=i.left}return{top:n,left:r}}()},t}return Object(f.a)(e,t),Object(l.a)(e,[{key:"render",value:function(){var t=this.props.children,e=this.state.style;return Object(o.createElement)("div",{className:"editor-format-toolbar__selection-position",style:e},t)}}]),e}(o.Component),w=function(t){return t.stopPropagation()};function C(t){var e=t.url,n=t.opensInNewWindow,r=t.text,o={type:"core/link",attributes:{url:e}};if(n){var a=Object(i.sprintf)(Object(i.__)("%s (opens in a new tab)"),r).trim();o.attributes.target="_blank",o.attributes.rel="noreferrer noopener",o.attributes["aria-label"]=a}return o}function L(t,e){return t.addingLink||e.editLink}var E=function(t){var e=t.value,n=t.onChangeInputValue,r=t.onKeyDown,a=t.submitLink,c=t.autocompleteRef;return Object(o.createElement)("form",{className:"editor-format-toolbar__link-container-content",onKeyPress:w,onKeyDown:r,onSubmit:a},Object(o.createElement)(h.URLInput,{value:e,onChange:n,autocompleteRef:c}),Object(o.createElement)(m.IconButton,{icon:"editor-break",label:Object(i.__)("Apply"),type:"submit"}))},S=function(t){var e=t.url,n=t.editLink;return Object(o.createElement)("div",{className:"editor-format-toolbar__link-container-content",onKeyPress:w},Object(o.createElement)(m.ExternalLink,{className:"editor-format-toolbar__link-container-value",href:e},Object(v.filterURLForDisplay)(Object(v.safeDecodeURI)(e))),Object(o.createElement)(m.IconButton,{icon:"edit",label:Object(i.__)("Edit"),onClick:n}))},x=function(t){function e(){var t;return Object(s.a)(this,e),(t=Object(b.a)(this,Object(p.a)(e).apply(this,arguments))).editLink=t.editLink.bind(Object(d.a)(Object(d.a)(t))),t.submitLink=t.submitLink.bind(Object(d.a)(Object(d.a)(t))),t.onKeyDown=t.onKeyDown.bind(Object(d.a)(Object(d.a)(t))),t.onChangeInputValue=t.onChangeInputValue.bind(Object(d.a)(Object(d.a)(t))),t.setLinkTarget=t.setLinkTarget.bind(Object(d.a)(Object(d.a)(t))),t.onClickOutside=t.onClickOutside.bind(Object(d.a)(Object(d.a)(t))),t.resetState=t.resetState.bind(Object(d.a)(Object(d.a)(t))),t.autocompleteRef=Object(o.createRef)(),t.state={},t}return Object(f.a)(e,t),Object(l.a)(e,[{key:"onKeyDown",value:function(t){t.keyCode===g.ESCAPE&&(t.stopPropagation(),this.resetState()),[g.LEFT,g.DOWN,g.RIGHT,g.UP,g.BACKSPACE,g.ENTER].indexOf(t.keyCode)>-1&&t.stopPropagation()}},{key:"onChangeInputValue",value:function(t){this.setState({inputValue:t})}},{key:"setLinkTarget",value:function(t){var e=this.props,n=e.activeAttributes.url,r=e.value,o=e.onChange;this.setState({opensInNewWindow:t}),L(this.props,this.state)||o(Object(a.applyFormat)(r,C({url:n,opensInNewWindow:t,text:r.text})))}},{key:"editLink",value:function(t){this.setState({editLink:!0}),t.preventDefault()}},{key:"submitLink",value:function(t){var e=this.props,n=e.isActive,r=e.value,o=e.onChange,c=e.speak,u=this.state,s=u.inputValue,l=u.opensInNewWindow,b=Object(v.prependHTTP)(s),p=C({url:b,opensInNewWindow:l,text:r.text});if(t.preventDefault(),Object(a.isCollapsed)(r)&&!n){var f=Object(a.applyFormat)(Object(a.create)({text:b}),p,0,b.length);o(Object(a.insert)(r,f))}else o(Object(a.applyFormat)(r,p));this.resetState(),c(n?Object(i.__)("Link edited."):Object(i.__)("Link added."),"assertive")}},{key:"onClickOutside",value:function(t){var e=this.autocompleteRef.current;e&&e.contains(t.target)||this.resetState()}},{key:"resetState",value:function(){this.props.stopAddingLink(),this.setState({editLink:!1})}},{key:"render",value:function(){var t=this,e=this.props,n=e.isActive,r=e.activeAttributes.url,a=e.addingLink,c=e.value;if(!n&&!a)return null;var u=this.state,s=u.inputValue,l=u.opensInNewWindow,b=L(this.props,this.state);return Object(o.createElement)(_,{key:"".concat(c.start).concat(c.end)},Object(o.createElement)(h.URLPopover,{onClickOutside:this.onClickOutside,focusOnMount:!!b&&"firstElement",renderSettings:function(){return Object(o.createElement)(m.ToggleControl,{label:Object(i.__)("Open in New Tab"),checked:l,onChange:t.setLinkTarget})}},b?Object(o.createElement)(E,{value:s,onChangeInputValue:this.onChangeInputValue,onKeyDown:this.onKeyDown,submitLink:this.submitLink,autocompleteRef:this.autocompleteRef}):Object(o.createElement)(S,{url:r,editLink:this.editLink})))}}],[{key:"getDerivedStateFromProps",value:function(t,e){var n=t.activeAttributes,r=n.url,o="_blank"===n.target;if(!L(t,e)){if(r!==e.inputValue)return{inputValue:r};if(o!==e.opensInNewWindow)return{opensInNewWindow:o}}return null}}]),e}(o.Component),A=Object(m.withSpokenMessages)(x);[c,u,j,y,{name:"core/link",title:Object(i.__)("Link"),match:{tagName:"a"},attributes:{url:"href",target:"target"},edit:Object(m.withSpokenMessages)(function(t){function e(){var t;return Object(s.a)(this,e),(t=Object(b.a)(this,Object(p.a)(e).apply(this,arguments))).addLink=t.addLink.bind(Object(d.a)(Object(d.a)(t))),t.stopAddingLink=t.stopAddingLink.bind(Object(d.a)(Object(d.a)(t))),t.onRemoveFormat=t.onRemoveFormat.bind(Object(d.a)(Object(d.a)(t))),t.state={addingLink:!1},t}return Object(f.a)(e,t),Object(l.a)(e,[{key:"addLink",value:function(){var t=this.props,e=t.value,n=t.onChange,r=Object(a.getTextContent)(Object(a.slice)(e));r&&Object(v.isURL)(r)?n(Object(a.applyFormat)(e,{type:"core/link",attributes:{url:r}})):this.setState({addingLink:!0})}},{key:"stopAddingLink",value:function(){this.setState({addingLink:!1})}},{key:"onRemoveFormat",value:function(){var t=this.props,e=t.value,n=t.onChange,r=t.speak;n(Object(a.removeFormat)(e,"core/link")),r(Object(i.__)("Link removed."),"assertive")}},{key:"render",value:function(){var t=this.props,e=t.isActive,n=t.activeAttributes,r=t.value,a=t.onChange,c=t.ToolbarButton,u=t.Shortcut;return Object(o.createElement)(o.Fragment,null,Object(o.createElement)(u,{type:"access",character:"a",onUse:this.addLink}),Object(o.createElement)(u,{type:"access",character:"s",onUse:this.onRemoveFormat}),Object(o.createElement)(u,{type:"primary",character:"k",onUse:this.addLink}),Object(o.createElement)(u,{type:"primaryShift",character:"k",onUse:this.onRemoveFormat}),e&&Object(o.createElement)(c,{name:"link",icon:"editor-unlink",title:Object(i.__)("Unlink"),onClick:this.onRemoveFormat,isActive:e,shortcutType:"primaryShift",shortcutCharacter:"k"}),!e&&Object(o.createElement)(c,{name:"link",icon:"admin-links",title:Object(i.__)("Link"),onClick:this.addLink,isActive:e,shortcutType:"primary",shortcutCharacter:"k"}),Object(o.createElement)(A,{addingLink:this.state.addingLink,stopAddingLink:this.stopAddingLink,isActive:e,activeAttributes:n,value:r,onChange:a}))}}]),e}(o.Component))},{name:"core/strikethrough",title:Object(i.__)("Strikethrough"),match:{tagName:"del"},edit:function(t){var e=t.isActive,n=t.value,r=t.onChange,c=t.ToolbarButton,u=t.Shortcut,s=function(){return r(Object(a.toggleFormat)(n,{type:"core/strikethrough"}))};return Object(o.createElement)(o.Fragment,null,Object(o.createElement)(u,{type:"access",character:"d",onUse:s}),Object(o.createElement)(c,{name:"strikethrough",icon:"editor-strikethrough",title:Object(i.__)("Strikethrough"),onClick:s,isActive:e,shortcutType:"access",shortcutCharacter:"d"}))}}].forEach(function(t){var e=t.name,n=Object(r.a)(t,["name"]);return Object(a.registerFormatType)(e,n)})},21:function(t,e){!function(){t.exports=this.wp.richText}()},22:function(t,e){!function(){t.exports=this.wp.dom}()},28:function(t,e,n){"use strict";function r(t){return(r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function o(t){return(o="function"==typeof Symbol&&"symbol"===r(Symbol.iterator)?function(t){return r(t)}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":r(t)})(t)}n.d(e,"a",function(){return o})},29:function(t,e){!function(){t.exports=this.wp.url}()},3:function(t,e,n){"use strict";function r(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}n.d(e,"a",function(){return r})},4:function(t,e){!function(){t.exports=this.wp.components}()},7:function(t,e){!function(){t.exports=this.wp.editor}()},9:function(t,e,n){"use strict";function r(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function o(t,e,n){return e&&r(t.prototype,e),n&&r(t,n),t}n.d(e,"a",function(){return o})}});