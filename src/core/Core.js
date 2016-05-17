import {$AddBookmark, $RemoveBookmark} from './native/Bookmarks';
import {$OpenRepository} from './native/Repository';

export class QvetCore {
	constructor(){
		// this.native.bookmarks = {
		// 	$add: $AddBookmark,
		// 	$remove: $RemoveBookmark
		// };
		// this.native.$openRepository = $OpenRepository;
		this.native = {
			bookmarks:{
				$add: $AddBookmark,
				$remove: $RemoveBookmark
			},
			$openRepository(defaultFilter, fn){
				$OpenRepository(defaultFilter, fn)
			}
		}
	}

	// native = {
	// 	bookmarks:{
	// 		$add: $AddBookmark,
	// 		$remove: $RemoveBookmark
	// 	},
	// 	$openRepository(defaultFilter, fn){
	// 		$OpenRepository(defaultFilter, fn)
	// 	}
	// }
}