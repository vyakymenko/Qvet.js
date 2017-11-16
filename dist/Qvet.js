/**
 * Qvet - QlikView Extension Trickster
 * 
 * @version v1.0.3
 * @author Valentyn Yakymenko <rayfesoul@gmail.com>
 * @license MIT
 */
/**
 * Qvet - QlikView Extension Trickster
 * 
 * @version v1.0.3
 * @author Valentyn Yakymenko <rayfesoul@gmail.com>
 * @license MIT
 *//**
 * Qvet - QlikView Extension Trickster
 * 
 * @version v1.0.3
 * @author Valentyn Yakymenko <rayfesoul@gmail.com>
 * @license MIT
 *//**
 * Qvet - QlikView Extension Trickster
 * 
 * @version v1.0.3
 * @author Valentyn Yakymenko <rayfesoul@gmail.com>
 * @license MIT
 *//**
 * Qvet - QlikView Extension Trickster
 * 
 * @version v1.0.2
 * @author Valentyn Yakymenko <rayfesoul@gmail.com>
 * @license MIT
 */(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports={
  "name": "qvet",
  "version": "1.0.2",
  "description": "QlikView Extension Trickster",
  "main": "gulpfile.js",
  "browserify": {
    "transform": [
      [
        "babelify",
        {
          "presets": [
            "es2015"
          ]
        }
      ]
    ]
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/vyakymenko/qvet.git"
  },
  "keywords": [
    "qlikview",
    "extensions",
    "javascript",
    "es6"
  ],
  "author": "Valentyn Yakymenko <rayfesoul@gmail.com>",
  "license": "MIT",
  "bugs": {
    "url": "https://github.com/vyakymenko/qvet/issues"
  },
  "homepage": "https://github.com/vyakymenko/qvet#readme",
  "devDependencies": {
    "babel-preset-es2015": "^6.6.0",
    "babelify": "^7.3.0",
    "browserify": "^13.1.0",
    "event-stream": "^3.3.4",
    "eventstream": "0.0.3",
    "gulp": "^3.9.1",
    "gulp-header": "^1.8.7",
    "gulp-streamify": "^1.0.2",
    "gulp-uglify": "^2.0.0",
    "gulp-util": "^3.0.7",
    "run-sequence": "^1.2.2",
    "vinyl-source-stream": "^1.1.0"
  }
}

},{}],2:[function(require,module,exports){
'use strict';

var _Core = require('./core/Core');

(function (window) {
	if (typeof Qva === 'undefined' && typeof jQuery === 'undefined' && typeof qva === 'undefined') {
		console.log("Can't init Qvet because Qva/jQuery/qva is undefined");
	} else {
		if (typeof Qvet === 'undefined') {
			window.Qvet = new _Core.QvetCore();
		} else {
			console.log("Qvet already defined.");
		}
	}
})(window);

},{"./core/Core":3}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.QvetCore = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ToolbarActions_deprecated = require('./native/ToolbarActions_deprecated');

var _index = require('./native/index');

var _index2 = require('./addition/index');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var version = require('../../package.json').version;

/**
 * Native.
 */


/**
 * Addition.
 */

var QvetCore = exports.QvetCore = function () {
	function QvetCore() {
		_classCallCheck(this, QvetCore);

		this.native = {
			bookmarks: {
				$add: _ToolbarActions_deprecated.$AddBookmark,
				$remove: _ToolbarActions_deprecated.$RemoveBookmark,
				$email: _ToolbarActions_deprecated.$EmailBookmark
			},
			$openRepository: _ToolbarActions_deprecated.$OpenRepository,
			$showFields: _ToolbarActions_deprecated.$ShowFields,
			$newSheetObject: _ToolbarActions_deprecated.$NewSheetObject
		};

		// native
		this.$addBookmark = _index.$addBookmark;
		this.$removeBookmark = _index.$removeBookmark;
		this.$openRepository = _index.$openRepository;
		this.$newSheetObject = _index.$newSheetObject;
		this.$showFields = _index.$showFields;

		// addition
		this.selectListBoxValues = _index2.selectListBoxValues;
	}

	_createClass(QvetCore, [{
		key: 'getVersion',
		value: function getVersion() {
			console.log('Qvet Core version: ' + version);
		}

		// TODO: Debug sendEmailBookmark.

	}, {
		key: 'sendEmailBookmark',
		value: function sendEmailBookmark(config, extraParams) {
			return new _index2.EmailBookmark(config, extraParams).createBookmark().openEmailWindow();
		}
	}]);

	return QvetCore;
}();

},{"../../package.json":1,"./addition/index":6,"./native/ToolbarActions_deprecated":9,"./native/index":10}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.EmailBookmark = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Util = require("../util/Util");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Email QlikView Bookmark.
 * 
 * @constructor
 */

var EmailBookmark = exports.EmailBookmark = function () {

	/**
  *  Config.
  *
  * @param config {object}
  *
  * @param config.emailSubject {string}
  * @param config.name {string}
  * @param config.shared {boolean}
  * @param config.excludeSelections {boolean}
  * @param config.includeState {boolean}
  * @param config.notDisplayed {boolean}
  * @param config.descriptionShow {boolean}
  * @param config.descriptionMsg {string}
  * @param config.saveInputValues {boolean}
  *
  *  Extra Params.
  *
  * @param extraParams {object}
  * @param extraParams.extraUri {string}
  * @param extraParams.emailWindowMode {boolean}
  */

	function EmailBookmark(config, extraParams) {
		_classCallCheck(this, EmailBookmark);

		var defaultConfig = {
			emailSubject: "",
			name: "Email Bookmark", /** Name of the addition. */
			shared: true, /** Share the addition with other users. */
			excludeSelections: false, /** Exclude the selections made in the application. */
			includeState: true, /** Include state of all objects. */
			notDisplayed: false, /** The addition is not displayed in the addition list but is still selectable in code or via url. */
			descriptionShow: false, /** The addition description will be shown in a message when the addition is selected. */
			descriptionMsg: "", /** Description of the addition. */
			saveInputValues: true /** Include values in input fields.*/
		};

		this.defaulQvAjxZfc = '/QvAJAXZfc/opendoc.htm?document=';

		/** The addition is applied on top of any previous selections (no clear).*/
		this.applied = true;
		this.doc = Qv.GetCurrentDocument();
		this.bookmarkId = '';

		/**
   * Important params.
   * @type {*|string}
   */
		if ((0, _Util.$tv)(config, 'object')) {
			this.emailSubject = config.emailSubject || defaultConfig.emailSubject;
			this.name = config.name || defaultConfig.name;
			this.shared = config.shared || defaultConfig.shared;
			this.excludeSelections = config.excludeSelections || defaultConfig.excludeSelections;
			this.includeState = config.includeState || defaultConfig.includeState;
			this.notDisplayed = config.notDisplayed || defaultConfig.notDisplayed;
			this.descriptionShow = config.descriptionShow || defaultConfig.descriptionShow;
			this.descriptionMsg = config.descriptionMsg || defaultConfig.descriptionMsg;
			this.saveInputValues = config.saveInputValues || defaultConfig.saveInputValues;
		} else {
			for (var key in defaultConfig) {
				if (defaultConfig.hasOwnProperty(key)) this[key] = defaultConfig[key];
			}
		}

		/**
   * Extra params.
   *
   * @param extraUri {string} Use it for add parent url to your QlikView ASP.NET client. TODO: In Development.
   * @param emailWindowMode {boolean} By default addition will open email in new window,
   * but you can change it to {false} and email window will be opened on same domain.
   */
		if ((0, _Util.$tv)(extraParams, 'object')) {
			this.extraUri = extraParams.extraUri || '';
			this.emailWindowMode = extraParams.emailWindowMode || true;
		} else {
			this.extraUri = '';
			this.emailWindowMode = true;
		}
	}

	/**
  * Use native Bookmarks Class
  * for create addition before email it.
  *
  * @extends {}
  */


	_createClass(EmailBookmark, [{
		key: "createBookmark",
		value: function createBookmark() {

			this.doc.Bookmarks().NewBookmark(this.name, this.applied, this.shared, this.excludeSelections, this.includeState, this.notDisplayed, this.descriptionShow, this.descriptionMsg, this.saveInputValues);

			this.bookmarkId = this.doc.Bookmarks().BookMarks[this.doc.Bookmarks().BookMarks.length - 1].value;

			return this;
		}
	}, {
		key: "openEmailWindow",
		value: function openEmailWindow() {

			var uri = this.extraUri + window.location.origin + this.defaulQvAjxZfc + this.doc.binder.View + '&addition=' + this.bookmarkId;

			var uri_enc = encodeURIComponent(uri).replace(/%20/g, "%2520"),
			    mailer = 'mailto:?subject=' + this.emailSubject + '&body=' + uri_enc;

			this.emailWindowMode ? window.location.href = mailer : location.href = mailer;

			return this;
		}
	}]);

	return EmailBookmark;
}();

},{"../util/Util":11}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.selectListBoxValues = selectListBoxValues;
/**
 * @name selectListBoxValues
 * Recursive selection values in listBox.
 *
 * @note Works only with available listBoxes.
 *
 * @param listBoxArray {Array} - array of listBoxes and values.
 * @param index {number} - starter index for selections.
 * @param cb {function} - callback after all vales will be selected.
 *
 * @return {void|function}
 */
