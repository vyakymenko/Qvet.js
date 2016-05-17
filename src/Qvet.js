import {QvetCore} from './core/Core';

(function(window){
	if(typeof(Qvet) === 'undefined'){
		window.Qvet = new QvetCore();
	} else{
		console.log("Qvet already defined.");
	}
})(window);