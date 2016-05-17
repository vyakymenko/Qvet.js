/**
 * Qvet - QlikView Extension Trickster
 * 
 * @version v0.0.2
 * @author Valentyn Yakymenko <rayfesoul@gmail.com>
 * @license MIT
 */(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmNcXFF2ZXQuanMiLCJzcmNcXGNvcmVcXENvcmUuanMiLCJzcmNcXGNvcmVcXG5hdGl2ZVxcQm9va21hcmtzLmpzIiwic3JjXFxjb3JlXFxuYXRpdmVcXE5ld1NoZWV0T2JqZWN0LmpzIiwic3JjXFxjb3JlXFxuYXRpdmVcXFJlcG9zaXRvcnkuanMiLCJzcmNcXGNvcmVcXG5hdGl2ZVxcU2hvd0ZpZWxkcy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDQUEsQUFBUSxBQUFlOztBQUV2QixDQUFDLFVBQUEsQUFBUyxRQUFPLEFBQ2hCO0tBQUksT0FBQSxBQUFPLFFBQVAsQUFBZSxlQUFlLE9BQUEsQUFBTyxXQUF6QyxBQUFvRCxhQUFZLEFBQy9EO1VBQUEsQUFBUSxJQUFSLEFBQVksQUFDWjtBQUZELFFBRUssQUFDSjtNQUFHLE9BQUEsQUFBTyxTQUFWLEFBQW9CLGFBQVksQUFDL0I7VUFBQSxBQUFPLE9BQVAsQUFBYyxBQUFJLEFBQ2xCO0FBRkQsU0FFTSxBQUNMO1dBQUEsQUFBUSxJQUFSLEFBQVksQUFDWjtBQUNEO0FBQ0Q7QUFWRCxHQUFBLEFBVUc7Ozs7Ozs7Ozs7OztBQ1ZILEFBQVEsQUFBYyxBQUFzQjs7QUFDNUMsQUFBUSxBQUFzQjs7QUFDOUIsQUFBUSxBQUFrQjs7QUFDMUIsQUFBUSxBQUFzQixBQUU5QixBQUFPOzs7O0FBUFAsSUFBTSxVQUFOLEFBQWdCOztJQU9ULEFBQU0sQUFBUyxBQUNyQjs7QUFBYSxBQUNaOztPQUFBLEFBQUs7O0FBQ00sQUFDSCxBQUNOO0FBSFksQUFDSCxBQUVBLEFBRVY7QUFKVSxBQUNUO0FBRlksQUFLSSxBQUNqQjtBQU5hLEFBTUEsQUFDYjtBQVBELEFBQWMsQUFPSSxBQUVsQjtBQVRjLEFBQ2I7QUFVRjs7OzsrQkFBWSxBQUNYO1dBQUEsQUFBUSxJQUFJLG1CQUFaLEFBQStCLEFBQy9CO0FBZm9COzs7Ozs7Ozs7Ozs7UUNKZixBQUFTO1FBYVQsQUFBUzs7OztBQWJULHdCQUF3QixBQUU5Qjs7S0FBQSxBQUFJO2dCQUFvQixBQUNULEFBQ2Q7U0FGdUIsQUFFaEIsQUFDUDtRQUh1QixBQUdqQixBQUNOO1VBQVEsR0FBQSxBQUFHLHFCQUpaLEFBQXdCLEFBSVMsQUFFakM7QUFOd0IsQUFDdkI7QUFVRjs7Ozs7QUFBTywyQkFBMkIsQUFFakM7O0tBQUEsQUFBSTtnQkFBb0IsQUFDVCxBQUNkO1NBRnVCLEFBRWhCLEFBQ1A7UUFIdUIsQUFHakIsQUFDTjtVQUFRLEdBQUEsQUFBRyxxQkFKWixBQUF3QixBQUlTLEFBRWpDO0FBTndCLEFBQ3ZCOzs7Ozs7Ozs7UUNoQkssQUFBUzs7OztBQUFULDJCQUEyQixBQUVqQzs7S0FBQSxBQUFJLElBQUosQUFBUSxLQUFSLEFBQWE7VUFBYixBQUFzQixBQUNiLEFBRVQ7QUFIc0IsQUFDckI7Ozs7Ozs7OztRQ0tLLEFBQVM7Ozs7Ozs7Ozs7OztBQUFULDJCQUEyQixBQStFakM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7TUFBQSxBQUFJLElBQUosQUFBUSxLQUFSLEFBQWE7WUFBYixBQUFzQixBQUNiLEFBRVQ7QUFIc0IsQUFDckI7Ozs7Ozs7OztRQ3hGSyxBQUFTOzs7O0FBQVQsdUJBQXVCLEFBRTdCOztLQUFBLEFBQUksSUFBSixBQUFRLEtBQVIsQUFBYTtVQUFiLEFBQXNCLEFBQ2IsQUFFVDtBQUhzQixBQUNyQiIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJpbXBvcnQge1F2ZXRDb3JlfSBmcm9tICcuL2NvcmUvQ29yZSc7XHJcblxyXG4oZnVuY3Rpb24od2luZG93KXtcclxuXHRpZiAodHlwZW9mIFF2YSA9PT0gJ3VuZGVmaW5lZCcgJiYgdHlwZW9mIGpRdWVyeSA9PT0gJ3VuZGVmaW5lZCcpe1xyXG5cdFx0Y29uc29sZS5sb2coXCJDYW4ndCBpbml0IFF2ZXQgYmVjYXVzZSBRdmEvalF1ZXJ5IGlzIHVuZGVmaW5lZFwiKVxyXG5cdH1lbHNle1xyXG5cdFx0aWYodHlwZW9mKFF2ZXQpID09PSAndW5kZWZpbmVkJyl7XHJcblx0XHRcdHdpbmRvdy5RdmV0ID0gbmV3IFF2ZXRDb3JlKCk7XHJcblx0XHR9IGVsc2V7XHJcblx0XHRcdGNvbnNvbGUubG9nKFwiUXZldCBhbHJlYWR5IGRlZmluZWQuXCIpO1xyXG5cdFx0fVxyXG5cdH1cclxufSkod2luZG93KTsiLCJjb25zdCB2ZXJzaW9uID0gJzAuMC4xLWFscGhhJztcclxuXHJcbmltcG9ydCB7JEFkZEJvb2ttYXJrLCAkUmVtb3ZlQm9va21hcmt9IGZyb20gJy4vbmF0aXZlL0Jvb2ttYXJrcyc7XHJcbmltcG9ydCB7JE9wZW5SZXBvc2l0b3J5fSBmcm9tICcuL25hdGl2ZS9SZXBvc2l0b3J5JztcclxuaW1wb3J0IHskU2hvd0ZpZWxkc30gZnJvbSAnLi9uYXRpdmUvU2hvd0ZpZWxkcyc7XHJcbmltcG9ydCB7JE5ld1NoZWV0T2JqZWN0fSBmcm9tICcuL25hdGl2ZS9OZXdTaGVldE9iamVjdCc7XHJcblxyXG5leHBvcnQgY2xhc3MgUXZldENvcmUge1xyXG5cdGNvbnN0cnVjdG9yKCl7XHJcblx0XHR0aGlzLm5hdGl2ZSA9IHtcclxuXHRcdFx0Ym9va21hcmtzOntcclxuXHRcdFx0XHQkYWRkOiAkQWRkQm9va21hcmssXHJcblx0XHRcdFx0JHJlbW92ZTogJFJlbW92ZUJvb2ttYXJrXHJcblx0XHRcdH0sXHJcblx0XHRcdCRvcGVuUmVwb3NpdG9yeTogJE9wZW5SZXBvc2l0b3J5LFxyXG5cdFx0XHQkc2hvd0ZpZWxkczogJFNob3dGaWVsZHMsXHJcblx0XHRcdCRuZXdTaGVldE9iamVjdDogJE5ld1NoZWV0T2JqZWN0XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRnZXRWZXJzaW9uKCl7XHJcblx0XHRjb25zb2xlLmxvZygnUXZldCB2ZXJzaW9uOiAnICsgdmVyc2lvbik7XHJcblx0fVxyXG59IiwiLyoqXHJcbiAqICRBZGRCb29rbWFyayAtIG9wZW4gbmF0aXZlIEFkZCBCb29rbWFyayBtb2RhbC5cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiAkQWRkQm9va21hcmsoKSB7XHJcblxyXG5cdFF2YS5Db250ZXh0Q2xpZW50QWN0aW9uKHtcclxuXHRcdGNsaWVudEFjdGlvbjogXCJtb2RhbFwiLFxyXG5cdFx0cGFyYW06IFwiYm1cIixcclxuXHRcdG5hbWU6IFwiQUREQk1cIixcclxuXHRcdGJpbmRlcjogUXYuR2V0Q3VycmVudERvY3VtZW50KCkuYmluZGVyXHJcblx0fSk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiAkUmVtb3ZlQm9va21hcmsgLSBvcGVuIG5hdGl2ZSBSZW1vdmUgQm9va21hcmsgbW9kYWwuXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gJFJlbW92ZUJvb2ttYXJrKCkge1xyXG5cclxuXHRRdmEuQ29udGV4dENsaWVudEFjdGlvbih7XHJcblx0XHRjbGllbnRBY3Rpb246IFwibW9kYWxcIixcclxuXHRcdHBhcmFtOiBcInJlbW92ZWJtXCIsXHJcblx0XHRuYW1lOiBcIlJFTUJNXCIsXHJcblx0XHRiaW5kZXI6IFF2LkdldEN1cnJlbnREb2N1bWVudCgpLmJpbmRlclxyXG5cdH0pO1xyXG59IiwiLyoqXHJcbiAqICRTaG93RmllbGRzIC0gb3BlbiBuYXRpdmUgU2hvdyBGaWVsZHMgbW9kYWwuXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gJE5ld1NoZWV0T2JqZWN0KCkge1xyXG5cdFxyXG5cdFF2YS5NZ3IubWVudS5kb0FjdGlvbih7XHJcblx0XHR0YXJnZXQ6ICcuY3R4LW1lbnUtYWN0aW9uLU5FV1NIRUVUT0JKJ1xyXG5cdH0pO1xyXG59IiwiLyoqXHJcbiAqICRSZXBvc2l0b3J5IC0gb3BlbiBuYXRpdmUgUmVwb3NpdG9yeSBtb2RhbC5cclxuICpcclxuICogQHBhcmFtIGRlZkZpbHRlciB7bnVtYmVyfSAwLTMgLSBEZXByZWNhdGVkLlxyXG4gKiBAcGFyYW0gY2FsbGJhY2sge2Z1bmN0aW9ufSBDYWxsYmFjayBmdW5jdGlvbi4gLSBEZXByZWNhdGVkLlxyXG4gKlxyXG4gKiBAbm90ZSBSZXBvIGNhbiBiZSBvcGVuZWQgb25seSB3aXRoIGZha2UgcmVxdWVzdCB0byBRbGlrVmlldyBBU1AuTkVUIENsaWVudC5cclxuICogICAgICBSZWFzb24gaXMgcmVtb3RlIHJlcG9zaXRvcnksIFFsaWtWaWV3IG9wZW4gcmVwb3NpdG9yeSBvbmx5IGFmdGVyIEFTUC5ORVQgUWxpa1ZpZXcgY2xpZW50IHJlcXVlc3QuXHJcbiAqICAgICAgV2UgYWx3YXlzIGhhdmUgalF1ZXJ5LlxyXG4gKiBAdXJsIGh0dHBzOi8vY29tbXVuaXR5LnFsaWsuY29tL2RvY3MvRE9DLTI2MzlcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiAkT3BlblJlcG9zaXRvcnkoKSB7XHJcblxyXG5cdC8qKlxyXG5cdCAqICBEZXByZWNhdGVkIHZlcnNpb24uXHJcblx0ICpcclxuXHJcblx0IGxldCBiaW5kZXIgPSBRdi5HZXRDdXJyZW50RG9jdW1lbnQoKS5iaW5kZXIsXHJcblx0XHQgbWFyayA9IGJpbmRlci5NYXJrLFxyXG5cdFx0IHN0YW1wID0gYmluZGVyLlN0YW1wLFxyXG5cdFx0IHZpZXcgPSBiaW5kZXIuVmlldyxcclxuXHRcdCByZXBvRmlsdGVyID0gZGVmRmlsdGVyID4gMyAmJiBkZWZGaWx0ZXIgPCAwID8gMCA6IGRlZkZpbHRlcjtcclxuXHJcblx0IGxldCBpbml0UmVwb0RhdGEgPSBgPHVwZGF0ZVxyXG5cdCBtYXJrPVwiYCsgbWFyayArYFwiXHJcblx0IHN0YW1wPVwiYCsgc3RhbXAgK2BcIlxyXG5cdCBjb29raWU9XCJ0cnVlXCJcclxuXHQgc2NvcGU9XCJEb2N1bWVudFwiXHJcblx0IHZpZXc9XCJgKyB2aWV3ICtgXCJcclxuXHQgaWRlbnQ9XCJudWxsXCI+XHJcblx0IDxzZXQgbmFtZT1cIkRvY3VtZW50LlN0YW5kYXJkQWN0aW9ucy5SRVBPU0lUT1JZXCIgYWN0aW9uPVwiXCIgY2xpZW50c2l6ZVdIPVwiXCIgcG9zaXRpb249XCJcIiBjdXJzb3I9XCJcIiAvPlxyXG5cdCA8L3VwZGF0ZT5gLFxyXG5cdCBzaG93UmVwb0RhdGEgPSBgPHVwZGF0ZVxyXG5cdCBtYXJrPVwiYCsgbWFyayArYFwiXHJcblx0IHN0YW1wPVwiYCsgc3RhbXAgK2BcIlxyXG5cdCBjb29raWU9XCJ0cnVlXCJcclxuXHQgc2NvcGU9XCJEb2N1bWVudFwiXHJcblx0IHZpZXc9XCJgKyB2aWV3ICtgXCJcclxuXHQgaWRlbnQ9XCJudWxsXCI+XHJcblx0IDxzZXQgbmFtZT1cIkRvY3VtZW50LlRPT0xTXFxcXFJFUE9TSVRPUlkuRmlsdGVyXCJcclxuXHQgdmFsdWU9XCJgKyByZXBvRmlsdGVyICtgXCIgLz5cclxuXHQgPC91cGRhdGU+YDtcclxuXHJcblxyXG5cdCBsZXQgaW5pdFJlcG9zaXRvcnkgPSAoKSA9PiB7XHJcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG5cdFx0XHQkLmFqYXgoe1xyXG5cdFx0XHRcdHVybDogJy9RdkFqYXhaZmMvUXZzVmlld0NsaWVudC5hc3B4P21hcms9JyArIG1hcmsgKyAnJnZpZXc9JyArIHZpZXcsXHJcblx0XHRcdFx0ZGF0YTogaW5pdFJlcG9EYXRhLFxyXG5cdFx0XHRcdHR5cGU6ICdQT1NUJyxcclxuXHRcdFx0XHRjb250ZW50VHlwZTogXCJ0ZXh0L3BsYWluO2NoYXJzZXQ9VVRGLThcIixcclxuXHRcdFx0XHRkYXRhVHlwZTogXCJ0ZXh0XCIsXHJcblx0XHRcdFx0c3VjY2VzcygpIHtcclxuXHRcdFx0XHRcdHJlc29sdmUoKTtcclxuXHRcdFx0XHR9LFxyXG5cdFx0XHRcdGVycm9yKCkge1xyXG5cdFx0XHRcdFx0cmVqZWN0KCk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KTtcclxuXHRcdH0pO1xyXG5cdH07XHJcblxyXG5cdCBsZXQgc2hvd1JlcG9zaXRvcnkgPSAoKSA9PiB7XHJcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG5cdFx0XHQkLmFqYXgoe1xyXG5cdFx0XHRcdHVybDogJy9RdkFqYXhaZmMvUXZzVmlld0NsaWVudC5hc3B4P21hcms9JyArIG1hcmsgKyAnJnZpZXc9JyArIHZpZXcsXHJcblx0XHRcdFx0ZGF0YTogc2hvd1JlcG9EYXRhLFxyXG5cdFx0XHRcdHR5cGU6ICdQT1NUJyxcclxuXHRcdFx0XHRjb250ZW50VHlwZTogXCJ0ZXh0L3BsYWluO2NoYXJzZXQ9VVRGLThcIixcclxuXHRcdFx0XHRkYXRhVHlwZTogXCJ0ZXh0XCIsXHJcblx0XHRcdFx0c3VjY2VzcygpIHtcclxuXHRcdFx0XHRcdHJlc29sdmUoKTtcclxuXHRcdFx0XHR9LFxyXG5cdFx0XHRcdGVycm9yKCkge1xyXG5cdFx0XHRcdFx0cmVqZWN0KCk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KTtcclxuXHRcdH0pO1xyXG5cdH07XHJcblxyXG5cdCBQcm9taXNlLmFsbChbXHJcblx0IGluaXRSZXBvc2l0b3J5KCksXHJcblx0IHNob3dSZXBvc2l0b3J5KClcclxuXHQgXSkudGhlbigoKSA9PiB7XHJcblx0XHRpZiAodHlwZW9mIGNhbGxiYWNrID09ICdmdW5jdGlvbicpe1xyXG5cdFx0XHRyZXR1cm4gY2FsbGJhY2soKVxyXG5cdFx0fVxyXG5cdH0pXHJcblx0ICovXHJcblxyXG5cdFF2YS5NZ3IubWVudS5kb0FjdGlvbih7XHJcblx0XHR0YXJnZXQ6ICcuY3R4LW1lbnUtYWN0aW9uLVJFUE9TSVRPUlknXHJcblx0fSk7XHJcbn0iLCIvKipcclxuICogJFNob3dGaWVsZHMgLSBvcGVuIG5hdGl2ZSBTaG93IEZpZWxkcyBtb2RhbC5cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiAkU2hvd0ZpZWxkcygpIHtcclxuXHRcclxuXHRRdmEuTWdyLm1lbnUuZG9BY3Rpb24oe1xyXG5cdFx0dGFyZ2V0OiAnLmN0eC1tZW51LWFjdGlvbi1TSE9XRklFTERTJ1xyXG5cdH0pO1xyXG59Il19
