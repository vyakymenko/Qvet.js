/**
 * @name selectListBoxValues
 * Recursive selection values in listBox.
 *
 * @note Works only with available listBoxes.
 *
 * @param listBoxArray {Array} - array of listBoxes and values.
 * @param index {number} - starter index for selections.
 * @param cb {function} - callback after all vales will be selected.
 *
 * @return {void|function}
 */
export function selectListBoxValues (listBoxArray, index, cb) {
  if (index < listBoxArray.length){
    if (listBoxArray[index].listbox_name != null){
      qva.GetQvObject(listBoxArray[index].listbox_name,
        function () {
          this.callbackFn = function () {};
          this.Data.SelectTexts(listBoxArray[index].desc_value);
          index ++;
          selectListBoxValues(listBoxArray, index, cb);
        },
        this);
    }else{
      index ++;
      selectListBoxValues(listBoxArray, index, cb);
    }
  }else if (index === listBoxArray.length){
    if (typeof cb === `function`)
      return cb();
  }
}
