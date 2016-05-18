/**
 * Qvet - QlikView Extension Trickster
 * 
 * @version v0.0.3
 * @author Valentyn Yakymenko <rayfesoul@gmail.com>
 * @license MIT
 *//**
 * Qvet - QlikView Extension Trickster
 * 
 * @version v0.0.3
 * @author Valentyn Yakymenko <rayfesoul@gmail.com>
 * @license MIT
 */(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.QvetCore = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Bookmarks = require('./native/Bookmarks');

var _Repository = require('./native/Repository');

var _ShowFields = require('./native/ShowFields');

var _NewSheetObject = require('./native/NewSheetObject');

var _EmailBookmark = require('./bookmark/EmailBookmark');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var version = '0.0.1-alpha';

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
				$add: _Bookmarks.$AddBookmark,
				$remove: _Bookmarks.$RemoveBookmark
			},
			$openRepository: _Repository.$OpenRepository,
			$showFields: _ShowFields.$ShowFields,
			$newSheetObject: _NewSheetObject.$NewSheetObject
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
	}]);

	return QvetCore;
}();

},{"./bookmark/EmailBookmark":2,"./native/Bookmarks":3,"./native/NewSheetObject":4,"./native/Repository":5,"./native/ShowFields":6}],2:[function(require,module,exports){
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
			name: "Email Bookmark", /** Name of the bookmark. */
			shared: true, /** Share the bookmark with other users. */
			excludeSelections: false, /** Exclude the selections made in the application. */
			includeState: true, /** Include state of all objects. */
			notDisplayed: false, /** The bookmark is not displayed in the bookmark list but is still selectable in code or via url. */
			descriptionShow: false, /** The bookmark description will be shown in a message when the bookmark is selected. */
			descriptionMsg: "", /** Description of the bookmark. */
			saveInputValues: true /** Include values in input fields.*/
		};

		this.defaulQvAjxZfc = '/QvAJAXZfc/opendoc.htm?document=';

		/** The bookmark is applied on top of any previous selections (no clear).*/
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
   * @param emailWindowMode {boolean} By default bookmark will open email in new window,
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
  * for create bookmark before email it.
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

			var uri = this.extraUri + window.location.origin + this.defaulQvAjxZfc + this.doc.binder.View + '&bookmark=' + this.bookmarkId;

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
exports.$AddBookmark = $AddBookmark;
exports.$RemoveBookmark = $RemoveBookmark;
/**
 * $AddBookmark - open native Add Bookmark modal.
 */
function $AddBookmark() {

	Qva.ContextClientAction({
		clientAction: "modal",
		param: "bm",
		name: "ADDBM",
		binder: Qv.GetCurrentDocument().binder
	});
}

/**
 * $RemoveBookmark - open native Remove Bookmark modal.
 */
function $RemoveBookmark() {

	Qva.ContextClientAction({
		clientAction: "modal",
		param: "removebm",
		name: "REMBM",
		binder: Qv.GetCurrentDocument().binder
	});
}

},{}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.$NewSheetObject = $NewSheetObject;
/**
 * $ShowFields - open native Show Fields modal.
 */
function $NewSheetObject() {

	Qva.Mgr.menu.doAction({
		target: '.ctx-menu-action-NEWSHEETOBJ'
	});
}

},{}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.$OpenRepository = $OpenRepository;
/**
 * $Repository - open native Repository modal.
 *
 * @param defFilter {number} 0-3 - Deprecated.
 * @param callback {function} Callback function. - Deprecated.
 *
 * @note Repo can be opened only with fake request to QlikView ASP.NET Client.
 *      Reason is remote repository, QlikView open repository only after ASP.NET QlikView client request.
 *      We always have jQuery.
 * @url https://community.qlik.com/docs/DOC-2639
 */
function $OpenRepository() {

  /**
   *  Deprecated version.
   *
  
   let binder = Qv.GetCurrentDocument().binder,
  	 mark = binder.Mark,
  	 stamp = binder.Stamp,
  	 view = binder.View,
  	 repoFilter = defFilter > 3 && defFilter < 0 ? 0 : defFilter;
  
   let initRepoData = `<update
   mark="`+ mark +`"
   stamp="`+ stamp +`"
   cookie="true"
   scope="Document"
   view="`+ view +`"
   ident="null">
   <set name="Document.StandardActions.REPOSITORY" action="" clientsizeWH="" position="" cursor="" />
   </update>`,
   showRepoData = `<update
   mark="`+ mark +`"
   stamp="`+ stamp +`"
   cookie="true"
   scope="Document"
   view="`+ view +`"
   ident="null">
   <set name="Document.TOOLS\\REPOSITORY.Filter"
   value="`+ repoFilter +`" />
   </update>`;
  
  
   let initRepository = () => {
  	return new Promise((resolve, reject) => {
  		$.ajax({
  			url: '/QvAjaxZfc/QvsViewClient.aspx?mark=' + mark + '&view=' + view,
  			data: initRepoData,
  			type: 'POST',
  			contentType: "text/plain;charset=UTF-8",
  			dataType: "text",
  			success() {
  				resolve();
  			},
  			error() {
  				reject();
  			}
  		});
  	});
  };
  
   let showRepository = () => {
  	return new Promise((resolve, reject) => {
  		$.ajax({
  			url: '/QvAjaxZfc/QvsViewClient.aspx?mark=' + mark + '&view=' + view,
  			data: showRepoData,
  			type: 'POST',
  			contentType: "text/plain;charset=UTF-8",
  			dataType: "text",
  			success() {
  				resolve();
  			},
  			error() {
  				reject();
  			}
  		});
  	});
  };
  
   Promise.all([
   initRepository(),
   showRepository()
   ]).then(() => {
  	if (typeof callback == 'function'){
  		return callback()
  	}
  })
   */

  Qva.Mgr.menu.doAction({
    target: '.ctx-menu-action-REPOSITORY'
  });
}

},{}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.$ShowFields = $ShowFields;
/**
 * $ShowFields - open native Show Fields modal.
 */
