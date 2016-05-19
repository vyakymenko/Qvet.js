/**
 * @note All actions with available ToolBar.
 *
 * $('#QvAjaxToolbar');
 */

import {$QvaToolbarAction} from '../util/Util';

/**
 * @name $ShowFields {function}
 * Open native Show Fields modal.
 */
export function $AddBookmark() {
	$QvaToolbarAction('ADDBM');
}

/**
 * @name $ShowFields {function}
 * Open native Show Fields modal.
 */
export function $RemoveBookmark() {
	$QvaToolbarAction('REMBM');
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
}

/**
 * @name $Repository
 * Open native Repository modal.
 */
export function $ShowFields() {
	$QvaToolbarAction('SHOWFIELDS');
}