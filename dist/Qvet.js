/**
 * qvet - QlikView Extension Trickster
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

		// addition
		this.selectListBoxValues = _index2.selectListBoxValues;
	}

	_createClass(QvetCore, [{
		key: 'getVersion',
		value: function getVersion() {
			console.log('Qvet Core version: ' + version);
		}
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
 * @name Call ClientContext Action
 * @note Open client action modal for remove or add bookmark.
 * @dependencies Qva - QlikView assistant manager.
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
 * @name Remove Bookmark.
 * @note Open remove bookmark modal window.
 * @dependencies `$callClientAction`
 *
 * @return {void}
 */
function $removeBookmark() {
  $callClientAction("REMBM", "removebm");
}

/**
 * @name Add Bookmark.
 * @note Open add bookmark modal window.
 * @dependencies `$callClientAction`
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
/**
 * @name Call Special StandardAction
 * @note Call special standard action for open repository,
 *  create new sheet object or show fields.
 * @dependencies Qv - QlikView JS.
 *  Qva.Mgr.menu.specialActions - QlikView assistant specialActions manager.
 *
 * @param actionName {string} - Action name
 * `NEWSHEETOBJ`, `REPOSITORY`, `SHOWFIELDS`.
 *
 * @return {function}
 */
function $callSpecialStandardAction(actionName) {
  return Qv.GetCurrentDocument().binder.SimpleCall("set", "Document.StandardActions." + actionName.toUpperCase(), null, {
    action: ""
  });
}

/**
 * @name Open Repository.
 * @note Open repository modal window.
 * @dependencies `$callSpecialStandardAction`
 *
 * @return {void}
 */
function $openRepository() {
  $callSpecialStandardAction("repository");
}

},{}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.$AddBookmark = $AddBookmark;
exports.$RemoveBookmark = $RemoveBookmark;
exports.$EmailBookmark = $EmailBookmark;
exports.$NewSheetObject = $NewSheetObject;
exports.$OpenRepository = $OpenRepository;
exports.$ShowFields = $ShowFields;

var _Util = require('../util/Util');

/**
 * @name $ShowFields {function}
 * Open native Show Fields modal.
 */
function $AddBookmark() {
  (0, _Util.$QvaToolbarAction)('ADDBM');
  console.log('Qvet: \'native.bookmarks.$add\' is deprecated and will be removed in 1.1.0. Use \'$addBookmark\'.');
}

/**
 * @name $ShowFields {function}
 * Open native Show Fields modal.
 */
/**
 * @note All actions with available ToolBar.
 *
 * $('#QvAjaxToolbar');
 */

function $RemoveBookmark() {
  (0, _Util.$QvaToolbarAction)('REMBM');
  console.log('Qvet: \'native.bookmarks.$remove\' is deprecated and will be removed in 1.1.0. Use \'$addBookmark\'.');
}

/**
 * @name $ShowFields {function}
 * Open native Show Fields modal.
 */
function $EmailBookmark() {
  (0, _Util.$QvaToolbarAction)('MAILASLINK');
}

/**
 * @name $ShowFields {function}
 * Open native Shown Fields modal.
 */
function $NewSheetObject() {
  (0, _Util.$QvaToolbarAction)('NEWSHEETOBJ');
}

/**
 * @name $Repository
 * Open native Repository modal.
 */
function $OpenRepository() {
  (0, _Util.$QvaToolbarAction)('REPOSITORY');
  console.log('Qvet: \'native.$openRepository\' is deprecated and will be removed in 1.1.0. Use \'$openRepository\'.');
}

/**
 * @name $Repository
 * Open native Repository modal.
 */