function $ShowFields() {

	Qva.Mgr.menu.doAction({
		target: '.ctx-menu-action-SHOWFIELDS'
	});
}

},{}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

exports.$tv = $tv;
/**
 * Type Validator
 * 
 * @param variable {object|boolean|string|number|function}
 * @param type {string}
 */
function $tv(variable, type) {
  return (typeof variable === "undefined" ? "undefined" : _typeof(variable)) === type;
}

},{}],8:[function(require,module,exports){
'use strict';

var _Core = require('./core/Core');

(function (window) {
	if (typeof Qva === 'undefined' && typeof jQuery === 'undefined') {
		console.log("Can't init Qvet because Qva/jQuery is undefined");
	} else {
		if (typeof Qvet === 'undefined') {
			window.Qvet = new _Core.QvetCore();
		} else {
			console.log("Qvet already defined.");
		}
	}
})(window);

},{"./core/Core":1}]},{},[8])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmNcXGNvcmVcXENvcmUuanMiLCJzcmNcXGNvcmVcXGJvb2ttYXJrXFxFbWFpbEJvb2ttYXJrLmpzIiwic3JjXFxjb3JlXFxuYXRpdmVcXEJvb2ttYXJrcy5qcyIsInNyY1xcY29yZVxcbmF0aXZlXFxOZXdTaGVldE9iamVjdC5qcyIsInNyY1xcY29yZVxcbmF0aXZlXFxSZXBvc2l0b3J5LmpzIiwic3JjXFxjb3JlXFxuYXRpdmVcXFNob3dGaWVsZHMuanMiLCJzcmNcXGNvcmVcXHV0aWxcXFV0aWwuanMiLCJzcmNcXFF2ZXQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7QUNLQSxBQUFRLEFBQWMsQUFBc0I7O0FBQzVDLEFBQVEsQUFBc0I7O0FBQzlCLEFBQVEsQUFBa0I7O0FBQzFCLEFBQVEsQUFBc0I7O0FBSzlCLEFBQVEsQUFBb0IsQUFFNUIsQUFBTzs7OztBQWZQLElBQU0sVUFBTixBQUFnQjs7Ozs7Ozs7Ozs7SUFlVCxBQUFNLEFBQVMsQUFDckI7O0FBQWEsQUFFWjs7T0FBQSxBQUFLOztBQUNNLEFBQ0gsQUFDTjtBQUhZLEFBQ0gsQUFFQSxBQUVWO0FBSlUsQUFDVDtBQUZZLEFBS0ksQUFDakI7QUFOYSxBQU1BLEFBQ2I7QUFQRCxBQUFjLEFBT0ksQUFFbEI7QUFUYyxBQUNiO0FBVUY7Ozs7K0JBQVksQUFDWDtVQUFPLFFBQUEsQUFBUSxJQUFJLG1CQUFuQixBQUFPLEFBQStCLEFBQ3RDO0FBRUQ7OztvQ0FBQSxBQUFrQixRQUFsQixBQUEwQixhQUFZLEFBQ3JDO1VBQU8sQUFBSSxpQ0FBSixBQUFrQixRQUFsQixBQUEwQixhQUExQixBQUF1QyxpQkFBOUMsQUFBTyxBQUF3RCxBQUMvRDtBQXBCb0I7Ozs7Ozs7Ozs7Ozs7Ozs7QUNmdEIsQUFBUSxBQUFVLEFBT2xCLEFBQU87Ozs7Ozs7Ozs7SUFBQSxBQUFNLEFBQWMsQUF3QjFCOzs7Ozs7Ozs7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TyxRQUFBLEFBQU8sZ0VBQWQsQUFBMkIsQUFDM0I7Ozs7OztBQ1JELEFBQVEsQUFBZTs7QUFFdkIsQ0FBQyxVQUFBLEFBQVMsUUFBTyxBQUNoQjtLQUFJLE9BQUEsQUFBTyxRQUFQLEFBQWUsZUFBZSxPQUFBLEFBQU8sV0FBekMsQUFBb0QsYUFBWSxBQUMvRDtVQUFBLEFBQVEsSUFBUixBQUFZLEFBQ1o7QUFGRCxRQUVLLEFBQ0o7TUFBRyxPQUFBLEFBQU8sU0FBVixBQUFvQixhQUFZLEFBQy9CO1VBQUEsQUFBTyxPQUFQLEFBQWMsQUFBSSxBQUNsQjtBQUZELFNBRU0sQUFDTDtXQUFBLEFBQVEsSUFBUixBQUFZLEFBQ1o7QUFDRDtBQUNEO0FBVkQsR0FBQSxBQVVHIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImNvbnN0IHZlcnNpb24gPSAnMC4wLjEtYWxwaGEnO1xyXG5cclxuLyoqXHJcbiAqIE5hdGl2ZS5cclxuICovXHJcbmltcG9ydCB7JEFkZEJvb2ttYXJrLCAkUmVtb3ZlQm9va21hcmt9IGZyb20gJy4vbmF0aXZlL0Jvb2ttYXJrcyc7XHJcbmltcG9ydCB7JE9wZW5SZXBvc2l0b3J5fSBmcm9tICcuL25hdGl2ZS9SZXBvc2l0b3J5JztcclxuaW1wb3J0IHskU2hvd0ZpZWxkc30gZnJvbSAnLi9uYXRpdmUvU2hvd0ZpZWxkcyc7XHJcbmltcG9ydCB7JE5ld1NoZWV0T2JqZWN0fSBmcm9tICcuL25hdGl2ZS9OZXdTaGVldE9iamVjdCc7XHJcblxyXG4vKipcclxuICogQWRkaXRpb24uXHJcbiAqL1xyXG5pbXBvcnQge0VtYWlsQm9va21hcmt9IGZyb20gJy4vYm9va21hcmsvRW1haWxCb29rbWFyayc7XHRcclxuXHJcbmV4cG9ydCBjbGFzcyBRdmV0Q29yZSB7XHJcblx0Y29uc3RydWN0b3IoKXtcclxuXHJcblx0XHR0aGlzLm5hdGl2ZSA9IHtcclxuXHRcdFx0Ym9va21hcmtzOntcclxuXHRcdFx0XHQkYWRkOiAkQWRkQm9va21hcmssXHJcblx0XHRcdFx0JHJlbW92ZTogJFJlbW92ZUJvb2ttYXJrXHJcblx0XHRcdH0sXHJcblx0XHRcdCRvcGVuUmVwb3NpdG9yeTogJE9wZW5SZXBvc2l0b3J5LFxyXG5cdFx0XHQkc2hvd0ZpZWxkczogJFNob3dGaWVsZHMsXHJcblx0XHRcdCRuZXdTaGVldE9iamVjdDogJE5ld1NoZWV0T2JqZWN0XHJcblx0XHR9O1xyXG5cdH1cclxuXHJcblx0Z2V0VmVyc2lvbigpe1xyXG5cdFx0cmV0dXJuIGNvbnNvbGUubG9nKCdRdmV0IHZlcnNpb246ICcgKyB2ZXJzaW9uKTtcclxuXHR9XHJcblxyXG5cdHNlbmRFbWFpbEJvb2ttYXJrKGNvbmZpZywgZXh0cmFQYXJhbXMpe1xyXG5cdFx0cmV0dXJuIG5ldyBFbWFpbEJvb2ttYXJrKGNvbmZpZywgZXh0cmFQYXJhbXMpLmNyZWF0ZUJvb2ttYXJrKCkub3BlbkVtYWlsV2luZG93KCk7XHJcblx0fVxyXG59IiwiaW1wb3J0IHskdHZ9IGZyb20gJy4uL3V0aWwvVXRpbCc7XHJcblxyXG4vKipcclxuICogRW1haWwgUWxpa1ZpZXcgQm9va21hcmsuXHJcbiAqIFxyXG4gKiBAY29uc3RydWN0b3JcclxuICovXHJcbmV4cG9ydCBjbGFzcyBFbWFpbEJvb2ttYXJrIHtcclxuXHRcclxuXHRcclxuXHQvKipcclxuXHQgKiAgQ29uZmlnLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIGNvbmZpZyB7b2JqZWN0fVxyXG5cdCAqXHJcblx0ICogQHBhcmFtIGNvbmZpZy5lbWFpbFN1YmplY3Qge3N0cmluZ31cclxuXHQgKiBAcGFyYW0gY29uZmlnLm5hbWUge3N0cmluZ31cclxuXHQgKiBAcGFyYW0gY29uZmlnLnNoYXJlZCB7Ym9vbGVhbn1cclxuXHQgKiBAcGFyYW0gY29uZmlnLmV4Y2x1ZGVTZWxlY3Rpb25zIHtib29sZWFufVxyXG5cdCAqIEBwYXJhbSBjb25maWcuaW5jbHVkZVN0YXRlIHtib29sZWFufVxyXG5cdCAqIEBwYXJhbSBjb25maWcubm90RGlzcGxheWVkIHtib29sZWFufVxyXG5cdCAqIEBwYXJhbSBjb25maWcuZGVzY3JpcHRpb25TaG93IHtib29sZWFufVxyXG5cdCAqIEBwYXJhbSBjb25maWcuZGVzY3JpcHRpb25Nc2cge3N0cmluZ31cclxuXHQgKiBAcGFyYW0gY29uZmlnLnNhdmVJbnB1dFZhbHVlcyB7Ym9vbGVhbn1cclxuXHQgKlxyXG5cdCAqICBFeHRyYSBQYXJhbXMuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gZXh0cmFQYXJhbXMge29iamVjdH1cclxuXHQgKiBAcGFyYW0gZXh0cmFQYXJhbXMuZXh0cmFVcmkge3N0cmluZ31cclxuXHQgKiBAcGFyYW0gZXh0cmFQYXJhbXMuZW1haWxXaW5kb3dNb2RlIHtib29sZWFufVxyXG5cdCAqL1xyXG5cdGNvbnN0cnVjdG9yKGNvbmZpZywgZXh0cmFQYXJhbXMpIHtcclxuXHRcdFxyXG5cdFx0bGV0IGRlZmF1bHRDb25maWcgPSB7XHJcblx0XHRcdGVtYWlsU3ViamVjdDogXCJcIixcclxuXHRcdFx0bmFtZTogXCJFbWFpbCBCb29rbWFya1wiLCAvKiogTmFtZSBvZiB0aGUgYm9va21hcmsuICovXHJcblx0XHRcdHNoYXJlZDogdHJ1ZSwgLyoqIFNoYXJlIHRoZSBib29rbWFyayB3aXRoIG90aGVyIHVzZXJzLiAqL1xyXG5cdFx0XHRleGNsdWRlU2VsZWN0aW9uczogZmFsc2UsIC8qKiBFeGNsdWRlIHRoZSBzZWxlY3Rpb25zIG1hZGUgaW4gdGhlIGFwcGxpY2F0aW9uLiAqL1xyXG5cdFx0XHRpbmNsdWRlU3RhdGU6IHRydWUsIC8qKiBJbmNsdWRlIHN0YXRlIG9mIGFsbCBvYmplY3RzLiAqL1xyXG5cdFx0XHRub3REaXNwbGF5ZWQ6IGZhbHNlLCAvKiogVGhlIGJvb2ttYXJrIGlzIG5vdCBkaXNwbGF5ZWQgaW4gdGhlIGJvb2ttYXJrIGxpc3QgYnV0IGlzIHN0aWxsIHNlbGVjdGFibGUgaW4gY29kZSBvciB2aWEgdXJsLiAqL1xyXG5cdFx0XHRkZXNjcmlwdGlvblNob3c6IGZhbHNlLCAvKiogVGhlIGJvb2ttYXJrIGRlc2NyaXB0aW9uIHdpbGwgYmUgc2hvd24gaW4gYSBtZXNzYWdlIHdoZW4gdGhlIGJvb2ttYXJrIGlzIHNlbGVjdGVkLiAqL1xyXG5cdFx0XHRkZXNjcmlwdGlvbk1zZzogXCJcIiwgLyoqIERlc2NyaXB0aW9uIG9mIHRoZSBib29rbWFyay4gKi9cclxuXHRcdFx0c2F2ZUlucHV0VmFsdWVzOiB0cnVlIC8qKiBJbmNsdWRlIHZhbHVlcyBpbiBpbnB1dCBmaWVsZHMuKi9cclxuXHRcdH07XHJcblx0XHJcblx0XHR0aGlzLmRlZmF1bFF2QWp4WmZjID0gJy9RdkFKQVhaZmMvb3BlbmRvYy5odG0/ZG9jdW1lbnQ9JztcclxuXHRcdFxyXG5cdFx0LyoqIFRoZSBib29rbWFyayBpcyBhcHBsaWVkIG9uIHRvcCBvZiBhbnkgcHJldmlvdXMgc2VsZWN0aW9ucyAobm8gY2xlYXIpLiovXHJcblx0XHR0aGlzLmFwcGxpZWQgPSB0cnVlO1xyXG5cdFx0dGhpcy5kb2MgPSBRdi5HZXRDdXJyZW50RG9jdW1lbnQoKTtcclxuXHRcdHRoaXMuYm9va21hcmtJZCA9ICcnO1xyXG5cdFx0XHJcblx0XHJcblx0XHQvKipcclxuXHRcdCAqIEltcG9ydGFudCBwYXJhbXMuXHJcblx0XHQgKiBAdHlwZSB7KnxzdHJpbmd9XHJcblx0XHQgKi9cclxuXHRcdGlmICgkdHYoY29uZmlnLCAnb2JqZWN0Jykpe1xyXG5cdFx0XHR0aGlzLmVtYWlsU3ViamVjdCA9IGNvbmZpZy5lbWFpbFN1YmplY3QgfHwgZGVmYXVsdENvbmZpZy5lbWFpbFN1YmplY3Q7XHJcblx0XHRcdHRoaXMubmFtZSA9IGNvbmZpZy5uYW1lIHx8IGRlZmF1bHRDb25maWcubmFtZTtcclxuXHRcdFx0dGhpcy5zaGFyZWQgPSBjb25maWcuc2hhcmVkIHx8IGRlZmF1bHRDb25maWcuc2hhcmVkO1xyXG5cdFx0XHR0aGlzLmV4Y2x1ZGVTZWxlY3Rpb25zID0gY29uZmlnLmV4Y2x1ZGVTZWxlY3Rpb25zIHx8IGRlZmF1bHRDb25maWcuZXhjbHVkZVNlbGVjdGlvbnM7XHJcblx0XHRcdHRoaXMuaW5jbHVkZVN0YXRlID0gY29uZmlnLmluY2x1ZGVTdGF0ZSB8fCBkZWZhdWx0Q29uZmlnLmluY2x1ZGVTdGF0ZTtcclxuXHRcdFx0dGhpcy5ub3REaXNwbGF5ZWQgPSBjb25maWcubm90RGlzcGxheWVkIHx8IGRlZmF1bHRDb25maWcubm90RGlzcGxheWVkO1xyXG5cdFx0XHR0aGlzLmRlc2NyaXB0aW9uU2hvdyA9IGNvbmZpZy5kZXNjcmlwdGlvblNob3cgfHwgZGVmYXVsdENvbmZpZy5kZXNjcmlwdGlvblNob3c7XHJcblx0XHRcdHRoaXMuZGVzY3JpcHRpb25Nc2cgPSBjb25maWcuZGVzY3JpcHRpb25Nc2cgfHwgZGVmYXVsdENvbmZpZy5kZXNjcmlwdGlvbk1zZztcclxuXHRcdFx0dGhpcy5zYXZlSW5wdXRWYWx1ZXMgPSBjb25maWcuc2F2ZUlucHV0VmFsdWVzIHx8IGRlZmF1bHRDb25maWcuc2F2ZUlucHV0VmFsdWVzO1xyXG5cdFx0fWVsc2V7XHJcblx0XHRcdGZvciAobGV0IGtleSBpbiBkZWZhdWx0Q29uZmlnKXtcclxuXHRcdFx0XHRpZiAoZGVmYXVsdENvbmZpZy5oYXNPd25Qcm9wZXJ0eShrZXkpKVxyXG5cdFx0XHRcdFx0dGhpc1trZXldID0gZGVmYXVsdENvbmZpZ1trZXldO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHJcblx0XHQvKipcclxuXHRcdCAqIEV4dHJhIHBhcmFtcy5cclxuXHRcdCAqXHJcblx0XHQgKiBAcGFyYW0gZXh0cmFVcmkge3N0cmluZ30gVXNlIGl0IGZvciBhZGQgcGFyZW50IHVybCB0byB5b3VyIFFsaWtWaWV3IEFTUC5ORVQgY2xpZW50LiBUT0RPOiBJbiBEZXZlbG9wbWVudC5cclxuXHRcdCAqIEBwYXJhbSBlbWFpbFdpbmRvd01vZGUge2Jvb2xlYW59IEJ5IGRlZmF1bHQgYm9va21hcmsgd2lsbCBvcGVuIGVtYWlsIGluIG5ldyB3aW5kb3csXHJcblx0XHQgKiBidXQgeW91IGNhbiBjaGFuZ2UgaXQgdG8ge2ZhbHNlfSBhbmQgZW1haWwgd2luZG93IHdpbGwgYmUgb3BlbmVkIG9uIHNhbWUgZG9tYWluLlxyXG5cdFx0ICovXHJcblx0XHRpZiAoJHR2KGV4dHJhUGFyYW1zLCAnb2JqZWN0Jykpe1xyXG5cdFx0XHR0aGlzLmV4dHJhVXJpID0gZXh0cmFQYXJhbXMuZXh0cmFVcmkgfHwgJyc7XHJcblx0XHRcdHRoaXMuZW1haWxXaW5kb3dNb2RlID0gZXh0cmFQYXJhbXMuZW1haWxXaW5kb3dNb2RlIHx8IHRydWU7XHJcblx0XHR9ZWxzZXtcclxuXHRcdFx0dGhpcy5leHRyYVVyaSA9ICcnO1xyXG5cdFx0XHR0aGlzLmVtYWlsV2luZG93TW9kZSA9IHRydWU7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHJcblx0LyoqXHJcblx0ICogVXNlIG5hdGl2ZSBCb29rbWFya3MgQ2xhc3NcclxuXHQgKiBmb3IgY3JlYXRlIGJvb2ttYXJrIGJlZm9yZSBlbWFpbCBpdC5cclxuXHQgKlxyXG5cdCAqIEBleHRlbmRzIHt9XHJcblx0ICovXHJcblx0Y3JlYXRlQm9va21hcmsoKXtcclxuXHJcblx0XHR0aGlzLmRvY1xyXG5cdFx0XHQuQm9va21hcmtzKClcclxuXHRcdFx0Lk5ld0Jvb2ttYXJrKFxyXG5cdFx0XHRcdHRoaXMubmFtZSxcclxuXHRcdFx0XHR0aGlzLmFwcGxpZWQsXHJcblx0XHRcdFx0dGhpcy5zaGFyZWQsXHJcblx0XHRcdFx0dGhpcy5leGNsdWRlU2VsZWN0aW9ucyxcclxuXHRcdFx0XHR0aGlzLmluY2x1ZGVTdGF0ZSxcclxuXHRcdFx0XHR0aGlzLm5vdERpc3BsYXllZCxcclxuXHRcdFx0XHR0aGlzLmRlc2NyaXB0aW9uU2hvdyxcclxuXHRcdFx0XHR0aGlzLmRlc2NyaXB0aW9uTXNnLFxyXG5cdFx0XHRcdHRoaXMuc2F2ZUlucHV0VmFsdWVzXHJcblx0XHRcdCk7XHJcblxyXG5cdFx0dGhpcy5ib29rbWFya0lkID0gdGhpcy5kb2MuQm9va21hcmtzKCkuQm9va01hcmtzW3RoaXMuZG9jLkJvb2ttYXJrcygpLkJvb2tNYXJrcy5sZW5ndGgtMV0udmFsdWU7XHJcblx0XHRcclxuXHRcdHJldHVybiB0aGlzO1xyXG5cdH07XHJcblxyXG5cdG9wZW5FbWFpbFdpbmRvdygpe1xyXG5cdFx0XHJcblx0XHRsZXQgdXJpID0gdGhpcy5leHRyYVVyaSArXHJcblx0XHRcdHdpbmRvdy5sb2NhdGlvbi5vcmlnaW4gK1xyXG5cdFx0XHR0aGlzLmRlZmF1bFF2QWp4WmZjICtcclxuXHRcdFx0dGhpcy5kb2MuYmluZGVyLlZpZXcgK1xyXG5cdFx0XHQnJmJvb2ttYXJrPScrXHJcblx0XHRcdHRoaXMuYm9va21hcmtJZDtcclxuXHRcdFxyXG5cdFx0bGV0IHVyaV9lbmMgPSBlbmNvZGVVUklDb21wb25lbnQodXJpKS5yZXBsYWNlKC8lMjAvZywgXCIlMjUyMFwiKSxcclxuXHRcdFx0bWFpbGVyID0gJ21haWx0bzo/c3ViamVjdD0nK3RoaXMuZW1haWxTdWJqZWN0KycmYm9keT0nK3VyaV9lbmM7XHJcblxyXG5cdFx0dGhpcy5lbWFpbFdpbmRvd01vZGUgPyB3aW5kb3cubG9jYXRpb24uaHJlZiA9IG1haWxlciA6IGxvY2F0aW9uLmhyZWYgPSBtYWlsZXI7XHJcblx0XHRcclxuXHRcdHJldHVybiB0aGlzO1xyXG5cdH1cclxufSIsIi8qKlxyXG4gKiAkQWRkQm9va21hcmsgLSBvcGVuIG5hdGl2ZSBBZGQgQm9va21hcmsgbW9kYWwuXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gJEFkZEJvb2ttYXJrKCkge1xyXG5cclxuXHRRdmEuQ29udGV4dENsaWVudEFjdGlvbih7XHJcblx0XHRjbGllbnRBY3Rpb246IFwibW9kYWxcIixcclxuXHRcdHBhcmFtOiBcImJtXCIsXHJcblx0XHRuYW1lOiBcIkFEREJNXCIsXHJcblx0XHRiaW5kZXI6IFF2LkdldEN1cnJlbnREb2N1bWVudCgpLmJpbmRlclxyXG5cdH0pO1xyXG59XHJcblxyXG4vKipcclxuICogJFJlbW92ZUJvb2ttYXJrIC0gb3BlbiBuYXRpdmUgUmVtb3ZlIEJvb2ttYXJrIG1vZGFsLlxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uICRSZW1vdmVCb29rbWFyaygpIHtcclxuXHJcblx0UXZhLkNvbnRleHRDbGllbnRBY3Rpb24oe1xyXG5cdFx0Y2xpZW50QWN0aW9uOiBcIm1vZGFsXCIsXHJcblx0XHRwYXJhbTogXCJyZW1vdmVibVwiLFxyXG5cdFx0bmFtZTogXCJSRU1CTVwiLFxyXG5cdFx0YmluZGVyOiBRdi5HZXRDdXJyZW50RG9jdW1lbnQoKS5iaW5kZXJcclxuXHR9KTtcclxufSIsIi8qKlxyXG4gKiAkU2hvd0ZpZWxkcyAtIG9wZW4gbmF0aXZlIFNob3cgRmllbGRzIG1vZGFsLlxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uICROZXdTaGVldE9iamVjdCgpIHtcclxuXHRcclxuXHRRdmEuTWdyLm1lbnUuZG9BY3Rpb24oe1xyXG5cdFx0dGFyZ2V0OiAnLmN0eC1tZW51LWFjdGlvbi1ORVdTSEVFVE9CSidcclxuXHR9KTtcclxufSIsIi8qKlxyXG4gKiAkUmVwb3NpdG9yeSAtIG9wZW4gbmF0aXZlIFJlcG9zaXRvcnkgbW9kYWwuXHJcbiAqXHJcbiAqIEBwYXJhbSBkZWZGaWx0ZXIge251bWJlcn0gMC0zIC0gRGVwcmVjYXRlZC5cclxuICogQHBhcmFtIGNhbGxiYWNrIHtmdW5jdGlvbn0gQ2FsbGJhY2sgZnVuY3Rpb24uIC0gRGVwcmVjYXRlZC5cclxuICpcclxuICogQG5vdGUgUmVwbyBjYW4gYmUgb3BlbmVkIG9ubHkgd2l0aCBmYWtlIHJlcXVlc3QgdG8gUWxpa1ZpZXcgQVNQLk5FVCBDbGllbnQuXHJcbiAqICAgICAgUmVhc29uIGlzIHJlbW90ZSByZXBvc2l0b3J5LCBRbGlrVmlldyBvcGVuIHJlcG9zaXRvcnkgb25seSBhZnRlciBBU1AuTkVUIFFsaWtWaWV3IGNsaWVudCByZXF1ZXN0LlxyXG4gKiAgICAgIFdlIGFsd2F5cyBoYXZlIGpRdWVyeS5cclxuICogQHVybCBodHRwczovL2NvbW11bml0eS5xbGlrLmNvbS9kb2NzL0RPQy0yNjM5XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gJE9wZW5SZXBvc2l0b3J5KCkge1xyXG5cclxuXHQvKipcclxuXHQgKiAgRGVwcmVjYXRlZCB2ZXJzaW9uLlxyXG5cdCAqXHJcblxyXG5cdCBsZXQgYmluZGVyID0gUXYuR2V0Q3VycmVudERvY3VtZW50KCkuYmluZGVyLFxyXG5cdFx0IG1hcmsgPSBiaW5kZXIuTWFyayxcclxuXHRcdCBzdGFtcCA9IGJpbmRlci5TdGFtcCxcclxuXHRcdCB2aWV3ID0gYmluZGVyLlZpZXcsXHJcblx0XHQgcmVwb0ZpbHRlciA9IGRlZkZpbHRlciA+IDMgJiYgZGVmRmlsdGVyIDwgMCA/IDAgOiBkZWZGaWx0ZXI7XHJcblxyXG5cdCBsZXQgaW5pdFJlcG9EYXRhID0gYDx1cGRhdGVcclxuXHQgbWFyaz1cImArIG1hcmsgK2BcIlxyXG5cdCBzdGFtcD1cImArIHN0YW1wICtgXCJcclxuXHQgY29va2llPVwidHJ1ZVwiXHJcblx0IHNjb3BlPVwiRG9jdW1lbnRcIlxyXG5cdCB2aWV3PVwiYCsgdmlldyArYFwiXHJcblx0IGlkZW50PVwibnVsbFwiPlxyXG5cdCA8c2V0IG5hbWU9XCJEb2N1bWVudC5TdGFuZGFyZEFjdGlvbnMuUkVQT1NJVE9SWVwiIGFjdGlvbj1cIlwiIGNsaWVudHNpemVXSD1cIlwiIHBvc2l0aW9uPVwiXCIgY3Vyc29yPVwiXCIgLz5cclxuXHQgPC91cGRhdGU+YCxcclxuXHQgc2hvd1JlcG9EYXRhID0gYDx1cGRhdGVcclxuXHQgbWFyaz1cImArIG1hcmsgK2BcIlxyXG5cdCBzdGFtcD1cImArIHN0YW1wICtgXCJcclxuXHQgY29va2llPVwidHJ1ZVwiXHJcblx0IHNjb3BlPVwiRG9jdW1lbnRcIlxyXG5cdCB2aWV3PVwiYCsgdmlldyArYFwiXHJcblx0IGlkZW50PVwibnVsbFwiPlxyXG5cdCA8c2V0IG5hbWU9XCJEb2N1bWVudC5UT09MU1xcXFxSRVBPU0lUT1JZLkZpbHRlclwiXHJcblx0IHZhbHVlPVwiYCsgcmVwb0ZpbHRlciArYFwiIC8+XHJcblx0IDwvdXBkYXRlPmA7XHJcblxyXG5cclxuXHQgbGV0IGluaXRSZXBvc2l0b3J5ID0gKCkgPT4ge1xyXG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuXHRcdFx0JC5hamF4KHtcclxuXHRcdFx0XHR1cmw6ICcvUXZBamF4WmZjL1F2c1ZpZXdDbGllbnQuYXNweD9tYXJrPScgKyBtYXJrICsgJyZ2aWV3PScgKyB2aWV3LFxyXG5cdFx0XHRcdGRhdGE6IGluaXRSZXBvRGF0YSxcclxuXHRcdFx0XHR0eXBlOiAnUE9TVCcsXHJcblx0XHRcdFx0Y29udGVudFR5cGU6IFwidGV4dC9wbGFpbjtjaGFyc2V0PVVURi04XCIsXHJcblx0XHRcdFx0ZGF0YVR5cGU6IFwidGV4dFwiLFxyXG5cdFx0XHRcdHN1Y2Nlc3MoKSB7XHJcblx0XHRcdFx0XHRyZXNvbHZlKCk7XHJcblx0XHRcdFx0fSxcclxuXHRcdFx0XHRlcnJvcigpIHtcclxuXHRcdFx0XHRcdHJlamVjdCgpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSk7XHJcblx0XHR9KTtcclxuXHR9O1xyXG5cclxuXHQgbGV0IHNob3dSZXBvc2l0b3J5ID0gKCkgPT4ge1xyXG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuXHRcdFx0JC5hamF4KHtcclxuXHRcdFx0XHR1cmw6ICcvUXZBamF4WmZjL1F2c1ZpZXdDbGllbnQuYXNweD9tYXJrPScgKyBtYXJrICsgJyZ2aWV3PScgKyB2aWV3LFxyXG5cdFx0XHRcdGRhdGE6IHNob3dSZXBvRGF0YSxcclxuXHRcdFx0XHR0eXBlOiAnUE9TVCcsXHJcblx0XHRcdFx0Y29udGVudFR5cGU6IFwidGV4dC9wbGFpbjtjaGFyc2V0PVVURi04XCIsXHJcblx0XHRcdFx0ZGF0YVR5cGU6IFwidGV4dFwiLFxyXG5cdFx0XHRcdHN1Y2Nlc3MoKSB7XHJcblx0XHRcdFx0XHRyZXNvbHZlKCk7XHJcblx0XHRcdFx0fSxcclxuXHRcdFx0XHRlcnJvcigpIHtcclxuXHRcdFx0XHRcdHJlamVjdCgpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSk7XHJcblx0XHR9KTtcclxuXHR9O1xyXG5cclxuXHQgUHJvbWlzZS5hbGwoW1xyXG5cdCBpbml0UmVwb3NpdG9yeSgpLFxyXG5cdCBzaG93UmVwb3NpdG9yeSgpXHJcblx0IF0pLnRoZW4oKCkgPT4ge1xyXG5cdFx0aWYgKHR5cGVvZiBjYWxsYmFjayA9PSAnZnVuY3Rpb24nKXtcclxuXHRcdFx0cmV0dXJuIGNhbGxiYWNrKClcclxuXHRcdH1cclxuXHR9KVxyXG5cdCAqL1xyXG5cclxuXHRRdmEuTWdyLm1lbnUuZG9BY3Rpb24oe1xyXG5cdFx0dGFyZ2V0OiAnLmN0eC1tZW51LWFjdGlvbi1SRVBPU0lUT1JZJ1xyXG5cdH0pO1xyXG59IiwiLyoqXHJcbiAqICRTaG93RmllbGRzIC0gb3BlbiBuYXRpdmUgU2hvdyBGaWVsZHMgbW9kYWwuXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gJFNob3dGaWVsZHMoKSB7XHJcblx0XHJcblx0UXZhLk1nci5tZW51LmRvQWN0aW9uKHtcclxuXHRcdHRhcmdldDogJy5jdHgtbWVudS1hY3Rpb24tU0hPV0ZJRUxEUydcclxuXHR9KTtcclxufSIsIi8qKlxyXG4gKiBUeXBlIFZhbGlkYXRvclxyXG4gKiBcclxuICogQHBhcmFtIHZhcmlhYmxlIHtvYmplY3R8Ym9vbGVhbnxzdHJpbmd8bnVtYmVyfGZ1bmN0aW9ufVxyXG4gKiBAcGFyYW0gdHlwZSB7c3RyaW5nfVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uICR0dih2YXJpYWJsZSwgdHlwZSl7XHJcblx0cmV0dXJuIHR5cGVvZiB2YXJpYWJsZSA9PT0gdHlwZTtcclxufSIsImltcG9ydCB7UXZldENvcmV9IGZyb20gJy4vY29yZS9Db3JlJztcclxuXHJcbihmdW5jdGlvbih3aW5kb3cpe1xyXG5cdGlmICh0eXBlb2YgUXZhID09PSAndW5kZWZpbmVkJyAmJiB0eXBlb2YgalF1ZXJ5ID09PSAndW5kZWZpbmVkJyl7XHJcblx0XHRjb25zb2xlLmxvZyhcIkNhbid0IGluaXQgUXZldCBiZWNhdXNlIFF2YS9qUXVlcnkgaXMgdW5kZWZpbmVkXCIpXHJcblx0fWVsc2V7XHJcblx0XHRpZih0eXBlb2YoUXZldCkgPT09ICd1bmRlZmluZWQnKXtcclxuXHRcdFx0d2luZG93LlF2ZXQgPSBuZXcgUXZldENvcmUoKTtcclxuXHRcdH0gZWxzZXtcclxuXHRcdFx0Y29uc29sZS5sb2coXCJRdmV0IGFscmVhZHkgZGVmaW5lZC5cIik7XHJcblx0XHR9XHJcblx0fVxyXG59KSh3aW5kb3cpOyJdfQ==
