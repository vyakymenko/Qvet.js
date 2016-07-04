/**
 * @note All actions with available ToolBar.
 * @deprecated 1.0.1
 *
 * `$('#QvAjaxToolbar');`
 */

import { $QvaToolbarAction } from '../util/Util';

/**
 * @name $AddBookmark {function}
 * @deprecated 1.0.1
 *
 * @note Open native Add Bookmark modal.
 */
export function $AddBookmark() {
	$QvaToolbarAction('ADDBM');
  console.log(`Qvet: 'native.bookmarks.$add' is deprecated and will be removed in 1.1.0. Use 'Qvet.$addBookmark'.`)
}

/**
 * @name $ShowFields {function}
 * @deprecated 1.0.1
 * @note Open native Remove Bookmark modal.
 */
export function $RemoveBookmark() {
	$QvaToolbarAction('REMBM');
  console.log(`Qvet: 'Qvet.native.bookmarks.$remove' is deprecated and will be removed in 1.1.0. Use 'Qvet.$removeBookmark'.`)
}

/**
 * @name $EmailBookmark {function}
 * @deprecated 1.0.1
 * @note Open native EmailAsLink Bookmark modal.
 */
export function $EmailBookmark() {
	$QvaToolbarAction('MAILASLINK');
  console.log(`Qvet: 'Qvet.native.bookmarks.$EmailBookmark' is deprecated and will be removed in 1.1.0`)
}

/**
 * @name $OpenRepository
 * @deprecated 1.0.1
 * @note Open native Repository modal.
 */
export function $OpenRepository() {
  $QvaToolbarAction('REPOSITORY');
  console.log(`Qvet: 'Qvet.native.$openRepository' is deprecated and will be removed in 1.1.0. Use 'Qvet.$openRepository'.`)
}

/**
 * @name $NewSheetObject {function}
 * @deprecated 1.0.1
 * @note Open native NewSheet Object modal.
 */
export function $NewSheetObject() {
	$QvaToolbarAction('NEWSHEETOBJ');
  console.log(`Qvet: 'Qvet.native.bookmarks.$remove' is deprecated and will be removed in 1.1.0. Use 'Qvet.$newSheetObject'.`)
}

/**
 * @name $ShowFields
 * @deprecated 1.0.1
 * @note Open native ShowFields modal.
 */
export function $ShowFields() {
	$QvaToolbarAction('SHOWFIELDS');
  console.log(`Qvet: 'Qvet.native.bookmarks.$remove' is deprecated and will be removed in 1.1.0. Use 'Qvet.$showFields'.`)
}
