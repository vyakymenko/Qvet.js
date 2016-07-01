const version = '1.0.0';

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
  $removeBookmark, $addBookmark
} from './native/index';

/**
 * Development.
 */
import {$AddBookmarkQva, $RemoveBookmarkQva} from './development/Bookmarks';
import {$OpenRepositoryAjax} from './development/Repository';

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

		this.development = {
			$openRepository: $OpenRepositoryAjax
		};

    // native
    this.$addBookmark = $addBookmark;
    this.$removeBookmark = $removeBookmark;

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
