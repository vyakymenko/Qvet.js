/**
 * @name Call ClientContext Action
 * @note Open client action modal for remove or add bookmark.
 * @dependencies Qva - QlikView assistant manager.
 *
 * @param actionName {string} - Action name `ADDBM` or `REMBM`.
 * @param paramName {string} - Param name `bm` or `rembm`.
 *
 * @return {function}
 */
export function $callClientAction (actionName, paramName) {
  return Qva.ContextClientAction({
    clientAction: `modal`,
    param: paramName.toLowerCase(),
    name: actionName.toUpperCase(),
    binder: Qv.GetCurrentDocument().binder
  });
}

/**
 * @name Remove Bookmark.
 * @note Open remove bookmark modal window.
 * @dependencies `$callClientAction`
 *
 * @return {void}
 */
export function $removeBookmark () {
  $callClientAction(`REMBM`, `removebm`);
}

/**
 * @name Add Bookmark.
 * @note Open add bookmark modal window.
 * @dependencies `$callClientAction`
 *
 * @return {void}
 */
export function $addBookmark () {
  $callClientAction(`ADDBM`, `bm`);
}
