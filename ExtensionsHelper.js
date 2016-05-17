import OpenNativeAddBookmark from './lambdas/OpenNativeAddBookmark';
import OpenNativeRemoveBookmark from './lambdas/OpenNativeRemoveBookmark';

/**
 * Each Lambda Export
 *
 * @note - Who like to export only what he need!
 */
export let $openAddBookmark = OpenNativeAddBookmark;
export let $openRemoveBookmark = OpenNativeRemoveBookmark;

/**
 * Full Export QlikView Tricks
 *
 * @type QlikViewTricks {Object}
 * @type {{$openAddBookmark: Function, $openRemoveBookmark: Function}}
 */
export let QlikViewTricks = {
	"$openAddBookmark": OpenNativeAddBookmark,
	"$openRemoveBookmark": OpenNativeRemoveBookmark
};