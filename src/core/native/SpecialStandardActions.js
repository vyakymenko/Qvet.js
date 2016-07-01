/**
 * @name Call Special StandardAction
 * @note Call special standard action for open repository,
 *  create new sheet object or show fields.
 *
 * @param actionName {string} - Action name
 * `NEWSHEETOBJ`, `REPOSITORY`, `SHOWFIELDS`.
 *
 * @return {function}
 */
export function $callSpecialStandardAction(actionName) {
  return Qv.GetCurrentDocument().binder.SimpleCall(
    `set`,
    `Document.StandardActions.${actionName.toUpperCase()}`,
    null,
    {
      action: ``
    });
}

/**
 * @name Open Repository.
 * @note Open repository modal window.
 *
 * @return {void}
 */
export function $openRepository() {
  $callSpecialStandardAction(`repository`);
}
