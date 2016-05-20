/**
 * Qvet - QlikView Extension Trickster
 * 
 * @version v0.0.5
 * @author Valentyn Yakymenko <rayfesoul@gmail.com>
 * @license MIT
 *//**
 * Qvet - QlikView Extension Trickster
 * 
 * @version v0.0.5
 * @author Valentyn Yakymenko <rayfesoul@gmail.com>
 * @license MIT
 */(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.QvetCore = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ToolbarActions = require('./native/ToolbarActions');

var _Bookmarks = require('./development/Bookmarks');

var _Repository = require('./development/Repository');

var _EmailBookmark = require('./addition/EmailBookmark');

var _SelectListBoxValues = require('./addition/SelectListBoxValues');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var version = '0.0.5';

/**
 * Native.
 */


/**
 * Development.
 */


/**
 * Addition.
 */

var QvetCore = exports.QvetCore = function () {
	function QvetCore() {
		_classCallCheck(this, QvetCore);

		this.native = {
			bookmarks: {
				$add: _ToolbarActions.$AddBookmark,
				$remove: _ToolbarActions.$RemoveBookmark,
				$email: _ToolbarActions.$EmailBookmark
			},
			$openRepository: _ToolbarActions.$OpenRepository,
			$showFields: _ToolbarActions.$ShowFields,
			$newSheetObject: _ToolbarActions.$NewSheetObject
		};

		// TODO: Dev versions for Qva and $.ajax when toolbar not initialized.
		this.development = {
			bookmarks: {
				$add: _Bookmarks.$AddBookmarkQva,
				$remove: _Bookmarks.$RemoveBookmarkQva
			},
			$openRepository: _Repository.$OpenRepositoryAjax
		};

		// // this.selectListBoxValues:
		// selectListBoxValues(){
		//
		// }
	}

	_createClass(QvetCore, [{
		key: 'getVersion',
		value: function getVersion() {
			return console.log('Qvet version: ' + version);
		}
	}, {
		key: 'sendEmailBookmark',
		value: function sendEmailBookmark(config, extraParams) {
			return new _EmailBookmark.EmailBookmark(config, extraParams).createBookmark().openEmailWindow();
		}
	}, {
		key: 'selectListBoxValues',
		value: function selectListBoxValues(listBoxArray) {
			return (0, _SelectListBoxValues.SelectListBoxValues)(listBoxArray, 0);
		}
	}]);

	return QvetCore;
}();

},{"./addition/EmailBookmark":2,"./addition/SelectListBoxValues":3,"./development/Bookmarks":4,"./development/Repository":5,"./native/ToolbarActions":6}],2:[function(require,module,exports){
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

},{"../util/Util":7}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _this = undefined;

/**
 * @name SelectListBoxValues {function}
 * Recursive selection values in listBox.
 *
 * @note Works only with available listBoxes.
 * 
 * @param listBoxArray {Array}
 * @param index {number}
 */
var SelectListBoxValues = exports.SelectListBoxValues = function SelectListBoxValues(listBoxArray, index) {
  if (index < listBoxArray.length) {
    qva.GetQvObject(listBoxArray[index].name, function () {
      this.callbackFn = function () {};
      this.Data.SelectTexts(listBoxArray[index].values);
      index++;
      SelectListBoxValues(listBoxArray, index);
    }, _this);
  }
};

},{}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.$AddBookmarkQva = $AddBookmarkQva;
exports.$RemoveBookmarkQva = $RemoveBookmarkQva;
/**
 * @name $AddBookmarkQva {function}
 * Open native Add Bookmark modal via {Qva.binder}.
 */
function $AddBookmarkQva() {

	Qva.ContextClientAction({
		clientAction: "modal",
		param: "bm",
		name: "ADDBM",
		binder: Qv.GetCurrentDocument().binder
	});
}

/**
 * @name $RemoveBookmarkQva {function}
 * Open native Remove Bookmark modal via {Qva.binder}.
 */
function $RemoveBookmarkQva() {

	Qva.ContextClientAction({
		clientAction: "modal",
		param: "removebm",
		name: "REMBM",
		binder: Qv.GetCurrentDocument().binder
	});
}

},{}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.$OpenRepositoryAjax = $OpenRepositoryAjax;
/**
 * @name $OpenRepositoryAjax {function}
 * Open native Repository modal via $.ajax.
 *
 * @param defFilter {number} 0-3 - Deprecated.
 * @param callback {function} Callback function. - Deprecated.
 *
 * @note Repo can be opened only with fake request to QlikView ASP.NET Client.
 *      Reason is remote repository, QlikView open repository only after ASP.NET QlikView client request.
 *      We always have jQuery.
 * @url https://community.qlik.com/docs/DOC-2639
 */
