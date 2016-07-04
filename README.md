# Introduction to Qvet.js

[![Build Status](https://travis-ci.org/vyakymenko/Qvet.js.svg?branch=master)](https://travis-ci.org/vyakymenko/Qvet.js)
[![Build status](https://ci.appveyor.com/api/projects/status/rkarsh6v33hpu5ec?svg=true)](https://ci.appveyor.com/project/vyakymenko/qvet-js)
[![MIT license](http://img.shields.io/badge/license-MIT-brightgreen.svg)](http://opensource.org/licenses/MIT)
[![Dependency Status](https://david-dm.org/vyakymenko/Qvet.js.svg)](https://david-dm.org/vyakymenko/Qvet.js)
[![devDependency Status](https://david-dm.org/vyakymenko/Qvet.js/dev-status.svg)](https://david-dm.org/vyakymenko/Qvet.js#info=devDependencies)


Qvet is a QlikView Extension Trickster library wich help you to use native QlikView methods and cool additional features in your extensions. 
It give for you accessible for native QlikView methods like open repository pop-up window, add bookmark pop-up, remove bookmark pop-up that we have in toolbar and more. 
You can use Qvet in your Object and Document extensions.

What you can with Qvet:
  - Use all native toolbar actions and run them in your extensions.
  - Use interesting functionality for QlikView Extensions.

# Version
1.0.1

# Installation

Download the latest version from "dist" folder.

# Hot to use

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

> Only for v. 1.0.0 and lower. 
> > Warning Qvet "NATIVE" was tested with working toolbar!
If the toolbar is not working for your QlikView document, Qvet "NATIVE" will not work!

## Documentation

### Native
QlikView Add Bookmark Native Modal Open
```javascript
    Qvet.$addBookmark();
```
QlikView Remove Bookmark Native Modal Open
```javascript
    Qvet.$removeBookmark();
```
QlikView Repository Native Modal Open
```javascript
    Qvet.$repository();
```
QlikView NewSheetObject Native Modal Open
```javascript
    Qvet.$newSheetObject();
```
QlikView ShowFields Native Modal Open
```javascript
    Qvet.$showFields();
```

### Addition
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
    Qvet.sendEmailBookmark('',{
    	    emailWindowMode: false /** By default {false} bookmark will open email in new window, but you can change it to {true} and email window will be opened on same domain. */
        })
```

QlikView Select Values in ListBoxes
```javascript
    // selectListBoxValues 
    Qvet.selectListBoxValues([
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

### Hint's and tricks.

> Q. How to understand where is native hidden QlikView actions ?
>> A. All native methods using *$* character.

> Q. How to understand where is addition hidden QlikView actions ?
>> A. All non-native methods will not have a *$* character.

## License

MIT
