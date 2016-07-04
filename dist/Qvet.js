/**
 * Qvet - QlikView Extension Trickster
 * 
 * @version v1.0.1
 * @author Valentyn Yakymenko <rayfesoul@gmail.com>
 * @license MIT
 */(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports={
  "name": "qvet",
  "version": "1.0.1",
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
    "browserify": "^13.0.1",
    "event-stream": "^3.3.3",
    "eventstream": "0.0.3",
    "gulp": "^3.9.1",
    "gulp-header": "^1.8.7",
    "gulp-streamify": "^1.0.2",
    "gulp-uglify": "^1.5.4",
    "gulp-util": "^3.0.7",
    "run-sequence": "^1.2.2",
    "vinyl-source-stream": "^1.1.0"
  }
}

},{}],2:[function(require,module,exports){
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

},{"../../package.json":1,"./addition/index":5,"./native/ToolbarActions_deprecated":8,"./native/index":9}],3:[function(require,module,exports){
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

},{"../util/Util":10}],4:[function(require,module,exports){
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

},{}],5:[function(require,module,exports){
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

},{"./EmailBookmark":3,"./ListboxActions":4}],6:[function(require,module,exports){
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

},{}],7:[function(require,module,exports){
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

},{}],8:[function(require,module,exports){
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

},{"../util/Util":10}],9:[function(require,module,exports){
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

},{"./ClientActions":6,"./SpecialStandardActions":7}],10:[function(require,module,exports){
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

},{}],11:[function(require,module,exports){
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

},{"./core/Core":2}]},{},[11])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJwYWNrYWdlLmpzb24iLCJzcmNcXGNvcmVcXENvcmUuanMiLCJzcmNcXGNvcmVcXGFkZGl0aW9uXFxFbWFpbEJvb2ttYXJrLmpzIiwic3JjXFxjb3JlXFxhZGRpdGlvblxcTGlzdGJveEFjdGlvbnMuanMiLCJzcmNcXGNvcmVcXGFkZGl0aW9uXFxpbmRleC5qcyIsInNyY1xcY29yZVxcbmF0aXZlXFxDbGllbnRBY3Rpb25zLmpzIiwic3JjXFxjb3JlXFxuYXRpdmVcXFNwZWNpYWxTdGFuZGFyZEFjdGlvbnMuanMiLCJzcmNcXGNvcmVcXG5hdGl2ZVxcVG9vbGJhckFjdGlvbnNfZGVwcmVjYXRlZC5qcyIsInNyY1xcY29yZVxcbmF0aXZlXFxpbmRleC5qcyIsInNyY1xcY29yZVxcdXRpbFxcVXRpbC5qcyIsInNyY1xcUXZldC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7OztBQzNDQSxBQUNDLEFBQWMsQUFBaUIsQUFDL0IsQUFDQSxBQUNBLEFBQ007O0FBRVAsQUFDRSxBQUFpQixBQUNqQixBQUFpQixBQUFpQixBQUM3Qjs7QUFLUCxBQUFTLEFBQWUsQUFBMkIsQUFFbkQsQUFBTzs7OztBQXRCUCxJQUFNLFVBQVUsUUFBQSxBQUFRLHNCQUF4QixBQUE4Qzs7Ozs7Ozs7Ozs7SUFzQnZDLEFBQU0sQUFBUyxBQUVyQjs7QUFB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QUMzQjtBQVFEOzs7Ozs7OztBQUFPLDJCQUFBLEFBQTJCLGFBQWEsQUFFOUM7O01BQUEsQUFBSSxJQUFKLEFBQVEsS0FBUixBQUFhO1lBQ0osc0JBRFQsQUFBc0IsQUFDTyxBQUU3QjtBQUhzQixBQUNyQjs7Ozs7O0FDbkJGLEFBQVMsQUFBZ0I7O0FBRXpCLENBQUMsVUFBQSxBQUFTLFFBQU8sQUFDaEI7S0FBSSxPQUFBLEFBQU8sUUFBUCxBQUFlLGVBQ2YsT0FBQSxBQUFPLFdBRFAsQUFDa0IsZUFDbEIsT0FBQSxBQUFPLFFBRlgsQUFFbUIsYUFDbEIsQUFDQTtVQUFBLEFBQVEsSUFBUixBQUFZLEFBQ1o7QUFMRCxRQUtLLEFBQ0o7TUFBRyxPQUFBLEFBQU8sU0FBVixBQUFvQixhQUFZLEFBQy9CO1VBQUEsQUFBTyxPQUFQLEFBQWMsQUFBSSxBQUNsQjtBQUZELFNBRU0sQUFDTDtXQUFBLEFBQVEsSUFBUixBQUFZLEFBQ1o7QUFDRDtBQUNEO0FBYkQsR0FBQSxBQWFHIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIm1vZHVsZS5leHBvcnRzPXtcbiAgXCJuYW1lXCI6IFwicXZldFwiLFxuICBcInZlcnNpb25cIjogXCIxLjAuMVwiLFxuICBcImRlc2NyaXB0aW9uXCI6IFwiUWxpa1ZpZXcgRXh0ZW5zaW9uIFRyaWNrc3RlclwiLFxuICBcIm1haW5cIjogXCJndWxwZmlsZS5qc1wiLFxuICBcImJyb3dzZXJpZnlcIjoge1xuICAgIFwidHJhbnNmb3JtXCI6IFtcbiAgICAgIFtcbiAgICAgICAgXCJiYWJlbGlmeVwiLFxuICAgICAgICB7XG4gICAgICAgICAgXCJwcmVzZXRzXCI6IFtcbiAgICAgICAgICAgIFwiZXMyMDE1XCJcbiAgICAgICAgICBdXG4gICAgICAgIH1cbiAgICAgIF1cbiAgICBdXG4gIH0sXG4gIFwicmVwb3NpdG9yeVwiOiB7XG4gICAgXCJ0eXBlXCI6IFwiZ2l0XCIsXG4gICAgXCJ1cmxcIjogXCJnaXQraHR0cHM6Ly9naXRodWIuY29tL3Z5YWt5bWVua28vcXZldC5naXRcIlxuICB9LFxuICBcImtleXdvcmRzXCI6IFtcbiAgICBcInFsaWt2aWV3XCIsXG4gICAgXCJleHRlbnNpb25zXCIsXG4gICAgXCJqYXZhc2NyaXB0XCIsXG4gICAgXCJlczZcIlxuICBdLFxuICBcImF1dGhvclwiOiBcIlZhbGVudHluIFlha3ltZW5rbyA8cmF5ZmVzb3VsQGdtYWlsLmNvbT5cIixcbiAgXCJsaWNlbnNlXCI6IFwiTUlUXCIsXG4gIFwiYnVnc1wiOiB7XG4gICAgXCJ1cmxcIjogXCJodHRwczovL2dpdGh1Yi5jb20vdnlha3ltZW5rby9xdmV0L2lzc3Vlc1wiXG4gIH0sXG4gIFwiaG9tZXBhZ2VcIjogXCJodHRwczovL2dpdGh1Yi5jb20vdnlha3ltZW5rby9xdmV0I3JlYWRtZVwiLFxuICBcImRldkRlcGVuZGVuY2llc1wiOiB7XG4gICAgXCJiYWJlbC1wcmVzZXQtZXMyMDE1XCI6IFwiXjYuNi4wXCIsXG4gICAgXCJiYWJlbGlmeVwiOiBcIl43LjMuMFwiLFxuICAgIFwiYnJvd3NlcmlmeVwiOiBcIl4xMy4wLjFcIixcbiAgICBcImV2ZW50LXN0cmVhbVwiOiBcIl4zLjMuM1wiLFxuICAgIFwiZXZlbnRzdHJlYW1cIjogXCIwLjAuM1wiLFxuICAgIFwiZ3VscFwiOiBcIl4zLjkuMVwiLFxuICAgIFwiZ3VscC1oZWFkZXJcIjogXCJeMS44LjdcIixcbiAgICBcImd1bHAtc3RyZWFtaWZ5XCI6IFwiXjEuMC4yXCIsXG4gICAgXCJndWxwLXVnbGlmeVwiOiBcIl4xLjUuNFwiLFxuICAgIFwiZ3VscC11dGlsXCI6IFwiXjMuMC43XCIsXG4gICAgXCJydW4tc2VxdWVuY2VcIjogXCJeMS4yLjJcIixcbiAgICBcInZpbnlsLXNvdXJjZS1zdHJlYW1cIjogXCJeMS4xLjBcIlxuICB9XG59XG4iLCJjb25zdCB2ZXJzaW9uID0gcmVxdWlyZSgnLi4vLi4vcGFja2FnZS5qc29uJykudmVyc2lvbjtcblxuLyoqXG4gKiBOYXRpdmUuXG4gKi9cbmltcG9ydCB7XG5cdCRBZGRCb29rbWFyaywgJFJlbW92ZUJvb2ttYXJrLCAkRW1haWxCb29rbWFyayxcblx0JE5ld1NoZWV0T2JqZWN0LFxuXHQkT3BlblJlcG9zaXRvcnksXG5cdCRTaG93RmllbGRzXG59IGZyb20gJy4vbmF0aXZlL1Rvb2xiYXJBY3Rpb25zX2RlcHJlY2F0ZWQnO1xuXG5pbXBvcnQge1xuICAkcmVtb3ZlQm9va21hcmssICRhZGRCb29rbWFyayxcbiAgJG9wZW5SZXBvc2l0b3J5LCAkbmV3U2hlZXRPYmplY3QsICRzaG93RmllbGRzXG59IGZyb20gJy4vbmF0aXZlL2luZGV4JztcblxuLyoqXG4gKiBBZGRpdGlvbi5cbiAqL1xuaW1wb3J0IHsgRW1haWxCb29rbWFyaywgc2VsZWN0TGlzdEJveFZhbHVlcyB9IGZyb20gJy4vYWRkaXRpb24vaW5kZXgnO1xuXG5leHBvcnQgY2xhc3MgUXZldENvcmUge1xuXG5cdGNvbnN0cnVjdG9yKCl7XG5cdFx0dGhpcy5uYXRpdmUgPSB7XG5cdFx0XHRib29rbWFya3M6e1xuXHRcdFx0XHQkYWRkOiAkQWRkQm9va21hcmssXG5cdFx0XHRcdCRyZW1vdmU6ICRSZW1vdmVCb29rbWFyayxcblx0XHRcdFx0JGVtYWlsOiAkRW1haWxCb29rbWFya1xuXHRcdFx0fSxcblx0XHRcdCRvcGVuUmVwb3NpdG9yeTogJE9wZW5SZXBvc2l0b3J5LFxuXHRcdFx0JHNob3dGaWVsZHM6ICRTaG93RmllbGRzLFxuXHRcdFx0JG5ld1NoZWV0T2JqZWN0OiAkTmV3U2hlZXRPYmplY3Rcblx0XHR9O1xuXG4gICAgLy8gbmF0aXZlXG4gICAgdGhpcy4kYWRkQm9va21hcmsgPSAkYWRkQm9va21hcms7XG4gICAgdGhpcy4kcmVtb3ZlQm9va21hcmsgPSAkcmVtb3ZlQm9va21hcms7XG4gICAgdGhpcy4kb3BlblJlcG9zaXRvcnkgPSAkb3BlblJlcG9zaXRvcnk7XG4gICAgdGhpcy4kbmV3U2hlZXRPYmplY3QgPSAkbmV3U2hlZXRPYmplY3Q7XG4gICAgdGhpcy4kc2hvd0ZpZWxkcyA9ICRzaG93RmllbGRzO1xuXG4gICAgLy8gYWRkaXRpb25cbiAgICB0aGlzLnNlbGVjdExpc3RCb3hWYWx1ZXMgPSBzZWxlY3RMaXN0Qm94VmFsdWVzO1xuXHR9XG5cblxuXHRnZXRWZXJzaW9uKCl7XG5cdFx0Y29uc29sZS5sb2coYFF2ZXQgQ29yZSB2ZXJzaW9uOiAke3ZlcnNpb259YCk7XG5cdH1cblxuICAvLyBUT0RPOiBEZWJ1ZyBzZW5kRW1haWxCb29rbWFyay5cblx0c2VuZEVtYWlsQm9va21hcmsoY29uZmlnLCBleHRyYVBhcmFtcyl7XG5cdFx0cmV0dXJuIG5ldyBFbWFpbEJvb2ttYXJrKGNvbmZpZywgZXh0cmFQYXJhbXMpLmNyZWF0ZUJvb2ttYXJrKCkub3BlbkVtYWlsV2luZG93KCk7XG5cdH1cbn1cbiIsImltcG9ydCB7JHR2fSBmcm9tICcuLi91dGlsL1V0aWwnO1xyXG5cclxuLyoqXHJcbiAqIEVtYWlsIFFsaWtWaWV3IEJvb2ttYXJrLlxyXG4gKiBcclxuICogQGNvbnN0cnVjdG9yXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgRW1haWxCb29rbWFyayB7XHJcblx0XHJcblx0XHJcblx0LyoqXHJcblx0ICogIENvbmZpZy5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBjb25maWcge29iamVjdH1cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBjb25maWcuZW1haWxTdWJqZWN0IHtzdHJpbmd9XHJcblx0ICogQHBhcmFtIGNvbmZpZy5uYW1lIHtzdHJpbmd9XHJcblx0ICogQHBhcmFtIGNvbmZpZy5zaGFyZWQge2Jvb2xlYW59XHJcblx0ICogQHBhcmFtIGNvbmZpZy5leGNsdWRlU2VsZWN0aW9ucyB7Ym9vbGVhbn1cclxuXHQgKiBAcGFyYW0gY29uZmlnLmluY2x1ZGVTdGF0ZSB7Ym9vbGVhbn1cclxuXHQgKiBAcGFyYW0gY29uZmlnLm5vdERpc3BsYXllZCB7Ym9vbGVhbn1cclxuXHQgKiBAcGFyYW0gY29uZmlnLmRlc2NyaXB0aW9uU2hvdyB7Ym9vbGVhbn1cclxuXHQgKiBAcGFyYW0gY29uZmlnLmRlc2NyaXB0aW9uTXNnIHtzdHJpbmd9XHJcblx0ICogQHBhcmFtIGNvbmZpZy5zYXZlSW5wdXRWYWx1ZXMge2Jvb2xlYW59XHJcblx0ICpcclxuXHQgKiAgRXh0cmEgUGFyYW1zLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIGV4dHJhUGFyYW1zIHtvYmplY3R9XHJcblx0ICogQHBhcmFtIGV4dHJhUGFyYW1zLmV4dHJhVXJpIHtzdHJpbmd9XHJcblx0ICogQHBhcmFtIGV4dHJhUGFyYW1zLmVtYWlsV2luZG93TW9kZSB7Ym9vbGVhbn1cclxuXHQgKi9cclxuXHRjb25zdHJ1Y3Rvcihjb25maWcsIGV4dHJhUGFyYW1zKSB7XHJcblx0XHRcclxuXHRcdGxldCBkZWZhdWx0Q29uZmlnID0ge1xyXG5cdFx0XHRlbWFpbFN1YmplY3Q6IFwiXCIsXHJcblx0XHRcdG5hbWU6IFwiRW1haWwgQm9va21hcmtcIiwgLyoqIE5hbWUgb2YgdGhlIGFkZGl0aW9uLiAqL1xyXG5cdFx0XHRzaGFyZWQ6IHRydWUsIC8qKiBTaGFyZSB0aGUgYWRkaXRpb24gd2l0aCBvdGhlciB1c2Vycy4gKi9cclxuXHRcdFx0ZXhjbHVkZVNlbGVjdGlvbnM6IGZhbHNlLCAvKiogRXhjbHVkZSB0aGUgc2VsZWN0aW9ucyBtYWRlIGluIHRoZSBhcHBsaWNhdGlvbi4gKi9cclxuXHRcdFx0aW5jbHVkZVN0YXRlOiB0cnVlLCAvKiogSW5jbHVkZSBzdGF0ZSBvZiBhbGwgb2JqZWN0cy4gKi9cclxuXHRcdFx0bm90RGlzcGxheWVkOiBmYWxzZSwgLyoqIFRoZSBhZGRpdGlvbiBpcyBub3QgZGlzcGxheWVkIGluIHRoZSBhZGRpdGlvbiBsaXN0IGJ1dCBpcyBzdGlsbCBzZWxlY3RhYmxlIGluIGNvZGUgb3IgdmlhIHVybC4gKi9cclxuXHRcdFx0ZGVzY3JpcHRpb25TaG93OiBmYWxzZSwgLyoqIFRoZSBhZGRpdGlvbiBkZXNjcmlwdGlvbiB3aWxsIGJlIHNob3duIGluIGEgbWVzc2FnZSB3aGVuIHRoZSBhZGRpdGlvbiBpcyBzZWxlY3RlZC4gKi9cclxuXHRcdFx0ZGVzY3JpcHRpb25Nc2c6IFwiXCIsIC8qKiBEZXNjcmlwdGlvbiBvZiB0aGUgYWRkaXRpb24uICovXHJcblx0XHRcdHNhdmVJbnB1dFZhbHVlczogdHJ1ZSAvKiogSW5jbHVkZSB2YWx1ZXMgaW4gaW5wdXQgZmllbGRzLiovXHJcblx0XHR9O1xyXG5cdFxyXG5cdFx0dGhpcy5kZWZhdWxRdkFqeFpmYyA9ICcvUXZBSkFYWmZjL29wZW5kb2MuaHRtP2RvY3VtZW50PSc7XHJcblx0XHRcclxuXHRcdC8qKiBUaGUgYWRkaXRpb24gaXMgYXBwbGllZCBvbiB0b3Agb2YgYW55IHByZXZpb3VzIHNlbGVjdGlvbnMgKG5vIGNsZWFyKS4qL1xyXG5cdFx0dGhpcy5hcHBsaWVkID0gdHJ1ZTtcclxuXHRcdHRoaXMuZG9jID0gUXYuR2V0Q3VycmVudERvY3VtZW50KCk7XHJcblx0XHR0aGlzLmJvb2ttYXJrSWQgPSAnJztcclxuXHRcdFxyXG5cdFxyXG5cdFx0LyoqXHJcblx0XHQgKiBJbXBvcnRhbnQgcGFyYW1zLlxyXG5cdFx0ICogQHR5cGUgeyp8c3RyaW5nfVxyXG5cdFx0ICovXHJcblx0XHRpZiAoJHR2KGNvbmZpZywgJ29iamVjdCcpKXtcclxuXHRcdFx0dGhpcy5lbWFpbFN1YmplY3QgPSBjb25maWcuZW1haWxTdWJqZWN0IHx8IGRlZmF1bHRDb25maWcuZW1haWxTdWJqZWN0O1xyXG5cdFx0XHR0aGlzLm5hbWUgPSBjb25maWcubmFtZSB8fCBkZWZhdWx0Q29uZmlnLm5hbWU7XHJcblx0XHRcdHRoaXMuc2hhcmVkID0gY29uZmlnLnNoYXJlZCB8fCBkZWZhdWx0Q29uZmlnLnNoYXJlZDtcclxuXHRcdFx0dGhpcy5leGNsdWRlU2VsZWN0aW9ucyA9IGNvbmZpZy5leGNsdWRlU2VsZWN0aW9ucyB8fCBkZWZhdWx0Q29uZmlnLmV4Y2x1ZGVTZWxlY3Rpb25zO1xyXG5cdFx0XHR0aGlzLmluY2x1ZGVTdGF0ZSA9IGNvbmZpZy5pbmNsdWRlU3RhdGUgfHwgZGVmYXVsdENvbmZpZy5pbmNsdWRlU3RhdGU7XHJcblx0XHRcdHRoaXMubm90RGlzcGxheWVkID0gY29uZmlnLm5vdERpc3BsYXllZCB8fCBkZWZhdWx0Q29uZmlnLm5vdERpc3BsYXllZDtcclxuXHRcdFx0dGhpcy5kZXNjcmlwdGlvblNob3cgPSBjb25maWcuZGVzY3JpcHRpb25TaG93IHx8IGRlZmF1bHRDb25maWcuZGVzY3JpcHRpb25TaG93O1xyXG5cdFx0XHR0aGlzLmRlc2NyaXB0aW9uTXNnID0gY29uZmlnLmRlc2NyaXB0aW9uTXNnIHx8IGRlZmF1bHRDb25maWcuZGVzY3JpcHRpb25Nc2c7XHJcblx0XHRcdHRoaXMuc2F2ZUlucHV0VmFsdWVzID0gY29uZmlnLnNhdmVJbnB1dFZhbHVlcyB8fCBkZWZhdWx0Q29uZmlnLnNhdmVJbnB1dFZhbHVlcztcclxuXHRcdH1lbHNle1xyXG5cdFx0XHRmb3IgKGxldCBrZXkgaW4gZGVmYXVsdENvbmZpZyl7XHJcblx0XHRcdFx0aWYgKGRlZmF1bHRDb25maWcuaGFzT3duUHJvcGVydHkoa2V5KSlcclxuXHRcdFx0XHRcdHRoaXNba2V5XSA9IGRlZmF1bHRDb25maWdba2V5XTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFxyXG5cdFx0LyoqXHJcblx0XHQgKiBFeHRyYSBwYXJhbXMuXHJcblx0XHQgKlxyXG5cdFx0ICogQHBhcmFtIGV4dHJhVXJpIHtzdHJpbmd9IFVzZSBpdCBmb3IgYWRkIHBhcmVudCB1cmwgdG8geW91ciBRbGlrVmlldyBBU1AuTkVUIGNsaWVudC4gVE9ETzogSW4gRGV2ZWxvcG1lbnQuXHJcblx0XHQgKiBAcGFyYW0gZW1haWxXaW5kb3dNb2RlIHtib29sZWFufSBCeSBkZWZhdWx0IGFkZGl0aW9uIHdpbGwgb3BlbiBlbWFpbCBpbiBuZXcgd2luZG93LFxyXG5cdFx0ICogYnV0IHlvdSBjYW4gY2hhbmdlIGl0IHRvIHtmYWxzZX0gYW5kIGVtYWlsIHdpbmRvdyB3aWxsIGJlIG9wZW5lZCBvbiBzYW1lIGRvbWFpbi5cclxuXHRcdCAqL1xyXG5cdFx0aWYgKCR0dihleHRyYVBhcmFtcywgJ29iamVjdCcpKXtcclxuXHRcdFx0dGhpcy5leHRyYVVyaSA9IGV4dHJhUGFyYW1zLmV4dHJhVXJpIHx8ICcnO1xyXG5cdFx0XHR0aGlzLmVtYWlsV2luZG93TW9kZSA9IGV4dHJhUGFyYW1zLmVtYWlsV2luZG93TW9kZSB8fCB0cnVlO1xyXG5cdFx0fWVsc2V7XHJcblx0XHRcdHRoaXMuZXh0cmFVcmkgPSAnJztcclxuXHRcdFx0dGhpcy5lbWFpbFdpbmRvd01vZGUgPSB0cnVlO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblxyXG5cdC8qKlxyXG5cdCAqIFVzZSBuYXRpdmUgQm9va21hcmtzIENsYXNzXHJcblx0ICogZm9yIGNyZWF0ZSBhZGRpdGlvbiBiZWZvcmUgZW1haWwgaXQuXHJcblx0ICpcclxuXHQgKiBAZXh0ZW5kcyB7fVxyXG5cdCAqL1xyXG5cdGNyZWF0ZUJvb2ttYXJrKCl7XHJcblxyXG5cdFx0dGhpcy5kb2NcclxuXHRcdFx0LkJvb2ttYXJrcygpXHJcblx0XHRcdC5OZXdCb29rbWFyayhcclxuXHRcdFx0XHR0aGlzLm5hbWUsXHJcblx0XHRcdFx0dGhpcy5hcHBsaWVkLFxyXG5cdFx0XHRcdHRoaXMuc2hhcmVkLFxyXG5cdFx0XHRcdHRoaXMuZXhjbHVkZVNlbGVjdGlvbnMsXHJcblx0XHRcdFx0dGhpcy5pbmNsdWRlU3RhdGUsXHJcblx0XHRcdFx0dGhpcy5ub3REaXNwbGF5ZWQsXHJcblx0XHRcdFx0dGhpcy5kZXNjcmlwdGlvblNob3csXHJcblx0XHRcdFx0dGhpcy5kZXNjcmlwdGlvbk1zZyxcclxuXHRcdFx0XHR0aGlzLnNhdmVJbnB1dFZhbHVlc1xyXG5cdFx0XHQpO1xyXG5cclxuXHRcdHRoaXMuYm9va21hcmtJZCA9IHRoaXMuZG9jLkJvb2ttYXJrcygpLkJvb2tNYXJrc1t0aGlzLmRvYy5Cb29rbWFya3MoKS5Cb29rTWFya3MubGVuZ3RoLTFdLnZhbHVlO1xyXG5cdFx0XHJcblx0XHRyZXR1cm4gdGhpcztcclxuXHR9O1xyXG5cclxuXHRvcGVuRW1haWxXaW5kb3coKXtcclxuXHRcdFxyXG5cdFx0bGV0IHVyaSA9IHRoaXMuZXh0cmFVcmkgK1xyXG5cdFx0XHR3aW5kb3cubG9jYXRpb24ub3JpZ2luICtcclxuXHRcdFx0dGhpcy5kZWZhdWxRdkFqeFpmYyArXHJcblx0XHRcdHRoaXMuZG9jLmJpbmRlci5WaWV3ICtcclxuXHRcdFx0JyZhZGRpdGlvbj0nK1xyXG5cdFx0XHR0aGlzLmJvb2ttYXJrSWQ7XHJcblx0XHRcclxuXHRcdGxldCB1cmlfZW5jID0gZW5jb2RlVVJJQ29tcG9uZW50KHVyaSkucmVwbGFjZSgvJTIwL2csIFwiJTI1MjBcIiksXHJcblx0XHRcdG1haWxlciA9ICdtYWlsdG86P3N1YmplY3Q9Jyt0aGlzLmVtYWlsU3ViamVjdCsnJmJvZHk9Jyt1cmlfZW5jO1xyXG5cclxuXHRcdHRoaXMuZW1haWxXaW5kb3dNb2RlID8gd2luZG93LmxvY2F0aW9uLmhyZWYgPSBtYWlsZXIgOiBsb2NhdGlvbi5ocmVmID0gbWFpbGVyO1xyXG5cdFx0XHJcblx0XHRyZXR1cm4gdGhpcztcclxuXHR9XHJcbn0iLCIvKipcbiAqIEBuYW1lIHNlbGVjdExpc3RCb3hWYWx1ZXNcbiAqIFJlY3Vyc2l2ZSBzZWxlY3Rpb24gdmFsdWVzIGluIGxpc3RCb3guXG4gKlxuICogQG5vdGUgV29ya3Mgb25seSB3aXRoIGF2YWlsYWJsZSBsaXN0Qm94ZXMuXG4gKlxuICogQHBhcmFtIGxpc3RCb3hBcnJheSB7QXJyYXl9IC0gYXJyYXkgb2YgbGlzdEJveGVzIGFuZCB2YWx1ZXMuXG4gKiBAcGFyYW0gaW5kZXgge251bWJlcn0gLSBzdGFydGVyIGluZGV4IGZvciBzZWxlY3Rpb25zLlxuICogQHBhcmFtIGNiIHtmdW5jdGlvbn0gLSBjYWxsYmFjayBhZnRlciBhbGwgdmFsZXMgd2lsbCBiZSBzZWxlY3RlZC5cbiAqXG4gKiBAcmV0dXJuIHt2b2lkfGZ1bmN0aW9ufVxuICovXG5leHBvcnQgZnVuY3Rpb24gc2VsZWN0TGlzdEJveFZhbHVlcyAobGlzdEJveEFycmF5LCBpbmRleCwgY2IpIHtcbiAgaWYgKGluZGV4IDwgbGlzdEJveEFycmF5Lmxlbmd0aCl7XG4gICAgaWYgKGxpc3RCb3hBcnJheVtpbmRleF0ubGlzdGJveF9uYW1lICE9IG51bGwpe1xuICAgICAgcXZhLkdldFF2T2JqZWN0KGxpc3RCb3hBcnJheVtpbmRleF0ubGlzdGJveF9uYW1lLFxuICAgICAgICBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgdGhpcy5jYWxsYmFja0ZuID0gZnVuY3Rpb24gKCkge307XG4gICAgICAgICAgdGhpcy5EYXRhLlNlbGVjdFRleHRzKGxpc3RCb3hBcnJheVtpbmRleF0uZGVzY192YWx1ZSk7XG4gICAgICAgICAgaW5kZXggKys7XG4gICAgICAgICAgc2VsZWN0TGlzdEJveFZhbHVlcyhsaXN0Qm94QXJyYXksIGluZGV4LCBjYik7XG4gICAgICAgIH0sXG4gICAgICAgIHRoaXMpO1xuICAgIH1lbHNle1xuICAgICAgaW5kZXggKys7XG4gICAgICBzZWxlY3RMaXN0Qm94VmFsdWVzKGxpc3RCb3hBcnJheSwgaW5kZXgsIGNiKTtcbiAgICB9XG4gIH1lbHNlIGlmIChpbmRleCA9PT0gbGlzdEJveEFycmF5Lmxlbmd0aCl7XG4gICAgaWYgKHR5cGVvZiBjYiA9PT0gYGZ1bmN0aW9uYClcbiAgICAgIHJldHVybiBjYigpO1xuICB9XG59XG4iLCJleHBvcnQgKiBmcm9tICcuL0VtYWlsQm9va21hcmsnO1xuZXhwb3J0ICogZnJvbSAnLi9MaXN0Ym94QWN0aW9ucyc7XG4iLCIvKipcbiAqIEBuYW1lICRjYWxsQ2xpZW50QWN0aW9uIHtmdW5jdGlvbn1cbiAqIEBub3RlIE9wZW4gY2xpZW50IGFjdGlvbiBtb2RhbCBmb3IgcmVtb3ZlIG9yIGFkZCBib29rbWFyay5cbiAqXG4gKiBAcGFyYW0gYWN0aW9uTmFtZSB7c3RyaW5nfSAtIEFjdGlvbiBuYW1lIGBBRERCTWAgb3IgYFJFTUJNYC5cbiAqIEBwYXJhbSBwYXJhbU5hbWUge3N0cmluZ30gLSBQYXJhbSBuYW1lIGBibWAgb3IgYHJlbWJtYC5cbiAqXG4gKiBAcmV0dXJuIHtmdW5jdGlvbn1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uICRjYWxsQ2xpZW50QWN0aW9uIChhY3Rpb25OYW1lLCBwYXJhbU5hbWUpIHtcbiAgcmV0dXJuIFF2YS5Db250ZXh0Q2xpZW50QWN0aW9uKHtcbiAgICBjbGllbnRBY3Rpb246IGBtb2RhbGAsXG4gICAgcGFyYW06IHBhcmFtTmFtZS50b0xvd2VyQ2FzZSgpLFxuICAgIG5hbWU6IGFjdGlvbk5hbWUudG9VcHBlckNhc2UoKSxcbiAgICBiaW5kZXI6IFF2LkdldEN1cnJlbnREb2N1bWVudCgpLmJpbmRlclxuICB9KTtcbn1cblxuLyoqXG4gKiBAbmFtZSAkcmVtb3ZlQm9va21hcmsge2Z1bmN0aW9ufVxuICogQG5vdGUgT3BlbiByZW1vdmUgYm9va21hcmsgbW9kYWwgd2luZG93LlxuICpcbiAqIEByZXR1cm4ge3ZvaWR9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiAkcmVtb3ZlQm9va21hcmsgKCkge1xuICAkY2FsbENsaWVudEFjdGlvbihgUkVNQk1gLCBgcmVtb3ZlYm1gKTtcbn1cblxuLyoqXG4gKiBAbmFtZSAkYWRkQm9va21hcmsge2Z1bmN0aW9ufVxuICogQG5vdGUgT3BlbiBhZGQgYm9va21hcmsgbW9kYWwgd2luZG93LlxuICpcbiAqIEByZXR1cm4ge3ZvaWR9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiAkYWRkQm9va21hcmsgKCkge1xuICAkY2FsbENsaWVudEFjdGlvbihgQUREQk1gLCBgYm1gKTtcbn1cbiIsIi8qKlxuICogQG5hbWUgJGNhbGxTcGVjaWFsU3RhbmRhcmRBY3Rpb24ge2Z1bmN0aW9ufVxuICogQG5vdGUgQ2FsbCBzcGVjaWFsIHN0YW5kYXJkIGFjdGlvbiBmb3Igb3BlbiByZXBvc2l0b3J5LFxuICogIGNyZWF0ZSBuZXcgc2hlZXQgb2JqZWN0IG9yIHNob3cgZmllbGRzLlxuICpcbiAqIEBwYXJhbSBhY3Rpb25OYW1lIHtzdHJpbmd9IC0gQWN0aW9uIG5hbWUgZGVwZW5kIG9uIGBRdmEuTWdyLm1lbnUuc3BlY2lhbEFjdGlvbnNgLlxuICpcbiAqIEByZXR1cm4ge2Z1bmN0aW9ufVxuICovXG5leHBvcnQgZnVuY3Rpb24gJGNhbGxTcGVjaWFsU3RhbmRhcmRBY3Rpb24oYWN0aW9uTmFtZSkge1xuICByZXR1cm4gUXYuR2V0Q3VycmVudERvY3VtZW50KCkuYmluZGVyLlNpbXBsZUNhbGwoXG4gICAgYHNldGAsXG4gICAgYERvY3VtZW50LlN0YW5kYXJkQWN0aW9ucy4ke2FjdGlvbk5hbWUudG9VcHBlckNhc2UoKX1gLFxuICAgIG51bGwsXG4gICAge1xuICAgICAgYWN0aW9uOiBgYFxuICAgIH0pO1xufVxuXG4vKipcbiAqIEBuYW1lICRvcGVuUmVwb3NpdG9yeSB7ZnVuY3Rpb259XG4gKiBAbm90ZSBPcGVuIHJlcG9zaXRvcnkgbW9kYWwgd2luZG93LlxuICpcbiAqIEByZXR1cm4ge3ZvaWR9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiAkb3BlblJlcG9zaXRvcnkoKSB7XG4gICRjYWxsU3BlY2lhbFN0YW5kYXJkQWN0aW9uKGByZXBvc2l0b3J5YCk7XG59XG5cbi8qKlxuICogQG5hbWUgJG9wZW5OZXdTaGVldE9iamVjdCB7ZnVuY3Rpb259XG4gKiBAbm90ZSBPcGVuIG5ldyBzaGVldCBvYmplY3QgbW9kYWwgd2luZG93LlxuICpcbiAqIEByZXR1cm4ge3ZvaWR9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiAkbmV3U2hlZXRPYmplY3QoKSB7XG4gICRjYWxsU3BlY2lhbFN0YW5kYXJkQWN0aW9uKGBuZXdTaGVldE9iamApO1xufVxuXG4vKipcbiAqIEBuYW1lICRvcGVuU2hvd0ZpZWxkcyB7ZnVuY3Rpb259XG4gKiBAbm90ZSBPcGVuIHNob3cgZmllbGRzIG1vZGFsIHdpbmRvdy5cbiAqXG4gKiBAcmV0dXJuIHt2b2lkfVxuICovXG5leHBvcnQgZnVuY3Rpb24gJHNob3dGaWVsZHMoKSB7XG4gICRjYWxsU3BlY2lhbFN0YW5kYXJkQWN0aW9uKGBzaG93RmllbGRzYCk7XG59XG4iLCIvKipcbiAqIEBub3RlIEFsbCBhY3Rpb25zIHdpdGggYXZhaWxhYmxlIFRvb2xCYXIuXG4gKiBAZGVwcmVjYXRlZCAxLjAuMVxuICpcbiAqIGAkKCcjUXZBamF4VG9vbGJhcicpO2BcbiAqL1xuXG5pbXBvcnQgeyAkUXZhVG9vbGJhckFjdGlvbiB9IGZyb20gJy4uL3V0aWwvVXRpbCc7XG5cbi8qKlxuICogQG5hbWUgJEFkZEJvb2ttYXJrIHtmdW5jdGlvbn1cbiAqIEBkZXByZWNhdGVkIDEuMC4xXG4gKlxuICogQG5vdGUgT3BlbiBuYXRpdmUgQWRkIEJvb2ttYXJrIG1vZGFsLlxuICovXG5leHBvcnQgZnVuY3Rpb24gJEFkZEJvb2ttYXJrKCkge1xuXHQkUXZhVG9vbGJhckFjdGlvbignQUREQk0nKTtcbiAgY29uc29sZS5sb2coYFF2ZXQ6ICduYXRpdmUuYm9va21hcmtzLiRhZGQnIGlzIGRlcHJlY2F0ZWQgYW5kIHdpbGwgYmUgcmVtb3ZlZCBpbiAxLjEuMC4gVXNlICdRdmV0LiRhZGRCb29rbWFyaycuYClcbn1cblxuLyoqXG4gKiBAbmFtZSAkU2hvd0ZpZWxkcyB7ZnVuY3Rpb259XG4gKiBAZGVwcmVjYXRlZCAxLjAuMVxuICogQG5vdGUgT3BlbiBuYXRpdmUgUmVtb3ZlIEJvb2ttYXJrIG1vZGFsLlxuICovXG5leHBvcnQgZnVuY3Rpb24gJFJlbW92ZUJvb2ttYXJrKCkge1xuXHQkUXZhVG9vbGJhckFjdGlvbignUkVNQk0nKTtcbiAgY29uc29sZS5sb2coYFF2ZXQ6ICdRdmV0Lm5hdGl2ZS5ib29rbWFya3MuJHJlbW92ZScgaXMgZGVwcmVjYXRlZCBhbmQgd2lsbCBiZSByZW1vdmVkIGluIDEuMS4wLiBVc2UgJ1F2ZXQuJHJlbW92ZUJvb2ttYXJrJy5gKVxufVxuXG4vKipcbiAqIEBuYW1lICRFbWFpbEJvb2ttYXJrIHtmdW5jdGlvbn1cbiAqIEBkZXByZWNhdGVkIDEuMC4xXG4gKiBAbm90ZSBPcGVuIG5hdGl2ZSBFbWFpbEFzTGluayBCb29rbWFyayBtb2RhbC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uICRFbWFpbEJvb2ttYXJrKCkge1xuXHQkUXZhVG9vbGJhckFjdGlvbignTUFJTEFTTElOSycpO1xuICBjb25zb2xlLmxvZyhgUXZldDogJ1F2ZXQubmF0aXZlLmJvb2ttYXJrcy4kRW1haWxCb29rbWFyaycgaXMgZGVwcmVjYXRlZCBhbmQgd2lsbCBiZSByZW1vdmVkIGluIDEuMS4wYClcbn1cblxuLyoqXG4gKiBAbmFtZSAkT3BlblJlcG9zaXRvcnlcbiAqIEBkZXByZWNhdGVkIDEuMC4xXG4gKiBAbm90ZSBPcGVuIG5hdGl2ZSBSZXBvc2l0b3J5IG1vZGFsLlxuICovXG5leHBvcnQgZnVuY3Rpb24gJE9wZW5SZXBvc2l0b3J5KCkge1xuICAkUXZhVG9vbGJhckFjdGlvbignUkVQT1NJVE9SWScpO1xuICBjb25zb2xlLmxvZyhgUXZldDogJ1F2ZXQubmF0aXZlLiRvcGVuUmVwb3NpdG9yeScgaXMgZGVwcmVjYXRlZCBhbmQgd2lsbCBiZSByZW1vdmVkIGluIDEuMS4wLiBVc2UgJ1F2ZXQuJG9wZW5SZXBvc2l0b3J5Jy5gKVxufVxuXG4vKipcbiAqIEBuYW1lICROZXdTaGVldE9iamVjdCB7ZnVuY3Rpb259XG4gKiBAZGVwcmVjYXRlZCAxLjAuMVxuICogQG5vdGUgT3BlbiBuYXRpdmUgTmV3U2hlZXQgT2JqZWN0IG1vZGFsLlxuICovXG5leHBvcnQgZnVuY3Rpb24gJE5ld1NoZWV0T2JqZWN0KCkge1xuXHQkUXZhVG9vbGJhckFjdGlvbignTkVXU0hFRVRPQkonKTtcbiAgY29uc29sZS5sb2coYFF2ZXQ6ICdRdmV0Lm5hdGl2ZS5ib29rbWFya3MuJHJlbW92ZScgaXMgZGVwcmVjYXRlZCBhbmQgd2lsbCBiZSByZW1vdmVkIGluIDEuMS4wLiBVc2UgJ1F2ZXQuJG5ld1NoZWV0T2JqZWN0Jy5gKVxufVxuXG4vKipcbiAqIEBuYW1lICRTaG93RmllbGRzXG4gKiBAZGVwcmVjYXRlZCAxLjAuMVxuICogQG5vdGUgT3BlbiBuYXRpdmUgU2hvd0ZpZWxkcyBtb2RhbC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uICRTaG93RmllbGRzKCkge1xuXHQkUXZhVG9vbGJhckFjdGlvbignU0hPV0ZJRUxEUycpO1xuICBjb25zb2xlLmxvZyhgUXZldDogJ1F2ZXQubmF0aXZlLmJvb2ttYXJrcy4kcmVtb3ZlJyBpcyBkZXByZWNhdGVkIGFuZCB3aWxsIGJlIHJlbW92ZWQgaW4gMS4xLjAuIFVzZSAnUXZldC4kc2hvd0ZpZWxkcycuYClcbn1cbiIsImV4cG9ydCAqIGZyb20gJy4vQ2xpZW50QWN0aW9ucyc7XG5leHBvcnQgKiBmcm9tICcuL1NwZWNpYWxTdGFuZGFyZEFjdGlvbnMnO1xuIiwiLyoqXHJcbiAqIFR5cGUgVmFsaWRhdG9yXHJcbiAqIFxyXG4gKiBAcGFyYW0gdmFyaWFibGUge29iamVjdHxib29sZWFufHN0cmluZ3xudW1iZXJ8ZnVuY3Rpb259XHJcbiAqIEBwYXJhbSB0eXBlIHtzdHJpbmd9XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gJHR2KHZhcmlhYmxlLCB0eXBlKXtcclxuXHRyZXR1cm4gdHlwZW9mIHZhcmlhYmxlID09PSB0eXBlO1xyXG59XHJcblxyXG4vKipcclxuICogUXZhRG9BY3Rpb25cclxuICogXHJcbiAqIEBkZXBlbmRlbmNpZXMge1F2YX1cclxuICogQHBhcmFtIGFjdGlvbl9uYW1lIHtzdHJpbmd9IC0gQWN0aW9uIE5hbWUsIGRlcGVuZCBvbiBRdmEuY3JlYXRlT3B0aW9ucy5cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiAkUXZhVG9vbGJhckFjdGlvbihhY3Rpb25fbmFtZSkge1xyXG5cdFxyXG5cdFF2YS5NZ3IubWVudS5kb0FjdGlvbih7XHJcblx0XHR0YXJnZXQ6ICcuY3R4LW1lbnUtYWN0aW9uLScrYWN0aW9uX25hbWVcclxuXHR9KTtcclxufSIsImltcG9ydCB7IFF2ZXRDb3JlIH0gZnJvbSAnLi9jb3JlL0NvcmUnO1xuXG4oZnVuY3Rpb24od2luZG93KXtcblx0aWYgKHR5cGVvZiBRdmEgPT09ICd1bmRlZmluZWQnXG5cdFx0JiYgdHlwZW9mIGpRdWVyeSA9PT0gJ3VuZGVmaW5lZCdcblx0XHQmJiB0eXBlb2YgcXZhID09PSAndW5kZWZpbmVkJ1xuXHQpe1xuXHRcdGNvbnNvbGUubG9nKFwiQ2FuJ3QgaW5pdCBRdmV0IGJlY2F1c2UgUXZhL2pRdWVyeS9xdmEgaXMgdW5kZWZpbmVkXCIpXG5cdH1lbHNle1xuXHRcdGlmKHR5cGVvZihRdmV0KSA9PT0gJ3VuZGVmaW5lZCcpe1xuXHRcdFx0d2luZG93LlF2ZXQgPSBuZXcgUXZldENvcmUoKTtcblx0XHR9IGVsc2V7XG5cdFx0XHRjb25zb2xlLmxvZyhcIlF2ZXQgYWxyZWFkeSBkZWZpbmVkLlwiKTtcblx0XHR9XG5cdH1cbn0pKHdpbmRvdyk7XG4iXX0=
