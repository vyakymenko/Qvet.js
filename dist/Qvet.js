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

var _ShowFields = require('./native/ShowFields');

var _NewSheetObject = require('./native/NewSheetObject');

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
			$openRepository: _Repository.$OpenRepository,
			$showFields: _ShowFields.$ShowFields,
			$newSheetObject: _NewSheetObject.$NewSheetObject
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

},{"./native/Bookmarks":3,"./native/NewSheetObject":4,"./native/Repository":5,"./native/ShowFields":6}],3:[function(require,module,exports){
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

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmNcXFF2ZXQuanMiLCJzcmNcXGNvcmVcXENvcmUuanMiLCJzcmNcXGNvcmVcXG5hdGl2ZVxcQm9va21hcmtzLmpzIiwic3JjXFxjb3JlXFxuYXRpdmVcXE5ld1NoZWV0T2JqZWN0LmpzIiwic3JjXFxjb3JlXFxuYXRpdmVcXFJlcG9zaXRvcnkuanMiLCJzcmNcXGNvcmVcXG5hdGl2ZVxcU2hvd0ZpZWxkcy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDQUEsQUFBUSxBQUFlOztBQUV2QixDQUFDLFVBQUEsQUFBUyxRQUFPLEFBQ2hCO0tBQUcsT0FBQSxBQUFPLFNBQVYsQUFBb0IsYUFBWSxBQUMvQjtTQUFBLEFBQU8sT0FBUCxBQUFjLEFBQUksQUFDbEI7QUFGRCxRQUVNLEFBQ0w7VUFBQSxBQUFRLElBQVIsQUFBWSxBQUNaO0FBQ0Q7QUFORCxHQUFBLEFBTUc7Ozs7Ozs7Ozs7OztBQ05ILEFBQVEsQUFBYyxBQUFzQjs7QUFDNUMsQUFBUSxBQUFzQjs7QUFDOUIsQUFBUSxBQUFrQjs7QUFDMUIsQUFBUSxBQUFzQixBQUU5QixBQUFPOzs7O0FBUFAsSUFBTSxVQUFOLEFBQWdCOztJQU9ULEFBQU0sQUFBUyxBQUNyQjs7QUFBYSxBQUNaOztPQUFBLEFBQUs7O0FBQ00sQUFDSCxBQUNOO0FBSFksQUFDSCxBQUVBLEFBRVY7QUFKVSxBQUNUO0FBRlksQUFLSSxBQUNqQjtBQU5hLEFBTUEsQUFDYjtBQVBELEFBQWMsQUFPSSxBQUVsQjtBQVRjLEFBQ2I7QUFVRjs7OzsrQkFBWSxBQUNYO1dBQUEsQUFBUSxJQUFJLG1CQUFaLEFBQStCLEFBQy9CO0FBZm9COzs7Ozs7Ozs7Ozs7UUNKZixBQUFTO1FBYVQsQUFBUzs7OztBQWJULHdCQUF3QixBQUU5Qjs7S0FBQSxBQUFJO2dCQUFvQixBQUNULEFBQ2Q7U0FGdUIsQUFFaEIsQUFDUDtRQUh1QixBQUdqQixBQUNOO1VBQVEsR0FBQSxBQUFHLHFCQUpaLEFBQXdCLEFBSVMsQUFFakM7QUFOd0IsQUFDdkI7QUFVRjs7Ozs7QUFBTywyQkFBMkIsQUFFakM7O0tBQUEsQUFBSTtnQkFBb0IsQUFDVCxBQUNkO1NBRnVCLEFBRWhCLEFBQ1A7UUFIdUIsQUFHakIsQUFDTjtVQUFRLEdBQUEsQUFBRyxxQkFKWixBQUF3QixBQUlTLEFBRWpDO0FBTndCLEFBQ3ZCOzs7Ozs7Ozs7UUNoQkssQUFBUzs7OztBQUFULDJCQUEyQixBQUVqQzs7S0FBQSxBQUFJLElBQUosQUFBUSxLQUFSLEFBQWE7VUFBYixBQUFzQixBQUNiLEFBRVQ7QUFIc0IsQUFDckI7Ozs7Ozs7OztRQ0tLLEFBQVM7Ozs7Ozs7Ozs7OztBQUFULDJCQUEyQixBQStFakM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7TUFBQSxBQUFJLElBQUosQUFBUSxLQUFSLEFBQWE7WUFBYixBQUFzQixBQUNiLEFBRVQ7QUFIc0IsQUFDckI7Ozs7Ozs7OztRQ3hGSyxBQUFTOzs7O0FBQVQsdUJBQXVCLEFBRTdCOztLQUFBLEFBQUksSUFBSixBQUFRLEtBQVIsQUFBYTtVQUFiLEFBQXNCLEFBQ2IsQUFFVDtBQUhzQixBQUNyQiIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJpbXBvcnQge1F2ZXRDb3JlfSBmcm9tICcuL2NvcmUvQ29yZSc7XHJcblxyXG4oZnVuY3Rpb24od2luZG93KXtcclxuXHRpZih0eXBlb2YoUXZldCkgPT09ICd1bmRlZmluZWQnKXtcclxuXHRcdHdpbmRvdy5RdmV0ID0gbmV3IFF2ZXRDb3JlKCk7XHJcblx0fSBlbHNle1xyXG5cdFx0Y29uc29sZS5sb2coXCJRdmV0IGFscmVhZHkgZGVmaW5lZC5cIik7XHJcblx0fVxyXG59KSh3aW5kb3cpOyIsImNvbnN0IHZlcnNpb24gPSAnMC4wLjEtYWxwaGEnO1xyXG5cclxuaW1wb3J0IHskQWRkQm9va21hcmssICRSZW1vdmVCb29rbWFya30gZnJvbSAnLi9uYXRpdmUvQm9va21hcmtzJztcclxuaW1wb3J0IHskT3BlblJlcG9zaXRvcnl9IGZyb20gJy4vbmF0aXZlL1JlcG9zaXRvcnknO1xyXG5pbXBvcnQgeyRTaG93RmllbGRzfSBmcm9tICcuL25hdGl2ZS9TaG93RmllbGRzJztcclxuaW1wb3J0IHskTmV3U2hlZXRPYmplY3R9IGZyb20gJy4vbmF0aXZlL05ld1NoZWV0T2JqZWN0JztcclxuXHJcbmV4cG9ydCBjbGFzcyBRdmV0Q29yZSB7XHJcblx0Y29uc3RydWN0b3IoKXtcclxuXHRcdHRoaXMubmF0aXZlID0ge1xyXG5cdFx0XHRib29rbWFya3M6e1xyXG5cdFx0XHRcdCRhZGQ6ICRBZGRCb29rbWFyayxcclxuXHRcdFx0XHQkcmVtb3ZlOiAkUmVtb3ZlQm9va21hcmtcclxuXHRcdFx0fSxcclxuXHRcdFx0JG9wZW5SZXBvc2l0b3J5OiAkT3BlblJlcG9zaXRvcnksXHJcblx0XHRcdCRzaG93RmllbGRzOiAkU2hvd0ZpZWxkcyxcclxuXHRcdFx0JG5ld1NoZWV0T2JqZWN0OiAkTmV3U2hlZXRPYmplY3RcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGdldFZlcnNpb24oKXtcclxuXHRcdGNvbnNvbGUubG9nKCdRdmV0IHZlcnNpb246ICcgKyB2ZXJzaW9uKTtcclxuXHR9XHJcbn0iLCIvKipcclxuICogJEFkZEJvb2ttYXJrIC0gb3BlbiBuYXRpdmUgQWRkIEJvb2ttYXJrIG1vZGFsLlxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uICRBZGRCb29rbWFyaygpIHtcclxuXHJcblx0UXZhLkNvbnRleHRDbGllbnRBY3Rpb24oe1xyXG5cdFx0Y2xpZW50QWN0aW9uOiBcIm1vZGFsXCIsXHJcblx0XHRwYXJhbTogXCJibVwiLFxyXG5cdFx0bmFtZTogXCJBRERCTVwiLFxyXG5cdFx0YmluZGVyOiBRdi5HZXRDdXJyZW50RG9jdW1lbnQoKS5iaW5kZXJcclxuXHR9KTtcclxufVxyXG5cclxuLyoqXHJcbiAqICRSZW1vdmVCb29rbWFyayAtIG9wZW4gbmF0aXZlIFJlbW92ZSBCb29rbWFyayBtb2RhbC5cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiAkUmVtb3ZlQm9va21hcmsoKSB7XHJcblxyXG5cdFF2YS5Db250ZXh0Q2xpZW50QWN0aW9uKHtcclxuXHRcdGNsaWVudEFjdGlvbjogXCJtb2RhbFwiLFxyXG5cdFx0cGFyYW06IFwicmVtb3ZlYm1cIixcclxuXHRcdG5hbWU6IFwiUkVNQk1cIixcclxuXHRcdGJpbmRlcjogUXYuR2V0Q3VycmVudERvY3VtZW50KCkuYmluZGVyXHJcblx0fSk7XHJcbn0iLCIvKipcclxuICogJFNob3dGaWVsZHMgLSBvcGVuIG5hdGl2ZSBTaG93IEZpZWxkcyBtb2RhbC5cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiAkTmV3U2hlZXRPYmplY3QoKSB7XHJcblx0XHJcblx0UXZhLk1nci5tZW51LmRvQWN0aW9uKHtcclxuXHRcdHRhcmdldDogJy5jdHgtbWVudS1hY3Rpb24tTkVXU0hFRVRPQkonXHJcblx0fSk7XHJcbn0iLCIvKipcclxuICogJFJlcG9zaXRvcnkgLSBvcGVuIG5hdGl2ZSBSZXBvc2l0b3J5IG1vZGFsLlxyXG4gKlxyXG4gKiBAcGFyYW0gZGVmRmlsdGVyIHtudW1iZXJ9IDAtMyAtIERlcHJlY2F0ZWQuXHJcbiAqIEBwYXJhbSBjYWxsYmFjayB7ZnVuY3Rpb259IENhbGxiYWNrIGZ1bmN0aW9uLiAtIERlcHJlY2F0ZWQuXHJcbiAqXHJcbiAqIEBub3RlIFJlcG8gY2FuIGJlIG9wZW5lZCBvbmx5IHdpdGggZmFrZSByZXF1ZXN0IHRvIFFsaWtWaWV3IEFTUC5ORVQgQ2xpZW50LlxyXG4gKiAgICAgIFJlYXNvbiBpcyByZW1vdGUgcmVwb3NpdG9yeSwgUWxpa1ZpZXcgb3BlbiByZXBvc2l0b3J5IG9ubHkgYWZ0ZXIgQVNQLk5FVCBRbGlrVmlldyBjbGllbnQgcmVxdWVzdC5cclxuICogICAgICBXZSBhbHdheXMgaGF2ZSBqUXVlcnkuXHJcbiAqIEB1cmwgaHR0cHM6Ly9jb21tdW5pdHkucWxpay5jb20vZG9jcy9ET0MtMjYzOVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uICRPcGVuUmVwb3NpdG9yeSgpIHtcclxuXHJcblx0LyoqXHJcblx0ICogIERlcHJlY2F0ZWQgdmVyc2lvbi5cclxuXHQgKlxyXG5cclxuXHQgbGV0IGJpbmRlciA9IFF2LkdldEN1cnJlbnREb2N1bWVudCgpLmJpbmRlcixcclxuXHRcdCBtYXJrID0gYmluZGVyLk1hcmssXHJcblx0XHQgc3RhbXAgPSBiaW5kZXIuU3RhbXAsXHJcblx0XHQgdmlldyA9IGJpbmRlci5WaWV3LFxyXG5cdFx0IHJlcG9GaWx0ZXIgPSBkZWZGaWx0ZXIgPiAzICYmIGRlZkZpbHRlciA8IDAgPyAwIDogZGVmRmlsdGVyO1xyXG5cclxuXHQgbGV0IGluaXRSZXBvRGF0YSA9IGA8dXBkYXRlXHJcblx0IG1hcms9XCJgKyBtYXJrICtgXCJcclxuXHQgc3RhbXA9XCJgKyBzdGFtcCArYFwiXHJcblx0IGNvb2tpZT1cInRydWVcIlxyXG5cdCBzY29wZT1cIkRvY3VtZW50XCJcclxuXHQgdmlldz1cImArIHZpZXcgK2BcIlxyXG5cdCBpZGVudD1cIm51bGxcIj5cclxuXHQgPHNldCBuYW1lPVwiRG9jdW1lbnQuU3RhbmRhcmRBY3Rpb25zLlJFUE9TSVRPUllcIiBhY3Rpb249XCJcIiBjbGllbnRzaXplV0g9XCJcIiBwb3NpdGlvbj1cIlwiIGN1cnNvcj1cIlwiIC8+XHJcblx0IDwvdXBkYXRlPmAsXHJcblx0IHNob3dSZXBvRGF0YSA9IGA8dXBkYXRlXHJcblx0IG1hcms9XCJgKyBtYXJrICtgXCJcclxuXHQgc3RhbXA9XCJgKyBzdGFtcCArYFwiXHJcblx0IGNvb2tpZT1cInRydWVcIlxyXG5cdCBzY29wZT1cIkRvY3VtZW50XCJcclxuXHQgdmlldz1cImArIHZpZXcgK2BcIlxyXG5cdCBpZGVudD1cIm51bGxcIj5cclxuXHQgPHNldCBuYW1lPVwiRG9jdW1lbnQuVE9PTFNcXFxcUkVQT1NJVE9SWS5GaWx0ZXJcIlxyXG5cdCB2YWx1ZT1cImArIHJlcG9GaWx0ZXIgK2BcIiAvPlxyXG5cdCA8L3VwZGF0ZT5gO1xyXG5cclxuXHJcblx0IGxldCBpbml0UmVwb3NpdG9yeSA9ICgpID0+IHtcclxuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcblx0XHRcdCQuYWpheCh7XHJcblx0XHRcdFx0dXJsOiAnL1F2QWpheFpmYy9RdnNWaWV3Q2xpZW50LmFzcHg/bWFyaz0nICsgbWFyayArICcmdmlldz0nICsgdmlldyxcclxuXHRcdFx0XHRkYXRhOiBpbml0UmVwb0RhdGEsXHJcblx0XHRcdFx0dHlwZTogJ1BPU1QnLFxyXG5cdFx0XHRcdGNvbnRlbnRUeXBlOiBcInRleHQvcGxhaW47Y2hhcnNldD1VVEYtOFwiLFxyXG5cdFx0XHRcdGRhdGFUeXBlOiBcInRleHRcIixcclxuXHRcdFx0XHRzdWNjZXNzKCkge1xyXG5cdFx0XHRcdFx0cmVzb2x2ZSgpO1xyXG5cdFx0XHRcdH0sXHJcblx0XHRcdFx0ZXJyb3IoKSB7XHJcblx0XHRcdFx0XHRyZWplY3QoKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0pO1xyXG5cdFx0fSk7XHJcblx0fTtcclxuXHJcblx0IGxldCBzaG93UmVwb3NpdG9yeSA9ICgpID0+IHtcclxuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcblx0XHRcdCQuYWpheCh7XHJcblx0XHRcdFx0dXJsOiAnL1F2QWpheFpmYy9RdnNWaWV3Q2xpZW50LmFzcHg/bWFyaz0nICsgbWFyayArICcmdmlldz0nICsgdmlldyxcclxuXHRcdFx0XHRkYXRhOiBzaG93UmVwb0RhdGEsXHJcblx0XHRcdFx0dHlwZTogJ1BPU1QnLFxyXG5cdFx0XHRcdGNvbnRlbnRUeXBlOiBcInRleHQvcGxhaW47Y2hhcnNldD1VVEYtOFwiLFxyXG5cdFx0XHRcdGRhdGFUeXBlOiBcInRleHRcIixcclxuXHRcdFx0XHRzdWNjZXNzKCkge1xyXG5cdFx0XHRcdFx0cmVzb2x2ZSgpO1xyXG5cdFx0XHRcdH0sXHJcblx0XHRcdFx0ZXJyb3IoKSB7XHJcblx0XHRcdFx0XHRyZWplY3QoKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0pO1xyXG5cdFx0fSk7XHJcblx0fTtcclxuXHJcblx0IFByb21pc2UuYWxsKFtcclxuXHQgaW5pdFJlcG9zaXRvcnkoKSxcclxuXHQgc2hvd1JlcG9zaXRvcnkoKVxyXG5cdCBdKS50aGVuKCgpID0+IHtcclxuXHRcdGlmICh0eXBlb2YgY2FsbGJhY2sgPT0gJ2Z1bmN0aW9uJyl7XHJcblx0XHRcdHJldHVybiBjYWxsYmFjaygpXHJcblx0XHR9XHJcblx0fSlcclxuXHQgKi9cclxuXHJcblx0UXZhLk1nci5tZW51LmRvQWN0aW9uKHtcclxuXHRcdHRhcmdldDogJy5jdHgtbWVudS1hY3Rpb24tUkVQT1NJVE9SWSdcclxuXHR9KTtcclxufSIsIi8qKlxyXG4gKiAkU2hvd0ZpZWxkcyAtIG9wZW4gbmF0aXZlIFNob3cgRmllbGRzIG1vZGFsLlxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uICRTaG93RmllbGRzKCkge1xyXG5cdFxyXG5cdFF2YS5NZ3IubWVudS5kb0FjdGlvbih7XHJcblx0XHR0YXJnZXQ6ICcuY3R4LW1lbnUtYWN0aW9uLVNIT1dGSUVMRFMnXHJcblx0fSk7XHJcbn0iXX0=
