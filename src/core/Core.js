const version = '0.0.1-alpha';

/**
 * Native.
 */
import {$AddBookmark, $RemoveBookmark} from './native/Bookmarks';
import {$OpenRepository} from './native/Repository';
import {$ShowFields} from './native/ShowFields';
import {$NewSheetObject} from './native/NewSheetObject';

/**
 * Addition.
 */
import {EmailBookmark} from './bookmark/EmailBookmark';	

export class QvetCore {
	constructor(){

		this.native = {
			bookmarks:{
				$add: $AddBookmark,
				$remove: $RemoveBookmark
			},
			$openRepository: $OpenRepository,
			$showFields: $ShowFields,
			$newSheetObject: $NewSheetObject
		};
	}

	getVersion(){
		return console.log('Qvet version: ' + version);
	}

	sendEmailBookmark(config, extraParams){
		return new EmailBookmark(config, extraParams).createBookmark().openEmailWindow();
	}
}