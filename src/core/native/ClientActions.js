/**
 * @name $callClientAction {function}
 * @note Open client action modal for remove or add bookmark.
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
 * @name $removeBookmark {function}
 * @note Open remove bookmark modal window.
 *
 * @return {void}
 */
export function $removeBookmark () {
  $callClientAction(`REMBM`, `removebm`);
}

/**
 * @name $addBookmark {function}
 * @note Open add bookmark modal window.
 *
 * @return {void}
 */
export function $addBookmark () {
  $callClientAction(`ADDBM`, `bm`);
}
