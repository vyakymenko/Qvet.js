/**
 * Type Validator
 * 
 * @param variable {object|boolean|string|number|function}
 * @param type {string}
 */
export function $tv(variable, type){
	return typeof variable === type;
}