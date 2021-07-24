    
    var dataLocalStorage = JSON.parse(window.localStorage.getItem("resultNodes"));
    var kvecinosVector = JSON.parse(window.localStorage.getItem("kvecinosVector"));
    
	console.log("LocalStorage-Nodos Encontrados:",dataLocalStorage[0]);
	console.log("LocalStorage-Nodos Encontrados:",kvecinosVector[0][33]);
	
	for(var i=0; i<dataLocalStorage.length; i++){
		data_nom.push(dataLocalStorage[i].obj.movie_name);
		data_dur.push(dataLocalStorage[i].obj.Duration);
		data_yea.push(dataLocalStorage[i].obj.year);
		data_gen.push(dataLocalStorage[i].obj.genre);
		data_dir.push(dataLocalStorage[i].obj.director);
		data_act.push(dataLocalStorage[i].obj.actors);
		data_cou.push(dataLocalStorage[i].obj.country);
		data_rat.push(dataLocalStorage[i].obj.rating);
		data_ent.push(dataLocalStorage[i].obj.enter_in_netflix);
	}