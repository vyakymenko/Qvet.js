# Qvet.js

Qvet is a QlikView Extensin Trickster wich help you to use native QlikView methods in your extensions. It give for you accessible for native QlikView methods like open repository pop-up window, add bookmark pop-up, remove bookmark pop-up that we have in toolbar and more.

What you can with Qvet:
  - Use all native toolbar actions and run them in your extensions.
  - Use interesting functionality for QlikView Exntesions.

### Version
0.0.3

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

Download latest version of Qvet, and copy it to your extension folder.
Load Qvet in your extension for use it.

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
If toolbar is not working for your QlikView document, Qvet "NATIVE" will not work!

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

### Important to know!
>> All native methods for qlik have a $ symbol.

>> All non-native methods will not have a $.

### Development

Want to contribute? Great!

Qvet uses Gulp + Browserify for fast developing.
Make a change in your file and instantanously see your updates!

Open your favorite Terminal and run these command.

```sh
$ gulp
```

### Todos

 - Write all other native methds
 - Write new features
 - Add Code Comments

License
----

MIT

   [node.js]: <https://nodejs.org>
   [Gulp]: <http://gulpjs.com>
   [Browserify]: <http://browserify.org/>
