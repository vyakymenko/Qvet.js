/**
 * Type Validator
 * 
 * @param variable {object|boolean|string|number|function}
 * @param type {string}
 */
export function $tv(variable, type){
	return typeof variable === type;
}

/**
 * QvaDoAction
 * 
 * @dependencies {Qva}
 * @param action_name {string} - Action Name, depend on Qva.createOptions.
 */
export function $QvaToolbarAction(action_name) {
	
	Qva.Mgr.menu.doAction({
		target: '.ctx-menu-action-'+action_name
	});
}