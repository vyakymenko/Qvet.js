/**
 * QlikView Extensions Trickster
 *
 * @version: 0.0.1-alpha
 * @author: Valentyn Yakymenko
 */
import {QvetCore} from './core/Core';

(function(window){
	if(typeof(Qvet) === 'undefined'){
		window.Qvet = new QvetCore();
	} else{
		console.log("Qvet already defined.");
	}
})(window);