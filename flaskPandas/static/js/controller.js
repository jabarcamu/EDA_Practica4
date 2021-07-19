//let carname = "christian"

$(document).ready(function(){
	$("#mytable tr").click(function(event){
		//console.log($(this).find('td:eq(0)').text());
		carname = $(this).find('td:eq(0)').text();
	});                                                     
});



//cargando json en un archivo que trabaja con jquery pero tambien con javascript

let root = null;
let data = [];
let particleCount = 20;

function executeKnn(){
	//buscando la primera pelicula con el kdtre armado de todas las peliculas
	var test = {
		"vector": [102, 2018, 7.0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 2, 0, 0, 1, 0, 0, 0, 0, 0, 0], 
		"obj": {"Unnamed: 0": 1, "movie_name": "#FriendButMarried", "Duration": 102, "year": 2018, "genre": "Dramas, International Movies, Romantic Movies", "director": "Rako Prijanto", "actors": "Adipati Dolken, Vanesha Prescilla, Rendi Jhon, Beby Tsabina, Denira Wiraguna, Refal Hady, Diandra Agatha, Sari Nila", "country": "Indonesia", "rating": 7.0, "enter_in_netflix": "May 21, 2020"}
	};

	var testFeature = test["vector"];
	kvecinos = [];
	resultNodes = [];
	knearestpoints(root, testFeature, kvecinos, resultNodes, depth=0);
	console.log(kvecinos);
	console.log(resultNodes);
}

function buildKdTree(){
	//console.log(data.length);
	//console.log(data[0]);
	//se le pasa data pero al interior del kdtree ya maneja el obj interno
	root = build_kdtree(data,depth=0)
	//console.log(root.point, ' * ', root.obj);
	executeKnn();
}

function gettingData(){
	var request  = new XMLHttpRequest();
	request.open("GET", "static/training.json", false);
	request.send(null);
	var mydata = JSON.parse(request.responseText);
	data = mydata["data"];
	buildKdTree();
}


function setup(){
	gettingData();
}



