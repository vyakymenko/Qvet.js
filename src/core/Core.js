const version = '1.0.0';

/**
 * Native.
 */
import {
	$AddBookmark, $RemoveBookmark, $EmailBookmark,
	$NewSheetObject,
	$OpenRepository,
	$ShowFields
} from './native/ToolbarActions';

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

		// TODO: Dev versions for Qva and $.ajax when toolbar not initialized.
		this.development = {
			bookmarks: {
				$add: $AddBookmarkQva,
				$remove: $RemoveBookmarkQva
			},
			$openRepository: $OpenRepositoryAjax
		};

    this.selectListBoxValues = selectListBoxValues;
	}


	getVersion(){
		console.log(`Qvet Core version: ${version}`);
	}

	sendEmailBookmark(config, extraParams){
		return new EmailBookmark(config, extraParams).createBookmark().openEmailWindow();
	}
}
