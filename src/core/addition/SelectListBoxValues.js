/**
 * @name SelectListBoxValues {function}
 * Recursive selection values in listBox.
 *
 * @note Works only with available listBoxes.
 * 
 * @param listBoxArray {Array} - array of listBoxes and selections.
 * @param index {number} - starter index for selections
 * @param afterFn {function} - callback after selections will be done.
 */
export let SelectListBoxValues = (listBoxArray, index, afterFn) => {
	if (index < listBoxArray.length){
		qva.GetQvObject(listBoxArray[index].name,
			function () {
				this.callbackFn = function () {};
				this.Data.SelectTexts(listBoxArray[index].values);
				index ++;
				SelectListBoxValues(listBoxArray, index, afterFn);
			},
			this);
	}else if (index === listBoxArray.length){
		if (typeof afterFn === 'function')
			return afterFn();
	}
};