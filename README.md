# Qvet.js

[![Join the chat at https://gitter.im/vyakymenko/Qvet.js](https://badges.gitter.im/vyakymenko/Qvet.js.svg)](https://gitter.im/vyakymenko/Qvet.js?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

Qvet is a QlikView Extension Trickster library wich help you to use native QlikView methods and cool additional features in your extensions. It give for you accessible for native QlikView methods like open repository pop-up window, add bookmark pop-up, remove bookmark pop-up that we have in toolbar and more. You can use Qvet in your Object and Document extensions.

What you can with Qvet:
  - Use all native toolbar actions and run them in your extensions.
  - Use interesting functionality for QlikView Extensions.

### Version
0.0.5

### Tech

Qvet uses a number of open source projects to work properly:

* [node.js] - evented I/O for the backend
* [Gulp] - the streaming build system
* [Browserify] - awesome bundler

### Installation
For development you need Gulp and Browserify installed globally:

```sh
$ npm i -g gulp browserify
```

or you can download the latest version from "dist" folder.

### Hot to use

Download the latest version of Qvet, and copy it to your extension folder.
Load Qvet in your extension for using it.

```javascript
var extPath = '/QvAjaxZfc/QvsViewClient.aspx?public=only&name=Extensions/MyExtension';

    Qva.LoadScript(extPath+'/Qvet.js', loadExt);

    function loadExt(){
        Qva.AddExtension("MyExtension", function(){
            Qvet.getVersion();

            // .... Qvet Works!
        })
    }
```

Warning Qvet "NATIVE" was tested with working toolbar!
If the toolbar is not working for your QlikView document, Qvet "NATIVE" will not work!

#### Documentation

#### Native
QlikView Add Bookmark Native Modal Open
```javascript
    Qvet.native.bookmarks.$add();
```
QlikView Remove Bookmark Native Modal Open
```javascript
    Qvet.native.bookmarks.$remove();
```
QlikView Email Bookmark Native
```javascript
    Qvet.native.bookmarks.$email();
```
QlikView Repository Native Modal Open
```javascript
    Qvet.native.$openRepository();
```
QlikView ShowFields Native Modal Open
```javascript
    Qvet.native.$showFields();
```
QlikView NewSheetObject Native Modal Open
```javascript
    Qvet.native.$newSheetObject();
```

#### Addition
QlikView Send Bookmark via Email
```javascript
    // Without configuration.
    Qvet.sendEmailBookmark();

    // With configuration.
    Qvet.sendEmailBookmark({
		emailSubject: "Your Subject",
		name: "Your Bookmark Name", /** Name of the bookmark. */
		shared: true, /** Share the bookmark with other users. */
		excludeSelections: false, /** Exclude the selections made in the application. */
		includeState: true, /** Include state of all objects. */
		notDisplayed: false, /** The bookmark is not displayed in the bookmark list but is still selectable in code or via url. */
		descriptionShow: false, /** The bookmark description will be shown in a message when the bookmark is selected. */
		descriptionMsg: "", /** Description of the bookmark. */
		saveInputValues: true /** Include values in input fields.*/
	})
    // Extra params.
    Qvet.sendEmailBookmark({
    		emailSubject: "Your Subject",
    		name: "Your Bookmark Name", /** Name of the bookmark. */
    		shared: true, /** Share the bookmark with other users. */
    		excludeSelections: false, /** Exclude the selections made in the application. */
    		includeState: true, /** Include state of all objects. */
    		notDisplayed: false, /** The bookmark is not displayed in the bookmark list but is still selectable in code or via url. */
    		descriptionShow: false, /** The bookmark description will be shown in a message when the bookmark is selected. */
    		descriptionMsg: "", /** Description of the bookmark. */
    		saveInputValues: true /** Include values in input fields.*/
    	},{
    	    emailWindowMode: false /** By default bookmark will open email in new window, but you can change it to {false} and email window will be opened on same domain. */
        })
```

QlikView Select Values in ListBoxes
```javascript
    // 
    Qvet.SelectListBoxValues([
        {
            name: 'YourListBoxId1',
            values: [
                "Your listbox first value",
                "Your listbox second value"
            ]
        },{
            name: 'YourListBoxId2',
            values: [
                "Your listbox first value",
                "Your listbox second value"
            ]
        }
    ],
    0, // We can start make selections from any index.  
    function(){
        console.log('We like QlikView with Qvet!'); // It's our callback!
    })
```

### Important to know!
> All native methods for QlikView have a $ symbol.

> All non-native methods will not have a $.

### Development

Want to contribute? Great!

Qvet uses Gulp + Browserify for fast developing.
Make a change in your file and instantanously see your updates!

Open your favorite Terminal and run these command.

```sh
$ gulp
```

### Todos

 - Write all other native methods
 - Write new features
 - Add Code Comments

License
----

MIT

   [node.js]: <https://nodejs.org>
   [Gulp]: <http://gulpjs.com>
   [Browserify]: <http://browserify.org/>