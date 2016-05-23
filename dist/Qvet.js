/**
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
		value: function selectListBoxValues(listBoxArray, index, afterFn) {
			return (0, _SelectListBoxValues.SelectListBoxValues)(listBoxArray, index, afterFn);
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
'use strict';

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
 * @param listBoxArray {Array} - array of listBoxes and selections.
 * @param index {number} - starter index for selections
 * @param afterFn {function} - callback after selections will be done.
 */
var SelectListBoxValues = exports.SelectListBoxValues = function SelectListBoxValues(listBoxArray, index, afterFn) {
	if (index < listBoxArray.length) {
		qva.GetQvObject(listBoxArray[index].name, function () {
			this.callbackFn = function () {};
			this.Data.SelectTexts(listBoxArray[index].values);
			index++;
			SelectListBoxValues(listBoxArray, index, afterFn);
		}, _this);
	} else if (index === listBoxArray.length) {
		if (typeof afterFn === 'function') return afterFn();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmNcXGNvcmVcXENvcmUuanMiLCJzcmNcXGNvcmVcXGFkZGl0aW9uXFxFbWFpbEJvb2ttYXJrLmpzIiwic3JjXFxjb3JlXFxhZGRpdGlvblxcU2VsZWN0TGlzdEJveFZhbHVlcy5qcyIsInNyY1xcY29yZVxcZGV2ZWxvcG1lbnRcXEJvb2ttYXJrcy5qcyIsInNyY1xcY29yZVxcZGV2ZWxvcG1lbnRcXFJlcG9zaXRvcnkuanMiLCJzcmNcXGNvcmVcXG5hdGl2ZVxcVG9vbGJhckFjdGlvbnMuanMiLCJzcmNcXGNvcmVcXHV0aWxcXFV0aWwuanMiLCJzcmNcXFF2ZXQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7QUNLQSxBQUNDLEFBQWMsQUFBaUIsQUFDL0IsQUFDQSxBQUNBLEFBQ007O0FBS1AsQUFBUSxBQUFpQixBQUF5Qjs7QUFDbEQsQUFBUSxBQUEwQjs7QUFLbEMsQUFBUSxBQUFvQjs7QUFDNUIsQUFBUSxBQUEwQixBQUVsQyxBQUFPOzs7O0FBeEJQLElBQU0sVUFBTixBQUFnQjs7Ozs7Ozs7Ozs7Ozs7OztJQXdCVCxBQUFNLEFBQVMsQUFFckI7O0FBQWEsQUFDWjs7T0FBQSxBQUFLOztBQUNNLEFBQ0gsQUFDTjtBQUZTLEFBRUEsQUFDVDtBQUpZLEFBQ0gsQUFHRCxBQUVUO0FBTFUsQUFDVDtBQUZZLEFBTUksQUFDakI7QUFQYSxBQU9BLEFBQ2I7QUFSRCxBQUFjLEFBUUksQUFJbEI7QUFaYyxBQUNiOzs7T0FXRCxBQUFLOztBQUNPLEFBQ0osQUFDTjtBQUhpQixBQUNQLEFBRUQsQUFFVjtBQUpXLEFBQ1Y7QUFGRixBQUFtQixBQUtELEFBRWxCO0FBUG1CLEFBQ2xCO0FBUUY7Ozs7K0JBQVksQUFDWDtVQUFPLFFBQUEsQUFBUSxJQUFJLG1CQUFuQixBQUFPLEFBQStCLEFBQ3RDO0FBRUQ7OztvQ0FBQSxBQUFrQixRQUFsQixBQUEwQixhQUFZLEFB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QUFDbEM7U0FBTyxRQUFBLEFBQU8sZ0VBQWQsQUFBMkIsQUFDM0I7QUFRRDs7Ozs7Ozs7QUFBTywyQkFBQSxBQUEyQixhQUFhLEFBRTlDOztNQUFBLEFBQUksSUFBSixBQUFRLEtBQVIsQUFBYTtZQUNKLHNCQURULEFBQXNCLEFBQ08sQUFFN0I7QUFIc0IsQUFDckI7Ozs7OztBQ25CRixBQUFRLEFBQWU7O0FBRXZCLENBQUMsVUFBQSxBQUFTLFFBQU8sQUFDaEI7S0FBSSxPQUFBLEFBQU8sUUFBUCxBQUFlLGVBQ2YsT0FBQSxBQUFPLFdBRFAsQUFDa0IsZUFDbEIsT0FBQSxBQUFPLFFBRlgsQUFFbUIsYUFDbEIsQUFDQTtVQUFBLEFBQVEsSUFBUixBQUFZLEFBQ1o7QUFMRCxRQUtLLEFBQ0o7TUFBRyxPQUFBLEFBQU8sU0FBVixBQUFvQixhQUFZLEFBQy9CO1VBQUEsQUFBTyxPQUFQLEFBQWMsQUFBSSxBQUNsQjtBQUZELFNBRU0sQUFDTDtXQUFBLEFBQVEsSUFBUixBQUFZLEFBQ1o7QUFDRDtBQUNEO0FBYkQsR0FBQSxBQWFHIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImNvbnN0IHZlcnNpb24gPSAnMC4wLjUnO1xyXG5cclxuLyoqXHJcbiAqIE5hdGl2ZS5cclxuICovXHJcbmltcG9ydCB7XHJcblx0JEFkZEJvb2ttYXJrLCAkUmVtb3ZlQm9va21hcmssICRFbWFpbEJvb2ttYXJrLFxyXG5cdCROZXdTaGVldE9iamVjdCxcclxuXHQkT3BlblJlcG9zaXRvcnksXHJcblx0JFNob3dGaWVsZHNcclxufSBmcm9tICcuL25hdGl2ZS9Ub29sYmFyQWN0aW9ucyc7XHJcblxyXG4vKipcclxuICogRGV2ZWxvcG1lbnQuXHJcbiAqL1xyXG5pbXBvcnQgeyRBZGRCb29rbWFya1F2YSwgJFJlbW92ZUJvb2ttYXJrUXZhfSBmcm9tICcuL2RldmVsb3BtZW50L0Jvb2ttYXJrcyc7XHJcbmltcG9ydCB7JE9wZW5SZXBvc2l0b3J5QWpheH0gZnJvbSAnLi9kZXZlbG9wbWVudC9SZXBvc2l0b3J5JztcclxuXHJcbi8qKlxyXG4gKiBBZGRpdGlvbi5cclxuICovXHJcbmltcG9ydCB7RW1haWxCb29rbWFya30gZnJvbSAnLi9hZGRpdGlvbi9FbWFpbEJvb2ttYXJrJztcclxuaW1wb3J0IHtTZWxlY3RMaXN0Qm94VmFsdWVzfSBmcm9tICcuL2FkZGl0aW9uL1NlbGVjdExpc3RCb3hWYWx1ZXMnO1xyXG5cclxuZXhwb3J0IGNsYXNzIFF2ZXRDb3JlIHtcclxuXHRcclxuXHRjb25zdHJ1Y3Rvcigpe1xyXG5cdFx0dGhpcy5uYXRpdmUgPSB7XHJcblx0XHRcdGJvb2ttYXJrczp7XHJcblx0XHRcdFx0JGFkZDogJEFkZEJvb2ttYXJrLFxyXG5cdFx0XHRcdCRyZW1vdmU6ICRSZW1vdmVCb29rbWFyayxcclxuXHRcdFx0XHQkZW1haWw6ICRFbWFpbEJvb2ttYXJrXHJcblx0XHRcdH0sXHJcblx0XHRcdCRvcGVuUmVwb3NpdG9yeTogJE9wZW5SZXBvc2l0b3J5LFxyXG5cdFx0XHQkc2hvd0ZpZWxkczogJFNob3dGaWVsZHMsXHJcblx0XHRcdCRuZXdTaGVldE9iamVjdDogJE5ld1NoZWV0T2JqZWN0XHJcblx0XHR9O1xyXG5cdFx0XHJcblx0XHQvLyBUT0RPOiBEZXYgdmVyc2lvbnMgZm9yIFF2YSBhbmQgJC5hamF4IHdoZW4gdG9vbGJhciBub3QgaW5pdGlhbGl6ZWQuXHJcblx0XHR0aGlzLmRldmVsb3BtZW50ID0ge1xyXG5cdFx0XHRib29rbWFya3M6IHtcclxuXHRcdFx0XHQkYWRkOiAkQWRkQm9va21hcmtRdmEsXHJcblx0XHRcdFx0JHJlbW92ZTogJFJlbW92ZUJvb2ttYXJrUXZhXHJcblx0XHRcdH0sXHJcblx0XHRcdCRvcGVuUmVwb3NpdG9yeTogJE9wZW5SZXBvc2l0b3J5QWpheFxyXG5cdFx0fTtcclxuXHR9XHJcblxyXG5cdGdldFZlcnNpb24oKXtcclxuXHRcdHJldHVybiBjb25zb2xlLmxvZygnUXZldCB2ZXJzaW9uOiAnICsgdmVyc2lvbik7XHJcblx0fVxyXG5cclxuXHRzZW5kRW1haWxCb29rbWFyayhjb25maWcsIGV4dHJhUGFyYW1zKXtcclxuXHRcdHJldHVybiBuZXcgRW1haWxCb29rbWFyayhjb25maWcsIGV4dHJhUGFyYW1zKS5jcmVhdGVCb29rbWFyaygpLm9wZW5FbWFpbFdpbmRvdygpO1xyXG5cdH1cclxuXHJcblx0c2VsZWN0TGlzdEJveFZhbHVlcyhsaXN0Qm94QXJyYXksIGluZGV4LCBhZnRlckZuKXtcclxuXHRcdHJldHVybiBTZWxlY3RMaXN0Qm94VmFsdWVzKGxpc3RCb3hBcnJheSwgaW5kZXgsIGFmdGVyRm4pXHJcblx0fVxyXG59IiwiaW1wb3J0IHskdHZ9IGZyb20gJy4uL3V0aWwvVXRpbCc7XHJcblxyXG4vKipcclxuICogRW1haWwgUWxpa1ZpZXcgQm9va21hcmsuXHJcbiAqIFxyXG4gKiBAY29uc3RydWN0b3JcclxuICovXHJcbmV4cG9ydCBjbGFzcyBFbWFpbEJvb2ttYXJrIHtcclxuXHRcclxuXHRcclxuXHQvKipcclxuXHQgKiAgQ29uZmlnLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIGNvbmZpZyB7b2JqZWN0fVxyXG5cdCAqXHJcblx0ICogQHBhcmFtIGNvbmZpZy5lbWFpbFN1YmplY3Qge3N0cmluZ31cclxuXHQgKiBAcGFyYW0gY29uZmlnLm5hbWUge3N0cmluZ31cclxuXHQgKiBAcGFyYW0gY29uZmlnLnNoYXJlZCB7Ym9vbGVhbn1cclxuXHQgKiBAcGFyYW0gY29uZmlnLmV4Y2x1ZGVTZWxlY3Rpb25zIHtib29sZWFufVxyXG5cdCAqIEBwYXJhbSBjb25maWcuaW5jbHVkZVN0YXRlIHtib29sZWFufVxyXG5cdCAqIEBwYXJhbSBjb25maWcubm90RGlzcGxheWVkIHtib29sZWFufVxyXG5cdCAqIEBwYXJhbSBjb25maWcuZGVzY3JpcHRpb25TaG93IHtib29sZWFufVxyXG5cdCAqIEBwYXJhbSBjb25maWcuZGVzY3JpcHRpb25Nc2cge3N0cmluZ31cclxuXHQgKiBAcGFyYW0gY29uZmlnLnNhdmVJbnB1dFZhbHVlcyB7Ym9vbGVhbn1cclxuXHQgKlxyXG5cdCAqICBFeHRyYSBQYXJhbXMuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gZXh0cmFQYXJhbXMge29iamVjdH1cclxuXHQgKiBAcGFyYW0gZXh0cmFQYXJhbXMuZXh0cmFVcmkge3N0cmluZ31cclxuXHQgKiBAcGFyYW0gZXh0cmFQYXJhbXMuZW1haWxXaW5kb3dNb2RlIHtib29sZWFufVxyXG5cdCAqL1xyXG5cdGNvbnN0cnVjdG9yKGNvbmZpZywgZXh0cmFQYXJhbXMpIHtcclxuXHRcdFxyXG5cdFx0bGV0IGRlZmF1bHRDb25maWcgPSB7XHJcblx0XHRcdGVtYWlsU3ViamVjdDogXCJcIixcclxuXHRcdFx0bmFtZTogXCJFbWFpbCBCb29rbWFya1wiLCAvKiogTmFtZSBvZiB0aGUgYWRkaXRpb24uICovXHJcblx0XHRcdHNoYXJlZDogdHJ1ZSwgLyoqIFNoYXJlIHRoZSBhZGRpdGlvbiB3aXRoIG90aGVyIHVzZXJzLiAqL1xyXG5cdFx0XHRleGNsdWRlU2VsZWN0aW9uczogZmFsc2UsIC8qKiBFeGNsdWRlIHRoZSBzZWxlY3Rpb25zIG1hZGUgaW4gdGhlIGFwcGxpY2F0aW9uLiAqL1xyXG5cdFx0XHRpbmNsdWRlU3RhdGU6IHRydWUsIC8qKiBJbmNsdWRlIHN0YXRlIG9mIGFsbCBvYmplY3RzLiAqL1xyXG5cdFx0XHRub3REaXNwbGF5ZWQ6IGZhbHNlLCAvKiogVGhlIGFkZGl0aW9uIGlzIG5vdCBkaXNwbGF5ZWQgaW4gdGhlIGFkZGl0aW9uIGxpc3QgYnV0IGlzIHN0aWxsIHNlbGVjdGFibGUgaW4gY29kZSBvciB2aWEgdXJsLiAqL1xyXG5cdFx0XHRkZXNjcmlwdGlvblNob3c6IGZhbHNlLCAvKiogVGhlIGFkZGl0aW9uIGRlc2NyaXB0aW9uIHdpbGwgYmUgc2hvd24gaW4gYSBtZXNzYWdlIHdoZW4gdGhlIGFkZGl0aW9uIGlzIHNlbGVjdGVkLiAqL1xyXG5cdFx0XHRkZXNjcmlwdGlvbk1zZzogXCJcIiwgLyoqIERlc2NyaXB0aW9uIG9mIHRoZSBhZGRpdGlvbi4gKi9cclxuXHRcdFx0c2F2ZUlucHV0VmFsdWVzOiB0cnVlIC8qKiBJbmNsdWRlIHZhbHVlcyBpbiBpbnB1dCBmaWVsZHMuKi9cclxuXHRcdH07XHJcblx0XHJcblx0XHR0aGlzLmRlZmF1bFF2QWp4WmZjID0gJy9RdkFKQVhaZmMvb3BlbmRvYy5odG0/ZG9jdW1lbnQ9JztcclxuXHRcdFxyXG5cdFx0LyoqIFRoZSBhZGRpdGlvbiBpcyBhcHBsaWVkIG9uIHRvcCBvZiBhbnkgcHJldmlvdXMgc2VsZWN0aW9ucyAobm8gY2xlYXIpLiovXHJcblx0XHR0aGlzLmFwcGxpZWQgPSB0cnVlO1xyXG5cdFx0dGhpcy5kb2MgPSBRdi5HZXRDdXJyZW50RG9jdW1lbnQoKTtcclxuXHRcdHRoaXMuYm9va21hcmtJZCA9ICcnO1xyXG5cdFx0XHJcblx0XHJcblx0XHQvKipcclxuXHRcdCAqIEltcG9ydGFudCBwYXJhbXMuXHJcblx0XHQgKiBAdHlwZSB7KnxzdHJpbmd9XHJcblx0XHQgKi9cclxuXHRcdGlmICgkdHYoY29uZmlnLCAnb2JqZWN0Jykpe1xyXG5cdFx0XHR0aGlzLmVtYWlsU3ViamVjdCA9IGNvbmZpZy5lbWFpbFN1YmplY3QgfHwgZGVmYXVsdENvbmZpZy5lbWFpbFN1YmplY3Q7XHJcblx0XHRcdHRoaXMubmFtZSA9IGNvbmZpZy5uYW1lIHx8IGRlZmF1bHRDb25maWcubmFtZTtcclxuXHRcdFx0dGhpcy5zaGFyZWQgPSBjb25maWcuc2hhcmVkIHx8IGRlZmF1bHRDb25maWcuc2hhcmVkO1xyXG5cdFx0XHR0aGlzLmV4Y2x1ZGVTZWxlY3Rpb25zID0gY29uZmlnLmV4Y2x1ZGVTZWxlY3Rpb25zIHx8IGRlZmF1bHRDb25maWcuZXhjbHVkZVNlbGVjdGlvbnM7XHJcblx0XHRcdHRoaXMuaW5jbHVkZVN0YXRlID0gY29uZmlnLmluY2x1ZGVTdGF0ZSB8fCBkZWZhdWx0Q29uZmlnLmluY2x1ZGVTdGF0ZTtcclxuXHRcdFx0dGhpcy5ub3REaXNwbGF5ZWQgPSBjb25maWcubm90RGlzcGxheWVkIHx8IGRlZmF1bHRDb25maWcubm90RGlzcGxheWVkO1xyXG5cdFx0XHR0aGlzLmRlc2NyaXB0aW9uU2hvdyA9IGNvbmZpZy5kZXNjcmlwdGlvblNob3cgfHwgZGVmYXVsdENvbmZpZy5kZXNjcmlwdGlvblNob3c7XHJcblx0XHRcdHRoaXMuZGVzY3JpcHRpb25Nc2cgPSBjb25maWcuZGVzY3JpcHRpb25Nc2cgfHwgZGVmYXVsdENvbmZpZy5kZXNjcmlwdGlvbk1zZztcclxuXHRcdFx0dGhpcy5zYXZlSW5wdXRWYWx1ZXMgPSBjb25maWcuc2F2ZUlucHV0VmFsdWVzIHx8IGRlZmF1bHRDb25maWcuc2F2ZUlucHV0VmFsdWVzO1xyXG5cdFx0fWVsc2V7XHJcblx0XHRcdGZvciAobGV0IGtleSBpbiBkZWZhdWx0Q29uZmlnKXtcclxuXHRcdFx0XHRpZiAoZGVmYXVsdENvbmZpZy5oYXNPd25Qcm9wZXJ0eShrZXkpKVxyXG5cdFx0XHRcdFx0dGhpc1trZXldID0gZGVmYXVsdENvbmZpZ1trZXldO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHJcblx0XHQvKipcclxuXHRcdCAqIEV4dHJhIHBhcmFtcy5cclxuXHRcdCAqXHJcblx0XHQgKiBAcGFyYW0gZXh0cmFVcmkge3N0cmluZ30gVXNlIGl0IGZvciBhZGQgcGFyZW50IHVybCB0byB5b3VyIFFsaWtWaWV3IEFTUC5ORVQgY2xpZW50LiBUT0RPOiBJbiBEZXZlbG9wbWVudC5cclxuXHRcdCAqIEBwYXJhbSBlbWFpbFdpbmRvd01vZGUge2Jvb2xlYW59IEJ5IGRlZmF1bHQgYWRkaXRpb24gd2lsbCBvcGVuIGVtYWlsIGluIG5ldyB3aW5kb3csXHJcblx0XHQgKiBidXQgeW91IGNhbiBjaGFuZ2UgaXQgdG8ge2ZhbHNlfSBhbmQgZW1haWwgd2luZG93IHdpbGwgYmUgb3BlbmVkIG9uIHNhbWUgZG9tYWluLlxyXG5cdFx0ICovXHJcblx0XHRpZiAoJHR2KGV4dHJhUGFyYW1zLCAnb2JqZWN0Jykpe1xyXG5cdFx0XHR0aGlzLmV4dHJhVXJpID0gZXh0cmFQYXJhbXMuZXh0cmFVcmkgfHwgJyc7XHJcblx0XHRcdHRoaXMuZW1haWxXaW5kb3dNb2RlID0gZXh0cmFQYXJhbXMuZW1haWxXaW5kb3dNb2RlIHx8IHRydWU7XHJcblx0XHR9ZWxzZXtcclxuXHRcdFx0dGhpcy5leHRyYVVyaSA9ICcnO1xyXG5cdFx0XHR0aGlzLmVtYWlsV2luZG93TW9kZSA9IHRydWU7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHJcblx0LyoqXHJcblx0ICogVXNlIG5hdGl2ZSBCb29rbWFya3MgQ2xhc3NcclxuXHQgKiBmb3IgY3JlYXRlIGFkZGl0aW9uIGJlZm9yZSBlbWFpbCBpdC5cclxuXHQgKlxyXG5cdCAqIEBleHRlbmRzIHt9XHJcblx0ICovXHJcblx0Y3JlYXRlQm9va21hcmsoKXtcclxuXHJcblx0XHR0aGlzLmRvY1xyXG5cdFx0XHQuQm9va21hcmtzKClcclxuXHRcdFx0Lk5ld0Jvb2ttYXJrKFxyXG5cdFx0XHRcdHRoaXMubmFtZSxcclxuXHRcdFx0XHR0aGlzLmFwcGxpZWQsXHJcblx0XHRcdFx0dGhpcy5zaGFyZWQsXHJcblx0XHRcdFx0dGhpcy5leGNsdWRlU2VsZWN0aW9ucyxcclxuXHRcdFx0XHR0aGlzLmluY2x1ZGVTdGF0ZSxcclxuXHRcdFx0XHR0aGlzLm5vdERpc3BsYXllZCxcclxuXHRcdFx0XHR0aGlzLmRlc2NyaXB0aW9uU2hvdyxcclxuXHRcdFx0XHR0aGlzLmRlc2NyaXB0aW9uTXNnLFxyXG5cdFx0XHRcdHRoaXMuc2F2ZUlucHV0VmFsdWVzXHJcblx0XHRcdCk7XHJcblxyXG5cdFx0dGhpcy5ib29rbWFya0lkID0gdGhpcy5kb2MuQm9va21hcmtzKCkuQm9va01hcmtzW3RoaXMuZG9jLkJvb2ttYXJrcygpLkJvb2tNYXJrcy5sZW5ndGgtMV0udmFsdWU7XHJcblx0XHRcclxuXHRcdHJldHVybiB0aGlzO1xyXG5cdH07XHJcblxyXG5cdG9wZW5FbWFpbFdpbmRvdygpe1xyXG5cdFx0XHJcblx0XHRsZXQgdXJpID0gdGhpcy5leHRyYVVyaSArXHJcblx0XHRcdHdpbmRvdy5sb2NhdGlvbi5vcmlnaW4gK1xyXG5cdFx0XHR0aGlzLmRlZmF1bFF2QWp4WmZjICtcclxuXHRcdFx0dGhpcy5kb2MuYmluZGVyLlZpZXcgK1xyXG5cdFx0XHQnJmFkZGl0aW9uPScrXHJcblx0XHRcdHRoaXMuYm9va21hcmtJZDtcclxuXHRcdFxyXG5cdFx0bGV0IHVyaV9lbmMgPSBlbmNvZGVVUklDb21wb25lbnQodXJpKS5yZXBsYWNlKC8lMjAvZywgXCIlMjUyMFwiKSxcclxuXHRcdFx0bWFpbGVyID0gJ21haWx0bzo/c3ViamVjdD0nK3RoaXMuZW1haWxTdWJqZWN0KycmYm9keT0nK3VyaV9lbmM7XHJcblxyXG5cdFx0dGhpcy5lbWFpbFdpbmRvd01vZGUgPyB3aW5kb3cubG9jYXRpb24uaHJlZiA9IG1haWxlciA6IGxvY2F0aW9uLmhyZWYgPSBtYWlsZXI7XHJcblx0XHRcclxuXHRcdHJldHVybiB0aGlzO1xyXG5cdH1cclxufSIsIi8qKlxyXG4gKiBAbmFtZSBTZWxlY3RMaXN0Qm94VmFsdWVzIHtmdW5jdGlvbn1cclxuICogUmVjdXJzaXZlIHNlbGVjdGlvbiB2YWx1ZXMgaW4gbGlzdEJveC5cclxuICpcclxuICogQG5vdGUgV29ya3Mgb25seSB3aXRoIGF2YWlsYWJsZSBsaXN0Qm94ZXMuXHJcbiAqIFxyXG4gKiBAcGFyYW0gbGlzdEJveEFycmF5IHtBcnJheX0gLSBhcnJheSBvZiBsaXN0Qm94ZXMgYW5kIHNlbGVjdGlvbnMuXHJcbiAqIEBwYXJhbSBpbmRleCB7bnVtYmVyfSAtIHN0YXJ0ZXIgaW5kZXggZm9yIHNlbGVjdGlvbnNcclxuICogQHBhcmFtIGFmdGVyRm4ge2Z1bmN0aW9ufSAtIGNhbGxiYWNrIGFmdGVyIHNlbGVjdGlvbnMgd2lsbCBiZSBkb25lLlxyXG4gKi9cclxuZXhwb3J0IGxldCBTZWxlY3RMaXN0Qm94VmFsdWVzID0gKGxpc3RCb3hBcnJheSwgaW5kZXgsIGFmdGVyRm4pID0+IHtcclxuXHRpZiAoaW5kZXggPCBsaXN0Qm94QXJyYXkubGVuZ3RoKXtcclxuXHRcdHF2YS5HZXRRdk9iamVjdChsaXN0Qm94QXJyYXlbaW5kZXhdLm5hbWUsXHJcblx0XHRcdGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0XHR0aGlzLmNhbGxiYWNrRm4gPSBmdW5jdGlvbiAoKSB7fTtcclxuXHRcdFx0XHR0aGlzLkRhdGEuU2VsZWN0VGV4dHMobGlzdEJveEFycmF5W2luZGV4XS52YWx1ZXMpO1xyXG5cdFx0XHRcdGluZGV4ICsrO1xyXG5cdFx0XHRcdFNlbGVjdExpc3RCb3hWYWx1ZXMobGlzdEJveEFycmF5LCBpbmRleCwgYWZ0ZXJGbik7XHJcblx0XHRcdH0sXHJcblx0XHRcdHRoaXMpO1xyXG5cdH1lbHNlIGlmIChpbmRleCA9PT0gbGlzdEJveEFycmF5Lmxlbmd0aCl7XHJcblx0XHRpZiAodHlwZW9mIGFmdGVyRm4gPT09ICdmdW5jdGlvbicpXHJcblx0XHRcdHJldHVybiBhZnRlckZuKCk7XHJcblx0fVxyXG59OyIsIi8qKlxyXG4gKiBAbmFtZSAkQWRkQm9va21hcmtRdmEge2Z1bmN0aW9ufVxyXG4gKiBPcGVuIG5hdGl2ZSBBZGQgQm9va21hcmsgbW9kYWwgdmlhIHtRdmEuYmluZGVyfS5cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiAkQWRkQm9va21hcmtRdmEoKSB7XHJcblxyXG5cdFF2YS5Db250ZXh0Q2xpZW50QWN0aW9uKHtcclxuXHRcdGNsaWVudEFjdGlvbjogXCJtb2RhbFwiLFxyXG5cdFx0cGFyYW06IFwiYm1cIixcclxuXHRcdG5hbWU6IFwiQUREQk1cIixcclxuXHRcdGJpbmRlcjogUXYuR2V0Q3VycmVudERvY3VtZW50KCkuYmluZGVyXHJcblx0fSk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBAbmFtZSAkUmVtb3ZlQm9va21hcmtRdmEge2Z1bmN0aW9ufVxyXG4gKiBPcGVuIG5hdGl2ZSBSZW1vdmUgQm9va21hcmsgbW9kYWwgdmlhIHtRdmEuYmluZGVyfS5cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiAkUmVtb3ZlQm9va21hcmtRdmEoKSB7XHJcblxyXG5cdFF2YS5Db250ZXh0Q2xpZW50QWN0aW9uKHtcclxuXHRcdGNsaWVudEFjdGlvbjogXCJtb2RhbFwiLFxyXG5cdFx0cGFyYW06IFwicmVtb3ZlYm1cIixcclxuXHRcdG5hbWU6IFwiUkVNQk1cIixcclxuXHRcdGJpbmRlcjogUXYuR2V0Q3VycmVudERvY3VtZW50KCkuYmluZGVyXHJcblx0fSk7XHJcbn0iLCIvKipcclxuICogQG5hbWUgJE9wZW5SZXBvc2l0b3J5QWpheCB7ZnVuY3Rpb259XHJcbiAqIE9wZW4gbmF0aXZlIFJlcG9zaXRvcnkgbW9kYWwgdmlhICQuYWpheC5cclxuICpcclxuICogQHBhcmFtIGRlZkZpbHRlciB7bnVtYmVyfSAwLTMgLSBEZXByZWNhdGVkLlxyXG4gKiBAcGFyYW0gY2FsbGJhY2sge2Z1bmN0aW9ufSBDYWxsYmFjayBmdW5jdGlvbi4gLSBEZXByZWNhdGVkLlxyXG4gKlxyXG4gKiBAbm90ZSBSZXBvIGNhbiBiZSBvcGVuZWQgb25seSB3aXRoIGZha2UgcmVxdWVzdCB0byBRbGlrVmlldyBBU1AuTkVUIENsaWVudC5cclxuICogICAgICBSZWFzb24gaXMgcmVtb3RlIHJlcG9zaXRvcnksIFFsaWtWaWV3IG9wZW4gcmVwb3NpdG9yeSBvbmx5IGFmdGVyIEFTUC5ORVQgUWxpa1ZpZXcgY2xpZW50IHJlcXVlc3QuXHJcbiAqICAgICAgV2UgYWx3YXlzIGhhdmUgalF1ZXJ5LlxyXG4gKiBAdXJsIGh0dHBzOi8vY29tbXVuaXR5LnFsaWsuY29tL2RvY3MvRE9DLTI2MzlcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiAkT3BlblJlcG9zaXRvcnlBamF4KGRlZkZpbHRlciwgY2FsbGJhY2spIHtcclxuXHJcblx0IGxldCBiaW5kZXIgPSBRdi5HZXRDdXJyZW50RG9jdW1lbnQoKS5iaW5kZXIsXHJcblx0XHQgbWFyayA9IGJpbmRlci5NYXJrLFxyXG5cdFx0IHN0YW1wID0gYmluZGVyLlN0YW1wLFxyXG5cdFx0IHZpZXcgPSBiaW5kZXIuVmlldyxcclxuXHRcdCByZXBvRmlsdGVyID0gZGVmRmlsdGVyID4gMyAmJiBkZWZGaWx0ZXIgPCAwID8gMCA6IGRlZkZpbHRlcjtcclxuXHJcblx0IGxldCBpbml0UmVwb0RhdGEgPSBgPHVwZGF0ZVxyXG5cdCAgICAgICAgbWFyaz1cImArIG1hcmsgK2BcIlxyXG5cdCAgICAgICAgc3RhbXA9XCJgKyBzdGFtcCArYFwiXHJcblx0ICAgICAgICBjb29raWU9XCJ0cnVlXCJcclxuXHQgICAgICAgIHNjb3BlPVwiRG9jdW1lbnRcIlxyXG5cdCAgICAgICAgdmlldz1cImArIHZpZXcgK2BcIlxyXG5cdCAgICAgICAgaWRlbnQ9XCJudWxsXCI+XHJcblx0ICAgICAgICAgICAgPHNldCBuYW1lPVwiRG9jdW1lbnQuU3RhbmRhcmRBY3Rpb25zLlJFUE9TSVRPUllcIiBhY3Rpb249XCJcIiBjbGllbnRzaXplV0g9XCJcIiBwb3NpdGlvbj1cIlwiIGN1cnNvcj1cIlwiIC8+XHJcblx0ICAgICAgICA8L3VwZGF0ZT5gLFxyXG5cdCBzaG93UmVwb0RhdGEgPSBgPHVwZGF0ZVxyXG5cdCAgICAgICAgbWFyaz1cImArIG1hcmsgK2BcIlxyXG5cdCAgICAgICAgc3RhbXA9XCJgKyBzdGFtcCArYFwiXHJcblx0ICAgICAgICBjb29raWU9XCJ0cnVlXCJcclxuXHQgICAgICAgIHNjb3BlPVwiRG9jdW1lbnRcIlxyXG5cdCAgICAgICAgdmlldz1cImArIHZpZXcgK2BcIlxyXG5cdCAgICAgICAgaWRlbnQ9XCJudWxsXCI+XHJcblx0ICAgICAgICAgICAgPHNldCBuYW1lPVwiRG9jdW1lbnQuVE9PTFNcXFxcUkVQT1NJVE9SWS5GaWx0ZXJcIlxyXG5cdCAgICAgICAgICAgIHZhbHVlPVwiYCsgcmVwb0ZpbHRlciArYFwiIC8+XHJcblx0ICAgICAgICA8L3VwZGF0ZT5gO1xyXG5cclxuXHJcblx0IGxldCBpbml0UmVwb3NpdG9yeSA9ICgpID0+IHtcclxuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcblx0XHRcdCQuYWpheCh7XHJcblx0XHRcdFx0dXJsOiAnL1F2QWpheFpmYy9RdnNWaWV3Q2xpZW50LmFzcHg/bWFyaz0nICsgbWFyayArICcmdmlldz0nICsgdmlldyxcclxuXHRcdFx0XHRkYXRhOiBpbml0UmVwb0RhdGEsXHJcblx0XHRcdFx0dHlwZTogJ1BPU1QnLFxyXG5cdFx0XHRcdGNvbnRlbnRUeXBlOiBcInRleHQvcGxhaW47Y2hhcnNldD1VVEYtOFwiLFxyXG5cdFx0XHRcdGRhdGFUeXBlOiBcInRleHRcIixcclxuXHRcdFx0XHRzdWNjZXNzKCkge1xyXG5cdFx0XHRcdFx0cmVzb2x2ZSgpO1xyXG5cdFx0XHRcdH0sXHJcblx0XHRcdFx0ZXJyb3IoKSB7XHJcblx0XHRcdFx0XHRyZWplY3QoKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0pO1xyXG5cdFx0fSk7XHJcblx0fTtcclxuXHJcblx0IGxldCBzaG93UmVwb3NpdG9yeSA9ICgpID0+IHtcclxuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcblx0XHRcdCQuYWpheCh7XHJcblx0XHRcdFx0dXJsOiAnL1F2QWpheFpmYy9RdnNWaWV3Q2xpZW50LmFzcHg/bWFyaz0nICsgbWFyayArICcmdmlldz0nICsgdmlldyxcclxuXHRcdFx0XHRkYXRhOiBzaG93UmVwb0RhdGEsXHJcblx0XHRcdFx0dHlwZTogJ1BPU1QnLFxyXG5cdFx0XHRcdGNvbnRlbnRUeXBlOiBcInRleHQvcGxhaW47Y2hhcnNldD1VVEYtOFwiLFxyXG5cdFx0XHRcdGRhdGFUeXBlOiBcInRleHRcIixcclxuXHRcdFx0XHRzdWNjZXNzKCkge1xyXG5cdFx0XHRcdFx0cmVzb2x2ZSgpO1xyXG5cdFx0XHRcdH0sXHJcblx0XHRcdFx0ZXJyb3IoKSB7XHJcblx0XHRcdFx0XHRyZWplY3QoKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0pO1xyXG5cdFx0fSk7XHJcblx0fTtcclxuXHJcblx0IFByb21pc2UuYWxsKFtcclxuXHQgaW5pdFJlcG9zaXRvcnkoKSxcclxuXHQgc2hvd1JlcG9zaXRvcnkoKVxyXG5cdCBdKS50aGVuKCgpID0+IHtcclxuXHRcdGlmICh0eXBlb2YgY2FsbGJhY2sgPT0gJ2Z1bmN0aW9uJyl7XHJcblx0XHRcdHJldHVybiBjYWxsYmFjaygpXHJcblx0XHR9XHJcblx0fSlcclxufSIsIi8qKlxyXG4gKiBAbm90ZSBBbGwgYWN0aW9ucyB3aXRoIGF2YWlsYWJsZSBUb29sQmFyLlxyXG4gKlxyXG4gKiAkKCcjUXZBamF4VG9vbGJhcicpO1xyXG4gKi9cclxuXHJcbmltcG9ydCB7JFF2YVRvb2xiYXJBY3Rpb259IGZyb20gJy4uL3V0aWwvVXRpbCc7XHJcblxyXG4vKipcclxuICogQG5hbWUgJFNob3dGaWVsZHMge2Z1bmN0aW9ufVxyXG4gKiBPcGVuIG5hdGl2ZSBTaG93IEZpZWxkcyBtb2RhbC5cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiAkQWRkQm9va21hcmsoKSB7XHJcblx0JFF2YVRvb2xiYXJBY3Rpb24oJ0FEREJNJyk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBAbmFtZSAkU2hvd0ZpZWxkcyB7ZnVuY3Rpb259XHJcbiAqIE9wZW4gbmF0aXZlIFNob3cgRmllbGRzIG1vZGFsLlxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uICRSZW1vdmVCb29rbWFyaygpIHtcclxuXHQkUXZhVG9vbGJhckFjdGlvbignUkVNQk0nKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIEBuYW1lICRTaG93RmllbGRzIHtmdW5jdGlvbn1cclxuICogT3BlbiBuYXRpdmUgU2hvdyBGaWVsZHMgbW9kYWwuXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gJEVtYWlsQm9va21hcmsoKSB7XHJcblx0JFF2YVRvb2xiYXJBY3Rpb24oJ01BSUxBU0xJTksnKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIEBuYW1lICRTaG93RmllbGRzIHtmdW5jdGlvbn1cclxuICogT3BlbiBuYXRpdmUgU2hvd24gRmllbGRzIG1vZGFsLlxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uICROZXdTaGVldE9iamVjdCgpIHtcclxuXHQkUXZhVG9vbGJhckFjdGlvbignTkVXU0hFRVRPQkonKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIEBuYW1lICRSZXBvc2l0b3J5XHJcbiAqIE9wZW4gbmF0aXZlIFJlcG9zaXRvcnkgbW9kYWwuXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gJE9wZW5SZXBvc2l0b3J5KCkge1xyXG5cdCRRdmFUb29sYmFyQWN0aW9uKCdSRVBPU0lUT1JZJyk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBAbmFtZSAkUmVwb3NpdG9yeVxyXG4gKiBPcGVuIG5hdGl2ZSBSZXBvc2l0b3J5IG1vZGFsLlxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uICRTaG93RmllbGRzKCkge1xyXG5cdCRRdmFUb29sYmFyQWN0aW9uKCdTSE9XRklFTERTJyk7XHJcbn0iLCIvKipcclxuICogVHlwZSBWYWxpZGF0b3JcclxuICogXHJcbiAqIEBwYXJhbSB2YXJpYWJsZSB7b2JqZWN0fGJvb2xlYW58c3RyaW5nfG51bWJlcnxmdW5jdGlvbn1cclxuICogQHBhcmFtIHR5cGUge3N0cmluZ31cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiAkdHYodmFyaWFibGUsIHR5cGUpe1xyXG5cdHJldHVybiB0eXBlb2YgdmFyaWFibGUgPT09IHR5cGU7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBRdmFEb0FjdGlvblxyXG4gKiBcclxuICogQGRlcGVuZGVuY2llcyB7UXZhfVxyXG4gKiBAcGFyYW0gYWN0aW9uX25hbWUge3N0cmluZ30gLSBBY3Rpb24gTmFtZSwgZGVwZW5kIG9uIFF2YS5jcmVhdGVPcHRpb25zLlxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uICRRdmFUb29sYmFyQWN0aW9uKGFjdGlvbl9uYW1lKSB7XHJcblx0XHJcblx0UXZhLk1nci5tZW51LmRvQWN0aW9uKHtcclxuXHRcdHRhcmdldDogJy5jdHgtbWVudS1hY3Rpb24tJythY3Rpb25fbmFtZVxyXG5cdH0pO1xyXG59IiwiaW1wb3J0IHtRdmV0Q29yZX0gZnJvbSAnLi9jb3JlL0NvcmUnO1xyXG5cclxuKGZ1bmN0aW9uKHdpbmRvdyl7XHJcblx0aWYgKHR5cGVvZiBRdmEgPT09ICd1bmRlZmluZWQnXHJcblx0XHQmJiB0eXBlb2YgalF1ZXJ5ID09PSAndW5kZWZpbmVkJ1xyXG5cdFx0JiYgdHlwZW9mIHF2YSA9PT0gJ3VuZGVmaW5lZCdcclxuXHQpe1xyXG5cdFx0Y29uc29sZS5sb2coXCJDYW4ndCBpbml0IFF2ZXQgYmVjYXVzZSBRdmEvalF1ZXJ5L3F2YSBpcyB1bmRlZmluZWRcIilcclxuXHR9ZWxzZXtcclxuXHRcdGlmKHR5cGVvZihRdmV0KSA9PT0gJ3VuZGVmaW5lZCcpe1xyXG5cdFx0XHR3aW5kb3cuUXZldCA9IG5ldyBRdmV0Q29yZSgpO1xyXG5cdFx0fSBlbHNle1xyXG5cdFx0XHRjb25zb2xlLmxvZyhcIlF2ZXQgYWxyZWFkeSBkZWZpbmVkLlwiKTtcclxuXHRcdH1cclxuXHR9XHJcbn0pKHdpbmRvdyk7Il19