function selectListBoxValues(listBoxArray, index, cb) {
  if (index < listBoxArray.length) {
    if (listBoxArray[index].listbox_name != null) {
      qva.GetQvObject(listBoxArray[index].listbox_name, function () {
        this.callbackFn = function () {};
        this.Data.SelectTexts(listBoxArray[index].desc_value);
        index++;
        selectListBoxValues(listBoxArray, index, cb);
      }, this);
    } else {
      index++;
      selectListBoxValues(listBoxArray, index, cb);
    }
  } else if (index === listBoxArray.length) {
    if (typeof cb === "function") return cb();
  }
}

},{}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _EmailBookmark = require('./EmailBookmark');

Object.keys(_EmailBookmark).forEach(function (key) {
  if (key === "default") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _EmailBookmark[key];
    }
  });
});

var _ListboxActions = require('./ListboxActions');

Object.keys(_ListboxActions).forEach(function (key) {
  if (key === "default") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _ListboxActions[key];
    }
  });
});

},{"./EmailBookmark":4,"./ListboxActions":5}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.$callClientAction = $callClientAction;
exports.$removeBookmark = $removeBookmark;
exports.$addBookmark = $addBookmark;
/**
 * @name $callClientAction {function}
 * @note Open client action modal for remove or add bookmark.
 *
 * @param actionName {string} - Action name `ADDBM` or `REMBM`.
 * @param paramName {string} - Param name `bm` or `rembm`.
 *
 * @return {function}
 */
function $callClientAction(actionName, paramName) {
  return Qva.ContextClientAction({
    clientAction: "modal",
    param: paramName.toLowerCase(),
    name: actionName.toUpperCase(),
    binder: Qv.GetCurrentDocument().binder
  });
}

/**
 * @name $removeBookmark {function}
 * @note Open remove bookmark modal window.
 *
 * @return {void}
 */
function $removeBookmark() {
  $callClientAction("REMBM", "removebm");
}

/**
 * @name $addBookmark {function}
 * @note Open add bookmark modal window.
 *
 * @return {void}
 */
function $addBookmark() {
  $callClientAction("ADDBM", "bm");
}

},{}],8:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.$callSpecialStandardAction = $callSpecialStandardAction;
exports.$openRepository = $openRepository;
exports.$newSheetObject = $newSheetObject;
exports.$showFields = $showFields;
/**
 * @name $callSpecialStandardAction {function}
 * @note Call special standard action for open repository,
 *  create new sheet object or show fields.
 *
 * @param actionName {string} - Action name depend on `Qva.Mgr.menu.specialActions`.
 *
 * @return {function}
 */
function $callSpecialStandardAction(actionName) {
  return Qv.GetCurrentDocument().binder.SimpleCall("set", "Document.StandardActions." + actionName.toUpperCase(), null, {
    action: ""
  });
}

/**
 * @name $openRepository {function}
 * @note Open repository modal window.
 *
 * @return {void}
 */
function $openRepository() {
  $callSpecialStandardAction("repository");
}

/**
 * @name $openNewSheetObject {function}
 * @note Open new sheet object modal window.
 *
 * @return {void}
 */
function $newSheetObject() {
  $callSpecialStandardAction("newSheetObj");
}

/**
 * @name $openShowFields {function}
 * @note Open show fields modal window.
 *
 * @return {void}
 */
function $showFields() {
  $callSpecialStandardAction("showFields");
}

},{}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.$AddBookmark = $AddBookmark;
exports.$RemoveBookmark = $RemoveBookmark;
exports.$EmailBookmark = $EmailBookmark;
exports.$OpenRepository = $OpenRepository;
exports.$NewSheetObject = $NewSheetObject;
exports.$ShowFields = $ShowFields;

var _Util = require('../util/Util');

/**
 * @name $AddBookmark {function}
 * @deprecated 1.0.1
 *
 * @note Open native Add Bookmark modal.
 */
function $AddBookmark() {
  (0, _Util.$QvaToolbarAction)('ADDBM');
  console.log('Qvet: \'native.bookmarks.$add\' is deprecated and will be removed in 1.1.0. Use \'Qvet.$addBookmark\'.');
}

/**
 * @name $ShowFields {function}
 * @deprecated 1.0.1
 * @note Open native Remove Bookmark modal.
 */
/**
 * @note All actions with available ToolBar.
 * @deprecated 1.0.1
 *
 * `$('#QvAjaxToolbar');`
 */

function $RemoveBookmark() {
  (0, _Util.$QvaToolbarAction)('REMBM');
  console.log('Qvet: \'Qvet.native.bookmarks.$remove\' is deprecated and will be removed in 1.1.0. Use \'Qvet.$removeBookmark\'.');
}

/**
 * @name $EmailBookmark {function}
 * @deprecated 1.0.1
 * @note Open native EmailAsLink Bookmark modal.
 */
function $EmailBookmark() {
  (0, _Util.$QvaToolbarAction)('MAILASLINK');
  console.log('Qvet: \'Qvet.native.bookmarks.$EmailBookmark\' is deprecated and will be removed in 1.1.0');
}

/**
 * @name $OpenRepository
 * @deprecated 1.0.1
 * @note Open native Repository modal.
 */
function $OpenRepository() {
  (0, _Util.$QvaToolbarAction)('REPOSITORY');
  console.log('Qvet: \'Qvet.native.$openRepository\' is deprecated and will be removed in 1.1.0. Use \'Qvet.$openRepository\'.');
}

/**
 * @name $NewSheetObject {function}
 * @deprecated 1.0.1
 * @note Open native NewSheet Object modal.
 */
function $NewSheetObject() {
  (0, _Util.$QvaToolbarAction)('NEWSHEETOBJ');
  console.log('Qvet: \'Qvet.native.bookmarks.$remove\' is deprecated and will be removed in 1.1.0. Use \'Qvet.$newSheetObject\'.');
}

/**
 * @name $ShowFields
 * @deprecated 1.0.1
 * @note Open native ShowFields modal.
 */
