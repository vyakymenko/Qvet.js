/**
 * @name SelectListBoxValues {function}
 * Recursive selection values in listBox.
 *
 * @note Works only with available listBoxes.
 * 
 * @param listBoxArray {Array}
 * @param index {number}
 */
export let SelectListBoxValues = (listBoxArray, index) => {
	if (index < listBoxArray.length){
		qva.GetQvObject(listBoxArray[index].name,
			function () {
				this.callbackFn = function () {};
				this.Data.SelectTexts(listBoxArray[index].values);
				index ++;
				SelectListBoxValues(listBoxArray, index);
			},
			this);
	}
};