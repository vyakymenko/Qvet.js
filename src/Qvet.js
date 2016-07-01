import { QvetCore } from './core/Core';

(function(window){
	if (typeof Qva === 'undefined'
		&& typeof jQuery === 'undefined'
		&& typeof qva === 'undefined'
	){
		console.log("Can't init Qvet because Qva/jQuery/qva is undefined")
	}else{
		if(typeof(Qvet) === 'undefined'){
			window.Qvet = new QvetCore();
		} else{
			console.log("Qvet already defined.");
		}
	}
})(window);