function $ShowFields() {
  (0, _Util.$QvaToolbarAction)('SHOWFIELDS');
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJwYWNrYWdlLmpzb24iLCJzcmNcXGNvcmVcXENvcmUuanMiLCJzcmNcXGNvcmVcXGFkZGl0aW9uXFxFbWFpbEJvb2ttYXJrLmpzIiwic3JjXFxjb3JlXFxhZGRpdGlvblxcTGlzdGJveEFjdGlvbnMuanMiLCJzcmNcXGNvcmVcXGFkZGl0aW9uXFxpbmRleC5qcyIsInNyY1xcY29yZVxcbmF0aXZlXFxDbGllbnRBY3Rpb25zLmpzIiwic3JjXFxjb3JlXFxuYXRpdmVcXFNwZWNpYWxTdGFuZGFyZEFjdGlvbnMuanMiLCJzcmNcXGNvcmVcXG5hdGl2ZVxcVG9vbGJhckFjdGlvbnNfZGVwcmVjYXRlZC5qcyIsInNyY1xcY29yZVxcbmF0aXZlXFxpbmRleC5qcyIsInNyY1xcY29yZVxcdXRpbFxcVXRpbC5qcyIsInNyY1xcUXZldC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7OztBQzNDQSxBQUNDLEFBQWMsQUFBaUIsQUFDL0IsQUFDQSxBQUNBLEFBQ007O0FBRVAsQUFDRSxBQUFpQixBQUNqQixBQUNLOztBQUtQLEFBQVMsQUFBZSxBQUEyQixBQUVuRCxBQUFPOzs7O0FBdEJQLElBQU0sVUFBVSxRQUFBLEFBQVEsc0JBQXhCLEFBQThDOzs7Ozs7Ozs7OztJQXNCdkMsQUFBTSxBQUFTLEFBRXJCOztBQUFhLEFBQ1o7O09BQUEs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Q0E7VUFBQSxBQUFRLElBQVIsQUFBWSxBQUNaO0FBTEQsUUFLSyxBQUNKO01BQUcsT0FBQSxBQUFPLFNBQVYsQUFBb0IsYUFBWSxBQUMvQjtVQUFBLEFBQU8sT0FBUCxBQUFjLEFBQUksQUFDbEI7QUFGRCxTQUVNLEFBQ0w7V0FBQSxBQUFRLElBQVIsQUFBWSxBQUNaO0FBQ0Q7QUFDRDtBQWJELEdBQUEsQUFhRyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJtb2R1bGUuZXhwb3J0cz17XG4gIFwibmFtZVwiOiBcInF2ZXRcIixcbiAgXCJ2ZXJzaW9uXCI6IFwiMS4wLjFcIixcbiAgXCJkZXNjcmlwdGlvblwiOiBcIlFsaWtWaWV3IEV4dGVuc2lvbiBUcmlja3N0ZXJcIixcbiAgXCJtYWluXCI6IFwiZ3VscGZpbGUuanNcIixcbiAgXCJicm93c2VyaWZ5XCI6IHtcbiAgICBcInRyYW5zZm9ybVwiOiBbXG4gICAgICBbXG4gICAgICAgIFwiYmFiZWxpZnlcIixcbiAgICAgICAge1xuICAgICAgICAgIFwicHJlc2V0c1wiOiBbXG4gICAgICAgICAgICBcImVzMjAxNVwiXG4gICAgICAgICAgXVxuICAgICAgICB9XG4gICAgICBdXG4gICAgXVxuICB9LFxuICBcInJlcG9zaXRvcnlcIjoge1xuICAgIFwidHlwZVwiOiBcImdpdFwiLFxuICAgIFwidXJsXCI6IFwiZ2l0K2h0dHBzOi8vZ2l0aHViLmNvbS92eWFreW1lbmtvL3F2ZXQuZ2l0XCJcbiAgfSxcbiAgXCJrZXl3b3Jkc1wiOiBbXG4gICAgXCJxbGlrdmlld1wiLFxuICAgIFwiZXh0ZW5zaW9uc1wiLFxuICAgIFwiamF2YXNjcmlwdFwiLFxuICAgIFwiZXM2XCJcbiAgXSxcbiAgXCJhdXRob3JcIjogXCJWYWxlbnR5biBZYWt5bWVua28gPHJheWZlc291bEBnbWFpbC5jb20+XCIsXG4gIFwibGljZW5zZVwiOiBcIk1JVFwiLFxuICBcImJ1Z3NcIjoge1xuICAgIFwidXJsXCI6IFwiaHR0cHM6Ly9naXRodWIuY29tL3Z5YWt5bWVua28vcXZldC9pc3N1ZXNcIlxuICB9LFxuICBcImhvbWVwYWdlXCI6IFwiaHR0cHM6Ly9naXRodWIuY29tL3Z5YWt5bWVua28vcXZldCNyZWFkbWVcIixcbiAgXCJkZXZEZXBlbmRlbmNpZXNcIjoge1xuICAgIFwiYmFiZWwtcHJlc2V0LWVzMjAxNVwiOiBcIl42LjYuMFwiLFxuICAgIFwiYmFiZWxpZnlcIjogXCJeNy4zLjBcIixcbiAgICBcImJyb3dzZXJpZnlcIjogXCJeMTMuMC4xXCIsXG4gICAgXCJldmVudC1zdHJlYW1cIjogXCJeMy4zLjNcIixcbiAgICBcImV2ZW50c3RyZWFtXCI6IFwiMC4wLjNcIixcbiAgICBcImd1bHBcIjogXCJeMy45LjFcIixcbiAgICBcImd1bHAtaGVhZGVyXCI6IFwiXjEuOC43XCIsXG4gICAgXCJndWxwLXN0cmVhbWlmeVwiOiBcIl4xLjAuMlwiLFxuICAgIFwiZ3VscC11Z2xpZnlcIjogXCJeMS41LjRcIixcbiAgICBcImd1bHAtdXRpbFwiOiBcIl4zLjAuN1wiLFxuICAgIFwicnVuLXNlcXVlbmNlXCI6IFwiXjEuMi4yXCIsXG4gICAgXCJ2aW55bC1zb3VyY2Utc3RyZWFtXCI6IFwiXjEuMS4wXCJcbiAgfVxufVxuIiwiY29uc3QgdmVyc2lvbiA9IHJlcXVpcmUoJy4uLy4uL3BhY2thZ2UuanNvbicpLnZlcnNpb247XG5cbi8qKlxuICogTmF0aXZlLlxuICovXG5pbXBvcnQge1xuXHQkQWRkQm9va21hcmssICRSZW1vdmVCb29rbWFyaywgJEVtYWlsQm9va21hcmssXG5cdCROZXdTaGVldE9iamVjdCxcblx0JE9wZW5SZXBvc2l0b3J5LFxuXHQkU2hvd0ZpZWxkc1xufSBmcm9tICcuL25hdGl2ZS9Ub29sYmFyQWN0aW9uc19kZXByZWNhdGVkJztcblxuaW1wb3J0IHtcbiAgJHJlbW92ZUJvb2ttYXJrLCAkYWRkQm9va21hcmssXG4gICRvcGVuUmVwb3NpdG9yeVxufSBmcm9tICcuL25hdGl2ZS9pbmRleCc7XG5cbi8qKlxuICogQWRkaXRpb24uXG4gKi9cbmltcG9ydCB7IEVtYWlsQm9va21hcmssIHNlbGVjdExpc3RCb3hWYWx1ZXMgfSBmcm9tICcuL2FkZGl0aW9uL2luZGV4JztcblxuZXhwb3J0IGNsYXNzIFF2ZXRDb3JlIHtcblxuXHRjb25zdHJ1Y3Rvcigpe1xuXHRcdHRoaXMubmF0aXZlID0ge1xuXHRcdFx0Ym9va21hcmtzOntcblx0XHRcdFx0JGFkZDogJEFkZEJvb2ttYXJrLFxuXHRcdFx0XHQkcmVtb3ZlOiAkUmVtb3ZlQm9va21hcmssXG5cdFx0XHRcdCRlbWFpbDogJEVtYWlsQm9va21hcmtcblx0XHRcdH0sXG5cdFx0XHQkb3BlblJlcG9zaXRvcnk6ICRPcGVuUmVwb3NpdG9yeSxcblx0XHRcdCRzaG93RmllbGRzOiAkU2hvd0ZpZWxkcyxcblx0XHRcdCRuZXdTaGVldE9iamVjdDogJE5ld1NoZWV0T2JqZWN0XG5cdFx0fTtcblxuICAgIC8vIG5hdGl2ZVxuICAgIHRoaXMuJGFkZEJvb2ttYXJrID0gJGFkZEJvb2ttYXJrO1xuICAgIHRoaXMuJHJlbW92ZUJvb2ttYXJrID0gJHJlbW92ZUJvb2ttYXJrO1xuICAgIHRoaXMuJG9wZW5SZXBvc2l0b3J5ID0gJG9wZW5SZXBvc2l0b3J5O1xuXG4gICAgLy8gYWRkaXRpb25cbiAgICB0aGlzLnNlbGVjdExpc3RCb3hWYWx1ZXMgPSBzZWxlY3RMaXN0Qm94VmFsdWVzO1xuXHR9XG5cblxuXHRnZXRWZXJzaW9uKCl7XG5cdFx0Y29uc29sZS5sb2coYFF2ZXQgQ29yZSB2ZXJzaW9uOiAke3ZlcnNpb259YCk7XG5cdH1cblxuXHRzZW5kRW1haWxCb29rbWFyayhjb25maWcsIGV4dHJhUGFyYW1zKXtcblx0XHRyZXR1cm4gbmV3IEVtYWlsQm9va21hcmsoY29uZmlnLCBleHRyYVBhcmFtcykuY3JlYXRlQm9va21hcmsoKS5vcGVuRW1haWxXaW5kb3coKTtcblx0fVxufVxuIiwiaW1wb3J0IHskdHZ9IGZyb20gJy4uL3V0aWwvVXRpbCc7XHJcblxyXG4vKipcclxuICogRW1haWwgUWxpa1ZpZXcgQm9va21hcmsuXHJcbiAqIFxyXG4gKiBAY29uc3RydWN0b3JcclxuICovXHJcbmV4cG9ydCBjbGFzcyBFbWFpbEJvb2ttYXJrIHtcclxuXHRcclxuXHRcclxuXHQvKipcclxuXHQgKiAgQ29uZmlnLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIGNvbmZpZyB7b2JqZWN0fVxyXG5cdCAqXHJcblx0ICogQHBhcmFtIGNvbmZpZy5lbWFpbFN1YmplY3Qge3N0cmluZ31cclxuXHQgKiBAcGFyYW0gY29uZmlnLm5hbWUge3N0cmluZ31cclxuXHQgKiBAcGFyYW0gY29uZmlnLnNoYXJlZCB7Ym9vbGVhbn1cclxuXHQgKiBAcGFyYW0gY29uZmlnLmV4Y2x1ZGVTZWxlY3Rpb25zIHtib29sZWFufVxyXG5cdCAqIEBwYXJhbSBjb25maWcuaW5jbHVkZVN0YXRlIHtib29sZWFufVxyXG5cdCAqIEBwYXJhbSBjb25maWcubm90RGlzcGxheWVkIHtib29sZWFufVxyXG5cdCAqIEBwYXJhbSBjb25maWcuZGVzY3JpcHRpb25TaG93IHtib29sZWFufVxyXG5cdCAqIEBwYXJhbSBjb25maWcuZGVzY3JpcHRpb25Nc2cge3N0cmluZ31cclxuXHQgKiBAcGFyYW0gY29uZmlnLnNhdmVJbnB1dFZhbHVlcyB7Ym9vbGVhbn1cclxuXHQgKlxyXG5cdCAqICBFeHRyYSBQYXJhbXMuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gZXh0cmFQYXJhbXMge29iamVjdH1cclxuXHQgKiBAcGFyYW0gZXh0cmFQYXJhbXMuZXh0cmFVcmkge3N0cmluZ31cclxuXHQgKiBAcGFyYW0gZXh0cmFQYXJhbXMuZW1haWxXaW5kb3dNb2RlIHtib29sZWFufVxyXG5cdCAqL1xyXG5cdGNvbnN0cnVjdG9yKGNvbmZpZywgZXh0cmFQYXJhbXMpIHtcclxuXHRcdFxyXG5cdFx0bGV0IGRlZmF1bHRDb25maWcgPSB7XHJcblx0XHRcdGVtYWlsU3ViamVjdDogXCJcIixcclxuXHRcdFx0bmFtZTogXCJFbWFpbCBCb29rbWFya1wiLCAvKiogTmFtZSBvZiB0aGUgYWRkaXRpb24uICovXHJcblx0XHRcdHNoYXJlZDogdHJ1ZSwgLyoqIFNoYXJlIHRoZSBhZGRpdGlvbiB3aXRoIG90aGVyIHVzZXJzLiAqL1xyXG5cdFx0XHRleGNsdWRlU2VsZWN0aW9uczogZmFsc2UsIC8qKiBFeGNsdWRlIHRoZSBzZWxlY3Rpb25zIG1hZGUgaW4gdGhlIGFwcGxpY2F0aW9uLiAqL1xyXG5cdFx0XHRpbmNsdWRlU3RhdGU6IHRydWUsIC8qKiBJbmNsdWRlIHN0YXRlIG9mIGFsbCBvYmplY3RzLiAqL1xyXG5cdFx0XHRub3REaXNwbGF5ZWQ6IGZhbHNlLCAvKiogVGhlIGFkZGl0aW9uIGlzIG5vdCBkaXNwbGF5ZWQgaW4gdGhlIGFkZGl0aW9uIGxpc3QgYnV0IGlzIHN0aWxsIHNlbGVjdGFibGUgaW4gY29kZSBvciB2aWEgdXJsLiAqL1xyXG5cdFx0XHRkZXNjcmlwdGlvblNob3c6IGZhbHNlLCAvKiogVGhlIGFkZGl0aW9uIGRlc2NyaXB0aW9uIHdpbGwgYmUgc2hvd24gaW4gYSBtZXNzYWdlIHdoZW4gdGhlIGFkZGl0aW9uIGlzIHNlbGVjdGVkLiAqL1xyXG5cdFx0XHRkZXNjcmlwdGlvbk1zZzogXCJcIiwgLyoqIERlc2NyaXB0aW9uIG9mIHRoZSBhZGRpdGlvbi4gKi9cclxuXHRcdFx0c2F2ZUlucHV0VmFsdWVzOiB0cnVlIC8qKiBJbmNsdWRlIHZhbHVlcyBpbiBpbnB1dCBmaWVsZHMuKi9cclxuXHRcdH07XHJcblx0XHJcblx0XHR0aGlzLmRlZmF1bFF2QWp4WmZjID0gJy9RdkFKQVhaZmMvb3BlbmRvYy5odG0/ZG9jdW1lbnQ9JztcclxuXHRcdFxyXG5cdFx0LyoqIFRoZSBhZGRpdGlvbiBpcyBhcHBsaWVkIG9uIHRvcCBvZiBhbnkgcHJldmlvdXMgc2VsZWN0aW9ucyAobm8gY2xlYXIpLiovXHJcblx0XHR0aGlzLmFwcGxpZWQgPSB0cnVlO1xyXG5cdFx0dGhpcy5kb2MgPSBRdi5HZXRDdXJyZW50RG9jdW1lbnQoKTtcclxuXHRcdHRoaXMuYm9va21hcmtJZCA9ICcnO1xyXG5cdFx0XHJcblx0XHJcblx0XHQvKipcclxuXHRcdCAqIEltcG9ydGFudCBwYXJhbXMuXHJcblx0XHQgKiBAdHlwZSB7KnxzdHJpbmd9XHJcblx0XHQgKi9cclxuXHRcdGlmICgkdHYoY29uZmlnLCAnb2JqZWN0Jykpe1xyXG5cdFx0XHR0aGlzLmVtYWlsU3ViamVjdCA9IGNvbmZpZy5lbWFpbFN1YmplY3QgfHwgZGVmYXVsdENvbmZpZy5lbWFpbFN1YmplY3Q7XHJcblx0XHRcdHRoaXMubmFtZSA9IGNvbmZpZy5uYW1lIHx8IGRlZmF1bHRDb25maWcubmFtZTtcclxuXHRcdFx0dGhpcy5zaGFyZWQgPSBjb25maWcuc2hhcmVkIHx8IGRlZmF1bHRDb25maWcuc2hhcmVkO1xyXG5cdFx0XHR0aGlzLmV4Y2x1ZGVTZWxlY3Rpb25zID0gY29uZmlnLmV4Y2x1ZGVTZWxlY3Rpb25zIHx8IGRlZmF1bHRDb25maWcuZXhjbHVkZVNlbGVjdGlvbnM7XHJcblx0XHRcdHRoaXMuaW5jbHVkZVN0YXRlID0gY29uZmlnLmluY2x1ZGVTdGF0ZSB8fCBkZWZhdWx0Q29uZmlnLmluY2x1ZGVTdGF0ZTtcclxuXHRcdFx0dGhpcy5ub3REaXNwbGF5ZWQgPSBjb25maWcubm90RGlzcGxheWVkIHx8IGRlZmF1bHRDb25maWcubm90RGlzcGxheWVkO1xyXG5cdFx0XHR0aGlzLmRlc2NyaXB0aW9uU2hvdyA9IGNvbmZpZy5kZXNjcmlwdGlvblNob3cgfHwgZGVmYXVsdENvbmZpZy5kZXNjcmlwdGlvblNob3c7XHJcblx0XHRcdHRoaXMuZGVzY3JpcHRpb25Nc2cgPSBjb25maWcuZGVzY3JpcHRpb25Nc2cgfHwgZGVmYXVsdENvbmZpZy5kZXNjcmlwdGlvbk1zZztcclxuXHRcdFx0dGhpcy5zYXZlSW5wdXRWYWx1ZXMgPSBjb25maWcuc2F2ZUlucHV0VmFsdWVzIHx8IGRlZmF1bHRDb25maWcuc2F2ZUlucHV0VmFsdWVzO1xyXG5cdFx0fWVsc2V7XHJcblx0XHRcdGZvciAobGV0IGtleSBpbiBkZWZhdWx0Q29uZmlnKXtcclxuXHRcdFx0XHRpZiAoZGVmYXVsdENvbmZpZy5oYXNPd25Qcm9wZXJ0eShrZXkpKVxyXG5cdFx0XHRcdFx0dGhpc1trZXldID0gZGVmYXVsdENvbmZpZ1trZXldO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHJcblx0XHQvKipcclxuXHRcdCAqIEV4dHJhIHBhcmFtcy5cclxuXHRcdCAqXHJcblx0XHQgKiBAcGFyYW0gZXh0cmFVcmkge3N0cmluZ30gVXNlIGl0IGZvciBhZGQgcGFyZW50IHVybCB0byB5b3VyIFFsaWtWaWV3IEFTUC5ORVQgY2xpZW50LiBUT0RPOiBJbiBEZXZlbG9wbWVudC5cclxuXHRcdCAqIEBwYXJhbSBlbWFpbFdpbmRvd01vZGUge2Jvb2xlYW59IEJ5IGRlZmF1bHQgYWRkaXRpb24gd2lsbCBvcGVuIGVtYWlsIGluIG5ldyB3aW5kb3csXHJcblx0XHQgKiBidXQgeW91IGNhbiBjaGFuZ2UgaXQgdG8ge2ZhbHNlfSBhbmQgZW1haWwgd2luZG93IHdpbGwgYmUgb3BlbmVkIG9uIHNhbWUgZG9tYWluLlxyXG5cdFx0ICovXHJcblx0XHRpZiAoJHR2KGV4dHJhUGFyYW1zLCAnb2JqZWN0Jykpe1xyXG5cdFx0XHR0aGlzLmV4dHJhVXJpID0gZXh0cmFQYXJhbXMuZXh0cmFVcmkgfHwgJyc7XHJcblx0XHRcdHRoaXMuZW1haWxXaW5kb3dNb2RlID0gZXh0cmFQYXJhbXMuZW1haWxXaW5kb3dNb2RlIHx8IHRydWU7XHJcblx0XHR9ZWxzZXtcclxuXHRcdFx0dGhpcy5leHRyYVVyaSA9ICcnO1xyXG5cdFx0XHR0aGlzLmVtYWlsV2luZG93TW9kZSA9IHRydWU7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHJcblx0LyoqXHJcblx0ICogVXNlIG5hdGl2ZSBCb29rbWFya3MgQ2xhc3NcclxuXHQgKiBmb3IgY3JlYXRlIGFkZGl0aW9uIGJlZm9yZSBlbWFpbCBpdC5cclxuXHQgKlxyXG5cdCAqIEBleHRlbmRzIHt9XHJcblx0ICovXHJcblx0Y3JlYXRlQm9va21hcmsoKXtcclxuXHJcblx0XHR0aGlzLmRvY1xyXG5cdFx0XHQuQm9va21hcmtzKClcclxuXHRcdFx0Lk5ld0Jvb2ttYXJrKFxyXG5cdFx0XHRcdHRoaXMubmFtZSxcclxuXHRcdFx0XHR0aGlzLmFwcGxpZWQsXHJcblx0XHRcdFx0dGhpcy5zaGFyZWQsXHJcblx0XHRcdFx0dGhpcy5leGNsdWRlU2VsZWN0aW9ucyxcclxuXHRcdFx0XHR0aGlzLmluY2x1ZGVTdGF0ZSxcclxuXHRcdFx0XHR0aGlzLm5vdERpc3BsYXllZCxcclxuXHRcdFx0XHR0aGlzLmRlc2NyaXB0aW9uU2hvdyxcclxuXHRcdFx0XHR0aGlzLmRlc2NyaXB0aW9uTXNnLFxyXG5cdFx0XHRcdHRoaXMuc2F2ZUlucHV0VmFsdWVzXHJcblx0XHRcdCk7XHJcblxyXG5cdFx0dGhpcy5ib29rbWFya0lkID0gdGhpcy5kb2MuQm9va21hcmtzKCkuQm9va01hcmtzW3RoaXMuZG9jLkJvb2ttYXJrcygpLkJvb2tNYXJrcy5sZW5ndGgtMV0udmFsdWU7XHJcblx0XHRcclxuXHRcdHJldHVybiB0aGlzO1xyXG5cdH07XHJcblxyXG5cdG9wZW5FbWFpbFdpbmRvdygpe1xyXG5cdFx0XHJcblx0XHRsZXQgdXJpID0gdGhpcy5leHRyYVVyaSArXHJcblx0XHRcdHdpbmRvdy5sb2NhdGlvbi5vcmlnaW4gK1xyXG5cdFx0XHR0aGlzLmRlZmF1bFF2QWp4WmZjICtcclxuXHRcdFx0dGhpcy5kb2MuYmluZGVyLlZpZXcgK1xyXG5cdFx0XHQnJmFkZGl0aW9uPScrXHJcblx0XHRcdHRoaXMuYm9va21hcmtJZDtcclxuXHRcdFxyXG5cdFx0bGV0IHVyaV9lbmMgPSBlbmNvZGVVUklDb21wb25lbnQodXJpKS5yZXBsYWNlKC8lMjAvZywgXCIlMjUyMFwiKSxcclxuXHRcdFx0bWFpbGVyID0gJ21haWx0bzo/c3ViamVjdD0nK3RoaXMuZW1haWxTdWJqZWN0KycmYm9keT0nK3VyaV9lbmM7XHJcblxyXG5cdFx0dGhpcy5lbWFpbFdpbmRvd01vZGUgPyB3aW5kb3cubG9jYXRpb24uaHJlZiA9IG1haWxlciA6IGxvY2F0aW9uLmhyZWYgPSBtYWlsZXI7XHJcblx0XHRcclxuXHRcdHJldHVybiB0aGlzO1xyXG5cdH1cclxufSIsIi8qKlxuICogQG5hbWUgc2VsZWN0TGlzdEJveFZhbHVlc1xuICogUmVjdXJzaXZlIHNlbGVjdGlvbiB2YWx1ZXMgaW4gbGlzdEJveC5cbiAqXG4gKiBAbm90ZSBXb3JrcyBvbmx5IHdpdGggYXZhaWxhYmxlIGxpc3RCb3hlcy5cbiAqXG4gKiBAcGFyYW0gbGlzdEJveEFycmF5IHtBcnJheX0gLSBhcnJheSBvZiBsaXN0Qm94ZXMgYW5kIHZhbHVlcy5cbiAqIEBwYXJhbSBpbmRleCB7bnVtYmVyfSAtIHN0YXJ0ZXIgaW5kZXggZm9yIHNlbGVjdGlvbnMuXG4gKiBAcGFyYW0gY2Ige2Z1bmN0aW9ufSAtIGNhbGxiYWNrIGFmdGVyIGFsbCB2YWxlcyB3aWxsIGJlIHNlbGVjdGVkLlxuICpcbiAqIEByZXR1cm4ge3ZvaWR8ZnVuY3Rpb259XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzZWxlY3RMaXN0Qm94VmFsdWVzIChsaXN0Qm94QXJyYXksIGluZGV4LCBjYikge1xuICBpZiAoaW5kZXggPCBsaXN0Qm94QXJyYXkubGVuZ3RoKXtcbiAgICBpZiAobGlzdEJveEFycmF5W2luZGV4XS5saXN0Ym94X25hbWUgIT0gbnVsbCl7XG4gICAgICBxdmEuR2V0UXZPYmplY3QobGlzdEJveEFycmF5W2luZGV4XS5saXN0Ym94X25hbWUsXG4gICAgICAgIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICB0aGlzLmNhbGxiYWNrRm4gPSBmdW5jdGlvbiAoKSB7fTtcbiAgICAgICAgICB0aGlzLkRhdGEuU2VsZWN0VGV4dHMobGlzdEJveEFycmF5W2luZGV4XS5kZXNjX3ZhbHVlKTtcbiAgICAgICAgICBpbmRleCArKztcbiAgICAgICAgICBzZWxlY3RMaXN0Qm94VmFsdWVzKGxpc3RCb3hBcnJheSwgaW5kZXgsIGNiKTtcbiAgICAgICAgfSxcbiAgICAgICAgdGhpcyk7XG4gICAgfWVsc2V7XG4gICAgICBpbmRleCArKztcbiAgICAgIHNlbGVjdExpc3RCb3hWYWx1ZXMobGlzdEJveEFycmF5LCBpbmRleCwgY2IpO1xuICAgIH1cbiAgfWVsc2UgaWYgKGluZGV4ID09PSBsaXN0Qm94QXJyYXkubGVuZ3RoKXtcbiAgICBpZiAodHlwZW9mIGNiID09PSBgZnVuY3Rpb25gKVxuICAgICAgcmV0dXJuIGNiKCk7XG4gIH1cbn1cbiIsImV4cG9ydCAqIGZyb20gJy4vRW1haWxCb29rbWFyayc7XG5leHBvcnQgKiBmcm9tICcuL0xpc3Rib3hBY3Rpb25zJztcbiIsIi8qKlxuICogQG5hbWUgQ2FsbCBDbGllbnRDb250ZXh0IEFjdGlvblxuICogQG5vdGUgT3BlbiBjbGllbnQgYWN0aW9uIG1vZGFsIGZvciByZW1vdmUgb3IgYWRkIGJvb2ttYXJrLlxuICogQGRlcGVuZGVuY2llcyBRdmEgLSBRbGlrVmlldyBhc3Npc3RhbnQgbWFuYWdlci5cbiAqXG4gKiBAcGFyYW0gYWN0aW9uTmFtZSB7c3RyaW5nfSAtIEFjdGlvbiBuYW1lIGBBRERCTWAgb3IgYFJFTUJNYC5cbiAqIEBwYXJhbSBwYXJhbU5hbWUge3N0cmluZ30gLSBQYXJhbSBuYW1lIGBibWAgb3IgYHJlbWJtYC5cbiAqXG4gKiBAcmV0dXJuIHtmdW5jdGlvbn1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uICRjYWxsQ2xpZW50QWN0aW9uIChhY3Rpb25OYW1lLCBwYXJhbU5hbWUpIHtcbiAgcmV0dXJuIFF2YS5Db250ZXh0Q2xpZW50QWN0aW9uKHtcbiAgICBjbGllbnRBY3Rpb246IGBtb2RhbGAsXG4gICAgcGFyYW06IHBhcmFtTmFtZS50b0xvd2VyQ2FzZSgpLFxuICAgIG5hbWU6IGFjdGlvbk5hbWUudG9VcHBlckNhc2UoKSxcbiAgICBiaW5kZXI6IFF2LkdldEN1cnJlbnREb2N1bWVudCgpLmJpbmRlclxuICB9KTtcbn1cblxuLyoqXG4gKiBAbmFtZSBSZW1vdmUgQm9va21hcmsuXG4gKiBAbm90ZSBPcGVuIHJlbW92ZSBib29rbWFyayBtb2RhbCB3aW5kb3cuXG4gKiBAZGVwZW5kZW5jaWVzIGAkY2FsbENsaWVudEFjdGlvbmBcbiAqXG4gKiBAcmV0dXJuIHt2b2lkfVxuICovXG5leHBvcnQgZnVuY3Rpb24gJHJlbW92ZUJvb2ttYXJrICgpIHtcbiAgJGNhbGxDbGllbnRBY3Rpb24oYFJFTUJNYCwgYHJlbW92ZWJtYCk7XG59XG5cbi8qKlxuICogQG5hbWUgQWRkIEJvb2ttYXJrLlxuICogQG5vdGUgT3BlbiBhZGQgYm9va21hcmsgbW9kYWwgd2luZG93LlxuICogQGRlcGVuZGVuY2llcyBgJGNhbGxDbGllbnRBY3Rpb25gXG4gKlxuICogQHJldHVybiB7dm9pZH1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uICRhZGRCb29rbWFyayAoKSB7XG4gICRjYWxsQ2xpZW50QWN0aW9uKGBBRERCTWAsIGBibWApO1xufVxuIiwiLyoqXG4gKiBAbmFtZSBDYWxsIFNwZWNpYWwgU3RhbmRhcmRBY3Rpb25cbiAqIEBub3RlIENhbGwgc3BlY2lhbCBzdGFuZGFyZCBhY3Rpb24gZm9yIG9wZW4gcmVwb3NpdG9yeSxcbiAqICBjcmVhdGUgbmV3IHNoZWV0IG9iamVjdCBvciBzaG93IGZpZWxkcy5cbiAqIEBkZXBlbmRlbmNpZXMgUXYgLSBRbGlrVmlldyBKUy5cbiAqICBRdmEuTWdyLm1lbnUuc3BlY2lhbEFjdGlvbnMgLSBRbGlrVmlldyBhc3Npc3RhbnQgc3BlY2lhbEFjdGlvbnMgbWFuYWdlci5cbiAqXG4gKiBAcGFyYW0gYWN0aW9uTmFtZSB7c3RyaW5nfSAtIEFjdGlvbiBuYW1lXG4gKiBgTkVXU0hFRVRPQkpgLCBgUkVQT1NJVE9SWWAsIGBTSE9XRklFTERTYC5cbiAqXG4gKiBAcmV0dXJuIHtmdW5jdGlvbn1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uICRjYWxsU3BlY2lhbFN0YW5kYXJkQWN0aW9uKGFjdGlvbk5hbWUpIHtcbiAgcmV0dXJuIFF2LkdldEN1cnJlbnREb2N1bWVudCgpLmJpbmRlci5TaW1wbGVDYWxsKFxuICAgIGBzZXRgLFxuICAgIGBEb2N1bWVudC5TdGFuZGFyZEFjdGlvbnMuJHthY3Rpb25OYW1lLnRvVXBwZXJDYXNlKCl9YCxcbiAgICBudWxsLFxuICAgIHtcbiAgICAgIGFjdGlvbjogYGBcbiAgICB9KTtcbn1cblxuLyoqXG4gKiBAbmFtZSBPcGVuIFJlcG9zaXRvcnkuXG4gKiBAbm90ZSBPcGVuIHJlcG9zaXRvcnkgbW9kYWwgd2luZG93LlxuICogQGRlcGVuZGVuY2llcyBgJGNhbGxTcGVjaWFsU3RhbmRhcmRBY3Rpb25gXG4gKlxuICogQHJldHVybiB7dm9pZH1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uICRvcGVuUmVwb3NpdG9yeSgpIHtcbiAgJGNhbGxTcGVjaWFsU3RhbmRhcmRBY3Rpb24oYHJlcG9zaXRvcnlgKTtcbn1cbiIsIi8qKlxuICogQG5vdGUgQWxsIGFjdGlvbnMgd2l0aCBhdmFpbGFibGUgVG9vbEJhci5cbiAqXG4gKiAkKCcjUXZBamF4VG9vbGJhcicpO1xuICovXG5cbmltcG9ydCB7ICRRdmFUb29sYmFyQWN0aW9uIH0gZnJvbSAnLi4vdXRpbC9VdGlsJztcblxuLyoqXG4gKiBAbmFtZSAkU2hvd0ZpZWxkcyB7ZnVuY3Rpb259XG4gKiBPcGVuIG5hdGl2ZSBTaG93IEZpZWxkcyBtb2RhbC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uICRBZGRCb29rbWFyaygpIHtcblx0JFF2YVRvb2xiYXJBY3Rpb24oJ0FEREJNJyk7XG4gIGNvbnNvbGUubG9nKGBRdmV0OiAnbmF0aXZlLmJvb2ttYXJrcy4kYWRkJyBpcyBkZXByZWNhdGVkIGFuZCB3aWxsIGJlIHJlbW92ZWQgaW4gMS4xLjAuIFVzZSAnJGFkZEJvb2ttYXJrJy5gKVxufVxuXG4vKipcbiAqIEBuYW1lICRTaG93RmllbGRzIHtmdW5jdGlvbn1cbiAqIE9wZW4gbmF0aXZlIFNob3cgRmllbGRzIG1vZGFsLlxuICovXG5leHBvcnQgZnVuY3Rpb24gJFJlbW92ZUJvb2ttYXJrKCkge1xuXHQkUXZhVG9vbGJhckFjdGlvbignUkVNQk0nKTtcbiAgY29uc29sZS5sb2coYFF2ZXQ6ICduYXRpdmUuYm9va21hcmtzLiRyZW1vdmUnIGlzIGRlcHJlY2F0ZWQgYW5kIHdpbGwgYmUgcmVtb3ZlZCBpbiAxLjEuMC4gVXNlICckYWRkQm9va21hcmsnLmApXG59XG5cbi8qKlxuICogQG5hbWUgJFNob3dGaWVsZHMge2Z1bmN0aW9ufVxuICogT3BlbiBuYXRpdmUgU2hvdyBGaWVsZHMgbW9kYWwuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiAkRW1haWxCb29rbWFyaygpIHtcblx0JFF2YVRvb2xiYXJBY3Rpb24oJ01BSUxBU0xJTksnKTtcbn1cblxuLyoqXG4gKiBAbmFtZSAkU2hvd0ZpZWxkcyB7ZnVuY3Rpb259XG4gKiBPcGVuIG5hdGl2ZSBTaG93biBGaWVsZHMgbW9kYWwuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiAkTmV3U2hlZXRPYmplY3QoKSB7XG5cdCRRdmFUb29sYmFyQWN0aW9uKCdORVdTSEVFVE9CSicpO1xufVxuXG4vKipcbiAqIEBuYW1lICRSZXBvc2l0b3J5XG4gKiBPcGVuIG5hdGl2ZSBSZXBvc2l0b3J5IG1vZGFsLlxuICovXG5leHBvcnQgZnVuY3Rpb24gJE9wZW5SZXBvc2l0b3J5KCkge1xuXHQkUXZhVG9vbGJhckFjdGlvbignUkVQT1NJVE9SWScpO1xuICBjb25zb2xlLmxvZyhgUXZldDogJ25hdGl2ZS4kb3BlblJlcG9zaXRvcnknIGlzIGRlcHJlY2F0ZWQgYW5kIHdpbGwgYmUgcmVtb3ZlZCBpbiAxLjEuMC4gVXNlICckb3BlblJlcG9zaXRvcnknLmApXG59XG5cbi8qKlxuICogQG5hbWUgJFJlcG9zaXRvcnlcbiAqIE9wZW4gbmF0aXZlIFJlcG9zaXRvcnkgbW9kYWwuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiAkU2hvd0ZpZWxkcygpIHtcblx0JFF2YVRvb2xiYXJBY3Rpb24oJ1NIT1dGSUVMRFMnKTtcbn1cbiIsImV4cG9ydCAqIGZyb20gJy4vQ2xpZW50QWN0aW9ucyc7XG5leHBvcnQgKiBmcm9tICcuL1NwZWNpYWxTdGFuZGFyZEFjdGlvbnMnO1xuIiwiLyoqXHJcbiAqIFR5cGUgVmFsaWRhdG9yXHJcbiAqIFxyXG4gKiBAcGFyYW0gdmFyaWFibGUge29iamVjdHxib29sZWFufHN0cmluZ3xudW1iZXJ8ZnVuY3Rpb259XHJcbiAqIEBwYXJhbSB0eXBlIHtzdHJpbmd9XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gJHR2KHZhcmlhYmxlLCB0eXBlKXtcclxuXHRyZXR1cm4gdHlwZW9mIHZhcmlhYmxlID09PSB0eXBlO1xyXG59XHJcblxyXG4vKipcclxuICogUXZhRG9BY3Rpb25cclxuICogXHJcbiAqIEBkZXBlbmRlbmNpZXMge1F2YX1cclxuICogQHBhcmFtIGFjdGlvbl9uYW1lIHtzdHJpbmd9IC0gQWN0aW9uIE5hbWUsIGRlcGVuZCBvbiBRdmEuY3JlYXRlT3B0aW9ucy5cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiAkUXZhVG9vbGJhckFjdGlvbihhY3Rpb25fbmFtZSkge1xyXG5cdFxyXG5cdFF2YS5NZ3IubWVudS5kb0FjdGlvbih7XHJcblx0XHR0YXJnZXQ6ICcuY3R4LW1lbnUtYWN0aW9uLScrYWN0aW9uX25hbWVcclxuXHR9KTtcclxufSIsImltcG9ydCB7IFF2ZXRDb3JlIH0gZnJvbSAnLi9jb3JlL0NvcmUnO1xuXG4oZnVuY3Rpb24od2luZG93KXtcblx0aWYgKHR5cGVvZiBRdmEgPT09ICd1bmRlZmluZWQnXG5cdFx0JiYgdHlwZW9mIGpRdWVyeSA9PT0gJ3VuZGVmaW5lZCdcblx0XHQmJiB0eXBlb2YgcXZhID09PSAndW5kZWZpbmVkJ1xuXHQpe1xuXHRcdGNvbnNvbGUubG9nKFwiQ2FuJ3QgaW5pdCBRdmV0IGJlY2F1c2UgUXZhL2pRdWVyeS9xdmEgaXMgdW5kZWZpbmVkXCIpXG5cdH1lbHNle1xuXHRcdGlmKHR5cGVvZihRdmV0KSA9PT0gJ3VuZGVmaW5lZCcpe1xuXHRcdFx0d2luZG93LlF2ZXQgPSBuZXcgUXZldENvcmUoKTtcblx0XHR9IGVsc2V7XG5cdFx0XHRjb25zb2xlLmxvZyhcIlF2ZXQgYWxyZWFkeSBkZWZpbmVkLlwiKTtcblx0XHR9XG5cdH1cbn0pKHdpbmRvdyk7XG4iXX0=
