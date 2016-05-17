/**
 * Qvet - QlikView Extension Trickster
 * 
 * @version v0.0.1-alpha
 * @author Valentyn Yakymenko <rayfesoul@gmail.com>
 * @license MIT
 */(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _Core = require('./core/Core');

(function (window) {
	if (typeof Qvet === 'undefined') {
		window.Qvet = new _Core.QvetCore();
	} else {
		console.log("Qvet already defined.");
	}
})(window);

},{"./core/Core":2}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.QvetCore = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Bookmarks = require('./native/Bookmarks');

var _Repository = require('./native/Repository');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var version = '0.0.1-alpha';

var QvetCore = exports.QvetCore = function () {
	function QvetCore() {
		_classCallCheck(this, QvetCore);

		this.native = {
			bookmarks: {
				$add: _Bookmarks.$AddBookmark,
				$remove: _Bookmarks.$RemoveBookmark
			},
			$openRepository: function $openRepository(defaultFilter, fn) {
				(0, _Repository.$OpenRepository)(defaultFilter, fn);
			}
		};
	}

	_createClass(QvetCore, [{
		key: 'getVersion',
		value: function getVersion() {
			console.log('Qvet version: ' + version);
		}
	}]);

	return QvetCore;
}();

},{"./native/Bookmarks":3,"./native/Repository":4}],3:[function(require,module,exports){
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
exports.$OpenRepository = $OpenRepository;
// TODO: Find another way to open repo without fake requests.
/**
 * $Repository - open native Repository modal.
 *
 * @param defFilter {number} 0-3.
 * @param callback {function} Callback function.
 *
 * @note Repo can be opened only with fake request to QlikView ASP.NET Client.
 *      Reason is remote repository, QlikView open repository only after ASP.NET QlikView client request.
 *      We always have jQuery.
 * @url https://community.qlik.com/docs/DOC-2639
 */
function $OpenRepository(defFilter, callback) {

	var binder = Qv.GetCurrentDocument().binder,
	    mark = binder.Mark,
	    stamp = binder.Stamp,
	    view = binder.View,
	    repoFilter = defFilter > 3 && defFilter < 0 ? 0 : defFilter;

	var initRepoData = '<update\n\t\t\t\t\tmark="' + mark + '"\n\t\t\t\t\tstamp="' + stamp + '"\n\t\t\t\t\tcookie="true"\n\t\t\t\t\tscope="Document"\n\t\t\t\t\tview="' + view + '"\n\t\t\t\t\tident="null">\n\t\t\t\t\t\t<set name="Document.StandardActions.REPOSITORY" action="" clientsizeWH="" position="" cursor="" />\n\t\t\t\t\t</update>',
	    showRepoData = '<update \n\t\t\t\t\tmark="' + mark + '" \n\t\t\t\t\tstamp="' + stamp + '" \n\t\t\t\t\tcookie="true" \n\t\t\t\t\tscope="Document" \n\t\t\t\t\tview="' + view + '" \n\t\t\t\t\tident="null">\n\t\t\t\t\t\t<set name="Document.TOOLS\\REPOSITORY.Filter" \n\t\t\t\t\t\tvalue="' + repoFilter + '" />\n\t\t\t\t\t</update>';

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

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmNcXFF2ZXQuanMiLCJzcmNcXGNvcmVcXENvcmUuanMiLCJzcmNcXGNvcmVcXG5hdGl2ZVxcQm9va21hcmtzLmpzIiwic3JjXFxjb3JlXFxuYXRpdmVcXFJlcG9zaXRvcnkuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0FBLEFBQVEsQUFBZTs7QUFFdkIsQ0FBQyxVQUFBLEFBQVMsUUFBTyxBQUNoQjtLQUFHLE9BQUEsQUFBTyxTQUFWLEFBQW9CLGFBQVksQUFDL0I7U0FBQSxBQUFPLE9BQVAsQUFBYyxBQUFJLEFBQ2xCO0FBRkQsUUFFTSxBQUNMO1VBQUEsQUFBUSxJQUFSLEFBQVksQUFDWjtBQUNEO0FBTkQsR0FBQSxBQU1HOzs7Ozs7Ozs7Ozs7QUNOSCxBQUFRLEFBQWMsQUFBc0I7O0FBQzVDLEFBQVEsQUFBc0IsQUFFOUIsQUFBTzs7OztBQUxQLElBQU0sVUFBTixBQUFnQjs7SUFLVCxBQUFNLEFBQVMsQUFDckI7O0FBQWEsQUFDWjs7T0FBQSxBQUFLOztBQUNNLEFBQ0gsQUFDTjtBQUhZLEFBQ0gsQUFFQSxBQUVWO0FBSlUsQUFDVDs2Q0FHRCxBQUFnQixlQUFoQixBQUErQixJQUFHLEFBQ2pDO3FDQUFBLEFBQWdCLGVBQWhCLEFBQStCLEFBQy9CO0FBUEYsQUFBYyxBQVNkO0FBVGMsQUFDYjtBQVVGOzs7OytCQUFZLEFBQ1g7V0FBQSxBQUFRLElBQUksbUJBQVosQUFBK0IsQUFDL0I7QUFmb0I7Ozs7Ozs7Ozs7OztRQ0ZmLEFBQVM7UUFhVCxBQUFTOzs7O0FBYlQsd0JBQXdCLEFBRTlCOztLQUFBLEFBQUk7Z0JBQW9CLEFBQ1QsQUFDZDtTQUZ1QixBQUVoQixBQUNQO1FBSHVCLEFBR2pCLEFBQ047VUFBUSxHQUFBLEFBQUcscUJBSlosQUFBd0IsQUFJUyxBQUVqQztBQU53QixBQUN2QjtBQVVGOzs7OztBQUFPLDJCQUEyQixBQUVqQzs7S0FBQSxBQUFJO2dCQUFvQixBQUNULEFBQ2Q7U0FGdUIsQUFFaEIsQUFDUDtRQUh1QixBQUdqQixBQUNOO1VBQVEsR0FBQSxBQUFHLHFCQUpaLEFBQXdCLEFBSVMsQUFFakM7QUFOd0IsQUFDdkI7Ozs7Ozs7OztRQ1BLLEFBQVM7Ozs7Ozs7Ozs7Ozs7QUFBVCx5QkFBQSxBQUF5QixXQUF6QixBQUFvQyxVQUFVLEFBRXBEOztLQUFJLFNBQVMsR0FBQSxBQUFHLHFCQUFoQixBQUFxQztLQUNwQyxPQUFPLE9BRFIsQUFDZTtLQUNkLFFBQVEsT0FGVCxBQUVnQjtLQUNmLE9BQU8sT0FIUixBQUdlO0tBQ2QsYUFBYSxZQUFBLEFBQVksS0FBSyxZQUFqQixBQUE2QixJQUE3QixBQUFpQyxJQUovQyxBQUltRCxBQUVuRDs7S0FBSSxlQUFlLEFBQUMsOEJBQUQsQUFDTixBQUFNLEFBQUMsZ0NBREQsQUFFTCxBQUFPLEFBQUMscUZBRnRCLEFBQW1CLEFBS04sQUFBTSxBQUFDO0tBSW5CLGVBQWUsQUFBQywrQkFBRCxBQUNILEFBQU0sQUFBQyxpQ0FESixBQUVGLEFBQU8sQUFBQyx3RkFGTixBQUtILEFBQU0sQUFBQyx3SEFkcEIsQUFTZ0IsQUFRRCxBQUFZLEFBQUMsQUFJNUI7O0tBQUksaUJBQWlCLDBCQUFNLEFBQzFCO2FBQU8sQUFBSSxRQUFRLFVBQUEsQUFBQyxTQUFELEFBQVUsUUFBVyxBQUN2QztLQUFBLEFBQUU7U0FDSSx3Q0FBQSxBQUF3QyxPQUF4QyxBQUErQyxXQUQ5QyxBQUN5RCxBQUMvRDtVQUZNLEFBRUEsQUFDTjtVQUhNLEFBR0EsQUFDTjtpQkFKTSxBQUlPLEFBQ2I7Y0FMTSxBQUtJLEFBQ1Y7Z0NBQVUsQUFDVDtBQUNBO0FBUkssQUFTTjs0QkFBUSxBQUNQO0FBQ0E7QUFYRixBQUFPLEFBYVA7QUFiTyxBQUNOO0FBRkYsQUFBTyxBQWVQLEdBZk87QUFEUixBQWtCQTs7S0FBSSxpQkFBaUIsMEJBQU0sQUFDMUI7YUFBTyxBQUFJLFFBQVEsVUFBQSxBQUFDLFNBQUQsQUFBVSxRQUFXLEFBQ3ZDO0tBQUEsQUFBRTtTQUNJLHdDQUFBLEFBQXdDLE9BQXhDLEFBQStDLFdBRDlDLEFBQ3lELEFBQy9EO1VBRk0sQUFFQSxBQUNOO1VBSE0sQUFHQSxBQUNOO2lCQUpNLEFBSU8sQUFDYjtjQUxNLEFBS0ksQUFDVjtnQ0FBVSxBQUNUO0FBQ0E7QUFSSyxBQVNOOzRCQUFRLEFBQ1A7QUFDQTtBQVhGLEFBQU8sQUFhUDtBQWJPLEFBQ047QUFGRixBQUFPLEFBZVAsR0FmTztBQURSLEFBa0JBOztTQUFBLEFBQVEsSUFBSSxDQUFBLEFBQ1gsa0JBREQsQUFBWSxBQUVYLG1CQUZELEFBR0csS0FBSyxZQUFNLEFBQ2I7TUFBSSxPQUFBLEFBQU8sWUFBWCxBQUF1QixZQUFXLEFBQ2pDO1VBQUEsQUFBTyxBQUNQO0FBQ0Q7QUFQRCxBQVFBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImltcG9ydCB7UXZldENvcmV9IGZyb20gJy4vY29yZS9Db3JlJztcclxuXHJcbihmdW5jdGlvbih3aW5kb3cpe1xyXG5cdGlmKHR5cGVvZihRdmV0KSA9PT0gJ3VuZGVmaW5lZCcpe1xyXG5cdFx0d2luZG93LlF2ZXQgPSBuZXcgUXZldENvcmUoKTtcclxuXHR9IGVsc2V7XHJcblx0XHRjb25zb2xlLmxvZyhcIlF2ZXQgYWxyZWFkeSBkZWZpbmVkLlwiKTtcclxuXHR9XHJcbn0pKHdpbmRvdyk7IiwiY29uc3QgdmVyc2lvbiA9ICcwLjAuMS1hbHBoYSc7XHJcblxyXG5pbXBvcnQgeyRBZGRCb29rbWFyaywgJFJlbW92ZUJvb2ttYXJrfSBmcm9tICcuL25hdGl2ZS9Cb29rbWFya3MnO1xyXG5pbXBvcnQgeyRPcGVuUmVwb3NpdG9yeX0gZnJvbSAnLi9uYXRpdmUvUmVwb3NpdG9yeSc7XHJcblxyXG5leHBvcnQgY2xhc3MgUXZldENvcmUge1xyXG5cdGNvbnN0cnVjdG9yKCl7XHJcblx0XHR0aGlzLm5hdGl2ZSA9IHtcclxuXHRcdFx0Ym9va21hcmtzOntcclxuXHRcdFx0XHQkYWRkOiAkQWRkQm9va21hcmssXHJcblx0XHRcdFx0JHJlbW92ZTogJFJlbW92ZUJvb2ttYXJrXHJcblx0XHRcdH0sXHJcblx0XHRcdCRvcGVuUmVwb3NpdG9yeShkZWZhdWx0RmlsdGVyLCBmbil7XHJcblx0XHRcdFx0JE9wZW5SZXBvc2l0b3J5KGRlZmF1bHRGaWx0ZXIsIGZuKVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRnZXRWZXJzaW9uKCl7XHJcblx0XHRjb25zb2xlLmxvZygnUXZldCB2ZXJzaW9uOiAnICsgdmVyc2lvbik7XHJcblx0fVxyXG59IiwiLyoqXHJcbiAqICRBZGRCb29rbWFyayAtIG9wZW4gbmF0aXZlIEFkZCBCb29rbWFyayBtb2RhbC5cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiAkQWRkQm9va21hcmsoKSB7XHJcblx0XHJcblx0UXZhLkNvbnRleHRDbGllbnRBY3Rpb24oe1xyXG5cdFx0Y2xpZW50QWN0aW9uOiBcIm1vZGFsXCIsXHJcblx0XHRwYXJhbTogXCJibVwiLFxyXG5cdFx0bmFtZTogXCJBRERCTVwiLFxyXG5cdFx0YmluZGVyOiBRdi5HZXRDdXJyZW50RG9jdW1lbnQoKS5iaW5kZXJcclxuXHR9KTtcclxufVxyXG5cclxuLyoqXHJcbiAqICRSZW1vdmVCb29rbWFyayAtIG9wZW4gbmF0aXZlIFJlbW92ZSBCb29rbWFyayBtb2RhbC5cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiAkUmVtb3ZlQm9va21hcmsoKSB7XHJcblx0XHJcblx0UXZhLkNvbnRleHRDbGllbnRBY3Rpb24oe1xyXG5cdFx0Y2xpZW50QWN0aW9uOiBcIm1vZGFsXCIsXHJcblx0XHRwYXJhbTogXCJyZW1vdmVibVwiLFxyXG5cdFx0bmFtZTogXCJSRU1CTVwiLFxyXG5cdFx0YmluZGVyOiBRdi5HZXRDdXJyZW50RG9jdW1lbnQoKS5iaW5kZXJcclxuXHR9KTtcclxufSIsIi8vIFRPRE86IEZpbmQgYW5vdGhlciB3YXkgdG8gb3BlbiByZXBvIHdpdGhvdXQgZmFrZSByZXF1ZXN0cy5cclxuLyoqXHJcbiAqICRSZXBvc2l0b3J5IC0gb3BlbiBuYXRpdmUgUmVwb3NpdG9yeSBtb2RhbC5cclxuICpcclxuICogQHBhcmFtIGRlZkZpbHRlciB7bnVtYmVyfSAwLTMuXHJcbiAqIEBwYXJhbSBjYWxsYmFjayB7ZnVuY3Rpb259IENhbGxiYWNrIGZ1bmN0aW9uLlxyXG4gKlxyXG4gKiBAbm90ZSBSZXBvIGNhbiBiZSBvcGVuZWQgb25seSB3aXRoIGZha2UgcmVxdWVzdCB0byBRbGlrVmlldyBBU1AuTkVUIENsaWVudC5cclxuICogICAgICBSZWFzb24gaXMgcmVtb3RlIHJlcG9zaXRvcnksIFFsaWtWaWV3IG9wZW4gcmVwb3NpdG9yeSBvbmx5IGFmdGVyIEFTUC5ORVQgUWxpa1ZpZXcgY2xpZW50IHJlcXVlc3QuXHJcbiAqICAgICAgV2UgYWx3YXlzIGhhdmUgalF1ZXJ5LlxyXG4gKiBAdXJsIGh0dHBzOi8vY29tbXVuaXR5LnFsaWsuY29tL2RvY3MvRE9DLTI2MzlcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiAkT3BlblJlcG9zaXRvcnkoZGVmRmlsdGVyLCBjYWxsYmFjaykge1xyXG5cclxuXHRsZXQgYmluZGVyID0gUXYuR2V0Q3VycmVudERvY3VtZW50KCkuYmluZGVyLFxyXG5cdFx0bWFyayA9IGJpbmRlci5NYXJrLFxyXG5cdFx0c3RhbXAgPSBiaW5kZXIuU3RhbXAsXHJcblx0XHR2aWV3ID0gYmluZGVyLlZpZXcsXHJcblx0XHRyZXBvRmlsdGVyID0gZGVmRmlsdGVyID4gMyAmJiBkZWZGaWx0ZXIgPCAwID8gMCA6IGRlZkZpbHRlcjtcclxuXHJcblx0bGV0IGluaXRSZXBvRGF0YSA9IGA8dXBkYXRlXHJcblx0XHRcdFx0XHRtYXJrPVwiYCsgbWFyayArYFwiXHJcblx0XHRcdFx0XHRzdGFtcD1cImArIHN0YW1wICtgXCJcclxuXHRcdFx0XHRcdGNvb2tpZT1cInRydWVcIlxyXG5cdFx0XHRcdFx0c2NvcGU9XCJEb2N1bWVudFwiXHJcblx0XHRcdFx0XHR2aWV3PVwiYCsgdmlldyArYFwiXHJcblx0XHRcdFx0XHRpZGVudD1cIm51bGxcIj5cclxuXHRcdFx0XHRcdFx0PHNldCBuYW1lPVwiRG9jdW1lbnQuU3RhbmRhcmRBY3Rpb25zLlJFUE9TSVRPUllcIiBhY3Rpb249XCJcIiBjbGllbnRzaXplV0g9XCJcIiBwb3NpdGlvbj1cIlwiIGN1cnNvcj1cIlwiIC8+XHJcblx0XHRcdFx0XHQ8L3VwZGF0ZT5gLFxyXG5cdFx0c2hvd1JlcG9EYXRhID0gYDx1cGRhdGUgXHJcblx0XHRcdFx0XHRtYXJrPVwiYCsgbWFyayArYFwiIFxyXG5cdFx0XHRcdFx0c3RhbXA9XCJgKyBzdGFtcCArYFwiIFxyXG5cdFx0XHRcdFx0Y29va2llPVwidHJ1ZVwiIFxyXG5cdFx0XHRcdFx0c2NvcGU9XCJEb2N1bWVudFwiIFxyXG5cdFx0XHRcdFx0dmlldz1cImArIHZpZXcgK2BcIiBcclxuXHRcdFx0XHRcdGlkZW50PVwibnVsbFwiPlxyXG5cdFx0XHRcdFx0XHQ8c2V0IG5hbWU9XCJEb2N1bWVudC5UT09MU1xcXFxSRVBPU0lUT1JZLkZpbHRlclwiIFxyXG5cdFx0XHRcdFx0XHR2YWx1ZT1cImArIHJlcG9GaWx0ZXIgK2BcIiAvPlxyXG5cdFx0XHRcdFx0PC91cGRhdGU+YDtcclxuXHJcblxyXG5cdGxldCBpbml0UmVwb3NpdG9yeSA9ICgpID0+IHtcclxuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcblx0XHRcdCQuYWpheCh7XHJcblx0XHRcdFx0dXJsOiAnL1F2QWpheFpmYy9RdnNWaWV3Q2xpZW50LmFzcHg/bWFyaz0nICsgbWFyayArICcmdmlldz0nICsgdmlldyxcclxuXHRcdFx0XHRkYXRhOiBpbml0UmVwb0RhdGEsXHJcblx0XHRcdFx0dHlwZTogJ1BPU1QnLFxyXG5cdFx0XHRcdGNvbnRlbnRUeXBlOiBcInRleHQvcGxhaW47Y2hhcnNldD1VVEYtOFwiLFxyXG5cdFx0XHRcdGRhdGFUeXBlOiBcInRleHRcIixcclxuXHRcdFx0XHRzdWNjZXNzKCkge1xyXG5cdFx0XHRcdFx0cmVzb2x2ZSgpO1xyXG5cdFx0XHRcdH0sXHJcblx0XHRcdFx0ZXJyb3IoKSB7XHJcblx0XHRcdFx0XHRyZWplY3QoKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0pO1xyXG5cdFx0fSk7XHJcblx0fTtcclxuXHJcblx0bGV0IHNob3dSZXBvc2l0b3J5ID0gKCkgPT4ge1xyXG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuXHRcdFx0JC5hamF4KHtcclxuXHRcdFx0XHR1cmw6ICcvUXZBamF4WmZjL1F2c1ZpZXdDbGllbnQuYXNweD9tYXJrPScgKyBtYXJrICsgJyZ2aWV3PScgKyB2aWV3LFxyXG5cdFx0XHRcdGRhdGE6IHNob3dSZXBvRGF0YSxcclxuXHRcdFx0XHR0eXBlOiAnUE9TVCcsXHJcblx0XHRcdFx0Y29udGVudFR5cGU6IFwidGV4dC9wbGFpbjtjaGFyc2V0PVVURi04XCIsXHJcblx0XHRcdFx0ZGF0YVR5cGU6IFwidGV4dFwiLFxyXG5cdFx0XHRcdHN1Y2Nlc3MoKSB7XHJcblx0XHRcdFx0XHRyZXNvbHZlKCk7XHJcblx0XHRcdFx0fSxcclxuXHRcdFx0XHRlcnJvcigpIHtcclxuXHRcdFx0XHRcdHJlamVjdCgpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSk7XHJcblx0XHR9KTtcclxuXHR9O1xyXG5cclxuXHRQcm9taXNlLmFsbChbXHJcblx0XHRpbml0UmVwb3NpdG9yeSgpLFxyXG5cdFx0c2hvd1JlcG9zaXRvcnkoKVxyXG5cdF0pLnRoZW4oKCkgPT4ge1xyXG5cdFx0aWYgKHR5cGVvZiBjYWxsYmFjayA9PSAnZnVuY3Rpb24nKXtcclxuXHRcdFx0cmV0dXJuIGNhbGxiYWNrKClcclxuXHRcdH1cclxuXHR9KVxyXG59Il19
