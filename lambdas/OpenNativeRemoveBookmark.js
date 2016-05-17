/**
 * Open native "Remove Bookmark" modal window.
 *
 * @Qva - QlikView Manager (QvAjax.js)
 * @Qv - QlikView Document Manager (QvAjax.js)
 * @note - Can be used only for QlikView extensions Objects/Document.
 */
export default () => {

	Qva.ContextClientAction({
		clientAction: "modal",
		param: "removebm",
		name: "REMBM",
		binder: Qv.GetCurrentDocument().binder
	});
};