function $OpenRepositoryAjax(defFilter, callback) {

	var binder = Qv.GetCurrentDocument().binder,
	    mark = binder.Mark,
	    stamp = binder.Stamp,
	    view = binder.View,
	    repoFilter = defFilter > 3 && defFilter < 0 ? 0 : defFilter;

	var initRepoData = '<update\n\t        mark="' + mark + '"\n\t        stamp="' + stamp + '"\n\t        cookie="true"\n\t        scope="Document"\n\t        view="' + view + '"\n\t        ident="null">\n\t            <set name="Document.StandardActions.REPOSITORY" action="" clientsizeWH="" position="" cursor="" />\n\t        </update>',
	    showRepoData = '<update\n\t        mark="' + mark + '"\n\t        stamp="' + stamp + '"\n\t        cookie="true"\n\t        scope="Document"\n\t        view="' + view + '"\n\t        ident="null">\n\t            <set name="Document.TOOLS\\REPOSITORY.Filter"\n\t            value="' + repoFilter + '" />\n\t        </update>';

	var initRepository = function initRepository() {
		return new Promise(function (resolve, reject) {
			$.ajax({
				url: '/QvAjaxZfc/QvsViewClient.aspx?mark=' + mark + '&view=' + view,
				data: initRepoData,
				type: 'POST',
				contentType: "text/plain;charset=UTF-8",
				dataType: "text",
				success: function success() {
					resolve();
				},
				error: function error() {
					reject();
				}
			});
		});
	};

	var showRepository = function showRepository() {
		return new Promise(function (resolve, reject) {
			$.ajax({
				url: '/QvAjaxZfc/QvsViewClient.aspx?mark=' + mark + '&view=' + view,
				data: showRepoData,
				type: 'POST',
				contentType: "text/plain;charset=UTF-8",
				dataType: "text",
				success: function success() {
					resolve();
				},
				error: function error() {
					reject();
				}
			});
		});
	};

	Promise.all([initRepository(), showRepository()]).then(function () {
		if (typeof callback == 'function') {
			return callback();
		}
	});
}

},{}],6:[function(require,module,exports){
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
}

/**
 * @name $Repository
 * Open native Repository modal.
 */
function $ShowFields() {
  (0, _Util.$QvaToolbarAction)('SHOWFIELDS');
}

},{"../util/Util":7}],7:[function(require,module,exports){
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

},{}],8:[function(require,module,exports){
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

},{"./core/Core":1}]},{},[8])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmNcXGNvcmVcXENvcmUuanMiLCJzcmNcXGNvcmVcXGFkZGl0aW9uXFxFbWFpbEJvb2ttYXJrLmpzIiwic3JjXFxjb3JlXFxhZGRpdGlvblxcU2VsZWN0TGlzdEJveFZhbHVlcy5qcyIsInNyY1xcY29yZVxcZGV2ZWxvcG1lbnRcXEJvb2ttYXJrcy5qcyIsInNyY1xcY29yZVxcZGV2ZWxvcG1lbnRcXFJlcG9zaXRvcnkuanMiLCJzcmNcXGNvcmVcXG5hdGl2ZVxcVG9vbGJhckFjdGlvbnMuanMiLCJzcmNcXGNvcmVcXHV0aWxcXFV0aWwuanMiLCJzcmNcXFF2ZXQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7QUNLQSxBQUNDLEFBQWMsQUFBaUIsQUFDL0IsQUFDQSxBQUNBLEFBQ007O0FBS1AsQUFBUSxBQUFpQixBQUF5Qjs7QUFDbEQsQUFBUSxBQUEwQjs7QUFLbEMsQUFBUSxBQUFvQjs7QUFDNUIsQUFBUSxBQUEwQixBQUVsQyxBQUFPOzs7O0FBeEJQLElBQU0sVUFBTixBQUFnQjs7Ozs7Ozs7Ozs7Ozs7OztJQXdCVCxBQUFNLEFBQVMsQUFFckI7O0FBQWEsQUFDWjs7T0FBQSxBQUFLOztBQUNNLEFBQ0gsQUFDTjtBQUZTLEFBRUEsQUFDVDtBQUpZLEFBQ0gsQUFHRCxBQUVUO0FBTFUsQUFDVDtBQUZZLEFBTUksQUFDakI7QUFQYSxBQU9BLEFBQ2I7QUFSRCxBQUFjLEFBUUksQUFJbEI7QUFaYyxBQUNiOzs7T0FXRCxBQUFLOztBQUNPLEFBQ0osQUFDTjtBQUhpQixBQUNQLEFBRUQsQUFFVjtBQUpXLEFBQ1Y7QUFGRixBQUFtQixBQUtELEFBT2xCO0FBWm1CLEFBQ2xCOzs7Ozs7QUFhRjs7OzsrQkFBWSxBQUNYO1VBQU8sUUFBQSxBQUFRLElBQUksbUJBQW5CLEFBQU8sQUFBK0IsQUFDdEM7QUFFRDs7O29DQUFBLEFBQWtCLFFBQWxCLEFBQTBCLGFB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QUFDckI7Ozs7OztBQ25CRixBQUFRLEFBQWU7O0FBRXZCLENBQUMsVUFBQSxBQUFTLFFBQU8sQUFDaEI7S0FBSSxPQUFBLEFBQU8sUUFBUCxBQUFlLGVBQ2YsT0FBQSxBQUFPLFdBRFAsQUFDa0IsZUFDbEIsT0FBQSxBQUFPLFFBRlgsQUFFbUIsYUFDbEIsQUFDQTtVQUFBLEFBQVEsSUFBUixBQUFZLEFBQ1o7QUFMRCxRQUtLLEFBQ0o7TUFBRyxPQUFBLEFBQU8sU0FBVixBQUFvQixhQUFZLEFBQy9CO1VBQUEsQUFBTyxPQUFQLEFBQWMsQUFBSSxBQUNsQjtBQUZELFNBRU0sQUFDTDtXQUFBLEFBQVEsSUFBUixBQUFZLEFBQ1o7QUFDRDtBQUNEO0FBYkQsR0FBQSxBQWFHIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImNvbnN0IHZlcnNpb24gPSAnMC4wLjUnO1xyXG5cclxuLyoqXHJcbiAqIE5hdGl2ZS5cclxuICovXHJcbmltcG9ydCB7XHJcblx0JEFkZEJvb2ttYXJrLCAkUmVtb3ZlQm9va21hcmssICRFbWFpbEJvb2ttYXJrLFxyXG5cdCROZXdTaGVldE9iamVjdCxcclxuXHQkT3BlblJlcG9zaXRvcnksXHJcblx0JFNob3dGaWVsZHNcclxufSBmcm9tICcuL25hdGl2ZS9Ub29sYmFyQWN0aW9ucyc7XHJcblxyXG4vKipcclxuICogRGV2ZWxvcG1lbnQuXHJcbiAqL1xyXG5pbXBvcnQgeyRBZGRCb29rbWFya1F2YSwgJFJlbW92ZUJvb2ttYXJrUXZhfSBmcm9tICcuL2RldmVsb3BtZW50L0Jvb2ttYXJrcyc7XHJcbmltcG9ydCB7JE9wZW5SZXBvc2l0b3J5QWpheH0gZnJvbSAnLi9kZXZlbG9wbWVudC9SZXBvc2l0b3J5JztcclxuXHJcbi8qKlxyXG4gKiBBZGRpdGlvbi5cclxuICovXHJcbmltcG9ydCB7RW1haWxCb29rbWFya30gZnJvbSAnLi9hZGRpdGlvbi9FbWFpbEJvb2ttYXJrJztcclxuaW1wb3J0IHtTZWxlY3RMaXN0Qm94VmFsdWVzfSBmcm9tICcuL2FkZGl0aW9uL1NlbGVjdExpc3RCb3hWYWx1ZXMnO1xyXG5cclxuZXhwb3J0IGNsYXNzIFF2ZXRDb3JlIHtcclxuXHRcclxuXHRjb25zdHJ1Y3Rvcigpe1xyXG5cdFx0dGhpcy5uYXRpdmUgPSB7XHJcblx0XHRcdGJvb2ttYXJrczp7XHJcblx0XHRcdFx0JGFkZDogJEFkZEJvb2ttYXJrLFxyXG5cdFx0XHRcdCRyZW1vdmU6ICRSZW1vdmVCb29rbWFyayxcclxuXHRcdFx0XHQkZW1haWw6ICRFbWFpbEJvb2ttYXJrXHJcblx0XHRcdH0sXHJcblx0XHRcdCRvcGVuUmVwb3NpdG9yeTogJE9wZW5SZXBvc2l0b3J5LFxyXG5cdFx0XHQkc2hvd0ZpZWxkczogJFNob3dGaWVsZHMsXHJcblx0XHRcdCRuZXdTaGVldE9iamVjdDogJE5ld1NoZWV0T2JqZWN0XHJcblx0XHR9O1xyXG5cdFx0XHJcblx0XHQvLyBUT0RPOiBEZXYgdmVyc2lvbnMgZm9yIFF2YSBhbmQgJC5hamF4IHdoZW4gdG9vbGJhciBub3QgaW5pdGlhbGl6ZWQuXHJcblx0XHR0aGlzLmRldmVsb3BtZW50ID0ge1xyXG5cdFx0XHRib29rbWFya3M6IHtcclxuXHRcdFx0XHQkYWRkOiAkQWRkQm9va21hcmtRdmEsXHJcblx0XHRcdFx0JHJlbW92ZTogJFJlbW92ZUJvb2ttYXJrUXZhXHJcblx0XHRcdH0sXHJcblx0XHRcdCRvcGVuUmVwb3NpdG9yeTogJE9wZW5SZXBvc2l0b3J5QWpheFxyXG5cdFx0fTtcclxuXHJcblx0XHQvLyAvLyB0aGlzLnNlbGVjdExpc3RCb3hWYWx1ZXM6IFxyXG5cdFx0Ly8gc2VsZWN0TGlzdEJveFZhbHVlcygpe1xyXG5cdFx0Ly9cclxuXHRcdC8vIH1cclxuXHR9XHJcblxyXG5cdGdldFZlcnNpb24oKXtcclxuXHRcdHJldHVybiBjb25zb2xlLmxvZygnUXZldCB2ZXJzaW9uOiAnICsgdmVyc2lvbik7XHJcblx0fVxyXG5cclxuXHRzZW5kRW1haWxCb29rbWFyayhjb25maWcsIGV4dHJhUGFyYW1zKXtcclxuXHRcdHJldHVybiBuZXcgRW1haWxCb29rbWFyayhjb25maWcsIGV4dHJhUGFyYW1zKS5jcmVhdGVCb29rbWFyaygpLm9wZW5FbWFpbFdpbmRvdygpO1xyXG5cdH1cclxuXHJcblx0c2VsZWN0TGlzdEJveFZhbHVlcyhsaXN0Qm94QXJyYXkpe1xyXG5cdFx0cmV0dXJuIFNlbGVjdExpc3RCb3hWYWx1ZXMobGlzdEJveEFycmF5LCAwKVxyXG5cdH1cclxufSIsImltcG9ydCB7JHR2fSBmcm9tICcuLi91dGlsL1V0aWwnO1xyXG5cclxuLyoqXHJcbiAqIEVtYWlsIFFsaWtWaWV3IEJvb2ttYXJrLlxyXG4gKiBcclxuICogQGNvbnN0cnVjdG9yXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgRW1haWxCb29rbWFyayB7XHJcblx0XHJcblx0XHJcblx0LyoqXHJcblx0ICogIENvbmZpZy5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBjb25maWcge29iamVjdH1cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBjb25maWcuZW1haWxTdWJqZWN0IHtzdHJpbmd9XHJcblx0ICogQHBhcmFtIGNvbmZpZy5uYW1lIHtzdHJpbmd9XHJcblx0ICogQHBhcmFtIGNvbmZpZy5zaGFyZWQge2Jvb2xlYW59XHJcblx0ICogQHBhcmFtIGNvbmZpZy5leGNsdWRlU2VsZWN0aW9ucyB7Ym9vbGVhbn1cclxuXHQgKiBAcGFyYW0gY29uZmlnLmluY2x1ZGVTdGF0ZSB7Ym9vbGVhbn1cclxuXHQgKiBAcGFyYW0gY29uZmlnLm5vdERpc3BsYXllZCB7Ym9vbGVhbn1cclxuXHQgKiBAcGFyYW0gY29uZmlnLmRlc2NyaXB0aW9uU2hvdyB7Ym9vbGVhbn1cclxuXHQgKiBAcGFyYW0gY29uZmlnLmRlc2NyaXB0aW9uTXNnIHtzdHJpbmd9XHJcblx0ICogQHBhcmFtIGNvbmZpZy5zYXZlSW5wdXRWYWx1ZXMge2Jvb2xlYW59XHJcblx0ICpcclxuXHQgKiAgRXh0cmEgUGFyYW1zLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIGV4dHJhUGFyYW1zIHtvYmplY3R9XHJcblx0ICogQHBhcmFtIGV4dHJhUGFyYW1zLmV4dHJhVXJpIHtzdHJpbmd9XHJcblx0ICogQHBhcmFtIGV4dHJhUGFyYW1zLmVtYWlsV2luZG93TW9kZSB7Ym9vbGVhbn1cclxuXHQgKi9cclxuXHRjb25zdHJ1Y3Rvcihjb25maWcsIGV4dHJhUGFyYW1zKSB7XHJcblx0XHRcclxuXHRcdGxldCBkZWZhdWx0Q29uZmlnID0ge1xyXG5cdFx0XHRlbWFpbFN1YmplY3Q6IFwiXCIsXHJcblx0XHRcdG5hbWU6IFwiRW1haWwgQm9va21hcmtcIiwgLyoqIE5hbWUgb2YgdGhlIGFkZGl0aW9uLiAqL1xyXG5cdFx0XHRzaGFyZWQ6IHRydWUsIC8qKiBTaGFyZSB0aGUgYWRkaXRpb24gd2l0aCBvdGhlciB1c2Vycy4gKi9cclxuXHRcdFx0ZXhjbHVkZVNlbGVjdGlvbnM6IGZhbHNlLCAvKiogRXhjbHVkZSB0aGUgc2VsZWN0aW9ucyBtYWRlIGluIHRoZSBhcHBsaWNhdGlvbi4gKi9cclxuXHRcdFx0aW5jbHVkZVN0YXRlOiB0cnVlLCAvKiogSW5jbHVkZSBzdGF0ZSBvZiBhbGwgb2JqZWN0cy4gKi9cclxuXHRcdFx0bm90RGlzcGxheWVkOiBmYWxzZSwgLyoqIFRoZSBhZGRpdGlvbiBpcyBub3QgZGlzcGxheWVkIGluIHRoZSBhZGRpdGlvbiBsaXN0IGJ1dCBpcyBzdGlsbCBzZWxlY3RhYmxlIGluIGNvZGUgb3IgdmlhIHVybC4gKi9cclxuXHRcdFx0ZGVzY3JpcHRpb25TaG93OiBmYWxzZSwgLyoqIFRoZSBhZGRpdGlvbiBkZXNjcmlwdGlvbiB3aWxsIGJlIHNob3duIGluIGEgbWVzc2FnZSB3aGVuIHRoZSBhZGRpdGlvbiBpcyBzZWxlY3RlZC4gKi9cclxuXHRcdFx0ZGVzY3JpcHRpb25Nc2c6IFwiXCIsIC8qKiBEZXNjcmlwdGlvbiBvZiB0aGUgYWRkaXRpb24uICovXHJcblx0XHRcdHNhdmVJbnB1dFZhbHVlczogdHJ1ZSAvKiogSW5jbHVkZSB2YWx1ZXMgaW4gaW5wdXQgZmllbGRzLiovXHJcblx0XHR9O1xyXG5cdFxyXG5cdFx0dGhpcy5kZWZhdWxRdkFqeFpmYyA9ICcvUXZBSkFYWmZjL29wZW5kb2MuaHRtP2RvY3VtZW50PSc7XHJcblx0XHRcclxuXHRcdC8qKiBUaGUgYWRkaXRpb24gaXMgYXBwbGllZCBvbiB0b3Agb2YgYW55IHByZXZpb3VzIHNlbGVjdGlvbnMgKG5vIGNsZWFyKS4qL1xyXG5cdFx0dGhpcy5hcHBsaWVkID0gdHJ1ZTtcclxuXHRcdHRoaXMuZG9jID0gUXYuR2V0Q3VycmVudERvY3VtZW50KCk7XHJcblx0XHR0aGlzLmJvb2ttYXJrSWQgPSAnJztcclxuXHRcdFxyXG5cdFxyXG5cdFx0LyoqXHJcblx0XHQgKiBJbXBvcnRhbnQgcGFyYW1zLlxyXG5cdFx0ICogQHR5cGUgeyp8c3RyaW5nfVxyXG5cdFx0ICovXHJcblx0XHRpZiAoJHR2KGNvbmZpZywgJ29iamVjdCcpKXtcclxuXHRcdFx0dGhpcy5lbWFpbFN1YmplY3QgPSBjb25maWcuZW1haWxTdWJqZWN0IHx8IGRlZmF1bHRDb25maWcuZW1haWxTdWJqZWN0O1xyXG5cdFx0XHR0aGlzLm5hbWUgPSBjb25maWcubmFtZSB8fCBkZWZhdWx0Q29uZmlnLm5hbWU7XHJcblx0XHRcdHRoaXMuc2hhcmVkID0gY29uZmlnLnNoYXJlZCB8fCBkZWZhdWx0Q29uZmlnLnNoYXJlZDtcclxuXHRcdFx0dGhpcy5leGNsdWRlU2VsZWN0aW9ucyA9IGNvbmZpZy5leGNsdWRlU2VsZWN0aW9ucyB8fCBkZWZhdWx0Q29uZmlnLmV4Y2x1ZGVTZWxlY3Rpb25zO1xyXG5cdFx0XHR0aGlzLmluY2x1ZGVTdGF0ZSA9IGNvbmZpZy5pbmNsdWRlU3RhdGUgfHwgZGVmYXVsdENvbmZpZy5pbmNsdWRlU3RhdGU7XHJcblx0XHRcdHRoaXMubm90RGlzcGxheWVkID0gY29uZmlnLm5vdERpc3BsYXllZCB8fCBkZWZhdWx0Q29uZmlnLm5vdERpc3BsYXllZDtcclxuXHRcdFx0dGhpcy5kZXNjcmlwdGlvblNob3cgPSBjb25maWcuZGVzY3JpcHRpb25TaG93IHx8IGRlZmF1bHRDb25maWcuZGVzY3JpcHRpb25TaG93O1xyXG5cdFx0XHR0aGlzLmRlc2NyaXB0aW9uTXNnID0gY29uZmlnLmRlc2NyaXB0aW9uTXNnIHx8IGRlZmF1bHRDb25maWcuZGVzY3JpcHRpb25Nc2c7XHJcblx0XHRcdHRoaXMuc2F2ZUlucHV0VmFsdWVzID0gY29uZmlnLnNhdmVJbnB1dFZhbHVlcyB8fCBkZWZhdWx0Q29uZmlnLnNhdmVJbnB1dFZhbHVlcztcclxuXHRcdH1lbHNle1xyXG5cdFx0XHRmb3IgKGxldCBrZXkgaW4gZGVmYXVsdENvbmZpZyl7XHJcblx0XHRcdFx0aWYgKGRlZmF1bHRDb25maWcuaGFzT3duUHJvcGVydHkoa2V5KSlcclxuXHRcdFx0XHRcdHRoaXNba2V5XSA9IGRlZmF1bHRDb25maWdba2V5XTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFxyXG5cdFx0LyoqXHJcblx0XHQgKiBFeHRyYSBwYXJhbXMuXHJcblx0XHQgKlxyXG5cdFx0ICogQHBhcmFtIGV4dHJhVXJpIHtzdHJpbmd9IFVzZSBpdCBmb3IgYWRkIHBhcmVudCB1cmwgdG8geW91ciBRbGlrVmlldyBBU1AuTkVUIGNsaWVudC4gVE9ETzogSW4gRGV2ZWxvcG1lbnQuXHJcblx0XHQgKiBAcGFyYW0gZW1haWxXaW5kb3dNb2RlIHtib29sZWFufSBCeSBkZWZhdWx0IGFkZGl0aW9uIHdpbGwgb3BlbiBlbWFpbCBpbiBuZXcgd2luZG93LFxyXG5cdFx0ICogYnV0IHlvdSBjYW4gY2hhbmdlIGl0IHRvIHtmYWxzZX0gYW5kIGVtYWlsIHdpbmRvdyB3aWxsIGJlIG9wZW5lZCBvbiBzYW1lIGRvbWFpbi5cclxuXHRcdCAqL1xyXG5cdFx0aWYgKCR0dihleHRyYVBhcmFtcywgJ29iamVjdCcpKXtcclxuXHRcdFx0dGhpcy5leHRyYVVyaSA9IGV4dHJhUGFyYW1zLmV4dHJhVXJpIHx8ICcnO1xyXG5cdFx0XHR0aGlzLmVtYWlsV2luZG93TW9kZSA9IGV4dHJhUGFyYW1zLmVtYWlsV2luZG93TW9kZSB8fCB0cnVlO1xyXG5cdFx0fWVsc2V7XHJcblx0XHRcdHRoaXMuZXh0cmFVcmkgPSAnJztcclxuXHRcdFx0dGhpcy5lbWFpbFdpbmRvd01vZGUgPSB0cnVlO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblxyXG5cdC8qKlxyXG5cdCAqIFVzZSBuYXRpdmUgQm9va21hcmtzIENsYXNzXHJcblx0ICogZm9yIGNyZWF0ZSBhZGRpdGlvbiBiZWZvcmUgZW1haWwgaXQuXHJcblx0ICpcclxuXHQgKiBAZXh0ZW5kcyB7fVxyXG5cdCAqL1xyXG5cdGNyZWF0ZUJvb2ttYXJrKCl7XHJcblxyXG5cdFx0dGhpcy5kb2NcclxuXHRcdFx0LkJvb2ttYXJrcygpXHJcblx0XHRcdC5OZXdCb29rbWFyayhcclxuXHRcdFx0XHR0aGlzLm5hbWUsXHJcblx0XHRcdFx0dGhpcy5hcHBsaWVkLFxyXG5cdFx0XHRcdHRoaXMuc2hhcmVkLFxyXG5cdFx0XHRcdHRoaXMuZXhjbHVkZVNlbGVjdGlvbnMsXHJcblx0XHRcdFx0dGhpcy5pbmNsdWRlU3RhdGUsXHJcblx0XHRcdFx0dGhpcy5ub3REaXNwbGF5ZWQsXHJcblx0XHRcdFx0dGhpcy5kZXNjcmlwdGlvblNob3csXHJcblx0XHRcdFx0dGhpcy5kZXNjcmlwdGlvbk1zZyxcclxuXHRcdFx0XHR0aGlzLnNhdmVJbnB1dFZhbHVlc1xyXG5cdFx0XHQpO1xyXG5cclxuXHRcdHRoaXMuYm9va21hcmtJZCA9IHRoaXMuZG9jLkJvb2ttYXJrcygpLkJvb2tNYXJrc1t0aGlzLmRvYy5Cb29rbWFya3MoKS5Cb29rTWFya3MubGVuZ3RoLTFdLnZhbHVlO1xyXG5cdFx0XHJcblx0XHRyZXR1cm4gdGhpcztcclxuXHR9O1xyXG5cclxuXHRvcGVuRW1haWxXaW5kb3coKXtcclxuXHRcdFxyXG5cdFx0bGV0IHVyaSA9IHRoaXMuZXh0cmFVcmkgK1xyXG5cdFx0XHR3aW5kb3cubG9jYXRpb24ub3JpZ2luICtcclxuXHRcdFx0dGhpcy5kZWZhdWxRdkFqeFpmYyArXHJcblx0XHRcdHRoaXMuZG9jLmJpbmRlci5WaWV3ICtcclxuXHRcdFx0JyZhZGRpdGlvbj0nK1xyXG5cdFx0XHR0aGlzLmJvb2ttYXJrSWQ7XHJcblx0XHRcclxuXHRcdGxldCB1cmlfZW5jID0gZW5jb2RlVVJJQ29tcG9uZW50KHVyaSkucmVwbGFjZSgvJTIwL2csIFwiJTI1MjBcIiksXHJcblx0XHRcdG1haWxlciA9ICdtYWlsdG86P3N1YmplY3Q9Jyt0aGlzLmVtYWlsU3ViamVjdCsnJmJvZHk9Jyt1cmlfZW5jO1xyXG5cclxuXHRcdHRoaXMuZW1haWxXaW5kb3dNb2RlID8gd2luZG93LmxvY2F0aW9uLmhyZWYgPSBtYWlsZXIgOiBsb2NhdGlvbi5ocmVmID0gbWFpbGVyO1xyXG5cdFx0XHJcblx0XHRyZXR1cm4gdGhpcztcclxuXHR9XHJcbn0iLCIvKipcclxuICogQG5hbWUgU2VsZWN0TGlzdEJveFZhbHVlcyB7ZnVuY3Rpb259XHJcbiAqIFJlY3Vyc2l2ZSBzZWxlY3Rpb24gdmFsdWVzIGluIGxpc3RCb3guXHJcbiAqXHJcbiAqIEBub3RlIFdvcmtzIG9ubHkgd2l0aCBhdmFpbGFibGUgbGlzdEJveGVzLlxyXG4gKiBcclxuICogQHBhcmFtIGxpc3RCb3hBcnJheSB7QXJyYXl9XHJcbiAqIEBwYXJhbSBpbmRleCB7bnVtYmVyfVxyXG4gKi9cclxuZXhwb3J0IGxldCBTZWxlY3RMaXN0Qm94VmFsdWVzID0gKGxpc3RCb3hBcnJheSwgaW5kZXgpID0+IHtcclxuXHRpZiAoaW5kZXggPCBsaXN0Qm94QXJyYXkubGVuZ3RoKXtcclxuXHRcdHF2YS5HZXRRdk9iamVjdChsaXN0Qm94QXJyYXlbaW5kZXhdLm5hbWUsXHJcblx0XHRcdGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0XHR0aGlzLmNhbGxiYWNrRm4gPSBmdW5jdGlvbiAoKSB7fTtcclxuXHRcdFx0XHR0aGlzLkRhdGEuU2VsZWN0VGV4dHMobGlzdEJveEFycmF5W2luZGV4XS52YWx1ZXMpO1xyXG5cdFx0XHRcdGluZGV4ICsrO1xyXG5cdFx0XHRcdFNlbGVjdExpc3RCb3hWYWx1ZXMobGlzdEJveEFycmF5LCBpbmRleCk7XHJcblx0XHRcdH0sXHJcblx0XHRcdHRoaXMpO1xyXG5cdH1cclxufTsiLCIvKipcclxuICogQG5hbWUgJEFkZEJvb2ttYXJrUXZhIHtmdW5jdGlvbn1cclxuICogT3BlbiBuYXRpdmUgQWRkIEJvb2ttYXJrIG1vZGFsIHZpYSB7UXZhLmJpbmRlcn0uXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gJEFkZEJvb2ttYXJrUXZhKCkge1xyXG5cclxuXHRRdmEuQ29udGV4dENsaWVudEFjdGlvbih7XHJcblx0XHRjbGllbnRBY3Rpb246IFwibW9kYWxcIixcclxuXHRcdHBhcmFtOiBcImJtXCIsXHJcblx0XHRuYW1lOiBcIkFEREJNXCIsXHJcblx0XHRiaW5kZXI6IFF2LkdldEN1cnJlbnREb2N1bWVudCgpLmJpbmRlclxyXG5cdH0pO1xyXG59XHJcblxyXG4vKipcclxuICogQG5hbWUgJFJlbW92ZUJvb2ttYXJrUXZhIHtmdW5jdGlvbn1cclxuICogT3BlbiBuYXRpdmUgUmVtb3ZlIEJvb2ttYXJrIG1vZGFsIHZpYSB7UXZhLmJpbmRlcn0uXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gJFJlbW92ZUJvb2ttYXJrUXZhKCkge1xyXG5cclxuXHRRdmEuQ29udGV4dENsaWVudEFjdGlvbih7XHJcblx0XHRjbGllbnRBY3Rpb246IFwibW9kYWxcIixcclxuXHRcdHBhcmFtOiBcInJlbW92ZWJtXCIsXHJcblx0XHRuYW1lOiBcIlJFTUJNXCIsXHJcblx0XHRiaW5kZXI6IFF2LkdldEN1cnJlbnREb2N1bWVudCgpLmJpbmRlclxyXG5cdH0pO1xyXG59IiwiLyoqXHJcbiAqIEBuYW1lICRPcGVuUmVwb3NpdG9yeUFqYXgge2Z1bmN0aW9ufVxyXG4gKiBPcGVuIG5hdGl2ZSBSZXBvc2l0b3J5IG1vZGFsIHZpYSAkLmFqYXguXHJcbiAqXHJcbiAqIEBwYXJhbSBkZWZGaWx0ZXIge251bWJlcn0gMC0zIC0gRGVwcmVjYXRlZC5cclxuICogQHBhcmFtIGNhbGxiYWNrIHtmdW5jdGlvbn0gQ2FsbGJhY2sgZnVuY3Rpb24uIC0gRGVwcmVjYXRlZC5cclxuICpcclxuICogQG5vdGUgUmVwbyBjYW4gYmUgb3BlbmVkIG9ubHkgd2l0aCBmYWtlIHJlcXVlc3QgdG8gUWxpa1ZpZXcgQVNQLk5FVCBDbGllbnQuXHJcbiAqICAgICAgUmVhc29uIGlzIHJlbW90ZSByZXBvc2l0b3J5LCBRbGlrVmlldyBvcGVuIHJlcG9zaXRvcnkgb25seSBhZnRlciBBU1AuTkVUIFFsaWtWaWV3IGNsaWVudCByZXF1ZXN0LlxyXG4gKiAgICAgIFdlIGFsd2F5cyBoYXZlIGpRdWVyeS5cclxuICogQHVybCBodHRwczovL2NvbW11bml0eS5xbGlrLmNvbS9kb2NzL0RPQy0yNjM5XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gJE9wZW5SZXBvc2l0b3J5QWpheChkZWZGaWx0ZXIsIGNhbGxiYWNrKSB7XHJcblxyXG5cdCBsZXQgYmluZGVyID0gUXYuR2V0Q3VycmVudERvY3VtZW50KCkuYmluZGVyLFxyXG5cdFx0IG1hcmsgPSBiaW5kZXIuTWFyayxcclxuXHRcdCBzdGFtcCA9IGJpbmRlci5TdGFtcCxcclxuXHRcdCB2aWV3ID0gYmluZGVyLlZpZXcsXHJcblx0XHQgcmVwb0ZpbHRlciA9IGRlZkZpbHRlciA+IDMgJiYgZGVmRmlsdGVyIDwgMCA/IDAgOiBkZWZGaWx0ZXI7XHJcblxyXG5cdCBsZXQgaW5pdFJlcG9EYXRhID0gYDx1cGRhdGVcclxuXHQgICAgICAgIG1hcms9XCJgKyBtYXJrICtgXCJcclxuXHQgICAgICAgIHN0YW1wPVwiYCsgc3RhbXAgK2BcIlxyXG5cdCAgICAgICAgY29va2llPVwidHJ1ZVwiXHJcblx0ICAgICAgICBzY29wZT1cIkRvY3VtZW50XCJcclxuXHQgICAgICAgIHZpZXc9XCJgKyB2aWV3ICtgXCJcclxuXHQgICAgICAgIGlkZW50PVwibnVsbFwiPlxyXG5cdCAgICAgICAgICAgIDxzZXQgbmFtZT1cIkRvY3VtZW50LlN0YW5kYXJkQWN0aW9ucy5SRVBPU0lUT1JZXCIgYWN0aW9uPVwiXCIgY2xpZW50c2l6ZVdIPVwiXCIgcG9zaXRpb249XCJcIiBjdXJzb3I9XCJcIiAvPlxyXG5cdCAgICAgICAgPC91cGRhdGU+YCxcclxuXHQgc2hvd1JlcG9EYXRhID0gYDx1cGRhdGVcclxuXHQgICAgICAgIG1hcms9XCJgKyBtYXJrICtgXCJcclxuXHQgICAgICAgIHN0YW1wPVwiYCsgc3RhbXAgK2BcIlxyXG5cdCAgICAgICAgY29va2llPVwidHJ1ZVwiXHJcblx0ICAgICAgICBzY29wZT1cIkRvY3VtZW50XCJcclxuXHQgICAgICAgIHZpZXc9XCJgKyB2aWV3ICtgXCJcclxuXHQgICAgICAgIGlkZW50PVwibnVsbFwiPlxyXG5cdCAgICAgICAgICAgIDxzZXQgbmFtZT1cIkRvY3VtZW50LlRPT0xTXFxcXFJFUE9TSVRPUlkuRmlsdGVyXCJcclxuXHQgICAgICAgICAgICB2YWx1ZT1cImArIHJlcG9GaWx0ZXIgK2BcIiAvPlxyXG5cdCAgICAgICAgPC91cGRhdGU+YDtcclxuXHJcblxyXG5cdCBsZXQgaW5pdFJlcG9zaXRvcnkgPSAoKSA9PiB7XHJcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG5cdFx0XHQkLmFqYXgoe1xyXG5cdFx0XHRcdHVybDogJy9RdkFqYXhaZmMvUXZzVmlld0NsaWVudC5hc3B4P21hcms9JyArIG1hcmsgKyAnJnZpZXc9JyArIHZpZXcsXHJcblx0XHRcdFx0ZGF0YTogaW5pdFJlcG9EYXRhLFxyXG5cdFx0XHRcdHR5cGU6ICdQT1NUJyxcclxuXHRcdFx0XHRjb250ZW50VHlwZTogXCJ0ZXh0L3BsYWluO2NoYXJzZXQ9VVRGLThcIixcclxuXHRcdFx0XHRkYXRhVHlwZTogXCJ0ZXh0XCIsXHJcblx0XHRcdFx0c3VjY2VzcygpIHtcclxuXHRcdFx0XHRcdHJlc29sdmUoKTtcclxuXHRcdFx0XHR9LFxyXG5cdFx0XHRcdGVycm9yKCkge1xyXG5cdFx0XHRcdFx0cmVqZWN0KCk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KTtcclxuXHRcdH0pO1xyXG5cdH07XHJcblxyXG5cdCBsZXQgc2hvd1JlcG9zaXRvcnkgPSAoKSA9PiB7XHJcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG5cdFx0XHQkLmFqYXgoe1xyXG5cdFx0XHRcdHVybDogJy9RdkFqYXhaZmMvUXZzVmlld0NsaWVudC5hc3B4P21hcms9JyArIG1hcmsgKyAnJnZpZXc9JyArIHZpZXcsXHJcblx0XHRcdFx0ZGF0YTogc2hvd1JlcG9EYXRhLFxyXG5cdFx0XHRcdHR5cGU6ICdQT1NUJyxcclxuXHRcdFx0XHRjb250ZW50VHlwZTogXCJ0ZXh0L3BsYWluO2NoYXJzZXQ9VVRGLThcIixcclxuXHRcdFx0XHRkYXRhVHlwZTogXCJ0ZXh0XCIsXHJcblx0XHRcdFx0c3VjY2VzcygpIHtcclxuXHRcdFx0XHRcdHJlc29sdmUoKTtcclxuXHRcdFx0XHR9LFxyXG5cdFx0XHRcdGVycm9yKCkge1xyXG5cdFx0XHRcdFx0cmVqZWN0KCk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KTtcclxuXHRcdH0pO1xyXG5cdH07XHJcblxyXG5cdCBQcm9taXNlLmFsbChbXHJcblx0IGluaXRSZXBvc2l0b3J5KCksXHJcblx0IHNob3dSZXBvc2l0b3J5KClcclxuXHQgXSkudGhlbigoKSA9PiB7XHJcblx0XHRpZiAodHlwZW9mIGNhbGxiYWNrID09ICdmdW5jdGlvbicpe1xyXG5cdFx0XHRyZXR1cm4gY2FsbGJhY2soKVxyXG5cdFx0fVxyXG5cdH0pXHJcbn0iLCIvKipcclxuICogQG5vdGUgQWxsIGFjdGlvbnMgd2l0aCBhdmFpbGFibGUgVG9vbEJhci5cclxuICpcclxuICogJCgnI1F2QWpheFRvb2xiYXInKTtcclxuICovXHJcblxyXG5pbXBvcnQgeyRRdmFUb29sYmFyQWN0aW9ufSBmcm9tICcuLi91dGlsL1V0aWwnO1xyXG5cclxuLyoqXHJcbiAqIEBuYW1lICRTaG93RmllbGRzIHtmdW5jdGlvbn1cclxuICogT3BlbiBuYXRpdmUgU2hvdyBGaWVsZHMgbW9kYWwuXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gJEFkZEJvb2ttYXJrKCkge1xyXG5cdCRRdmFUb29sYmFyQWN0aW9uKCdBRERCTScpO1xyXG59XHJcblxyXG4vKipcclxuICogQG5hbWUgJFNob3dGaWVsZHMge2Z1bmN0aW9ufVxyXG4gKiBPcGVuIG5hdGl2ZSBTaG93IEZpZWxkcyBtb2RhbC5cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiAkUmVtb3ZlQm9va21hcmsoKSB7XHJcblx0JFF2YVRvb2xiYXJBY3Rpb24oJ1JFTUJNJyk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBAbmFtZSAkU2hvd0ZpZWxkcyB7ZnVuY3Rpb259XHJcbiAqIE9wZW4gbmF0aXZlIFNob3cgRmllbGRzIG1vZGFsLlxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uICRFbWFpbEJvb2ttYXJrKCkge1xyXG5cdCRRdmFUb29sYmFyQWN0aW9uKCdNQUlMQVNMSU5LJyk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBAbmFtZSAkU2hvd0ZpZWxkcyB7ZnVuY3Rpb259XHJcbiAqIE9wZW4gbmF0aXZlIFNob3duIEZpZWxkcyBtb2RhbC5cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiAkTmV3U2hlZXRPYmplY3QoKSB7XHJcblx0JFF2YVRvb2xiYXJBY3Rpb24oJ05FV1NIRUVUT0JKJyk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBAbmFtZSAkUmVwb3NpdG9yeVxyXG4gKiBPcGVuIG5hdGl2ZSBSZXBvc2l0b3J5IG1vZGFsLlxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uICRPcGVuUmVwb3NpdG9yeSgpIHtcclxuXHQkUXZhVG9vbGJhckFjdGlvbignUkVQT1NJVE9SWScpO1xyXG59XHJcblxyXG4vKipcclxuICogQG5hbWUgJFJlcG9zaXRvcnlcclxuICogT3BlbiBuYXRpdmUgUmVwb3NpdG9yeSBtb2RhbC5cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiAkU2hvd0ZpZWxkcygpIHtcclxuXHQkUXZhVG9vbGJhckFjdGlvbignU0hPV0ZJRUxEUycpO1xyXG59IiwiLyoqXHJcbiAqIFR5cGUgVmFsaWRhdG9yXHJcbiAqIFxyXG4gKiBAcGFyYW0gdmFyaWFibGUge29iamVjdHxib29sZWFufHN0cmluZ3xudW1iZXJ8ZnVuY3Rpb259XHJcbiAqIEBwYXJhbSB0eXBlIHtzdHJpbmd9XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gJHR2KHZhcmlhYmxlLCB0eXBlKXtcclxuXHRyZXR1cm4gdHlwZW9mIHZhcmlhYmxlID09PSB0eXBlO1xyXG59XHJcblxyXG4vKipcclxuICogUXZhRG9BY3Rpb25cclxuICogXHJcbiAqIEBkZXBlbmRlbmNpZXMge1F2YX1cclxuICogQHBhcmFtIGFjdGlvbl9uYW1lIHtzdHJpbmd9IC0gQWN0aW9uIE5hbWUsIGRlcGVuZCBvbiBRdmEuY3JlYXRlT3B0aW9ucy5cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiAkUXZhVG9vbGJhckFjdGlvbihhY3Rpb25fbmFtZSkge1xyXG5cdFxyXG5cdFF2YS5NZ3IubWVudS5kb0FjdGlvbih7XHJcblx0XHR0YXJnZXQ6ICcuY3R4LW1lbnUtYWN0aW9uLScrYWN0aW9uX25hbWVcclxuXHR9KTtcclxufSIsImltcG9ydCB7UXZldENvcmV9IGZyb20gJy4vY29yZS9Db3JlJztcclxuXHJcbihmdW5jdGlvbih3aW5kb3cpe1xyXG5cdGlmICh0eXBlb2YgUXZhID09PSAndW5kZWZpbmVkJ1xyXG5cdFx0JiYgdHlwZW9mIGpRdWVyeSA9PT0gJ3VuZGVmaW5lZCdcclxuXHRcdCYmIHR5cGVvZiBxdmEgPT09ICd1bmRlZmluZWQnXHJcblx0KXtcclxuXHRcdGNvbnNvbGUubG9nKFwiQ2FuJ3QgaW5pdCBRdmV0IGJlY2F1c2UgUXZhL2pRdWVyeS9xdmEgaXMgdW5kZWZpbmVkXCIpXHJcblx0fWVsc2V7XHJcblx0XHRpZih0eXBlb2YoUXZldCkgPT09ICd1bmRlZmluZWQnKXtcclxuXHRcdFx0d2luZG93LlF2ZXQgPSBuZXcgUXZldENvcmUoKTtcclxuXHRcdH0gZWxzZXtcclxuXHRcdFx0Y29uc29sZS5sb2coXCJRdmV0IGFscmVhZHkgZGVmaW5lZC5cIik7XHJcblx0XHR9XHJcblx0fVxyXG59KSh3aW5kb3cpOyJdfQ==
