# Qvet

Qvet is a QlikView Extensin Trickster wich help you to use native QlikView methods in your extensions. It give for you accessible for native QlikView methods like open repository pop-up window, add bookmark pop-up, remove bookmark pop-up that we have in toolbar and more.

Waht you can with Qvet:
  - Use all native toolbar actions and run them in your extensions.

### Version
0.0.1-alpha

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

### Warning alpha version was tested with working toolbar!
#### Documentation

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

### Important to know!
>> All native methods for qlik have a $ symbol.

>> All non-native methods will not have a $.

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
