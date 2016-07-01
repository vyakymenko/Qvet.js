/**
 * Qvet - QlikView Extension Trickster
 * 
 * @version v1.0.0
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

var version = '1.0.0';

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
		if (listBoxArray[index].listbox_name != null) {
			qva.GetQvObject(listBoxArray[index].listbox_name, function () {
				this.callbackFn = function () {};
				this.Data.SelectTexts(listBoxArray[index].desc_value);
				index++;
				SelectListBoxValues(listBoxArray, index, afterFn);
			}, _this);
		} else {
			index++;
			SelectListBoxValues(listBoxArray, index, afterFn);
		}
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmNcXGNvcmVcXENvcmUuanMiLCJzcmNcXGNvcmVcXGFkZGl0aW9uXFxFbWFpbEJvb2ttYXJrLmpzIiwic3JjXFxjb3JlXFxhZGRpdGlvblxcU2VsZWN0TGlzdEJveFZhbHVlcy5qcyIsInNyY1xcY29yZVxcZGV2ZWxvcG1lbnRcXEJvb2ttYXJrcy5qcyIsInNyY1xcY29yZVxcZGV2ZWxvcG1lbnRcXFJlcG9zaXRvcnkuanMiLCJzcmNcXGNvcmVcXG5hdGl2ZVxcVG9vbGJhckFjdGlvbnMuanMiLCJzcmNcXGNvcmVcXHV0aWxcXFV0aWwuanMiLCJzcmNcXFF2ZXQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7QUNLQSxBQUNDLEFBQWMsQUFBaUIsQUFDL0IsQUFDQSxBQUNBLEFBQ007O0FBS1AsQUFBUSxBQUFpQixBQUF5Qjs7QUFDbEQsQUFBUSxBQUEwQjs7QUFLbEMsQUFBUSxBQUFvQjs7QUFDNUIsQUFBUSxBQUEwQixBQUVsQyxBQUFPOzs7O0FBeEJQLElBQU0sVUFBTixBQUFnQjs7Ozs7Ozs7Ozs7Ozs7OztJQXdCVCxBQUFNLEFBQVMsQUFFckI7O0FBQWEsQUFDWjs7T0FBQSxBQUFLOztBQUNNLEFBQ0gsQUFDTjtBQUZTLEFBRUEsQUFDVDtBQUpZLEFBQ0gsQUFHRCxBQUVUO0FBTFUsQUFDVDtBQUZZLEFBTUksQUFDakI7QUFQYSxBQU9BLEFBQ2I7QUFSRCxBQUFjLEFBUUksQUFJbEI7QUFaYyxBQUNiOzs7T0FXRCxBQUFLOztBQUNPLEFBQ0osQUFDTjtBQUhpQixBQUNQLEFBRUQsQUFFVjtBQUpXLEFBQ1Y7QUFGRixBQUFtQixBQUtELEFBRWxCO0FBUG1CLEFBQ2xCO0FBUUY7Ozs7K0JBQVksQUFDWDtVQUFPLFFBQUEsQUFBUSxJQUFJLG1CQUFuQixBQUFPLEFBQStCLEFBQ3RDO0FBRUQ7OztvQ0FBQSxBQUFrQixRQUFsQixBQUEwQixhQUFZLEFB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bEI7QUFNRDs7Ozs7O0FBQU8sdUJBQXVCLEFBQzdCOytCQUFBLEFBQWtCLEFBQ2xCOzs7Ozs7Ozs7Ozs7UUNoRE0sQUFBUztRQVVULEFBQVM7Ozs7Ozs7QUFWVCxhQUFBLEFBQWEsVUFBYixBQUF1QixNQUFLLEFBQ2xDO1NBQU8sUUFBQSxBQUFPLGdFQUFkLEFBQTJCLEFBQzNCO0FBUUQ7Ozs7Ozs7O0FBQU8sMkJBQUEsQUFBMkIsYUFBYSxBQUU5Qzs7TUFBQSxBQUFJLElBQUosQUFBUSxLQUFSLEFBQWE7WUFDSixzQkFEVCxBQUFzQixBQUNPLEFBRTdCO0FBSHNCLEFBQ3JCOzs7Ozs7QUNuQkYsQUFBUSxBQUFlOztBQUV2QixDQUFDLFVBQUEsQUFBUyxRQUFPLEFBQ2hCO0tBQUksT0FBQSxBQUFPLFFBQVAsQUFBZSxlQUNmLE9BQUEsQUFBTyxXQURQLEFBQ2tCLGVBQ2xCLE9BQUEsQUFBTyxRQUZYLEFBRW1CLGFBQ2xCLEFBQ0E7VUFBQSxBQUFRLElBQVIsQUFBWSxBQUNaO0FBTEQsUUFLSyxBQUNKO01BQUcsT0FBQSxBQUFPLFNBQVYsQUFBb0IsYUFBWSxBQUMvQjtVQUFBLEFBQU8sT0FBUCxBQUFjLEFBQUksQUFDbEI7QUFGRCxTQUVNLEFBQ0w7V0FBQSxBQUFRLElBQVIsQUFBWSxBQUNaO0FBQ0Q7QUFDRDtBQWJELEdBQUEsQUFhRyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJjb25zdCB2ZXJzaW9uID0gJzEuMC4wJztcblxuLyoqXG4gKiBOYXRpdmUuXG4gKi9cbmltcG9ydCB7XG5cdCRBZGRCb29rbWFyaywgJFJlbW92ZUJvb2ttYXJrLCAkRW1haWxCb29rbWFyayxcblx0JE5ld1NoZWV0T2JqZWN0LFxuXHQkT3BlblJlcG9zaXRvcnksXG5cdCRTaG93RmllbGRzXG59IGZyb20gJy4vbmF0aXZlL1Rvb2xiYXJBY3Rpb25zJztcblxuLyoqXG4gKiBEZXZlbG9wbWVudC5cbiAqL1xuaW1wb3J0IHskQWRkQm9va21hcmtRdmEsICRSZW1vdmVCb29rbWFya1F2YX0gZnJvbSAnLi9kZXZlbG9wbWVudC9Cb29rbWFya3MnO1xuaW1wb3J0IHskT3BlblJlcG9zaXRvcnlBamF4fSBmcm9tICcuL2RldmVsb3BtZW50L1JlcG9zaXRvcnknO1xuXG4vKipcbiAqIEFkZGl0aW9uLlxuICovXG5pbXBvcnQge0VtYWlsQm9va21hcmt9IGZyb20gJy4vYWRkaXRpb24vRW1haWxCb29rbWFyayc7XG5pbXBvcnQge1NlbGVjdExpc3RCb3hWYWx1ZXN9IGZyb20gJy4vYWRkaXRpb24vU2VsZWN0TGlzdEJveFZhbHVlcyc7XG5cbmV4cG9ydCBjbGFzcyBRdmV0Q29yZSB7XG5cblx0Y29uc3RydWN0b3IoKXtcblx0XHR0aGlzLm5hdGl2ZSA9IHtcblx0XHRcdGJvb2ttYXJrczp7XG5cdFx0XHRcdCRhZGQ6ICRBZGRCb29rbWFyayxcblx0XHRcdFx0JHJlbW92ZTogJFJlbW92ZUJvb2ttYXJrLFxuXHRcdFx0XHQkZW1haWw6ICRFbWFpbEJvb2ttYXJrXG5cdFx0XHR9LFxuXHRcdFx0JG9wZW5SZXBvc2l0b3J5OiAkT3BlblJlcG9zaXRvcnksXG5cdFx0XHQkc2hvd0ZpZWxkczogJFNob3dGaWVsZHMsXG5cdFx0XHQkbmV3U2hlZXRPYmplY3Q6ICROZXdTaGVldE9iamVjdFxuXHRcdH07XG5cblx0XHQvLyBUT0RPOiBEZXYgdmVyc2lvbnMgZm9yIFF2YSBhbmQgJC5hamF4IHdoZW4gdG9vbGJhciBub3QgaW5pdGlhbGl6ZWQuXG5cdFx0dGhpcy5kZXZlbG9wbWVudCA9IHtcblx0XHRcdGJvb2ttYXJrczoge1xuXHRcdFx0XHQkYWRkOiAkQWRkQm9va21hcmtRdmEsXG5cdFx0XHRcdCRyZW1vdmU6ICRSZW1vdmVCb29rbWFya1F2YVxuXHRcdFx0fSxcblx0XHRcdCRvcGVuUmVwb3NpdG9yeTogJE9wZW5SZXBvc2l0b3J5QWpheFxuXHRcdH07XG5cdH1cblxuXHRnZXRWZXJzaW9uKCl7XG5cdFx0cmV0dXJuIGNvbnNvbGUubG9nKCdRdmV0IHZlcnNpb246ICcgKyB2ZXJzaW9uKTtcblx0fVxuXG5cdHNlbmRFbWFpbEJvb2ttYXJrKGNvbmZpZywgZXh0cmFQYXJhbXMpe1xuXHRcdHJldHVybiBuZXcgRW1haWxCb29rbWFyayhjb25maWcsIGV4dHJhUGFyYW1zKS5jcmVhdGVCb29rbWFyaygpLm9wZW5FbWFpbFdpbmRvdygpO1xuXHR9XG5cblx0c2VsZWN0TGlzdEJveFZhbHVlcyhsaXN0Qm94QXJyYXksIGluZGV4LCBhZnRlckZuKXtcblx0XHRyZXR1cm4gU2VsZWN0TGlzdEJveFZhbHVlcyhsaXN0Qm94QXJyYXksIGluZGV4LCBhZnRlckZuKVxuXHR9XG59XG4iLCJpbXBvcnQgeyR0dn0gZnJvbSAnLi4vdXRpbC9VdGlsJztcclxuXHJcbi8qKlxyXG4gKiBFbWFpbCBRbGlrVmlldyBCb29rbWFyay5cclxuICogXHJcbiAqIEBjb25zdHJ1Y3RvclxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIEVtYWlsQm9va21hcmsge1xyXG5cdFxyXG5cdFxyXG5cdC8qKlxyXG5cdCAqICBDb25maWcuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gY29uZmlnIHtvYmplY3R9XHJcblx0ICpcclxuXHQgKiBAcGFyYW0gY29uZmlnLmVtYWlsU3ViamVjdCB7c3RyaW5nfVxyXG5cdCAqIEBwYXJhbSBjb25maWcubmFtZSB7c3RyaW5nfVxyXG5cdCAqIEBwYXJhbSBjb25maWcuc2hhcmVkIHtib29sZWFufVxyXG5cdCAqIEBwYXJhbSBjb25maWcuZXhjbHVkZVNlbGVjdGlvbnMge2Jvb2xlYW59XHJcblx0ICogQHBhcmFtIGNvbmZpZy5pbmNsdWRlU3RhdGUge2Jvb2xlYW59XHJcblx0ICogQHBhcmFtIGNvbmZpZy5ub3REaXNwbGF5ZWQge2Jvb2xlYW59XHJcblx0ICogQHBhcmFtIGNvbmZpZy5kZXNjcmlwdGlvblNob3cge2Jvb2xlYW59XHJcblx0ICogQHBhcmFtIGNvbmZpZy5kZXNjcmlwdGlvbk1zZyB7c3RyaW5nfVxyXG5cdCAqIEBwYXJhbSBjb25maWcuc2F2ZUlucHV0VmFsdWVzIHtib29sZWFufVxyXG5cdCAqXHJcblx0ICogIEV4dHJhIFBhcmFtcy5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBleHRyYVBhcmFtcyB7b2JqZWN0fVxyXG5cdCAqIEBwYXJhbSBleHRyYVBhcmFtcy5leHRyYVVyaSB7c3RyaW5nfVxyXG5cdCAqIEBwYXJhbSBleHRyYVBhcmFtcy5lbWFpbFdpbmRvd01vZGUge2Jvb2xlYW59XHJcblx0ICovXHJcblx0Y29uc3RydWN0b3IoY29uZmlnLCBleHRyYVBhcmFtcykge1xyXG5cdFx0XHJcblx0XHRsZXQgZGVmYXVsdENvbmZpZyA9IHtcclxuXHRcdFx0ZW1haWxTdWJqZWN0OiBcIlwiLFxyXG5cdFx0XHRuYW1lOiBcIkVtYWlsIEJvb2ttYXJrXCIsIC8qKiBOYW1lIG9mIHRoZSBhZGRpdGlvbi4gKi9cclxuXHRcdFx0c2hhcmVkOiB0cnVlLCAvKiogU2hhcmUgdGhlIGFkZGl0aW9uIHdpdGggb3RoZXIgdXNlcnMuICovXHJcblx0XHRcdGV4Y2x1ZGVTZWxlY3Rpb25zOiBmYWxzZSwgLyoqIEV4Y2x1ZGUgdGhlIHNlbGVjdGlvbnMgbWFkZSBpbiB0aGUgYXBwbGljYXRpb24uICovXHJcblx0XHRcdGluY2x1ZGVTdGF0ZTogdHJ1ZSwgLyoqIEluY2x1ZGUgc3RhdGUgb2YgYWxsIG9iamVjdHMuICovXHJcblx0XHRcdG5vdERpc3BsYXllZDogZmFsc2UsIC8qKiBUaGUgYWRkaXRpb24gaXMgbm90IGRpc3BsYXllZCBpbiB0aGUgYWRkaXRpb24gbGlzdCBidXQgaXMgc3RpbGwgc2VsZWN0YWJsZSBpbiBjb2RlIG9yIHZpYSB1cmwuICovXHJcblx0XHRcdGRlc2NyaXB0aW9uU2hvdzogZmFsc2UsIC8qKiBUaGUgYWRkaXRpb24gZGVzY3JpcHRpb24gd2lsbCBiZSBzaG93biBpbiBhIG1lc3NhZ2Ugd2hlbiB0aGUgYWRkaXRpb24gaXMgc2VsZWN0ZWQuICovXHJcblx0XHRcdGRlc2NyaXB0aW9uTXNnOiBcIlwiLCAvKiogRGVzY3JpcHRpb24gb2YgdGhlIGFkZGl0aW9uLiAqL1xyXG5cdFx0XHRzYXZlSW5wdXRWYWx1ZXM6IHRydWUgLyoqIEluY2x1ZGUgdmFsdWVzIGluIGlucHV0IGZpZWxkcy4qL1xyXG5cdFx0fTtcclxuXHRcclxuXHRcdHRoaXMuZGVmYXVsUXZBanhaZmMgPSAnL1F2QUpBWFpmYy9vcGVuZG9jLmh0bT9kb2N1bWVudD0nO1xyXG5cdFx0XHJcblx0XHQvKiogVGhlIGFkZGl0aW9uIGlzIGFwcGxpZWQgb24gdG9wIG9mIGFueSBwcmV2aW91cyBzZWxlY3Rpb25zIChubyBjbGVhcikuKi9cclxuXHRcdHRoaXMuYXBwbGllZCA9IHRydWU7XHJcblx0XHR0aGlzLmRvYyA9IFF2LkdldEN1cnJlbnREb2N1bWVudCgpO1xyXG5cdFx0dGhpcy5ib29rbWFya0lkID0gJyc7XHJcblx0XHRcclxuXHRcclxuXHRcdC8qKlxyXG5cdFx0ICogSW1wb3J0YW50IHBhcmFtcy5cclxuXHRcdCAqIEB0eXBlIHsqfHN0cmluZ31cclxuXHRcdCAqL1xyXG5cdFx0aWYgKCR0dihjb25maWcsICdvYmplY3QnKSl7XHJcblx0XHRcdHRoaXMuZW1haWxTdWJqZWN0ID0gY29uZmlnLmVtYWlsU3ViamVjdCB8fCBkZWZhdWx0Q29uZmlnLmVtYWlsU3ViamVjdDtcclxuXHRcdFx0dGhpcy5uYW1lID0gY29uZmlnLm5hbWUgfHwgZGVmYXVsdENvbmZpZy5uYW1lO1xyXG5cdFx0XHR0aGlzLnNoYXJlZCA9IGNvbmZpZy5zaGFyZWQgfHwgZGVmYXVsdENvbmZpZy5zaGFyZWQ7XHJcblx0XHRcdHRoaXMuZXhjbHVkZVNlbGVjdGlvbnMgPSBjb25maWcuZXhjbHVkZVNlbGVjdGlvbnMgfHwgZGVmYXVsdENvbmZpZy5leGNsdWRlU2VsZWN0aW9ucztcclxuXHRcdFx0dGhpcy5pbmNsdWRlU3RhdGUgPSBjb25maWcuaW5jbHVkZVN0YXRlIHx8IGRlZmF1bHRDb25maWcuaW5jbHVkZVN0YXRlO1xyXG5cdFx0XHR0aGlzLm5vdERpc3BsYXllZCA9IGNvbmZpZy5ub3REaXNwbGF5ZWQgfHwgZGVmYXVsdENvbmZpZy5ub3REaXNwbGF5ZWQ7XHJcblx0XHRcdHRoaXMuZGVzY3JpcHRpb25TaG93ID0gY29uZmlnLmRlc2NyaXB0aW9uU2hvdyB8fCBkZWZhdWx0Q29uZmlnLmRlc2NyaXB0aW9uU2hvdztcclxuXHRcdFx0dGhpcy5kZXNjcmlwdGlvbk1zZyA9IGNvbmZpZy5kZXNjcmlwdGlvbk1zZyB8fCBkZWZhdWx0Q29uZmlnLmRlc2NyaXB0aW9uTXNnO1xyXG5cdFx0XHR0aGlzLnNhdmVJbnB1dFZhbHVlcyA9IGNvbmZpZy5zYXZlSW5wdXRWYWx1ZXMgfHwgZGVmYXVsdENvbmZpZy5zYXZlSW5wdXRWYWx1ZXM7XHJcblx0XHR9ZWxzZXtcclxuXHRcdFx0Zm9yIChsZXQga2V5IGluIGRlZmF1bHRDb25maWcpe1xyXG5cdFx0XHRcdGlmIChkZWZhdWx0Q29uZmlnLmhhc093blByb3BlcnR5KGtleSkpXHJcblx0XHRcdFx0XHR0aGlzW2tleV0gPSBkZWZhdWx0Q29uZmlnW2tleV07XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcclxuXHRcdC8qKlxyXG5cdFx0ICogRXh0cmEgcGFyYW1zLlxyXG5cdFx0ICpcclxuXHRcdCAqIEBwYXJhbSBleHRyYVVyaSB7c3RyaW5nfSBVc2UgaXQgZm9yIGFkZCBwYXJlbnQgdXJsIHRvIHlvdXIgUWxpa1ZpZXcgQVNQLk5FVCBjbGllbnQuIFRPRE86IEluIERldmVsb3BtZW50LlxyXG5cdFx0ICogQHBhcmFtIGVtYWlsV2luZG93TW9kZSB7Ym9vbGVhbn0gQnkgZGVmYXVsdCBhZGRpdGlvbiB3aWxsIG9wZW4gZW1haWwgaW4gbmV3IHdpbmRvdyxcclxuXHRcdCAqIGJ1dCB5b3UgY2FuIGNoYW5nZSBpdCB0byB7ZmFsc2V9IGFuZCBlbWFpbCB3aW5kb3cgd2lsbCBiZSBvcGVuZWQgb24gc2FtZSBkb21haW4uXHJcblx0XHQgKi9cclxuXHRcdGlmICgkdHYoZXh0cmFQYXJhbXMsICdvYmplY3QnKSl7XHJcblx0XHRcdHRoaXMuZXh0cmFVcmkgPSBleHRyYVBhcmFtcy5leHRyYVVyaSB8fCAnJztcclxuXHRcdFx0dGhpcy5lbWFpbFdpbmRvd01vZGUgPSBleHRyYVBhcmFtcy5lbWFpbFdpbmRvd01vZGUgfHwgdHJ1ZTtcclxuXHRcdH1lbHNle1xyXG5cdFx0XHR0aGlzLmV4dHJhVXJpID0gJyc7XHJcblx0XHRcdHRoaXMuZW1haWxXaW5kb3dNb2RlID0gdHJ1ZTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cclxuXHQvKipcclxuXHQgKiBVc2UgbmF0aXZlIEJvb2ttYXJrcyBDbGFzc1xyXG5cdCAqIGZvciBjcmVhdGUgYWRkaXRpb24gYmVmb3JlIGVtYWlsIGl0LlxyXG5cdCAqXHJcblx0ICogQGV4dGVuZHMge31cclxuXHQgKi9cclxuXHRjcmVhdGVCb29rbWFyaygpe1xyXG5cclxuXHRcdHRoaXMuZG9jXHJcblx0XHRcdC5Cb29rbWFya3MoKVxyXG5cdFx0XHQuTmV3Qm9va21hcmsoXHJcblx0XHRcdFx0dGhpcy5uYW1lLFxyXG5cdFx0XHRcdHRoaXMuYXBwbGllZCxcclxuXHRcdFx0XHR0aGlzLnNoYXJlZCxcclxuXHRcdFx0XHR0aGlzLmV4Y2x1ZGVTZWxlY3Rpb25zLFxyXG5cdFx0XHRcdHRoaXMuaW5jbHVkZVN0YXRlLFxyXG5cdFx0XHRcdHRoaXMubm90RGlzcGxheWVkLFxyXG5cdFx0XHRcdHRoaXMuZGVzY3JpcHRpb25TaG93LFxyXG5cdFx0XHRcdHRoaXMuZGVzY3JpcHRpb25Nc2csXHJcblx0XHRcdFx0dGhpcy5zYXZlSW5wdXRWYWx1ZXNcclxuXHRcdFx0KTtcclxuXHJcblx0XHR0aGlzLmJvb2ttYXJrSWQgPSB0aGlzLmRvYy5Cb29rbWFya3MoKS5Cb29rTWFya3NbdGhpcy5kb2MuQm9va21hcmtzKCkuQm9va01hcmtzLmxlbmd0aC0xXS52YWx1ZTtcclxuXHRcdFxyXG5cdFx0cmV0dXJuIHRoaXM7XHJcblx0fTtcclxuXHJcblx0b3BlbkVtYWlsV2luZG93KCl7XHJcblx0XHRcclxuXHRcdGxldCB1cmkgPSB0aGlzLmV4dHJhVXJpICtcclxuXHRcdFx0d2luZG93LmxvY2F0aW9uLm9yaWdpbiArXHJcblx0XHRcdHRoaXMuZGVmYXVsUXZBanhaZmMgK1xyXG5cdFx0XHR0aGlzLmRvYy5iaW5kZXIuVmlldyArXHJcblx0XHRcdCcmYWRkaXRpb249JytcclxuXHRcdFx0dGhpcy5ib29rbWFya0lkO1xyXG5cdFx0XHJcblx0XHRsZXQgdXJpX2VuYyA9IGVuY29kZVVSSUNvbXBvbmVudCh1cmkpLnJlcGxhY2UoLyUyMC9nLCBcIiUyNTIwXCIpLFxyXG5cdFx0XHRtYWlsZXIgPSAnbWFpbHRvOj9zdWJqZWN0PScrdGhpcy5lbWFpbFN1YmplY3QrJyZib2R5PScrdXJpX2VuYztcclxuXHJcblx0XHR0aGlzLmVtYWlsV2luZG93TW9kZSA/IHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gbWFpbGVyIDogbG9jYXRpb24uaHJlZiA9IG1haWxlcjtcclxuXHRcdFxyXG5cdFx0cmV0dXJuIHRoaXM7XHJcblx0fVxyXG59IiwiLyoqXHJcbiAqIEBuYW1lIFNlbGVjdExpc3RCb3hWYWx1ZXMge2Z1bmN0aW9ufVxyXG4gKiBSZWN1cnNpdmUgc2VsZWN0aW9uIHZhbHVlcyBpbiBsaXN0Qm94LlxyXG4gKlxyXG4gKiBAbm90ZSBXb3JrcyBvbmx5IHdpdGggYXZhaWxhYmxlIGxpc3RCb3hlcy5cclxuICogXHJcbiAqIEBwYXJhbSBsaXN0Qm94QXJyYXkge0FycmF5fSAtIGFycmF5IG9mIGxpc3RCb3hlcyBhbmQgc2VsZWN0aW9ucy5cclxuICogQHBhcmFtIGluZGV4IHtudW1iZXJ9IC0gc3RhcnRlciBpbmRleCBmb3Igc2VsZWN0aW9uc1xyXG4gKiBAcGFyYW0gYWZ0ZXJGbiB7ZnVuY3Rpb259IC0gY2FsbGJhY2sgYWZ0ZXIgc2VsZWN0aW9ucyB3aWxsIGJlIGRvbmUuXHJcbiAqL1xyXG5leHBvcnQgbGV0IFNlbGVjdExpc3RCb3hWYWx1ZXMgPSAobGlzdEJveEFycmF5LCBpbmRleCwgYWZ0ZXJGbikgPT4ge1xyXG5cdGlmIChpbmRleCA8IGxpc3RCb3hBcnJheS5sZW5ndGgpe1xyXG5cdFx0aWYgKGxpc3RCb3hBcnJheVtpbmRleF0ubGlzdGJveF9uYW1lICE9IG51bGwpe1xyXG5cdFx0XHRxdmEuR2V0UXZPYmplY3QobGlzdEJveEFycmF5W2luZGV4XS5saXN0Ym94X25hbWUsXHJcblx0XHRcdFx0ZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRcdFx0dGhpcy5jYWxsYmFja0ZuID0gZnVuY3Rpb24gKCkge307XHJcblx0XHRcdFx0XHR0aGlzLkRhdGEuU2VsZWN0VGV4dHMobGlzdEJveEFycmF5W2luZGV4XS5kZXNjX3ZhbHVlKTtcclxuXHRcdFx0XHRcdGluZGV4ICsrO1xyXG5cdFx0XHRcdFx0U2VsZWN0TGlzdEJveFZhbHVlcyhsaXN0Qm94QXJyYXksIGluZGV4LCBhZnRlckZuKTtcclxuXHRcdFx0XHR9LFxyXG5cdFx0XHRcdHRoaXMpO1xyXG5cdFx0fWVsc2V7XHJcblx0XHRcdGluZGV4ICsrO1xyXG5cdFx0XHRTZWxlY3RMaXN0Qm94VmFsdWVzKGxpc3RCb3hBcnJheSwgaW5kZXgsIGFmdGVyRm4pO1xyXG5cdFx0fVxyXG5cdH1lbHNlIGlmIChpbmRleCA9PT0gbGlzdEJveEFycmF5Lmxlbmd0aCl7XHJcblx0XHRpZiAodHlwZW9mIGFmdGVyRm4gPT09ICdmdW5jdGlvbicpXHJcblx0XHRcdHJldHVybiBhZnRlckZuKCk7XHJcblx0fVxyXG59OyIsIi8qKlxyXG4gKiBAbmFtZSAkQWRkQm9va21hcmtRdmEge2Z1bmN0aW9ufVxyXG4gKiBPcGVuIG5hdGl2ZSBBZGQgQm9va21hcmsgbW9kYWwgdmlhIHtRdmEuYmluZGVyfS5cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiAkQWRkQm9va21hcmtRdmEoKSB7XHJcblxyXG5cdFF2YS5Db250ZXh0Q2xpZW50QWN0aW9uKHtcclxuXHRcdGNsaWVudEFjdGlvbjogXCJtb2RhbFwiLFxyXG5cdFx0cGFyYW06IFwiYm1cIixcclxuXHRcdG5hbWU6IFwiQUREQk1cIixcclxuXHRcdGJpbmRlcjogUXYuR2V0Q3VycmVudERvY3VtZW50KCkuYmluZGVyXHJcblx0fSk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBAbmFtZSAkUmVtb3ZlQm9va21hcmtRdmEge2Z1bmN0aW9ufVxyXG4gKiBPcGVuIG5hdGl2ZSBSZW1vdmUgQm9va21hcmsgbW9kYWwgdmlhIHtRdmEuYmluZGVyfS5cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiAkUmVtb3ZlQm9va21hcmtRdmEoKSB7XHJcblxyXG5cdFF2YS5Db250ZXh0Q2xpZW50QWN0aW9uKHtcclxuXHRcdGNsaWVudEFjdGlvbjogXCJtb2RhbFwiLFxyXG5cdFx0cGFyYW06IFwicmVtb3ZlYm1cIixcclxuXHRcdG5hbWU6IFwiUkVNQk1cIixcclxuXHRcdGJpbmRlcjogUXYuR2V0Q3VycmVudERvY3VtZW50KCkuYmluZGVyXHJcblx0fSk7XHJcbn0iLCIvKipcclxuICogQG5hbWUgJE9wZW5SZXBvc2l0b3J5QWpheCB7ZnVuY3Rpb259XHJcbiAqIE9wZW4gbmF0aXZlIFJlcG9zaXRvcnkgbW9kYWwgdmlhICQuYWpheC5cclxuICpcclxuICogQHBhcmFtIGRlZkZpbHRlciB7bnVtYmVyfSAwLTMgLSBEZXByZWNhdGVkLlxyXG4gKiBAcGFyYW0gY2FsbGJhY2sge2Z1bmN0aW9ufSBDYWxsYmFjayBmdW5jdGlvbi4gLSBEZXByZWNhdGVkLlxyXG4gKlxyXG4gKiBAbm90ZSBSZXBvIGNhbiBiZSBvcGVuZWQgb25seSB3aXRoIGZha2UgcmVxdWVzdCB0byBRbGlrVmlldyBBU1AuTkVUIENsaWVudC5cclxuICogICAgICBSZWFzb24gaXMgcmVtb3RlIHJlcG9zaXRvcnksIFFsaWtWaWV3IG9wZW4gcmVwb3NpdG9yeSBvbmx5IGFmdGVyIEFTUC5ORVQgUWxpa1ZpZXcgY2xpZW50IHJlcXVlc3QuXHJcbiAqICAgICAgV2UgYWx3YXlzIGhhdmUgalF1ZXJ5LlxyXG4gKiBAdXJsIGh0dHBzOi8vY29tbXVuaXR5LnFsaWsuY29tL2RvY3MvRE9DLTI2MzlcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiAkT3BlblJlcG9zaXRvcnlBamF4KGRlZkZpbHRlciwgY2FsbGJhY2spIHtcclxuXHJcblx0IGxldCBiaW5kZXIgPSBRdi5HZXRDdXJyZW50RG9jdW1lbnQoKS5iaW5kZXIsXHJcblx0XHQgbWFyayA9IGJpbmRlci5NYXJrLFxyXG5cdFx0IHN0YW1wID0gYmluZGVyLlN0YW1wLFxyXG5cdFx0IHZpZXcgPSBiaW5kZXIuVmlldyxcclxuXHRcdCByZXBvRmlsdGVyID0gZGVmRmlsdGVyID4gMyAmJiBkZWZGaWx0ZXIgPCAwID8gMCA6IGRlZkZpbHRlcjtcclxuXHJcblx0IGxldCBpbml0UmVwb0RhdGEgPSBgPHVwZGF0ZVxyXG5cdCAgICAgICAgbWFyaz1cImArIG1hcmsgK2BcIlxyXG5cdCAgICAgICAgc3RhbXA9XCJgKyBzdGFtcCArYFwiXHJcblx0ICAgICAgICBjb29raWU9XCJ0cnVlXCJcclxuXHQgICAgICAgIHNjb3BlPVwiRG9jdW1lbnRcIlxyXG5cdCAgICAgICAgdmlldz1cImArIHZpZXcgK2BcIlxyXG5cdCAgICAgICAgaWRlbnQ9XCJudWxsXCI+XHJcblx0ICAgICAgICAgICAgPHNldCBuYW1lPVwiRG9jdW1lbnQuU3RhbmRhcmRBY3Rpb25zLlJFUE9TSVRPUllcIiBhY3Rpb249XCJcIiBjbGllbnRzaXplV0g9XCJcIiBwb3NpdGlvbj1cIlwiIGN1cnNvcj1cIlwiIC8+XHJcblx0ICAgICAgICA8L3VwZGF0ZT5gLFxyXG5cdCBzaG93UmVwb0RhdGEgPSBgPHVwZGF0ZVxyXG5cdCAgICAgICAgbWFyaz1cImArIG1hcmsgK2BcIlxyXG5cdCAgICAgICAgc3RhbXA9XCJgKyBzdGFtcCArYFwiXHJcblx0ICAgICAgICBjb29raWU9XCJ0cnVlXCJcclxuXHQgICAgICAgIHNjb3BlPVwiRG9jdW1lbnRcIlxyXG5cdCAgICAgICAgdmlldz1cImArIHZpZXcgK2BcIlxyXG5cdCAgICAgICAgaWRlbnQ9XCJudWxsXCI+XHJcblx0ICAgICAgICAgICAgPHNldCBuYW1lPVwiRG9jdW1lbnQuVE9PTFNcXFxcUkVQT1NJVE9SWS5GaWx0ZXJcIlxyXG5cdCAgICAgICAgICAgIHZhbHVlPVwiYCsgcmVwb0ZpbHRlciArYFwiIC8+XHJcblx0ICAgICAgICA8L3VwZGF0ZT5gO1xyXG5cclxuXHJcblx0IGxldCBpbml0UmVwb3NpdG9yeSA9ICgpID0+IHtcclxuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcblx0XHRcdCQuYWpheCh7XHJcblx0XHRcdFx0dXJsOiAnL1F2QWpheFpmYy9RdnNWaWV3Q2xpZW50LmFzcHg/bWFyaz0nICsgbWFyayArICcmdmlldz0nICsgdmlldyxcclxuXHRcdFx0XHRkYXRhOiBpbml0UmVwb0RhdGEsXHJcblx0XHRcdFx0dHlwZTogJ1BPU1QnLFxyXG5cdFx0XHRcdGNvbnRlbnRUeXBlOiBcInRleHQvcGxhaW47Y2hhcnNldD1VVEYtOFwiLFxyXG5cdFx0XHRcdGRhdGFUeXBlOiBcInRleHRcIixcclxuXHRcdFx0XHRzdWNjZXNzKCkge1xyXG5cdFx0XHRcdFx0cmVzb2x2ZSgpO1xyXG5cdFx0XHRcdH0sXHJcblx0XHRcdFx0ZXJyb3IoKSB7XHJcblx0XHRcdFx0XHRyZWplY3QoKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0pO1xyXG5cdFx0fSk7XHJcblx0fTtcclxuXHJcblx0IGxldCBzaG93UmVwb3NpdG9yeSA9ICgpID0+IHtcclxuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcblx0XHRcdCQuYWpheCh7XHJcblx0XHRcdFx0dXJsOiAnL1F2QWpheFpmYy9RdnNWaWV3Q2xpZW50LmFzcHg/bWFyaz0nICsgbWFyayArICcmdmlldz0nICsgdmlldyxcclxuXHRcdFx0XHRkYXRhOiBzaG93UmVwb0RhdGEsXHJcblx0XHRcdFx0dHlwZTogJ1BPU1QnLFxyXG5cdFx0XHRcdGNvbnRlbnRUeXBlOiBcInRleHQvcGxhaW47Y2hhcnNldD1VVEYtOFwiLFxyXG5cdFx0XHRcdGRhdGFUeXBlOiBcInRleHRcIixcclxuXHRcdFx0XHRzdWNjZXNzKCkge1xyXG5cdFx0XHRcdFx0cmVzb2x2ZSgpO1xyXG5cdFx0XHRcdH0sXHJcblx0XHRcdFx0ZXJyb3IoKSB7XHJcblx0XHRcdFx0XHRyZWplY3QoKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0pO1xyXG5cdFx0fSk7XHJcblx0fTtcclxuXHJcblx0IFByb21pc2UuYWxsKFtcclxuXHQgaW5pdFJlcG9zaXRvcnkoKSxcclxuXHQgc2hvd1JlcG9zaXRvcnkoKVxyXG5cdCBdKS50aGVuKCgpID0+IHtcclxuXHRcdGlmICh0eXBlb2YgY2FsbGJhY2sgPT0gJ2Z1bmN0aW9uJyl7XHJcblx0XHRcdHJldHVybiBjYWxsYmFjaygpXHJcblx0XHR9XHJcblx0fSlcclxufSIsIi8qKlxyXG4gKiBAbm90ZSBBbGwgYWN0aW9ucyB3aXRoIGF2YWlsYWJsZSBUb29sQmFyLlxyXG4gKlxyXG4gKiAkKCcjUXZBamF4VG9vbGJhcicpO1xyXG4gKi9cclxuXHJcbmltcG9ydCB7JFF2YVRvb2xiYXJBY3Rpb259IGZyb20gJy4uL3V0aWwvVXRpbCc7XHJcblxyXG4vKipcclxuICogQG5hbWUgJFNob3dGaWVsZHMge2Z1bmN0aW9ufVxyXG4gKiBPcGVuIG5hdGl2ZSBTaG93IEZpZWxkcyBtb2RhbC5cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiAkQWRkQm9va21hcmsoKSB7XHJcblx0JFF2YVRvb2xiYXJBY3Rpb24oJ0FEREJNJyk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBAbmFtZSAkU2hvd0ZpZWxkcyB7ZnVuY3Rpb259XHJcbiAqIE9wZW4gbmF0aXZlIFNob3cgRmllbGRzIG1vZGFsLlxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uICRSZW1vdmVCb29rbWFyaygpIHtcclxuXHQkUXZhVG9vbGJhckFjdGlvbignUkVNQk0nKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIEBuYW1lICRTaG93RmllbGRzIHtmdW5jdGlvbn1cclxuICogT3BlbiBuYXRpdmUgU2hvdyBGaWVsZHMgbW9kYWwuXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gJEVtYWlsQm9va21hcmsoKSB7XHJcblx0JFF2YVRvb2xiYXJBY3Rpb24oJ01BSUxBU0xJTksnKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIEBuYW1lICRTaG93RmllbGRzIHtmdW5jdGlvbn1cclxuICogT3BlbiBuYXRpdmUgU2hvd24gRmllbGRzIG1vZGFsLlxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uICROZXdTaGVldE9iamVjdCgpIHtcclxuXHQkUXZhVG9vbGJhckFjdGlvbignTkVXU0hFRVRPQkonKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIEBuYW1lICRSZXBvc2l0b3J5XHJcbiAqIE9wZW4gbmF0aXZlIFJlcG9zaXRvcnkgbW9kYWwuXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gJE9wZW5SZXBvc2l0b3J5KCkge1xyXG5cdCRRdmFUb29sYmFyQWN0aW9uKCdSRVBPU0lUT1JZJyk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBAbmFtZSAkUmVwb3NpdG9yeVxyXG4gKiBPcGVuIG5hdGl2ZSBSZXBvc2l0b3J5IG1vZGFsLlxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uICRTaG93RmllbGRzKCkge1xyXG5cdCRRdmFUb29sYmFyQWN0aW9uKCdTSE9XRklFTERTJyk7XHJcbn0iLCIvKipcclxuICogVHlwZSBWYWxpZGF0b3JcclxuICogXHJcbiAqIEBwYXJhbSB2YXJpYWJsZSB7b2JqZWN0fGJvb2xlYW58c3RyaW5nfG51bWJlcnxmdW5jdGlvbn1cclxuICogQHBhcmFtIHR5cGUge3N0cmluZ31cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiAkdHYodmFyaWFibGUsIHR5cGUpe1xyXG5cdHJldHVybiB0eXBlb2YgdmFyaWFibGUgPT09IHR5cGU7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBRdmFEb0FjdGlvblxyXG4gKiBcclxuICogQGRlcGVuZGVuY2llcyB7UXZhfVxyXG4gKiBAcGFyYW0gYWN0aW9uX25hbWUge3N0cmluZ30gLSBBY3Rpb24gTmFtZSwgZGVwZW5kIG9uIFF2YS5jcmVhdGVPcHRpb25zLlxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uICRRdmFUb29sYmFyQWN0aW9uKGFjdGlvbl9uYW1lKSB7XHJcblx0XHJcblx0UXZhLk1nci5tZW51LmRvQWN0aW9uKHtcclxuXHRcdHRhcmdldDogJy5jdHgtbWVudS1hY3Rpb24tJythY3Rpb25fbmFtZVxyXG5cdH0pO1xyXG59IiwiaW1wb3J0IHtRdmV0Q29yZX0gZnJvbSAnLi9jb3JlL0NvcmUnO1xyXG5cclxuKGZ1bmN0aW9uKHdpbmRvdyl7XHJcblx0aWYgKHR5cGVvZiBRdmEgPT09ICd1bmRlZmluZWQnXHJcblx0XHQmJiB0eXBlb2YgalF1ZXJ5ID09PSAndW5kZWZpbmVkJ1xyXG5cdFx0JiYgdHlwZW9mIHF2YSA9PT0gJ3VuZGVmaW5lZCdcclxuXHQpe1xyXG5cdFx0Y29uc29sZS5sb2coXCJDYW4ndCBpbml0IFF2ZXQgYmVjYXVzZSBRdmEvalF1ZXJ5L3F2YSBpcyB1bmRlZmluZWRcIilcclxuXHR9ZWxzZXtcclxuXHRcdGlmKHR5cGVvZihRdmV0KSA9PT0gJ3VuZGVmaW5lZCcpe1xyXG5cdFx0XHR3aW5kb3cuUXZldCA9IG5ldyBRdmV0Q29yZSgpO1xyXG5cdFx0fSBlbHNle1xyXG5cdFx0XHRjb25zb2xlLmxvZyhcIlF2ZXQgYWxyZWFkeSBkZWZpbmVkLlwiKTtcclxuXHRcdH1cclxuXHR9XHJcbn0pKHdpbmRvdyk7Il19
