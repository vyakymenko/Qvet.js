/**
 * @name $OpenRepositoryAjax {function}
 * Open native Repository modal via $.ajax.
 *
 * @param defFilter {number} 0-3 - Deprecated.
 * @param callback {function} Callback function. - Deprecated.
 *
 * @note Repo can be opened only with fake request to QlikView ASP.NET Client.
 *      Reason is remote repository, QlikView open repository only after ASP.NET QlikView client request.
 *      We always have jQuery.
 * @url https://community.qlik.com/docs/DOC-2639
 */
export function $OpenRepositoryAjax(defFilter, callback) {

	 let binder = Qv.GetCurrentDocument().binder,
		 mark = binder.Mark,
		 stamp = binder.Stamp,
		 view = binder.View,
		 repoFilter = defFilter > 3 && defFilter < 0 ? 0 : defFilter;

	 let initRepoData = `<update
	        mark="`+ mark +`"
	        stamp="`+ stamp +`"
	        cookie="true"
	        scope="Document"
	        view="`+ view +`"
	        ident="null">
	            <set name="Document.StandardActions.REPOSITORY" action="" clientsizeWH="" position="" cursor="" />
	        </update>`,
	 showRepoData = `<update
	        mark="`+ mark +`"
	        stamp="`+ stamp +`"
	        cookie="true"
	        scope="Document"
	        view="`+ view +`"
	        ident="null">
	            <set name="Document.TOOLS\\REPOSITORY.Filter"
	            value="`+ repoFilter +`" />
	        </update>`;


	 let initRepository = () => {
		return new Promise((resolve, reject) => {
			$.ajax({
				url: '/QvAjaxZfc/QvsViewClient.aspx?mark=' + mark + '&view=' + view,
				data: initRepoData,
				type: 'POST',
				contentType: "text/plain;charset=UTF-8",
				dataType: "text",
				success() {
					resolve();
				},
				error() {
					reject();
				}
			});
		});
	};

	 let showRepository = () => {
		return new Promise((resolve, reject) => {
			$.ajax({
				url: '/QvAjaxZfc/QvsViewClient.aspx?mark=' + mark + '&view=' + view,
				data: showRepoData,
				type: 'POST',
				contentType: "text/plain;charset=UTF-8",
				dataType: "text",
				success() {
					resolve();
				},
				error() {
					reject();
				}
			});
		});
	};

	 Promise.all([
	 initRepository(),
	 showRepository()
	 ]).then(() => {
		if (typeof callback == 'function'){
			return callback()
		}
	})
}