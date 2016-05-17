/**
 * Qvet - QlikView Extension Trickster
 * 
 * @version v0.0.1
 * @author Valentyn Yakymenko <rayfesoul@gmail.com>
 * @license MIT
 *//**
 * Qvet - QlikView Extension Trickster
 * 
 * @version v0.0.1
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

var _Bookmarks = require('./native/Bookmarks');

var _Repository = require('./native/Repository');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var QvetCore = exports.QvetCore = function QvetCore() {
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
};

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmNcXFF2ZXQuanMiLCJzcmNcXGNvcmVcXENvcmUuanMiLCJzcmNcXGNvcmVcXG5hdGl2ZVxcQm9va21hcmtzLmpzIiwic3JjXFxjb3JlXFxuYXRpdmVcXFJlcG9zaXRvcnkuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0FBLEFBQVEsQUFBZTs7QUFFdkIsQ0FBQyxVQUFBLEFBQVMsUUFBTyxBQUNoQjtLQUFHLE9BQUEsQUFBTyxTQUFWLEFBQW9CLGFBQVksQUFDL0I7U0FBQSxBQUFPLE9BQVAsQUFBYyxBQUFJLEFBQ2xCO0FBRkQsUUFFTSxBQUNMO1VBQUEsQUFBUSxJQUFSLEFBQVksQUFDWjtBQUNEO0FBTkQsR0FBQSxBQU1HOzs7Ozs7Ozs7O0FDUkgsQUFBUSxBQUFjLEFBQXNCOztBQUM1QyxBQUFRLEFBQXNCLEFBRTlCLEFBQU87Ozs7SUFBQSxBQUFNLEFBQVMsQUFDckI7QUFBYSxBQUNaOztNQUFBLEFBQUs7O0FBQ00sQUFDSCxBQUNOO0FBSFksQUFDSCxBQUVBLEFBRVY7QUFKVSxBQUNUOzRDQUdELEFBQWdCLGVBQWhCLEFBQStCLElBQUcsQUFDakM7b0NBQUEsQUFBZ0IsZUFBaEIsQUFBK0IsQUFDL0I7QUFQRixBQUFjLEFBU2Q7QUFUYyxBQUNiO0FBSG1COzs7Ozs7OztRQ0FmLEFBQVM7UUFhVCxBQUFTOzs7O0FBYlQsd0JBQXdCLEFBRTlCOztLQUFBLEFBQUk7Z0JBQW9CLEFBQ1QsQUFDZDtTQUZ1QixBQUVoQixBQUNQO1FBSHVCLEFBR2pCLEFBQ047VUFBUSxHQUFBLEFBQUcscUJBSlosQUFBd0IsQUFJUyxBQUVqQztBQU53QixBQUN2QjtBQVVGOzs7OztBQUFPLDJCQUEyQixBQUVqQzs7S0FBQSxBQUFJO2dCQUFvQixBQUNULEFBQ2Q7U0FGdUIsQUFFaEIsQUFDUDtRQUh1QixBQUdqQixBQUNOO1VBQVEsR0FBQSxBQUFHLHFCQUpaLEFBQXdCLEFBSVMsQUFFakM7QUFOd0IsQUFDdkI7Ozs7Ozs7OztRQ1BLLEFBQVM7Ozs7Ozs7Ozs7Ozs7QUFBVCx5QkFBQSxBQUF5QixXQUF6QixBQUFvQyxVQUFVLEFBRXBEOztLQUFJLFNBQVMsR0FBQSxBQUFHLHFCQUFoQixBQUFxQztLQUNwQyxPQUFPLE9BRFIsQUFDZTtLQUNkLFFBQVEsT0FGVCxBQUVnQjtLQUNmLE9BQU8sT0FIUixBQUdlO0tBQ2QsYUFBYSxZQUFBLEFBQVksS0FBSyxZQUFqQixBQUE2QixJQUE3QixBQUFpQyxJQUovQyxBQUltRCxBQUVuRDs7S0FBSSxlQUFlLEFBQUMsOEJBQUQsQUFDTixBQUFNLEFBQUMsZ0NBREQsQUFFTCxBQUFPLEFBQUMscUZBRnRCLEFBQW1CLEFBS04sQUFBTSxBQUFDO0tBSW5CLGVBQWUsQUFBQywrQkFBRCxBQUNILEFBQU0sQUFBQyxpQ0FESixBQUVGLEFBQU8sQUFBQyx3RkFGTixBQUtILEFBQU0sQUFBQyx3SEFkcEIsQUFTZ0IsQUFRRCxBQUFZLEFBQUMsQUFJNUI7O0tBQUksaUJBQWlCLDBCQUFNLEFBQzFCO2FBQU8sQUFBSSxRQUFRLFVBQUEsQUFBQyxTQUFELEFBQVUsUUFBVyxBQUN2QztLQUFBLEFBQUU7U0FDSSx3Q0FBQSxBQUF3QyxPQUF4QyxBQUErQyxXQUQ5QyxBQUN5RCxBQUMvRDtVQUZNLEFBRUEsQUFDTjtVQUhNLEFBR0EsQUFDTjtpQkFKTSxBQUlPLEFBQ2I7Y0FMTSxBQUtJLEFBQ1Y7Z0NBQVUsQUFDVDtBQUNBO0FBUkssQUFTTjs0QkFBUSxBQUNQO0FBQ0E7QUFYRixBQUFPLEFBYVA7QUFiTyxBQUNOO0FBRkYsQUFBTyxBQWVQLEdBZk87QUFEUixBQWtCQTs7S0FBSSxpQkFBaUIsMEJBQU0sQUFDMUI7YUFBTyxBQUFJLFFBQVEsVUFBQSxBQUFDLFNBQUQsQUFBVSxRQUFXLEFBQ3ZDO0tBQUEsQUFBRTtTQUNJLHdDQUFBLEFBQXdDLE9BQXhDLEFBQStDLFdBRDlDLEFBQ3lELEFBQy9EO1VBRk0sQUFFQSxBQUNOO1VBSE0sQUFHQSxBQUNOO2lCQUpNLEFBSU8sQUFDYjtjQUxNLEFBS0ksQUFDVjtnQ0FBVSxBQUNUO0FBQ0E7QUFSSyxBQVNOOzRCQUFRLEFBQ1A7QUFDQTtBQVhGLEFBQU8sQUFhUDtBQWJPLEFBQ047QUFGRixBQUFPLEFBZVAsR0FmTztBQURSLEFBa0JBOztTQUFBLEFBQVEsSUFBSSxDQUFBLEFBQ1gsa0JBREQsQUFBWSxBQUVYLG1CQUZELEFBR0csS0FBSyxZQUFNLEFBQ2I7TUFBSSxPQUFBLEFBQU8sWUFBWCxBQUF1QixZQUFXLEFBQ2pDO1VBQUEsQUFBTyxBQUNQO0FBQ0Q7QUFQRCxBQVFBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImltcG9ydCB7UXZldENvcmV9IGZyb20gJy4vY29yZS9Db3JlJztcclxuXHJcbihmdW5jdGlvbih3aW5kb3cpe1xyXG5cdGlmKHR5cGVvZihRdmV0KSA9PT0gJ3VuZGVmaW5lZCcpe1xyXG5cdFx0d2luZG93LlF2ZXQgPSBuZXcgUXZldENvcmUoKTtcclxuXHR9IGVsc2V7XHJcblx0XHRjb25zb2xlLmxvZyhcIlF2ZXQgYWxyZWFkeSBkZWZpbmVkLlwiKTtcclxuXHR9XHJcbn0pKHdpbmRvdyk7IiwiaW1wb3J0IHskQWRkQm9va21hcmssICRSZW1vdmVCb29rbWFya30gZnJvbSAnLi9uYXRpdmUvQm9va21hcmtzJztcclxuaW1wb3J0IHskT3BlblJlcG9zaXRvcnl9IGZyb20gJy4vbmF0aXZlL1JlcG9zaXRvcnknO1xyXG5cclxuZXhwb3J0IGNsYXNzIFF2ZXRDb3JlIHtcclxuXHRjb25zdHJ1Y3Rvcigpe1xyXG5cdFx0dGhpcy5uYXRpdmUgPSB7XHJcblx0XHRcdGJvb2ttYXJrczp7XHJcblx0XHRcdFx0JGFkZDogJEFkZEJvb2ttYXJrLFxyXG5cdFx0XHRcdCRyZW1vdmU6ICRSZW1vdmVCb29rbWFya1xyXG5cdFx0XHR9LFxyXG5cdFx0XHQkb3BlblJlcG9zaXRvcnkoZGVmYXVsdEZpbHRlciwgZm4pe1xyXG5cdFx0XHRcdCRPcGVuUmVwb3NpdG9yeShkZWZhdWx0RmlsdGVyLCBmbilcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxufSIsIi8qKlxyXG4gKiAkQWRkQm9va21hcmsgLSBvcGVuIG5hdGl2ZSBBZGQgQm9va21hcmsgbW9kYWwuXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gJEFkZEJvb2ttYXJrKCkge1xyXG5cdFxyXG5cdFF2YS5Db250ZXh0Q2xpZW50QWN0aW9uKHtcclxuXHRcdGNsaWVudEFjdGlvbjogXCJtb2RhbFwiLFxyXG5cdFx0cGFyYW06IFwiYm1cIixcclxuXHRcdG5hbWU6IFwiQUREQk1cIixcclxuXHRcdGJpbmRlcjogUXYuR2V0Q3VycmVudERvY3VtZW50KCkuYmluZGVyXHJcblx0fSk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiAkUmVtb3ZlQm9va21hcmsgLSBvcGVuIG5hdGl2ZSBSZW1vdmUgQm9va21hcmsgbW9kYWwuXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gJFJlbW92ZUJvb2ttYXJrKCkge1xyXG5cdFxyXG5cdFF2YS5Db250ZXh0Q2xpZW50QWN0aW9uKHtcclxuXHRcdGNsaWVudEFjdGlvbjogXCJtb2RhbFwiLFxyXG5cdFx0cGFyYW06IFwicmVtb3ZlYm1cIixcclxuXHRcdG5hbWU6IFwiUkVNQk1cIixcclxuXHRcdGJpbmRlcjogUXYuR2V0Q3VycmVudERvY3VtZW50KCkuYmluZGVyXHJcblx0fSk7XHJcbn0iLCIvLyBUT0RPOiBGaW5kIGFub3RoZXIgd2F5IHRvIG9wZW4gcmVwbyB3aXRob3V0IGZha2UgcmVxdWVzdHMuXHJcbi8qKlxyXG4gKiAkUmVwb3NpdG9yeSAtIG9wZW4gbmF0aXZlIFJlcG9zaXRvcnkgbW9kYWwuXHJcbiAqXHJcbiAqIEBwYXJhbSBkZWZGaWx0ZXIge251bWJlcn0gMC0zLlxyXG4gKiBAcGFyYW0gY2FsbGJhY2sge2Z1bmN0aW9ufSBDYWxsYmFjayBmdW5jdGlvbi5cclxuICpcclxuICogQG5vdGUgUmVwbyBjYW4gYmUgb3BlbmVkIG9ubHkgd2l0aCBmYWtlIHJlcXVlc3QgdG8gUWxpa1ZpZXcgQVNQLk5FVCBDbGllbnQuXHJcbiAqICAgICAgUmVhc29uIGlzIHJlbW90ZSByZXBvc2l0b3J5LCBRbGlrVmlldyBvcGVuIHJlcG9zaXRvcnkgb25seSBhZnRlciBBU1AuTkVUIFFsaWtWaWV3IGNsaWVudCByZXF1ZXN0LlxyXG4gKiAgICAgIFdlIGFsd2F5cyBoYXZlIGpRdWVyeS5cclxuICogQHVybCBodHRwczovL2NvbW11bml0eS5xbGlrLmNvbS9kb2NzL0RPQy0yNjM5XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gJE9wZW5SZXBvc2l0b3J5KGRlZkZpbHRlciwgY2FsbGJhY2spIHtcclxuXHJcblx0bGV0IGJpbmRlciA9IFF2LkdldEN1cnJlbnREb2N1bWVudCgpLmJpbmRlcixcclxuXHRcdG1hcmsgPSBiaW5kZXIuTWFyayxcclxuXHRcdHN0YW1wID0gYmluZGVyLlN0YW1wLFxyXG5cdFx0dmlldyA9IGJpbmRlci5WaWV3LFxyXG5cdFx0cmVwb0ZpbHRlciA9IGRlZkZpbHRlciA+IDMgJiYgZGVmRmlsdGVyIDwgMCA/IDAgOiBkZWZGaWx0ZXI7XHJcblxyXG5cdGxldCBpbml0UmVwb0RhdGEgPSBgPHVwZGF0ZVxyXG5cdFx0XHRcdFx0bWFyaz1cImArIG1hcmsgK2BcIlxyXG5cdFx0XHRcdFx0c3RhbXA9XCJgKyBzdGFtcCArYFwiXHJcblx0XHRcdFx0XHRjb29raWU9XCJ0cnVlXCJcclxuXHRcdFx0XHRcdHNjb3BlPVwiRG9jdW1lbnRcIlxyXG5cdFx0XHRcdFx0dmlldz1cImArIHZpZXcgK2BcIlxyXG5cdFx0XHRcdFx0aWRlbnQ9XCJudWxsXCI+XHJcblx0XHRcdFx0XHRcdDxzZXQgbmFtZT1cIkRvY3VtZW50LlN0YW5kYXJkQWN0aW9ucy5SRVBPU0lUT1JZXCIgYWN0aW9uPVwiXCIgY2xpZW50c2l6ZVdIPVwiXCIgcG9zaXRpb249XCJcIiBjdXJzb3I9XCJcIiAvPlxyXG5cdFx0XHRcdFx0PC91cGRhdGU+YCxcclxuXHRcdHNob3dSZXBvRGF0YSA9IGA8dXBkYXRlIFxyXG5cdFx0XHRcdFx0bWFyaz1cImArIG1hcmsgK2BcIiBcclxuXHRcdFx0XHRcdHN0YW1wPVwiYCsgc3RhbXAgK2BcIiBcclxuXHRcdFx0XHRcdGNvb2tpZT1cInRydWVcIiBcclxuXHRcdFx0XHRcdHNjb3BlPVwiRG9jdW1lbnRcIiBcclxuXHRcdFx0XHRcdHZpZXc9XCJgKyB2aWV3ICtgXCIgXHJcblx0XHRcdFx0XHRpZGVudD1cIm51bGxcIj5cclxuXHRcdFx0XHRcdFx0PHNldCBuYW1lPVwiRG9jdW1lbnQuVE9PTFNcXFxcUkVQT1NJVE9SWS5GaWx0ZXJcIiBcclxuXHRcdFx0XHRcdFx0dmFsdWU9XCJgKyByZXBvRmlsdGVyICtgXCIgLz5cclxuXHRcdFx0XHRcdDwvdXBkYXRlPmA7XHJcblxyXG5cclxuXHRsZXQgaW5pdFJlcG9zaXRvcnkgPSAoKSA9PiB7XHJcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG5cdFx0XHQkLmFqYXgoe1xyXG5cdFx0XHRcdHVybDogJy9RdkFqYXhaZmMvUXZzVmlld0NsaWVudC5hc3B4P21hcms9JyArIG1hcmsgKyAnJnZpZXc9JyArIHZpZXcsXHJcblx0XHRcdFx0ZGF0YTogaW5pdFJlcG9EYXRhLFxyXG5cdFx0XHRcdHR5cGU6ICdQT1NUJyxcclxuXHRcdFx0XHRjb250ZW50VHlwZTogXCJ0ZXh0L3BsYWluO2NoYXJzZXQ9VVRGLThcIixcclxuXHRcdFx0XHRkYXRhVHlwZTogXCJ0ZXh0XCIsXHJcblx0XHRcdFx0c3VjY2VzcygpIHtcclxuXHRcdFx0XHRcdHJlc29sdmUoKTtcclxuXHRcdFx0XHR9LFxyXG5cdFx0XHRcdGVycm9yKCkge1xyXG5cdFx0XHRcdFx0cmVqZWN0KCk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KTtcclxuXHRcdH0pO1xyXG5cdH07XHJcblxyXG5cdGxldCBzaG93UmVwb3NpdG9yeSA9ICgpID0+IHtcclxuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcblx0XHRcdCQuYWpheCh7XHJcblx0XHRcdFx0dXJsOiAnL1F2QWpheFpmYy9RdnNWaWV3Q2xpZW50LmFzcHg/bWFyaz0nICsgbWFyayArICcmdmlldz0nICsgdmlldyxcclxuXHRcdFx0XHRkYXRhOiBzaG93UmVwb0RhdGEsXHJcblx0XHRcdFx0dHlwZTogJ1BPU1QnLFxyXG5cdFx0XHRcdGNvbnRlbnRUeXBlOiBcInRleHQvcGxhaW47Y2hhcnNldD1VVEYtOFwiLFxyXG5cdFx0XHRcdGRhdGFUeXBlOiBcInRleHRcIixcclxuXHRcdFx0XHRzdWNjZXNzKCkge1xyXG5cdFx0XHRcdFx0cmVzb2x2ZSgpO1xyXG5cdFx0XHRcdH0sXHJcblx0XHRcdFx0ZXJyb3IoKSB7XHJcblx0XHRcdFx0XHRyZWplY3QoKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0pO1xyXG5cdFx0fSk7XHJcblx0fTtcclxuXHJcblx0UHJvbWlzZS5hbGwoW1xyXG5cdFx0aW5pdFJlcG9zaXRvcnkoKSxcclxuXHRcdHNob3dSZXBvc2l0b3J5KClcclxuXHRdKS50aGVuKCgpID0+IHtcclxuXHRcdGlmICh0eXBlb2YgY2FsbGJhY2sgPT0gJ2Z1bmN0aW9uJyl7XHJcblx0XHRcdHJldHVybiBjYWxsYmFjaygpXHJcblx0XHR9XHJcblx0fSlcclxufSJdfQ==
