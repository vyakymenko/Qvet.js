/**
 * @name $AddBookmarkQva {function}
 * Open native Add Bookmark modal via {Qva.binder}.
 */
export function $AddBookmarkQva() {

	Qva.ContextClientAction({
		clientAction: "modal",
		param: "bm",
		name: "ADDBM",
		binder: Qv.GetCurrentDocument().binder
	});
}

/**
 * @name $RemoveBookmarkQva {function}
 * Open native Remove Bookmark modal via {Qva.binder}.
 */
export function $RemoveBookmarkQva() {

	Qva.ContextClientAction({
		clientAction: "modal",
		param: "removebm",
		name: "REMBM",
		binder: Qv.GetCurrentDocument().binder
	});
}