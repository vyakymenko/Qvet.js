const version = require('../../package.json').version;

/**
 * Native.
 */
import {
	$AddBookmark, $RemoveBookmark, $EmailBookmark,
	$NewSheetObject,
	$OpenRepository,
	$ShowFields
} from './native/ToolbarActions_deprecated';

import {
  $removeBookmark, $addBookmark,
  $openRepository
} from './native/index';

/**
 * Addition.
 */
import { EmailBookmark, selectListBoxValues } from './addition/index';

export class QvetCore {

	constructor(){
		this.native = {
			bookmarks:{
				$add: $AddBookmark,
				$remove: $RemoveBookmark,
				$email: $EmailBookmark
			},
			$openRepository: $OpenRepository,
			$showFields: $ShowFields,
			$newSheetObject: $NewSheetObject
		};

    // native
    this.$addBookmark = $addBookmark;
    this.$removeBookmark = $removeBookmark;
    this.$openRepository = $openRepository;

    // addition
    this.selectListBoxValues = selectListBoxValues;
	}


	getVersion(){
		console.log(`Qvet Core version: ${version}`);
	}

	sendEmailBookmark(config, extraParams){
		return new EmailBookmark(config, extraParams).createBookmark().openEmailWindow();
	}
}
