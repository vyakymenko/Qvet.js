const version = '0.0.1-alpha';

import {$AddBookmark, $RemoveBookmark} from './native/Bookmarks';
import {$OpenRepository} from './native/Repository';
import {$ShowFields} from './native/ShowFields';
import {$NewSheetObject} from './native/NewSheetObject';

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
		}
	}

	getVersion(){
		console.log('Qvet version: ' + version);
	}
}