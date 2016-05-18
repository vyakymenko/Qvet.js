/**
 * Qvet - QlikView Extension Trickster
 * 
 * @version v0.0.2
 * @author Valentyn Yakymenko <rayfesoul@gmail.com>
 * @license MIT
 *//**
 * Qvet - QlikView Extension Trickster
 * 
 * @version v0.0.2
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

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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
		this.emailSubject = config.emailSubject || defaultConfig.emailSubject;
		this.name = config.name || defaultConfig.name;
		this.shared = config.shared || defaultConfig.shared;
		this.excludeSelections = config.excludeSelections || defaultConfig.excludeSelections;
		this.includeState = config.includeState || defaultConfig.includeState;
		this.notDisplayed = config.notDisplayed || defaultConfig.notDisplayed;
		this.descriptionShow = config.descriptionShow || defaultConfig.descriptionShow;
		this.descriptionMsg = config.descriptionMsg || defaultConfig.descriptionMsg;
		this.saveInputValues = config.saveInputValues || defaultConfig.saveInputValues;

		/**
   * Extra params.
   *
   * @param extraUri {string} Use it for add parent url to your QlikView ASP.NET client.
   * @param emailWindowMode {boolean} By default bookmark will open email in new window,
   * but you can change it to {false} and email window will be opened on same domain.
   */
		this.extraUri = extraParams.extraUri || '';
		this.emailWindowMode = extraParams.emailWindowMode || true;
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

			var uri = this.extraUri + this.defaulQvAjxZfc + this.doc.binder.View + this.bookmarkId;

			var uri_enc = encodeURIComponent(uri).replace(/%20/g, "%2520"),
			    mailer = 'mailto:?subject=' + this.emailSubject + '&body=' + uri_enc;

			this.emailWindowMode ? window.location.href = mailer : location.href = mailer;

			return this;
		}
	}]);

	return EmailBookmark;
}();

},{}],3:[function(require,module,exports){
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

},{"./core/Core":1}]},{},[7])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmNcXGNvcmVcXENvcmUuanMiLCJzcmNcXGNvcmVcXGJvb2ttYXJrXFxFbWFpbEJvb2ttYXJrLmpzIiwic3JjXFxjb3JlXFxuYXRpdmVcXEJvb2ttYXJrcy5qcyIsInNyY1xcY29yZVxcbmF0aXZlXFxOZXdTaGVldE9iamVjdC5qcyIsInNyY1xcY29yZVxcbmF0aXZlXFxSZXBvc2l0b3J5LmpzIiwic3JjXFxjb3JlXFxuYXRpdmVcXFNob3dGaWVsZHMuanMiLCJzcmNcXFF2ZXQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7QUNLQSxBQUFRLEFBQWMsQUFBc0I7O0FBQzVDLEFBQVEsQUFBc0I7O0FBQzlCLEFBQVEsQUFBa0I7O0FBQzFCLEFBQVEsQUFBc0I7O0FBSzlCLEFBQVEsQUFBb0IsQUFFNUIsQUFBTzs7OztBQWZQLElBQU0sVUFBTixBQUFnQjs7Ozs7Ozs7Ozs7SUFlVCxBQUFNLEFBQVMsQUFDckI7O0FBQWEsQUFFWjs7T0FBQSxBQUFLOztBQUNNLEFBQ0gsQUFDTjtBQUhZLEFBQ0gsQUFFQSxBQUVWO0FBSlUsQUFDVDtBQUZZLEFBS0ksQUFDakI7QUFOYSxBQU1BLEFBQ2I7QUFQRCxBQUFjLEFBT0ksQUFFbEI7QUFUYyxBQUNiO0FBVUY7Ozs7K0JBQVksQUFDWDtVQUFPLFFBQUEsQUFBUSxJQUFJLG1CQUFuQixBQUFPLEFBQStCLEFBQ3RDO0FBRUQ7OztvQ0FBQSxBQUFrQixRQUFsQixBQUEwQixhQUFZLEFBQ3JDO1VBQU8sQUFBSSxpQ0FBSixBQUFrQixRQUFsQixBQUEwQixhQUExQixBQUF1QyxpQkFBOUMsQUFBTyxBQUF3RCxBQUMvRDtBQXBCb0I7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lDVmYsQUFBTSxBQUFjLEFBd0IxQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O3dCQUFBLEFBQVksUUFBWixBQUFvQjtBQUFhLEFBRWhDOztNQUFJO2lC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O1VBQVEsR0FBQSxBQUFHLHFCQUpaLEFBQXdCLEFBSVMsQUFFakM7QUFOd0IsQUFDdkI7Ozs7Ozs7OztRQ2hCSyxBQUFTOzs7O0FBQVQsMkJBQTJCLEFBRWpDOztLQUFBLEFBQUksSUFBSixBQUFRLEtBQVIsQUFBYTtVQUFiLEFBQXNCLEFBQ2IsQUFFVDtBQUhzQixBQUNyQjs7Ozs7Ozs7O1FDS0ssQUFBUzs7Ozs7Ozs7Ozs7O0FBQVQsMkJBQTJCLEFBK0VqQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztNQUFBLEFBQUksSUFBSixBQUFRLEtBQVIsQUFBYTtZQUFiLEFBQXNCLEFBQ2IsQUFFVDtBQUhzQixBQUNyQjs7Ozs7Ozs7O1FDeEZLLEFBQVM7Ozs7QUFBVCx1QkFBdUIsQUFFN0I7O0tBQUEsQUFBSSxJQUFKLEFBQVEsS0FBUixBQUFhO1VBQWIsQUFBc0IsQUFDYixBQUVUO0FBSHNCLEFBQ3JCOzs7Ozs7QUNORixBQUFRLEFBQWU7O0FBRXZCLENBQUMsVUFBQSxBQUFTLFFBQU8sQUFDaEI7S0FBSSxPQUFBLEFBQU8sUUFBUCxBQUFlLGVBQWUsT0FBQSxBQUFPLFdBQXpDLEFBQW9ELGFBQVksQUFDL0Q7VUFBQSxBQUFRLElBQVIsQUFBWSxBQUNaO0FBRkQsUUFFSyxBQUNKO01BQUcsT0FBQSxBQUFPLFNBQVYsQUFBb0IsYUFBWSxBQUMvQjtVQUFBLEFBQU8sT0FBUCxBQUFjLEFBQUksQUFDbEI7QUFGRCxTQUVNLEFBQ0w7V0FBQSxBQUFRLElBQVIsQUFBWSxBQUNaO0FBQ0Q7QUFDRDtBQVZELEdBQUEsQUFVRyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJjb25zdCB2ZXJzaW9uID0gJzAuMC4xLWFscGhhJztcclxuXHJcbi8qKlxyXG4gKiBOYXRpdmUuXHJcbiAqL1xyXG5pbXBvcnQgeyRBZGRCb29rbWFyaywgJFJlbW92ZUJvb2ttYXJrfSBmcm9tICcuL25hdGl2ZS9Cb29rbWFya3MnO1xyXG5pbXBvcnQgeyRPcGVuUmVwb3NpdG9yeX0gZnJvbSAnLi9uYXRpdmUvUmVwb3NpdG9yeSc7XHJcbmltcG9ydCB7JFNob3dGaWVsZHN9IGZyb20gJy4vbmF0aXZlL1Nob3dGaWVsZHMnO1xyXG5pbXBvcnQgeyROZXdTaGVldE9iamVjdH0gZnJvbSAnLi9uYXRpdmUvTmV3U2hlZXRPYmplY3QnO1xyXG5cclxuLyoqXHJcbiAqIEFkZGl0aW9uLlxyXG4gKi9cclxuaW1wb3J0IHtFbWFpbEJvb2ttYXJrfSBmcm9tICcuL2Jvb2ttYXJrL0VtYWlsQm9va21hcmsnO1x0XHJcblxyXG5leHBvcnQgY2xhc3MgUXZldENvcmUge1xyXG5cdGNvbnN0cnVjdG9yKCl7XHJcblxyXG5cdFx0dGhpcy5uYXRpdmUgPSB7XHJcblx0XHRcdGJvb2ttYXJrczp7XHJcblx0XHRcdFx0JGFkZDogJEFkZEJvb2ttYXJrLFxyXG5cdFx0XHRcdCRyZW1vdmU6ICRSZW1vdmVCb29rbWFya1xyXG5cdFx0XHR9LFxyXG5cdFx0XHQkb3BlblJlcG9zaXRvcnk6ICRPcGVuUmVwb3NpdG9yeSxcclxuXHRcdFx0JHNob3dGaWVsZHM6ICRTaG93RmllbGRzLFxyXG5cdFx0XHQkbmV3U2hlZXRPYmplY3Q6ICROZXdTaGVldE9iamVjdFxyXG5cdFx0fTtcclxuXHR9XHJcblxyXG5cdGdldFZlcnNpb24oKXtcclxuXHRcdHJldHVybiBjb25zb2xlLmxvZygnUXZldCB2ZXJzaW9uOiAnICsgdmVyc2lvbik7XHJcblx0fVxyXG5cclxuXHRzZW5kRW1haWxCb29rbWFyayhjb25maWcsIGV4dHJhUGFyYW1zKXtcclxuXHRcdHJldHVybiBuZXcgRW1haWxCb29rbWFyayhjb25maWcsIGV4dHJhUGFyYW1zKS5jcmVhdGVCb29rbWFyaygpLm9wZW5FbWFpbFdpbmRvdygpO1xyXG5cdH1cclxufSIsIi8qKlxyXG4gKiBFbWFpbCBRbGlrVmlldyBCb29rbWFyay5cclxuICogXHJcbiAqIEBjb25zdHJ1Y3RvclxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIEVtYWlsQm9va21hcmsge1xyXG5cdFxyXG5cdFxyXG5cdC8qKlxyXG5cdCAqICBDb25maWcuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gY29uZmlnIHtvYmplY3R9XHJcblx0ICpcclxuXHQgKiBAcGFyYW0gY29uZmlnLmVtYWlsU3ViamVjdCB7c3RyaW5nfVxyXG5cdCAqIEBwYXJhbSBjb25maWcubmFtZSB7c3RyaW5nfVxyXG5cdCAqIEBwYXJhbSBjb25maWcuc2hhcmVkIHtib29sZWFufVxyXG5cdCAqIEBwYXJhbSBjb25maWcuZXhjbHVkZVNlbGVjdGlvbnMge2Jvb2xlYW59XHJcblx0ICogQHBhcmFtIGNvbmZpZy5pbmNsdWRlU3RhdGUge2Jvb2xlYW59XHJcblx0ICogQHBhcmFtIGNvbmZpZy5ub3REaXNwbGF5ZWQge2Jvb2xlYW59XHJcblx0ICogQHBhcmFtIGNvbmZpZy5kZXNjcmlwdGlvblNob3cge2Jvb2xlYW59XHJcblx0ICogQHBhcmFtIGNvbmZpZy5kZXNjcmlwdGlvbk1zZyB7c3RyaW5nfVxyXG5cdCAqIEBwYXJhbSBjb25maWcuc2F2ZUlucHV0VmFsdWVzIHtib29sZWFufVxyXG5cdCAqXHJcblx0ICogIEV4dHJhIFBhcmFtcy5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBleHRyYVBhcmFtcyB7b2JqZWN0fVxyXG5cdCAqIEBwYXJhbSBleHRyYVBhcmFtcy5leHRyYVVyaSB7c3RyaW5nfVxyXG5cdCAqIEBwYXJhbSBleHRyYVBhcmFtcy5lbWFpbFdpbmRvd01vZGUge2Jvb2xlYW59XHJcblx0ICovXHJcblx0Y29uc3RydWN0b3IoY29uZmlnLCBleHRyYVBhcmFtcykge1xyXG5cdFx0XHJcblx0XHRsZXQgZGVmYXVsdENvbmZpZyA9IHtcclxuXHRcdFx0ZW1haWxTdWJqZWN0OiBcIlwiLFxyXG5cdFx0XHRuYW1lOiBcIkVtYWlsIEJvb2ttYXJrXCIsIC8qKiBOYW1lIG9mIHRoZSBib29rbWFyay4gKi9cclxuXHRcdFx0c2hhcmVkOiB0cnVlLCAvKiogU2hhcmUgdGhlIGJvb2ttYXJrIHdpdGggb3RoZXIgdXNlcnMuICovXHJcblx0XHRcdGV4Y2x1ZGVTZWxlY3Rpb25zOiBmYWxzZSwgLyoqIEV4Y2x1ZGUgdGhlIHNlbGVjdGlvbnMgbWFkZSBpbiB0aGUgYXBwbGljYXRpb24uICovXHJcblx0XHRcdGluY2x1ZGVTdGF0ZTogdHJ1ZSwgLyoqIEluY2x1ZGUgc3RhdGUgb2YgYWxsIG9iamVjdHMuICovXHJcblx0XHRcdG5vdERpc3BsYXllZDogZmFsc2UsIC8qKiBUaGUgYm9va21hcmsgaXMgbm90IGRpc3BsYXllZCBpbiB0aGUgYm9va21hcmsgbGlzdCBidXQgaXMgc3RpbGwgc2VsZWN0YWJsZSBpbiBjb2RlIG9yIHZpYSB1cmwuICovXHJcblx0XHRcdGRlc2NyaXB0aW9uU2hvdzogZmFsc2UsIC8qKiBUaGUgYm9va21hcmsgZGVzY3JpcHRpb24gd2lsbCBiZSBzaG93biBpbiBhIG1lc3NhZ2Ugd2hlbiB0aGUgYm9va21hcmsgaXMgc2VsZWN0ZWQuICovXHJcblx0XHRcdGRlc2NyaXB0aW9uTXNnOiBcIlwiLCAvKiogRGVzY3JpcHRpb24gb2YgdGhlIGJvb2ttYXJrLiAqL1xyXG5cdFx0XHRzYXZlSW5wdXRWYWx1ZXM6IHRydWUgLyoqIEluY2x1ZGUgdmFsdWVzIGluIGlucHV0IGZpZWxkcy4qL1xyXG5cdFx0fTtcclxuXHRcclxuXHRcdHRoaXMuZGVmYXVsUXZBanhaZmMgPSAnL1F2QUpBWFpmYy9vcGVuZG9jLmh0bT9kb2N1bWVudD0nO1xyXG5cdFx0XHJcblx0XHQvKiogVGhlIGJvb2ttYXJrIGlzIGFwcGxpZWQgb24gdG9wIG9mIGFueSBwcmV2aW91cyBzZWxlY3Rpb25zIChubyBjbGVhcikuKi9cclxuXHRcdHRoaXMuYXBwbGllZCA9IHRydWU7XHJcblx0XHR0aGlzLmRvYyA9IFF2LkdldEN1cnJlbnREb2N1bWVudCgpO1xyXG5cdFx0dGhpcy5ib29rbWFya0lkID0gJyc7XHJcblx0XHRcclxuXHRcclxuXHRcdC8qKlxyXG5cdFx0ICogSW1wb3J0YW50IHBhcmFtcy5cclxuXHRcdCAqIEB0eXBlIHsqfHN0cmluZ31cclxuXHRcdCAqL1xyXG5cdFx0dGhpcy5lbWFpbFN1YmplY3QgPSBjb25maWcuZW1haWxTdWJqZWN0IHx8IGRlZmF1bHRDb25maWcuZW1haWxTdWJqZWN0O1xyXG5cdFx0dGhpcy5uYW1lID0gY29uZmlnLm5hbWUgfHwgZGVmYXVsdENvbmZpZy5uYW1lO1xyXG5cdFx0dGhpcy5zaGFyZWQgPSBjb25maWcuc2hhcmVkIHx8IGRlZmF1bHRDb25maWcuc2hhcmVkO1xyXG5cdFx0dGhpcy5leGNsdWRlU2VsZWN0aW9ucyA9IGNvbmZpZy5leGNsdWRlU2VsZWN0aW9ucyB8fCBkZWZhdWx0Q29uZmlnLmV4Y2x1ZGVTZWxlY3Rpb25zO1xyXG5cdFx0dGhpcy5pbmNsdWRlU3RhdGUgPSBjb25maWcuaW5jbHVkZVN0YXRlIHx8IGRlZmF1bHRDb25maWcuaW5jbHVkZVN0YXRlO1xyXG5cdFx0dGhpcy5ub3REaXNwbGF5ZWQgPSBjb25maWcubm90RGlzcGxheWVkIHx8IGRlZmF1bHRDb25maWcubm90RGlzcGxheWVkO1xyXG5cdFx0dGhpcy5kZXNjcmlwdGlvblNob3cgPSBjb25maWcuZGVzY3JpcHRpb25TaG93IHx8IGRlZmF1bHRDb25maWcuZGVzY3JpcHRpb25TaG93O1xyXG5cdFx0dGhpcy5kZXNjcmlwdGlvbk1zZyA9IGNvbmZpZy5kZXNjcmlwdGlvbk1zZyB8fCBkZWZhdWx0Q29uZmlnLmRlc2NyaXB0aW9uTXNnO1xyXG5cdFx0dGhpcy5zYXZlSW5wdXRWYWx1ZXMgPSBjb25maWcuc2F2ZUlucHV0VmFsdWVzIHx8IGRlZmF1bHRDb25maWcuc2F2ZUlucHV0VmFsdWVzO1xyXG5cdFxyXG5cdFx0LyoqXHJcblx0XHQgKiBFeHRyYSBwYXJhbXMuXHJcblx0XHQgKlxyXG5cdFx0ICogQHBhcmFtIGV4dHJhVXJpIHtzdHJpbmd9IFVzZSBpdCBmb3IgYWRkIHBhcmVudCB1cmwgdG8geW91ciBRbGlrVmlldyBBU1AuTkVUIGNsaWVudC5cclxuXHRcdCAqIEBwYXJhbSBlbWFpbFdpbmRvd01vZGUge2Jvb2xlYW59IEJ5IGRlZmF1bHQgYm9va21hcmsgd2lsbCBvcGVuIGVtYWlsIGluIG5ldyB3aW5kb3csXHJcblx0XHQgKiBidXQgeW91IGNhbiBjaGFuZ2UgaXQgdG8ge2ZhbHNlfSBhbmQgZW1haWwgd2luZG93IHdpbGwgYmUgb3BlbmVkIG9uIHNhbWUgZG9tYWluLlxyXG5cdFx0ICovXHJcblx0XHR0aGlzLmV4dHJhVXJpID0gZXh0cmFQYXJhbXMuZXh0cmFVcmkgfHwgJyc7XHJcblx0XHR0aGlzLmVtYWlsV2luZG93TW9kZSA9IGV4dHJhUGFyYW1zLmVtYWlsV2luZG93TW9kZSB8fCB0cnVlO1xyXG5cdH1cclxuXHJcblxyXG5cdC8qKlxyXG5cdCAqIFVzZSBuYXRpdmUgQm9va21hcmtzIENsYXNzXHJcblx0ICogZm9yIGNyZWF0ZSBib29rbWFyayBiZWZvcmUgZW1haWwgaXQuXHJcblx0ICpcclxuXHQgKiBAZXh0ZW5kcyB7fVxyXG5cdCAqL1xyXG5cdGNyZWF0ZUJvb2ttYXJrKCl7XHJcblxyXG5cdFx0dGhpcy5kb2NcclxuXHRcdFx0LkJvb2ttYXJrcygpXHJcblx0XHRcdC5OZXdCb29rbWFyayhcclxuXHRcdFx0XHR0aGlzLm5hbWUsXHJcblx0XHRcdFx0dGhpcy5hcHBsaWVkLFxyXG5cdFx0XHRcdHRoaXMuc2hhcmVkLFxyXG5cdFx0XHRcdHRoaXMuZXhjbHVkZVNlbGVjdGlvbnMsXHJcblx0XHRcdFx0dGhpcy5pbmNsdWRlU3RhdGUsXHJcblx0XHRcdFx0dGhpcy5ub3REaXNwbGF5ZWQsXHJcblx0XHRcdFx0dGhpcy5kZXNjcmlwdGlvblNob3csXHJcblx0XHRcdFx0dGhpcy5kZXNjcmlwdGlvbk1zZyxcclxuXHRcdFx0XHR0aGlzLnNhdmVJbnB1dFZhbHVlc1xyXG5cdFx0XHQpO1xyXG5cclxuXHRcdHRoaXMuYm9va21hcmtJZCA9IHRoaXMuZG9jLkJvb2ttYXJrcygpLkJvb2tNYXJrc1t0aGlzLmRvYy5Cb29rbWFya3MoKS5Cb29rTWFya3MubGVuZ3RoLTFdLnZhbHVlO1xyXG5cdFx0XHJcblx0XHRyZXR1cm4gdGhpcztcclxuXHR9O1xyXG5cclxuXHRvcGVuRW1haWxXaW5kb3coKXtcclxuXHRcdFxyXG5cdFx0bGV0IHVyaSA9IHRoaXMuZXh0cmFVcmkgK1xyXG5cdFx0XHR0aGlzLmRlZmF1bFF2QWp4WmZjICtcclxuXHRcdFx0dGhpcy5kb2MuYmluZGVyLlZpZXcgK1xyXG5cdFx0XHR0aGlzLmJvb2ttYXJrSWQ7XHJcblx0XHRcclxuXHRcdGxldCB1cmlfZW5jID0gZW5jb2RlVVJJQ29tcG9uZW50KHVyaSkucmVwbGFjZSgvJTIwL2csIFwiJTI1MjBcIiksXHJcblx0XHRcdG1haWxlciA9ICdtYWlsdG86P3N1YmplY3Q9Jyt0aGlzLmVtYWlsU3ViamVjdCsnJmJvZHk9Jyt1cmlfZW5jO1xyXG5cclxuXHRcdHRoaXMuZW1haWxXaW5kb3dNb2RlID8gd2luZG93LmxvY2F0aW9uLmhyZWYgPSBtYWlsZXIgOiBsb2NhdGlvbi5ocmVmID0gbWFpbGVyO1xyXG5cdFx0XHJcblx0XHRyZXR1cm4gdGhpcztcclxuXHR9XHJcbn0iLCIvKipcclxuICogJEFkZEJvb2ttYXJrIC0gb3BlbiBuYXRpdmUgQWRkIEJvb2ttYXJrIG1vZGFsLlxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uICRBZGRCb29rbWFyaygpIHtcclxuXHJcblx0UXZhLkNvbnRleHRDbGllbnRBY3Rpb24oe1xyXG5cdFx0Y2xpZW50QWN0aW9uOiBcIm1vZGFsXCIsXHJcblx0XHRwYXJhbTogXCJibVwiLFxyXG5cdFx0bmFtZTogXCJBRERCTVwiLFxyXG5cdFx0YmluZGVyOiBRdi5HZXRDdXJyZW50RG9jdW1lbnQoKS5iaW5kZXJcclxuXHR9KTtcclxufVxyXG5cclxuLyoqXHJcbiAqICRSZW1vdmVCb29rbWFyayAtIG9wZW4gbmF0aXZlIFJlbW92ZSBCb29rbWFyayBtb2RhbC5cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiAkUmVtb3ZlQm9va21hcmsoKSB7XHJcblxyXG5cdFF2YS5Db250ZXh0Q2xpZW50QWN0aW9uKHtcclxuXHRcdGNsaWVudEFjdGlvbjogXCJtb2RhbFwiLFxyXG5cdFx0cGFyYW06IFwicmVtb3ZlYm1cIixcclxuXHRcdG5hbWU6IFwiUkVNQk1cIixcclxuXHRcdGJpbmRlcjogUXYuR2V0Q3VycmVudERvY3VtZW50KCkuYmluZGVyXHJcblx0fSk7XHJcbn0iLCIvKipcclxuICogJFNob3dGaWVsZHMgLSBvcGVuIG5hdGl2ZSBTaG93IEZpZWxkcyBtb2RhbC5cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiAkTmV3U2hlZXRPYmplY3QoKSB7XHJcblx0XHJcblx0UXZhLk1nci5tZW51LmRvQWN0aW9uKHtcclxuXHRcdHRhcmdldDogJy5jdHgtbWVudS1hY3Rpb24tTkVXU0hFRVRPQkonXHJcblx0fSk7XHJcbn0iLCIvKipcclxuICogJFJlcG9zaXRvcnkgLSBvcGVuIG5hdGl2ZSBSZXBvc2l0b3J5IG1vZGFsLlxyXG4gKlxyXG4gKiBAcGFyYW0gZGVmRmlsdGVyIHtudW1iZXJ9IDAtMyAtIERlcHJlY2F0ZWQuXHJcbiAqIEBwYXJhbSBjYWxsYmFjayB7ZnVuY3Rpb259IENhbGxiYWNrIGZ1bmN0aW9uLiAtIERlcHJlY2F0ZWQuXHJcbiAqXHJcbiAqIEBub3RlIFJlcG8gY2FuIGJlIG9wZW5lZCBvbmx5IHdpdGggZmFrZSByZXF1ZXN0IHRvIFFsaWtWaWV3IEFTUC5ORVQgQ2xpZW50LlxyXG4gKiAgICAgIFJlYXNvbiBpcyByZW1vdGUgcmVwb3NpdG9yeSwgUWxpa1ZpZXcgb3BlbiByZXBvc2l0b3J5IG9ubHkgYWZ0ZXIgQVNQLk5FVCBRbGlrVmlldyBjbGllbnQgcmVxdWVzdC5cclxuICogICAgICBXZSBhbHdheXMgaGF2ZSBqUXVlcnkuXHJcbiAqIEB1cmwgaHR0cHM6Ly9jb21tdW5pdHkucWxpay5jb20vZG9jcy9ET0MtMjYzOVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uICRPcGVuUmVwb3NpdG9yeSgpIHtcclxuXHJcblx0LyoqXHJcblx0ICogIERlcHJlY2F0ZWQgdmVyc2lvbi5cclxuXHQgKlxyXG5cclxuXHQgbGV0IGJpbmRlciA9IFF2LkdldEN1cnJlbnREb2N1bWVudCgpLmJpbmRlcixcclxuXHRcdCBtYXJrID0gYmluZGVyLk1hcmssXHJcblx0XHQgc3RhbXAgPSBiaW5kZXIuU3RhbXAsXHJcblx0XHQgdmlldyA9IGJpbmRlci5WaWV3LFxyXG5cdFx0IHJlcG9GaWx0ZXIgPSBkZWZGaWx0ZXIgPiAzICYmIGRlZkZpbHRlciA8IDAgPyAwIDogZGVmRmlsdGVyO1xyXG5cclxuXHQgbGV0IGluaXRSZXBvRGF0YSA9IGA8dXBkYXRlXHJcblx0IG1hcms9XCJgKyBtYXJrICtgXCJcclxuXHQgc3RhbXA9XCJgKyBzdGFtcCArYFwiXHJcblx0IGNvb2tpZT1cInRydWVcIlxyXG5cdCBzY29wZT1cIkRvY3VtZW50XCJcclxuXHQgdmlldz1cImArIHZpZXcgK2BcIlxyXG5cdCBpZGVudD1cIm51bGxcIj5cclxuXHQgPHNldCBuYW1lPVwiRG9jdW1lbnQuU3RhbmRhcmRBY3Rpb25zLlJFUE9TSVRPUllcIiBhY3Rpb249XCJcIiBjbGllbnRzaXplV0g9XCJcIiBwb3NpdGlvbj1cIlwiIGN1cnNvcj1cIlwiIC8+XHJcblx0IDwvdXBkYXRlPmAsXHJcblx0IHNob3dSZXBvRGF0YSA9IGA8dXBkYXRlXHJcblx0IG1hcms9XCJgKyBtYXJrICtgXCJcclxuXHQgc3RhbXA9XCJgKyBzdGFtcCArYFwiXHJcblx0IGNvb2tpZT1cInRydWVcIlxyXG5cdCBzY29wZT1cIkRvY3VtZW50XCJcclxuXHQgdmlldz1cImArIHZpZXcgK2BcIlxyXG5cdCBpZGVudD1cIm51bGxcIj5cclxuXHQgPHNldCBuYW1lPVwiRG9jdW1lbnQuVE9PTFNcXFxcUkVQT1NJVE9SWS5GaWx0ZXJcIlxyXG5cdCB2YWx1ZT1cImArIHJlcG9GaWx0ZXIgK2BcIiAvPlxyXG5cdCA8L3VwZGF0ZT5gO1xyXG5cclxuXHJcblx0IGxldCBpbml0UmVwb3NpdG9yeSA9ICgpID0+IHtcclxuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcblx0XHRcdCQuYWpheCh7XHJcblx0XHRcdFx0dXJsOiAnL1F2QWpheFpmYy9RdnNWaWV3Q2xpZW50LmFzcHg/bWFyaz0nICsgbWFyayArICcmdmlldz0nICsgdmlldyxcclxuXHRcdFx0XHRkYXRhOiBpbml0UmVwb0RhdGEsXHJcblx0XHRcdFx0dHlwZTogJ1BPU1QnLFxyXG5cdFx0XHRcdGNvbnRlbnRUeXBlOiBcInRleHQvcGxhaW47Y2hhcnNldD1VVEYtOFwiLFxyXG5cdFx0XHRcdGRhdGFUeXBlOiBcInRleHRcIixcclxuXHRcdFx0XHRzdWNjZXNzKCkge1xyXG5cdFx0XHRcdFx0cmVzb2x2ZSgpO1xyXG5cdFx0XHRcdH0sXHJcblx0XHRcdFx0ZXJyb3IoKSB7XHJcblx0XHRcdFx0XHRyZWplY3QoKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0pO1xyXG5cdFx0fSk7XHJcblx0fTtcclxuXHJcblx0IGxldCBzaG93UmVwb3NpdG9yeSA9ICgpID0+IHtcclxuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcblx0XHRcdCQuYWpheCh7XHJcblx0XHRcdFx0dXJsOiAnL1F2QWpheFpmYy9RdnNWaWV3Q2xpZW50LmFzcHg/bWFyaz0nICsgbWFyayArICcmdmlldz0nICsgdmlldyxcclxuXHRcdFx0XHRkYXRhOiBzaG93UmVwb0RhdGEsXHJcblx0XHRcdFx0dHlwZTogJ1BPU1QnLFxyXG5cdFx0XHRcdGNvbnRlbnRUeXBlOiBcInRleHQvcGxhaW47Y2hhcnNldD1VVEYtOFwiLFxyXG5cdFx0XHRcdGRhdGFUeXBlOiBcInRleHRcIixcclxuXHRcdFx0XHRzdWNjZXNzKCkge1xyXG5cdFx0XHRcdFx0cmVzb2x2ZSgpO1xyXG5cdFx0XHRcdH0sXHJcblx0XHRcdFx0ZXJyb3IoKSB7XHJcblx0XHRcdFx0XHRyZWplY3QoKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0pO1xyXG5cdFx0fSk7XHJcblx0fTtcclxuXHJcblx0IFByb21pc2UuYWxsKFtcclxuXHQgaW5pdFJlcG9zaXRvcnkoKSxcclxuXHQgc2hvd1JlcG9zaXRvcnkoKVxyXG5cdCBdKS50aGVuKCgpID0+IHtcclxuXHRcdGlmICh0eXBlb2YgY2FsbGJhY2sgPT0gJ2Z1bmN0aW9uJyl7XHJcblx0XHRcdHJldHVybiBjYWxsYmFjaygpXHJcblx0XHR9XHJcblx0fSlcclxuXHQgKi9cclxuXHJcblx0UXZhLk1nci5tZW51LmRvQWN0aW9uKHtcclxuXHRcdHRhcmdldDogJy5jdHgtbWVudS1hY3Rpb24tUkVQT1NJVE9SWSdcclxuXHR9KTtcclxufSIsIi8qKlxyXG4gKiAkU2hvd0ZpZWxkcyAtIG9wZW4gbmF0aXZlIFNob3cgRmllbGRzIG1vZGFsLlxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uICRTaG93RmllbGRzKCkge1xyXG5cdFxyXG5cdFF2YS5NZ3IubWVudS5kb0FjdGlvbih7XHJcblx0XHR0YXJnZXQ6ICcuY3R4LW1lbnUtYWN0aW9uLVNIT1dGSUVMRFMnXHJcblx0fSk7XHJcbn0iLCJpbXBvcnQge1F2ZXRDb3JlfSBmcm9tICcuL2NvcmUvQ29yZSc7XHJcblxyXG4oZnVuY3Rpb24od2luZG93KXtcclxuXHRpZiAodHlwZW9mIFF2YSA9PT0gJ3VuZGVmaW5lZCcgJiYgdHlwZW9mIGpRdWVyeSA9PT0gJ3VuZGVmaW5lZCcpe1xyXG5cdFx0Y29uc29sZS5sb2coXCJDYW4ndCBpbml0IFF2ZXQgYmVjYXVzZSBRdmEvalF1ZXJ5IGlzIHVuZGVmaW5lZFwiKVxyXG5cdH1lbHNle1xyXG5cdFx0aWYodHlwZW9mKFF2ZXQpID09PSAndW5kZWZpbmVkJyl7XHJcblx0XHRcdHdpbmRvdy5RdmV0ID0gbmV3IFF2ZXRDb3JlKCk7XHJcblx0XHR9IGVsc2V7XHJcblx0XHRcdGNvbnNvbGUubG9nKFwiUXZldCBhbHJlYWR5IGRlZmluZWQuXCIpO1xyXG5cdFx0fVxyXG5cdH1cclxufSkod2luZG93KTsiXX0=
