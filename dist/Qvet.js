!function e(n,t,o){function r(a,u){if(!t[a]){if(!n[a]){var c="function"==typeof require&&require;if(!u&&c)return c(a,!0);if(i)return i(a,!0);var s=new Error("Cannot find module '"+a+"'");throw s.code="MODULE_NOT_FOUND",s}var f=t[a]={exports:{}};n[a][0].call(f.exports,function(e){var t=n[a][1][e];return r(t?t:e)},f,f.exports,e,n,t,o)}return t[a].exports}for(var i="function"==typeof require&&require,a=0;a<o.length;a++)r(o[a]);return r}({1:[function(e,n,t){"use strict";var o=e("./core/Core");!function(e){"undefined"==typeof Qvet?e.Qvet=new o.QvetCore:console.log("Qvet already defined.")}(window)},{"./core/Core":2}],2:[function(e,n,t){"use strict";function o(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0}),t.QvetCore=void 0;var r=e("./native/Bookmarks"),i=e("./native/Repository");t.QvetCore=function a(){o(this,a),this["native"]={bookmarks:{$add:r.$AddBookmark,$remove:r.$RemoveBookmark},$openRepository:function(e,n){(0,i.$OpenRepository)(e,n)}}}},{"./native/Bookmarks":3,"./native/Repository":4}],3:[function(e,n,t){"use strict";function o(){return Qva.ContextClientAction({clientAction:"modal",param:"bm",name:"ADDBM",binder:Qv.GetCurrentDocument().binder}),this}function r(){return Qva.ContextClientAction({clientAction:"modal",param:"removebm",name:"REMBM",binder:Qv.GetCurrentDocument().binder}),this}Object.defineProperty(t,"__esModule",{value:!0}),t.$AddBookmark=o,t.$RemoveBookmark=r},{}],4:[function(e,n,t){"use strict";function o(e,n){var t=Qv.GetCurrentDocument().binder,o=t.Mark,r=t.Stamp,i=t.View,a=e>3&&0>e?0:e,u='<update\n					mark="'+o+'"\n					stamp="'+r+'"\n					cookie="true"\n					scope="Document"\n					view="'+i+'"\n					ident="null">\n						<set name="Document.StandardActions.REPOSITORY" action="" clientsizeWH="" position="" cursor="" />\n					</update>',c='<update \n					mark="'+o+'" \n					stamp="'+r+'" \n					cookie="true" \n					scope="Document" \n					view="'+i+'" \n					ident="null">\n						<set name="Document.TOOLS\\REPOSITORY.Filter" \n						value="'+a+'" />\n					</update>',s=function(){return new Promise(function(e,n){$.ajax({url:"/QvAjaxZfc/QvsViewClient.aspx?mark="+o+"&view="+i,data:u,type:"POST",contentType:"text/plain;charset=UTF-8",dataType:"text",success:function(){e()},error:function(){n()}})})},f=function(){return new Promise(function(e,n){$.ajax({url:"/QvAjaxZfc/QvsViewClient.aspx?mark="+o+"&view="+i,data:c,type:"POST",contentType:"text/plain;charset=UTF-8",dataType:"text",success:function(){e()},error:function(){n()}})})};Promise.all([s(),f()]).then(function(){return"function"==typeof n?n():void 0})}Object.defineProperty(t,"__esModule",{value:!0}),t.$OpenRepository=o},{}]},{},[1]);