function $ShowFields() {
  (0, _Util.$QvaToolbarAction)('SHOWFIELDS');
  console.log('Qvet: \'Qvet.native.bookmarks.$remove\' is deprecated and will be removed in 1.1.0. Use \'Qvet.$showFields\'.');
}

},{"../util/Util":11}],10:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ClientActions = require('./ClientActions');

Object.keys(_ClientActions).forEach(function (key) {
  if (key === "default") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _ClientActions[key];
    }
  });
});

var _SpecialStandardActions = require('./SpecialStandardActions');

Object.keys(_SpecialStandardActions).forEach(function (key) {
  if (key === "default") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _SpecialStandardActions[key];
    }
  });
});

},{"./ClientActions":7,"./SpecialStandardActions":8}],11:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

exports.$tv = $tv;
exports.$QvaToolbarAction = $QvaToolbarAction;
/**
 * Type Validator
 * 
 * @param variable {object|boolean|string|number|function}
 * @param type {string}
 */
function $tv(variable, type) {
  return (typeof variable === 'undefined' ? 'undefined' : _typeof(variable)) === type;
}

/**
 * QvaDoAction
 * 
 * @dependencies {Qva}
 * @param action_name {string} - Action Name, depend on Qva.createOptions.
 */
function $QvaToolbarAction(action_name) {

  Qva.Mgr.menu.doAction({
    target: '.ctx-menu-action-' + action_name
  });
}

},{}]},{},[2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJwYWNrYWdlLmpzb24iLCJzcmNcXFF2ZXQuanMiLCJzcmNcXGNvcmVcXENvcmUuanMiLCJzcmNcXGNvcmVcXGFkZGl0aW9uXFxFbWFpbEJvb2ttYXJrLmpzIiwic3JjXFxjb3JlXFxhZGRpdGlvblxcTGlzdGJveEFjdGlvbnMuanMiLCJzcmNcXGNvcmVcXGFkZGl0aW9uXFxpbmRleC5qcyIsInNyY1xcY29yZVxcbmF0aXZlXFxDbGllbnRBY3Rpb25zLmpzIiwic3JjXFxjb3JlXFxuYXRpdmVcXFNwZWNpYWxTdGFuZGFyZEFjdGlvbnMuanMiLCJzcmNcXGNvcmVcXG5hdGl2ZVxcVG9vbGJhckFjdGlvbnNfZGVwcmVjYXRlZC5qcyIsInNyY1xcY29yZVxcbmF0aXZlXFxpbmRleC5qcyIsInNyY1xcY29yZVxcdXRpbFxcVXRpbC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDaERBLEFBQVMsQUFBZ0I7O0FBRXpCLENBQUMsVUFBQSxBQUFTLFFBQU8sQUFDaEI7S0FBSSxPQUFBLEFBQU8sUUFBUCxBQUFlLGVBQ2YsT0FBQSxBQUFPLFdBRFAsQUFDa0IsZUFDbEIsT0FBQSxBQUFPLFFBRlgsQUFFbUIsYUFDbEIsQUFDQTtVQUFBLEFBQVEsSUFBUixBQUFZLEFBQ1o7QUFMRCxRQUtLLEFBQ0o7TUFBRyxPQUFBLEFBQU8sU0FBVixBQUFv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QUFRLEFBQUksQUFBQyxBQUNkO0FBT0Q7Ozs7Ozs7QUFBTywyQkFBMkIsQUFDakM7K0JBQUEsQUFBa0IsQUFDakI7VUFBQSxBQUFRLEFBQUksQUFBQyxBQUNkO0FBT0Q7Ozs7Ozs7QUFBTyx1QkFBdUIsQUFDN0I7K0JBQUEsQUFBa0IsQUFDakI7VUFBQSxBQUFRLEFBQUksQUFBQyxBQUNkOzs7Ozs7Ozs7Ozs7QUNwRUQsQUFBYzs7Ozs7Ozs7Ozs7O0FBQ2QsQUFBYzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztRQ0tQLEFBQVM7UUFVVCxBQUFTOzs7Ozs7O0FBVlQsYUFBQSxBQUFhLFVBQWIsQUFBdUIsTUFBSyxBQUNsQztTQUFPLFFBQUEsQUFBTyxnRUFBZCxBQUEyQixBQUMzQjtBQVFEOzs7Ozs7OztBQUFPLDJCQUFBLEFBQTJCLGFBQWEsQUFFOUM7O01BQUEsQUFBSSxJQUFKLEFBQVEsS0FBUixBQUFhO1lBQ0osc0JBRFQsQUFBc0IsQUFDTyxBQUU3QjtBQUhzQixBQUNyQiIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJtb2R1bGUuZXhwb3J0cz17XG4gIFwibmFtZVwiOiBcInF2ZXRcIixcbiAgXCJ2ZXJzaW9uXCI6IFwiMS4wLjJcIixcbiAgXCJkZXNjcmlwdGlvblwiOiBcIlFsaWtWaWV3IEV4dGVuc2lvbiBUcmlja3N0ZXJcIixcbiAgXCJtYWluXCI6IFwiZ3VscGZpbGUuanNcIixcbiAgXCJicm93c2VyaWZ5XCI6IHtcbiAgICBcInRyYW5zZm9ybVwiOiBbXG4gICAgICBbXG4gICAgICAgIFwiYmFiZWxpZnlcIixcbiAgICAgICAge1xuICAgICAgICAgIFwicHJlc2V0c1wiOiBbXG4gICAgICAgICAgICBcImVzMjAxNVwiXG4gICAgICAgICAgXVxuICAgICAgICB9XG4gICAgICBdXG4gICAgXVxuICB9LFxuICBcInJlcG9zaXRvcnlcIjoge1xuICAgIFwidHlwZVwiOiBcImdpdFwiLFxuICAgIFwidXJsXCI6IFwiZ2l0K2h0dHBzOi8vZ2l0aHViLmNvbS92eWFreW1lbmtvL3F2ZXQuZ2l0XCJcbiAgfSxcbiAgXCJrZXl3b3Jkc1wiOiBbXG4gICAgXCJxbGlrdmlld1wiLFxuICAgIFwiZXh0ZW5zaW9uc1wiLFxuICAgIFwiamF2YXNjcmlwdFwiLFxuICAgIFwiZXM2XCJcbiAgXSxcbiAgXCJhdXRob3JcIjogXCJWYWxlbnR5biBZYWt5bWVua28gPHJheWZlc291bEBnbWFpbC5jb20+XCIsXG4gIFwibGljZW5zZVwiOiBcIk1JVFwiLFxuICBcImJ1Z3NcIjoge1xuICAgIFwidXJsXCI6IFwiaHR0cHM6Ly9naXRodWIuY29tL3Z5YWt5bWVua28vcXZldC9pc3N1ZXNcIlxuICB9LFxuICBcImhvbWVwYWdlXCI6IFwiaHR0cHM6Ly9naXRodWIuY29tL3Z5YWt5bWVua28vcXZldCNyZWFkbWVcIixcbiAgXCJkZXZEZXBlbmRlbmNpZXNcIjoge1xuICAgIFwiYmFiZWwtcHJlc2V0LWVzMjAxNVwiOiBcIl42LjYuMFwiLFxuICAgIFwiYmFiZWxpZnlcIjogXCJeNy4zLjBcIixcbiAgICBcImJyb3dzZXJpZnlcIjogXCJeMTMuMS4wXCIsXG4gICAgXCJldmVudC1zdHJlYW1cIjogXCJeMy4zLjRcIixcbiAgICBcImV2ZW50c3RyZWFtXCI6IFwiMC4wLjNcIixcbiAgICBcImd1bHBcIjogXCJeMy45LjFcIixcbiAgICBcImd1bHAtaGVhZGVyXCI6IFwiXjEuOC43XCIsXG4gICAgXCJndWxwLXN0cmVhbWlmeVwiOiBcIl4xLjAuMlwiLFxuICAgIFwiZ3VscC11Z2xpZnlcIjogXCJeMi4wLjBcIixcbiAgICBcImd1bHAtdXRpbFwiOiBcIl4zLjAuN1wiLFxuICAgIFwicnVuLXNlcXVlbmNlXCI6IFwiXjEuMi4yXCIsXG4gICAgXCJ2aW55bC1zb3VyY2Utc3RyZWFtXCI6IFwiXjEuMS4wXCJcbiAgfVxufVxuIiwiaW1wb3J0IHsgUXZldENvcmUgfSBmcm9tICcuL2NvcmUvQ29yZSc7XHJcblxyXG4oZnVuY3Rpb24od2luZG93KXtcclxuXHRpZiAodHlwZW9mIFF2YSA9PT0gJ3VuZGVmaW5lZCdcclxuXHRcdCYmIHR5cGVvZiBqUXVlcnkgPT09ICd1bmRlZmluZWQnXHJcblx0XHQmJiB0eXBlb2YgcXZhID09PSAndW5kZWZpbmVkJ1xyXG5cdCl7XHJcblx0XHRjb25zb2xlLmxvZyhcIkNhbid0IGluaXQgUXZldCBiZWNhdXNlIFF2YS9qUXVlcnkvcXZhIGlzIHVuZGVmaW5lZFwiKVxyXG5cdH1lbHNle1xyXG5cdFx0aWYodHlwZW9mKFF2ZXQpID09PSAndW5kZWZpbmVkJyl7XHJcblx0XHRcdHdpbmRvdy5RdmV0ID0gbmV3IFF2ZXRDb3JlKCk7XHJcblx0XHR9IGVsc2V7XHJcblx0XHRcdGNvbnNvbGUubG9nKFwiUXZldCBhbHJlYWR5IGRlZmluZWQuXCIpO1xyXG5cdFx0fVxyXG5cdH1cclxufSkod2luZG93KTtcclxuIiwiY29uc3QgdmVyc2lvbiA9IHJlcXVpcmUoJy4uLy4uL3BhY2thZ2UuanNvbicpLnZlcnNpb247XHJcblxyXG4vKipcclxuICogTmF0aXZlLlxyXG4gKi9cclxuaW1wb3J0IHtcclxuXHQkQWRkQm9va21hcmssICRSZW1vdmVCb29rbWFyaywgJEVtYWlsQm9va21hcmssXHJcblx0JE5ld1NoZWV0T2JqZWN0LFxyXG5cdCRPcGVuUmVwb3NpdG9yeSxcclxuXHQkU2hvd0ZpZWxkc1xyXG59IGZyb20gJy4vbmF0aXZlL1Rvb2xiYXJBY3Rpb25zX2RlcHJlY2F0ZWQnO1xyXG5cclxuaW1wb3J0IHtcclxuICAkcmVtb3ZlQm9va21hcmssICRhZGRCb29rbWFyayxcclxuICAkb3BlblJlcG9zaXRvcnksICRuZXdTaGVldE9iamVjdCwgJHNob3dGaWVsZHNcclxufSBmcm9tICcuL25hdGl2ZS9pbmRleCc7XHJcblxyXG4vKipcclxuICogQWRkaXRpb24uXHJcbiAqL1xyXG5pbXBvcnQgeyBFbWFpbEJvb2ttYXJrLCBzZWxlY3RMaXN0Qm94VmFsdWVzIH0gZnJvbSAnLi9hZGRpdGlvbi9pbmRleCc7XHJcblxyXG5leHBvcnQgY2xhc3MgUXZldENvcmUge1xyXG5cclxuXHRjb25zdHJ1Y3Rvcigpe1xyXG5cdFx0dGhpcy5uYXRpdmUgPSB7XHJcblx0XHRcdGJvb2ttYXJrczp7XHJcblx0XHRcdFx0JGFkZDogJEFkZEJvb2ttYXJrLFxyXG5cdFx0XHRcdCRyZW1vdmU6ICRSZW1vdmVCb29rbWFyayxcclxuXHRcdFx0XHQkZW1haWw6ICRFbWFpbEJvb2ttYXJrXHJcblx0XHRcdH0sXHJcblx0XHRcdCRvcGVuUmVwb3NpdG9yeTogJE9wZW5SZXBvc2l0b3J5LFxyXG5cdFx0XHQkc2hvd0ZpZWxkczogJFNob3dGaWVsZHMsXHJcblx0XHRcdCRuZXdTaGVldE9iamVjdDogJE5ld1NoZWV0T2JqZWN0XHJcblx0XHR9O1xyXG5cclxuICAgIC8vIG5hdGl2ZVxyXG4gICAgdGhpcy4kYWRkQm9va21hcmsgPSAkYWRkQm9va21hcms7XHJcbiAgICB0aGlzLiRyZW1vdmVCb29rbWFyayA9ICRyZW1vdmVCb29rbWFyaztcclxuICAgIHRoaXMuJG9wZW5SZXBvc2l0b3J5ID0gJG9wZW5SZXBvc2l0b3J5O1xyXG4gICAgdGhpcy4kbmV3U2hlZXRPYmplY3QgPSAkbmV3U2hlZXRPYmplY3Q7XHJcbiAgICB0aGlzLiRzaG93RmllbGRzID0gJHNob3dGaWVsZHM7XHJcblxyXG4gICAgLy8gYWRkaXRpb25cclxuICAgIHRoaXMuc2VsZWN0TGlzdEJveFZhbHVlcyA9IHNlbGVjdExpc3RCb3hWYWx1ZXM7XHJcblx0fVxyXG5cclxuXHJcblx0Z2V0VmVyc2lvbigpe1xyXG5cdFx0Y29uc29sZS5sb2coYFF2ZXQgQ29yZSB2ZXJzaW9uOiAke3ZlcnNpb259YCk7XHJcblx0fVxyXG5cclxuICAvLyBUT0RPOiBEZWJ1ZyBzZW5kRW1haWxCb29rbWFyay5cclxuXHRzZW5kRW1haWxCb29rbWFyayhjb25maWcsIGV4dHJhUGFyYW1zKXtcclxuXHRcdHJldHVybiBuZXcgRW1haWxCb29rbWFyayhjb25maWcsIGV4dHJhUGFyYW1zKS5jcmVhdGVCb29rbWFyaygpLm9wZW5FbWFpbFdpbmRvdygpO1xyXG5cdH1cclxufVxyXG4iLCJpbXBvcnQgeyR0dn0gZnJvbSAnLi4vdXRpbC9VdGlsJztcclxuXHJcbi8qKlxyXG4gKiBFbWFpbCBRbGlrVmlldyBCb29rbWFyay5cclxuICogXHJcbiAqIEBjb25zdHJ1Y3RvclxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIEVtYWlsQm9va21hcmsge1xyXG5cdFxyXG5cdFxyXG5cdC8qKlxyXG5cdCAqICBDb25maWcuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gY29uZmlnIHtvYmplY3R9XHJcblx0ICpcclxuXHQgKiBAcGFyYW0gY29uZmlnLmVtYWlsU3ViamVjdCB7c3RyaW5nfVxyXG5cdCAqIEBwYXJhbSBjb25maWcubmFtZSB7c3RyaW5nfVxyXG5cdCAqIEBwYXJhbSBjb25maWcuc2hhcmVkIHtib29sZWFufVxyXG5cdCAqIEBwYXJhbSBjb25maWcuZXhjbHVkZVNlbGVjdGlvbnMge2Jvb2xlYW59XHJcblx0ICogQHBhcmFtIGNvbmZpZy5pbmNsdWRlU3RhdGUge2Jvb2xlYW59XHJcblx0ICogQHBhcmFtIGNvbmZpZy5ub3REaXNwbGF5ZWQge2Jvb2xlYW59XHJcblx0ICogQHBhcmFtIGNvbmZpZy5kZXNjcmlwdGlvblNob3cge2Jvb2xlYW59XHJcblx0ICogQHBhcmFtIGNvbmZpZy5kZXNjcmlwdGlvbk1zZyB7c3RyaW5nfVxyXG5cdCAqIEBwYXJhbSBjb25maWcuc2F2ZUlucHV0VmFsdWVzIHtib29sZWFufVxyXG5cdCAqXHJcblx0ICogIEV4dHJhIFBhcmFtcy5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBleHRyYVBhcmFtcyB7b2JqZWN0fVxyXG5cdCAqIEBwYXJhbSBleHRyYVBhcmFtcy5leHRyYVVyaSB7c3RyaW5nfVxyXG5cdCAqIEBwYXJhbSBleHRyYVBhcmFtcy5lbWFpbFdpbmRvd01vZGUge2Jvb2xlYW59XHJcblx0ICovXHJcblx0Y29uc3RydWN0b3IoY29uZmlnLCBleHRyYVBhcmFtcykge1xyXG5cdFx0XHJcblx0XHRsZXQgZGVmYXVsdENvbmZpZyA9IHtcclxuXHRcdFx0ZW1haWxTdWJqZWN0OiBcIlwiLFxyXG5cdFx0XHRuYW1lOiBcIkVtYWlsIEJvb2ttYXJrXCIsIC8qKiBOYW1lIG9mIHRoZSBhZGRpdGlvbi4gKi9cclxuXHRcdFx0c2hhcmVkOiB0cnVlLCAvKiogU2hhcmUgdGhlIGFkZGl0aW9uIHdpdGggb3RoZXIgdXNlcnMuICovXHJcblx0XHRcdGV4Y2x1ZGVTZWxlY3Rpb25zOiBmYWxzZSwgLyoqIEV4Y2x1ZGUgdGhlIHNlbGVjdGlvbnMgbWFkZSBpbiB0aGUgYXBwbGljYXRpb24uICovXHJcblx0XHRcdGluY2x1ZGVTdGF0ZTogdHJ1ZSwgLyoqIEluY2x1ZGUgc3RhdGUgb2YgYWxsIG9iamVjdHMuICovXHJcblx0XHRcdG5vdERpc3BsYXllZDogZmFsc2UsIC8qKiBUaGUgYWRkaXRpb24gaXMgbm90IGRpc3BsYXllZCBpbiB0aGUgYWRkaXRpb24gbGlzdCBidXQgaXMgc3RpbGwgc2VsZWN0YWJsZSBpbiBjb2RlIG9yIHZpYSB1cmwuICovXHJcblx0XHRcdGRlc2NyaXB0aW9uU2hvdzogZmFsc2UsIC8qKiBUaGUgYWRkaXRpb24gZGVzY3JpcHRpb24gd2lsbCBiZSBzaG93biBpbiBhIG1lc3NhZ2Ugd2hlbiB0aGUgYWRkaXRpb24gaXMgc2VsZWN0ZWQuICovXHJcblx0XHRcdGRlc2NyaXB0aW9uTXNnOiBcIlwiLCAvKiogRGVzY3JpcHRpb24gb2YgdGhlIGFkZGl0aW9uLiAqL1xyXG5cdFx0XHRzYXZlSW5wdXRWYWx1ZXM6IHRydWUgLyoqIEluY2x1ZGUgdmFsdWVzIGluIGlucHV0IGZpZWxkcy4qL1xyXG5cdFx0fTtcclxuXHRcclxuXHRcdHRoaXMuZGVmYXVsUXZBanhaZmMgPSAnL1F2QUpBWFpmYy9vcGVuZG9jLmh0bT9kb2N1bWVudD0nO1xyXG5cdFx0XHJcblx0XHQvKiogVGhlIGFkZGl0aW9uIGlzIGFwcGxpZWQgb24gdG9wIG9mIGFueSBwcmV2aW91cyBzZWxlY3Rpb25zIChubyBjbGVhcikuKi9cclxuXHRcdHRoaXMuYXBwbGllZCA9IHRydWU7XHJcblx0XHR0aGlzLmRvYyA9IFF2LkdldEN1cnJlbnREb2N1bWVudCgpO1xyXG5cdFx0dGhpcy5ib29rbWFya0lkID0gJyc7XHJcblx0XHRcclxuXHRcclxuXHRcdC8qKlxyXG5cdFx0ICogSW1wb3J0YW50IHBhcmFtcy5cclxuXHRcdCAqIEB0eXBlIHsqfHN0cmluZ31cclxuXHRcdCAqL1xyXG5cdFx0aWYgKCR0dihjb25maWcsICdvYmplY3QnKSl7XHJcblx0XHRcdHRoaXMuZW1haWxTdWJqZWN0ID0gY29uZmlnLmVtYWlsU3ViamVjdCB8fCBkZWZhdWx0Q29uZmlnLmVtYWlsU3ViamVjdDtcclxuXHRcdFx0dGhpcy5uYW1lID0gY29uZmlnLm5hbWUgfHwgZGVmYXVsdENvbmZpZy5uYW1lO1xyXG5cdFx0XHR0aGlzLnNoYXJlZCA9IGNvbmZpZy5zaGFyZWQgfHwgZGVmYXVsdENvbmZpZy5zaGFyZWQ7XHJcblx0XHRcdHRoaXMuZXhjbHVkZVNlbGVjdGlvbnMgPSBjb25maWcuZXhjbHVkZVNlbGVjdGlvbnMgfHwgZGVmYXVsdENvbmZpZy5leGNsdWRlU2VsZWN0aW9ucztcclxuXHRcdFx0dGhpcy5pbmNsdWRlU3RhdGUgPSBjb25maWcuaW5jbHVkZVN0YXRlIHx8IGRlZmF1bHRDb25maWcuaW5jbHVkZVN0YXRlO1xyXG5cdFx0XHR0aGlzLm5vdERpc3BsYXllZCA9IGNvbmZpZy5ub3REaXNwbGF5ZWQgfHwgZGVmYXVsdENvbmZpZy5ub3REaXNwbGF5ZWQ7XHJcblx0XHRcdHRoaXMuZGVzY3JpcHRpb25TaG93ID0gY29uZmlnLmRlc2NyaXB0aW9uU2hvdyB8fCBkZWZhdWx0Q29uZmlnLmRlc2NyaXB0aW9uU2hvdztcclxuXHRcdFx0dGhpcy5kZXNjcmlwdGlvbk1zZyA9IGNvbmZpZy5kZXNjcmlwdGlvbk1zZyB8fCBkZWZhdWx0Q29uZmlnLmRlc2NyaXB0aW9uTXNnO1xyXG5cdFx0XHR0aGlzLnNhdmVJbnB1dFZhbHVlcyA9IGNvbmZpZy5zYXZlSW5wdXRWYWx1ZXMgfHwgZGVmYXVsdENvbmZpZy5zYXZlSW5wdXRWYWx1ZXM7XHJcblx0XHR9ZWxzZXtcclxuXHRcdFx0Zm9yIChsZXQga2V5IGluIGRlZmF1bHRDb25maWcpe1xyXG5cdFx0XHRcdGlmIChkZWZhdWx0Q29uZmlnLmhhc093blByb3BlcnR5KGtleSkpXHJcblx0XHRcdFx0XHR0aGlzW2tleV0gPSBkZWZhdWx0Q29uZmlnW2tleV07XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcclxuXHRcdC8qKlxyXG5cdFx0ICogRXh0cmEgcGFyYW1zLlxyXG5cdFx0ICpcclxuXHRcdCAqIEBwYXJhbSBleHRyYVVyaSB7c3RyaW5nfSBVc2UgaXQgZm9yIGFkZCBwYXJlbnQgdXJsIHRvIHlvdXIgUWxpa1ZpZXcgQVNQLk5FVCBjbGllbnQuIFRPRE86IEluIERldmVsb3BtZW50LlxyXG5cdFx0ICogQHBhcmFtIGVtYWlsV2luZG93TW9kZSB7Ym9vbGVhbn0gQnkgZGVmYXVsdCBhZGRpdGlvbiB3aWxsIG9wZW4gZW1haWwgaW4gbmV3IHdpbmRvdyxcclxuXHRcdCAqIGJ1dCB5b3UgY2FuIGNoYW5nZSBpdCB0byB7ZmFsc2V9IGFuZCBlbWFpbCB3aW5kb3cgd2lsbCBiZSBvcGVuZWQgb24gc2FtZSBkb21haW4uXHJcblx0XHQgKi9cclxuXHRcdGlmICgkdHYoZXh0cmFQYXJhbXMsICdvYmplY3QnKSl7XHJcblx0XHRcdHRoaXMuZXh0cmFVcmkgPSBleHRyYVBhcmFtcy5leHRyYVVyaSB8fCAnJztcclxuXHRcdFx0dGhpcy5lbWFpbFdpbmRvd01vZGUgPSBleHRyYVBhcmFtcy5lbWFpbFdpbmRvd01vZGUgfHwgdHJ1ZTtcclxuXHRcdH1lbHNle1xyXG5cdFx0XHR0aGlzLmV4dHJhVXJpID0gJyc7XHJcblx0XHRcdHRoaXMuZW1haWxXaW5kb3dNb2RlID0gdHJ1ZTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cclxuXHQvKipcclxuXHQgKiBVc2UgbmF0aXZlIEJvb2ttYXJrcyBDbGFzc1xyXG5cdCAqIGZvciBjcmVhdGUgYWRkaXRpb24gYmVmb3JlIGVtYWlsIGl0LlxyXG5cdCAqXHJcblx0ICogQGV4dGVuZHMge31cclxuXHQgKi9cclxuXHRjcmVhdGVCb29rbWFyaygpe1xyXG5cclxuXHRcdHRoaXMuZG9jXHJcblx0XHRcdC5Cb29rbWFya3MoKVxyXG5cdFx0XHQuTmV3Qm9va21hcmsoXHJcblx0XHRcdFx0dGhpcy5uYW1lLFxyXG5cdFx0XHRcdHRoaXMuYXBwbGllZCxcclxuXHRcdFx0XHR0aGlzLnNoYXJlZCxcclxuXHRcdFx0XHR0aGlzLmV4Y2x1ZGVTZWxlY3Rpb25zLFxyXG5cdFx0XHRcdHRoaXMuaW5jbHVkZVN0YXRlLFxyXG5cdFx0XHRcdHRoaXMubm90RGlzcGxheWVkLFxyXG5cdFx0XHRcdHRoaXMuZGVzY3JpcHRpb25TaG93LFxyXG5cdFx0XHRcdHRoaXMuZGVzY3JpcHRpb25Nc2csXHJcblx0XHRcdFx0dGhpcy5zYXZlSW5wdXRWYWx1ZXNcclxuXHRcdFx0KTtcclxuXHJcblx0XHR0aGlzLmJvb2ttYXJrSWQgPSB0aGlzLmRvYy5Cb29rbWFya3MoKS5Cb29rTWFya3NbdGhpcy5kb2MuQm9va21hcmtzKCkuQm9va01hcmtzLmxlbmd0aC0xXS52YWx1ZTtcclxuXHRcdFxyXG5cdFx0cmV0dXJuIHRoaXM7XHJcblx0fTtcclxuXHJcblx0b3BlbkVtYWlsV2luZG93KCl7XHJcblx0XHRcclxuXHRcdGxldCB1cmkgPSB0aGlzLmV4dHJhVXJpICtcclxuXHRcdFx0d2luZG93LmxvY2F0aW9uLm9yaWdpbiArXHJcblx0XHRcdHRoaXMuZGVmYXVsUXZBanhaZmMgK1xyXG5cdFx0XHR0aGlzLmRvYy5iaW5kZXIuVmlldyArXHJcblx0XHRcdCcmYWRkaXRpb249JytcclxuXHRcdFx0dGhpcy5ib29rbWFya0lkO1xyXG5cdFx0XHJcblx0XHRsZXQgdXJpX2VuYyA9IGVuY29kZVVSSUNvbXBvbmVudCh1cmkpLnJlcGxhY2UoLyUyMC9nLCBcIiUyNTIwXCIpLFxyXG5cdFx0XHRtYWlsZXIgPSAnbWFpbHRvOj9zdWJqZWN0PScrdGhpcy5lbWFpbFN1YmplY3QrJyZib2R5PScrdXJpX2VuYztcclxuXHJcblx0XHR0aGlzLmVtYWlsV2luZG93TW9kZSA/IHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gbWFpbGVyIDogbG9jYXRpb24uaHJlZiA9IG1haWxlcjtcclxuXHRcdFxyXG5cdFx0cmV0dXJuIHRoaXM7XHJcblx0fVxyXG59IiwiLyoqXHJcbiAqIEBuYW1lIHNlbGVjdExpc3RCb3hWYWx1ZXNcclxuICogUmVjdXJzaXZlIHNlbGVjdGlvbiB2YWx1ZXMgaW4gbGlzdEJveC5cclxuICpcclxuICogQG5vdGUgV29ya3Mgb25seSB3aXRoIGF2YWlsYWJsZSBsaXN0Qm94ZXMuXHJcbiAqXHJcbiAqIEBwYXJhbSBsaXN0Qm94QXJyYXkge0FycmF5fSAtIGFycmF5IG9mIGxpc3RCb3hlcyBhbmQgdmFsdWVzLlxyXG4gKiBAcGFyYW0gaW5kZXgge251bWJlcn0gLSBzdGFydGVyIGluZGV4IGZvciBzZWxlY3Rpb25zLlxyXG4gKiBAcGFyYW0gY2Ige2Z1bmN0aW9ufSAtIGNhbGxiYWNrIGFmdGVyIGFsbCB2YWxlcyB3aWxsIGJlIHNlbGVjdGVkLlxyXG4gKlxyXG4gKiBAcmV0dXJuIHt2b2lkfGZ1bmN0aW9ufVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHNlbGVjdExpc3RCb3hWYWx1ZXMgKGxpc3RCb3hBcnJheSwgaW5kZXgsIGNiKSB7XHJcbiAgaWYgKGluZGV4IDwgbGlzdEJveEFycmF5Lmxlbmd0aCl7XHJcbiAgICBpZiAobGlzdEJveEFycmF5W2luZGV4XS5saXN0Ym94X25hbWUgIT0gbnVsbCl7XHJcbiAgICAgIHF2YS5HZXRRdk9iamVjdChsaXN0Qm94QXJyYXlbaW5kZXhdLmxpc3Rib3hfbmFtZSxcclxuICAgICAgICBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICB0aGlzLmNhbGxiYWNrRm4gPSBmdW5jdGlvbiAoKSB7fTtcclxuICAgICAgICAgIHRoaXMuRGF0YS5TZWxlY3RUZXh0cyhsaXN0Qm94QXJyYXlbaW5kZXhdLmRlc2NfdmFsdWUpO1xyXG4gICAgICAgICAgaW5kZXggKys7XHJcbiAgICAgICAgICBzZWxlY3RMaXN0Qm94VmFsdWVzKGxpc3RCb3hBcnJheSwgaW5kZXgsIGNiKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIHRoaXMpO1xyXG4gICAgfWVsc2V7XHJcbiAgICAgIGluZGV4ICsrO1xyXG4gICAgICBzZWxlY3RMaXN0Qm94VmFsdWVzKGxpc3RCb3hBcnJheSwgaW5kZXgsIGNiKTtcclxuICAgIH1cclxuICB9ZWxzZSBpZiAoaW5kZXggPT09IGxpc3RCb3hBcnJheS5sZW5ndGgpe1xyXG4gICAgaWYgKHR5cGVvZiBjYiA9PT0gYGZ1bmN0aW9uYClcclxuICAgICAgcmV0dXJuIGNiKCk7XHJcbiAgfVxyXG59XHJcbiIsImV4cG9ydCAqIGZyb20gJy4vRW1haWxCb29rbWFyayc7XHJcbmV4cG9ydCAqIGZyb20gJy4vTGlzdGJveEFjdGlvbnMnO1xyXG4iLCIvKipcclxuICogQG5hbWUgJGNhbGxDbGllbnRBY3Rpb24ge2Z1bmN0aW9ufVxyXG4gKiBAbm90ZSBPcGVuIGNsaWVudCBhY3Rpb24gbW9kYWwgZm9yIHJlbW92ZSBvciBhZGQgYm9va21hcmsuXHJcbiAqXHJcbiAqIEBwYXJhbSBhY3Rpb25OYW1lIHtzdHJpbmd9IC0gQWN0aW9uIG5hbWUgYEFEREJNYCBvciBgUkVNQk1gLlxyXG4gKiBAcGFyYW0gcGFyYW1OYW1lIHtzdHJpbmd9IC0gUGFyYW0gbmFtZSBgYm1gIG9yIGByZW1ibWAuXHJcbiAqXHJcbiAqIEByZXR1cm4ge2Z1bmN0aW9ufVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uICRjYWxsQ2xpZW50QWN0aW9uIChhY3Rpb25OYW1lLCBwYXJhbU5hbWUpIHtcclxuICByZXR1cm4gUXZhLkNvbnRleHRDbGllbnRBY3Rpb24oe1xyXG4gICAgY2xpZW50QWN0aW9uOiBgbW9kYWxgLFxyXG4gICAgcGFyYW06IHBhcmFtTmFtZS50b0xvd2VyQ2FzZSgpLFxyXG4gICAgbmFtZTogYWN0aW9uTmFtZS50b1VwcGVyQ2FzZSgpLFxyXG4gICAgYmluZGVyOiBRdi5HZXRDdXJyZW50RG9jdW1lbnQoKS5iaW5kZXJcclxuICB9KTtcclxufVxyXG5cclxuLyoqXHJcbiAqIEBuYW1lICRyZW1vdmVCb29rbWFyayB7ZnVuY3Rpb259XHJcbiAqIEBub3RlIE9wZW4gcmVtb3ZlIGJvb2ttYXJrIG1vZGFsIHdpbmRvdy5cclxuICpcclxuICogQHJldHVybiB7dm9pZH1cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiAkcmVtb3ZlQm9va21hcmsgKCkge1xyXG4gICRjYWxsQ2xpZW50QWN0aW9uKGBSRU1CTWAsIGByZW1vdmVibWApO1xyXG59XHJcblxyXG4vKipcclxuICogQG5hbWUgJGFkZEJvb2ttYXJrIHtmdW5jdGlvbn1cclxuICogQG5vdGUgT3BlbiBhZGQgYm9va21hcmsgbW9kYWwgd2luZG93LlxyXG4gKlxyXG4gKiBAcmV0dXJuIHt2b2lkfVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uICRhZGRCb29rbWFyayAoKSB7XHJcbiAgJGNhbGxDbGllbnRBY3Rpb24oYEFEREJNYCwgYGJtYCk7XHJcbn1cclxuIiwiLyoqXHJcbiAqIEBuYW1lICRjYWxsU3BlY2lhbFN0YW5kYXJkQWN0aW9uIHtmdW5jdGlvbn1cclxuICogQG5vdGUgQ2FsbCBzcGVjaWFsIHN0YW5kYXJkIGFjdGlvbiBmb3Igb3BlbiByZXBvc2l0b3J5LFxyXG4gKiAgY3JlYXRlIG5ldyBzaGVldCBvYmplY3Qgb3Igc2hvdyBmaWVsZHMuXHJcbiAqXHJcbiAqIEBwYXJhbSBhY3Rpb25OYW1lIHtzdHJpbmd9IC0gQWN0aW9uIG5hbWUgZGVwZW5kIG9uIGBRdmEuTWdyLm1lbnUuc3BlY2lhbEFjdGlvbnNgLlxyXG4gKlxyXG4gKiBAcmV0dXJuIHtmdW5jdGlvbn1cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiAkY2FsbFNwZWNpYWxTdGFuZGFyZEFjdGlvbihhY3Rpb25OYW1lKSB7XHJcbiAgcmV0dXJuIFF2LkdldEN1cnJlbnREb2N1bWVudCgpLmJpbmRlci5TaW1wbGVDYWxsKFxyXG4gICAgYHNldGAsXHJcbiAgICBgRG9jdW1lbnQuU3RhbmRhcmRBY3Rpb25zLiR7YWN0aW9uTmFtZS50b1VwcGVyQ2FzZSgpfWAsXHJcbiAgICBudWxsLFxyXG4gICAge1xyXG4gICAgICBhY3Rpb246IGBgXHJcbiAgICB9KTtcclxufVxyXG5cclxuLyoqXHJcbiAqIEBuYW1lICRvcGVuUmVwb3NpdG9yeSB7ZnVuY3Rpb259XHJcbiAqIEBub3RlIE9wZW4gcmVwb3NpdG9yeSBtb2RhbCB3aW5kb3cuXHJcbiAqXHJcbiAqIEByZXR1cm4ge3ZvaWR9XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gJG9wZW5SZXBvc2l0b3J5KCkge1xyXG4gICRjYWxsU3BlY2lhbFN0YW5kYXJkQWN0aW9uKGByZXBvc2l0b3J5YCk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBAbmFtZSAkb3Blbk5ld1NoZWV0T2JqZWN0IHtmdW5jdGlvbn1cclxuICogQG5vdGUgT3BlbiBuZXcgc2hlZXQgb2JqZWN0IG1vZGFsIHdpbmRvdy5cclxuICpcclxuICogQHJldHVybiB7dm9pZH1cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiAkbmV3U2hlZXRPYmplY3QoKSB7XHJcbiAgJGNhbGxTcGVjaWFsU3RhbmRhcmRBY3Rpb24oYG5ld1NoZWV0T2JqYCk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBAbmFtZSAkb3BlblNob3dGaWVsZHMge2Z1bmN0aW9ufVxyXG4gKiBAbm90ZSBPcGVuIHNob3cgZmllbGRzIG1vZGFsIHdpbmRvdy5cclxuICpcclxuICogQHJldHVybiB7dm9pZH1cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiAkc2hvd0ZpZWxkcygpIHtcclxuICAkY2FsbFNwZWNpYWxTdGFuZGFyZEFjdGlvbihgc2hvd0ZpZWxkc2ApO1xyXG59XHJcbiIsIi8qKlxyXG4gKiBAbm90ZSBBbGwgYWN0aW9ucyB3aXRoIGF2YWlsYWJsZSBUb29sQmFyLlxyXG4gKiBAZGVwcmVjYXRlZCAxLjAuMVxyXG4gKlxyXG4gKiBgJCgnI1F2QWpheFRvb2xiYXInKTtgXHJcbiAqL1xyXG5cclxuaW1wb3J0IHsgJFF2YVRvb2xiYXJBY3Rpb24gfSBmcm9tICcuLi91dGlsL1V0aWwnO1xyXG5cclxuLyoqXHJcbiAqIEBuYW1lICRBZGRCb29rbWFyayB7ZnVuY3Rpb259XHJcbiAqIEBkZXByZWNhdGVkIDEuMC4xXHJcbiAqXHJcbiAqIEBub3RlIE9wZW4gbmF0aXZlIEFkZCBCb29rbWFyayBtb2RhbC5cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiAkQWRkQm9va21hcmsoKSB7XHJcblx0JFF2YVRvb2xiYXJBY3Rpb24oJ0FEREJNJyk7XHJcbiAgY29uc29sZS5sb2coYFF2ZXQ6ICduYXRpdmUuYm9va21hcmtzLiRhZGQnIGlzIGRlcHJlY2F0ZWQgYW5kIHdpbGwgYmUgcmVtb3ZlZCBpbiAxLjEuMC4gVXNlICdRdmV0LiRhZGRCb29rbWFyaycuYClcclxufVxyXG5cclxuLyoqXHJcbiAqIEBuYW1lICRTaG93RmllbGRzIHtmdW5jdGlvbn1cclxuICogQGRlcHJlY2F0ZWQgMS4wLjFcclxuICogQG5vdGUgT3BlbiBuYXRpdmUgUmVtb3ZlIEJvb2ttYXJrIG1vZGFsLlxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uICRSZW1vdmVCb29rbWFyaygpIHtcclxuXHQkUXZhVG9vbGJhckFjdGlvbignUkVNQk0nKTtcclxuICBjb25zb2xlLmxvZyhgUXZldDogJ1F2ZXQubmF0aXZlLmJvb2ttYXJrcy4kcmVtb3ZlJyBpcyBkZXByZWNhdGVkIGFuZCB3aWxsIGJlIHJlbW92ZWQgaW4gMS4xLjAuIFVzZSAnUXZldC4kcmVtb3ZlQm9va21hcmsnLmApXHJcbn1cclxuXHJcbi8qKlxyXG4gKiBAbmFtZSAkRW1haWxCb29rbWFyayB7ZnVuY3Rpb259XHJcbiAqIEBkZXByZWNhdGVkIDEuMC4xXHJcbiAqIEBub3RlIE9wZW4gbmF0aXZlIEVtYWlsQXNMaW5rIEJvb2ttYXJrIG1vZGFsLlxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uICRFbWFpbEJvb2ttYXJrKCkge1xyXG5cdCRRdmFUb29sYmFyQWN0aW9uKCdNQUlMQVNMSU5LJyk7XHJcbiAgY29uc29sZS5sb2coYFF2ZXQ6ICdRdmV0Lm5hdGl2ZS5ib29rbWFya3MuJEVtYWlsQm9va21hcmsnIGlzIGRlcHJlY2F0ZWQgYW5kIHdpbGwgYmUgcmVtb3ZlZCBpbiAxLjEuMGApXHJcbn1cclxuXHJcbi8qKlxyXG4gKiBAbmFtZSAkT3BlblJlcG9zaXRvcnlcclxuICogQGRlcHJlY2F0ZWQgMS4wLjFcclxuICogQG5vdGUgT3BlbiBuYXRpdmUgUmVwb3NpdG9yeSBtb2RhbC5cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiAkT3BlblJlcG9zaXRvcnkoKSB7XHJcbiAgJFF2YVRvb2xiYXJBY3Rpb24oJ1JFUE9TSVRPUlknKTtcclxuICBjb25zb2xlLmxvZyhgUXZldDogJ1F2ZXQubmF0aXZlLiRvcGVuUmVwb3NpdG9yeScgaXMgZGVwcmVjYXRlZCBhbmQgd2lsbCBiZSByZW1vdmVkIGluIDEuMS4wLiBVc2UgJ1F2ZXQuJG9wZW5SZXBvc2l0b3J5Jy5gKVxyXG59XHJcblxyXG4vKipcclxuICogQG5hbWUgJE5ld1NoZWV0T2JqZWN0IHtmdW5jdGlvbn1cclxuICogQGRlcHJlY2F0ZWQgMS4wLjFcclxuICogQG5vdGUgT3BlbiBuYXRpdmUgTmV3U2hlZXQgT2JqZWN0IG1vZGFsLlxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uICROZXdTaGVldE9iamVjdCgpIHtcclxuXHQkUXZhVG9vbGJhckFjdGlvbignTkVXU0hFRVRPQkonKTtcclxuICBjb25zb2xlLmxvZyhgUXZldDogJ1F2ZXQubmF0aXZlLmJvb2ttYXJrcy4kcmVtb3ZlJyBpcyBkZXByZWNhdGVkIGFuZCB3aWxsIGJlIHJlbW92ZWQgaW4gMS4xLjAuIFVzZSAnUXZldC4kbmV3U2hlZXRPYmplY3QnLmApXHJcbn1cclxuXHJcbi8qKlxyXG4gKiBAbmFtZSAkU2hvd0ZpZWxkc1xyXG4gKiBAZGVwcmVjYXRlZCAxLjAuMVxyXG4gKiBAbm90ZSBPcGVuIG5hdGl2ZSBTaG93RmllbGRzIG1vZGFsLlxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uICRTaG93RmllbGRzKCkge1xyXG5cdCRRdmFUb29sYmFyQWN0aW9uKCdTSE9XRklFTERTJyk7XHJcbiAgY29uc29sZS5sb2coYFF2ZXQ6ICdRdmV0Lm5hdGl2ZS5ib29rbWFya3MuJHJlbW92ZScgaXMgZGVwcmVjYXRlZCBhbmQgd2lsbCBiZSByZW1vdmVkIGluIDEuMS4wLiBVc2UgJ1F2ZXQuJHNob3dGaWVsZHMnLmApXHJcbn1cclxuIiwiZXhwb3J0ICogZnJvbSAnLi9DbGllbnRBY3Rpb25zJztcclxuZXhwb3J0ICogZnJvbSAnLi9TcGVjaWFsU3RhbmRhcmRBY3Rpb25zJztcclxuIiwiLyoqXHJcbiAqIFR5cGUgVmFsaWRhdG9yXHJcbiAqIFxyXG4gKiBAcGFyYW0gdmFyaWFibGUge29iamVjdHxib29sZWFufHN0cmluZ3xudW1iZXJ8ZnVuY3Rpb259XHJcbiAqIEBwYXJhbSB0eXBlIHtzdHJpbmd9XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gJHR2KHZhcmlhYmxlLCB0eXBlKXtcclxuXHRyZXR1cm4gdHlwZW9mIHZhcmlhYmxlID09PSB0eXBlO1xyXG59XHJcblxyXG4vKipcclxuICogUXZhRG9BY3Rpb25cclxuICogXHJcbiAqIEBkZXBlbmRlbmNpZXMge1F2YX1cclxuICogQHBhcmFtIGFjdGlvbl9uYW1lIHtzdHJpbmd9IC0gQWN0aW9uIE5hbWUsIGRlcGVuZCBvbiBRdmEuY3JlYXRlT3B0aW9ucy5cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiAkUXZhVG9vbGJhckFjdGlvbihhY3Rpb25fbmFtZSkge1xyXG5cdFxyXG5cdFF2YS5NZ3IubWVudS5kb0FjdGlvbih7XHJcblx0XHR0YXJnZXQ6ICcuY3R4LW1lbnUtYWN0aW9uLScrYWN0aW9uX25hbWVcclxuXHR9KTtcclxufSJdfQ==
