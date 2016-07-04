/**
 * @name $callSpecialStandardAction {function}
 * @note Call special standard action for open repository,
 *  create new sheet object or show fields.
 *
 * @param actionName {string} - Action name depend on `Qva.Mgr.menu.specialActions`.
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
 * @name $openRepository {function}
 * @note Open repository modal window.
 *
 * @return {void}
 */
export function $openRepository() {
  $callSpecialStandardAction(`repository`);
}

/**
 * @name $openNewSheetObject {function}
 * @note Open new sheet object modal window.
 *
 * @return {void}
 */
export function $newSheetObject() {
  $callSpecialStandardAction(`newSheetObj`);
}

/**
 * @name $openShowFields {function}
 * @note Open show fields modal window.
 *
 * @return {void}
 */
export function $showFields() {
  $callSpecialStandardAction(`showFields`);
}
