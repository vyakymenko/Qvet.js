/**
 * Email QlikView Bookmark.
 * 
 * @constructor
 */
export class EmailBookmark {
	
	
	/**
	 *  Config.
	 *
	 * @param config {object}
	 *
	 * @param config.emailSubject {string}
	 * @param config.name {string}
	 * @param config.shared {boolean}
	 * @param config.excludeSelections {boolean}
	 * @param config.includeState {boolean}
	 * @param config.notDisplayed {boolean}
	 * @param config.descriptionShow {boolean}
	 * @param config.descriptionMsg {string}
	 * @param config.saveInputValues {boolean}
	 *
	 *  Extra Params.
	 *
	 * @param extraParams {object}
	 * @param extraParams.extraUri {string}
	 * @param extraParams.emailWindowMode {boolean}
	 */
	constructor(config, extraParams) {
		
		let defaultConfig = {
			emailSubject: "",
			name: "Email Bookmark", /** Name of the bookmark. */
			shared: true, /** Share the bookmark with other users. */
			excludeSelections: false, /** Exclude the selections made in the application. */
			includeState: true, /** Include state of all objects. */
			notDisplayed: false, /** The bookmark is not displayed in the bookmark list but is still selectable in code or via url. */
			descriptionShow: false, /** The bookmark description will be shown in a message when the bookmark is selected. */
			descriptionMsg: "", /** Description of the bookmark. */
			saveInputValues: true /** Include values in input fields.*/
		};
	
		this.defaulQvAjxZfc = '/QvAJAXZfc/opendoc.htm?document=';
		
		/** The bookmark is applied on top of any previous selections (no clear).*/
		this.applied = true;
		this.doc = Qv.GetCurrentDocument();
		this.bookmarkId = '';
		
	
		/**
		 * Important params.
		 * @type {*|string}
		 */
		this.emailSubject = config.emailSubject || defaultConfig.emailSubject;
		this.name = config.name || defaultConfig.name;
		this.shared = config.shared || defaultConfig.shared;
		this.excludeSelections = config.excludeSelections || defaultConfig.excludeSelections;
		this.includeState = config.includeState || defaultConfig.includeState;
		this.notDisplayed = config.notDisplayed || defaultConfig.notDisplayed;
		this.descriptionShow = config.descriptionShow || defaultConfig.descriptionShow;
		this.descriptionMsg = config.descriptionMsg || defaultConfig.descriptionMsg;
		this.saveInputValues = config.saveInputValues || defaultConfig.saveInputValues;
	
		/**
		 * Extra params.
		 *
		 * @param extraUri {string} Use it for add parent url to your QlikView ASP.NET client.
		 * @param emailWindowMode {boolean} By default bookmark will open email in new window,
		 * but you can change it to {false} and email window will be opened on same domain.
		 */
		this.extraUri = extraParams.extraUri || '';
		this.emailWindowMode = extraParams.emailWindowMode || true;
	}


	/**
	 * Use native Bookmarks Class
	 * for create bookmark before email it.
	 *
	 * @extends {}
	 */
	createBookmark(){

		this.doc
			.Bookmarks()
			.NewBookmark(
				this.name,
				this.applied,
				this.shared,
				this.excludeSelections,
				this.includeState,
				this.notDisplayed,
				this.descriptionShow,
				this.descriptionMsg,
				this.saveInputValues
			);

		this.bookmarkId = this.doc.Bookmarks().BookMarks[this.doc.Bookmarks().BookMarks.length-1].value;
		
		return this;
	};

	openEmailWindow(){
		
		let uri = this.extraUri +
			this.defaulQvAjxZfc +
			this.doc.binder.View +
			this.bookmarkId;
		
		let uri_enc = encodeURIComponent(uri).replace(/%20/g, "%2520"),
			mailer = 'mailto:?subject='+this.emailSubject+'&body='+uri_enc;

		this.emailWindowMode ? window.location.href = mailer : location.href = mailer;
		
		return this;
	}
}