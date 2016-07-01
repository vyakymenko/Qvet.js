/**
 * @note All actions with available ToolBar.
 *
 * $('#QvAjaxToolbar');
 */

import { $QvaToolbarAction } from '../util/Util';

/**
 * @name $ShowFields {function}
 * Open native Show Fields modal.
 */
export function $AddBookmark() {
	$QvaToolbarAction('ADDBM');
  console.log(`Qvet: 'native.bookmarks.$add' is deprecated and will be removed in 1.1.0. Use '$addBookmark'.`)
}

/**
 * @name $ShowFields {function}
 * Open native Show Fields modal.
 */
export function $RemoveBookmark() {
	$QvaToolbarAction('REMBM');
  console.log(`Qvet: 'native.bookmarks.$remove' is deprecated and will be removed in 1.1.0. Use '$addBookmark'.`)
}

/**
 * @name $ShowFields {function}
 * Open native Show Fields modal.
 */
export function $EmailBookmark() {
	$QvaToolbarAction('MAILASLINK');
}

/**
 * @name $ShowFields {function}
 * Open native Shown Fields modal.
 */
export function $NewSheetObject() {
	$QvaToolbarAction('NEWSHEETOBJ');
}

/**
 * @name $Repository
 * Open native Repository modal.
 */
export function $OpenRepository() {
	$QvaToolbarAction('REPOSITORY');
  console.log(`Qvet: 'native.$openRepository' is deprecated and will be removed in 1.1.0. Use '$openRepository'.`)
}

/**
 * @name $Repository
 * Open native Repository modal.
 */
export function $ShowFields() {
	$QvaToolbarAction('SHOWFIELDS');
}
