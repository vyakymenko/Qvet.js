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
		if (listBoxArray[index].listbox_name != null){
			qva.GetQvObject(listBoxArray[index].listbox_name,
				function () {
					this.callbackFn = function () {};
					this.Data.SelectTexts(listBoxArray[index].desc_value);
					index ++;
					SelectListBoxValues(listBoxArray, index, afterFn);
				},
				this);
		}else{
			index ++;
			SelectListBoxValues(listBoxArray, index, afterFn);
		}
	}else if (index === listBoxArray.length){
		if (typeof afterFn === 'function')
			return afterFn();
	}
};