let root = null;
let data = [];

function setup() {
    var width = 800;
	var height = 800;

    createCanvas(width, height);

    background(0);
    for (var x = 0; x < width; x += width / 10) {
        for (var y = 0; y < height; y += height / 5) {
            stroke(125, 125, 125);
            strokeWeight(0.5);
            line(x, 0, x, height);
            line(0, y, width, y);
        }
    }
    //debugger;

    withQuery = createCheckbox('Activar Circular');
    withQuery.checked(true);

	data = [];
    for (let i = 0; i < 100; i++) {
        var x = Math.floor(Math.random() * height);
        var y = Math.floor(Math.random() * height);
        data.push([x, y]);

        fill(255, 255, 255);
        circle(x, height - y, 7); //200-y para q se dibuje apropiadamente
        textSize(8);
        text(x + ',' + y, x + 5, height - y); //200-y para q se dibuje apropiadamente
    }

    
    //console.log('Altura del Arbol es ' + getHeight(root));
    //console.log(generate_dot(root));

    //data = [[40,70],[70,130],[90,40],[110,100],[140,110],[160,100]];
    // data = [[40,70],[70,130],[90,40],[110,100],[140,110],[160,100],[150,30]];
    
	
	
	// for(let i = 0; i < data.length; i++){
	// 	// var x = Math.floor(Math.random() * height);
	// 	// var y = Math.floor(Math.random() * height);
	// 	//data.push([data[i][0], data[i][1]]);
	// 	fill(255, 255, 255);
	// 	circle(data[i][0], height - data[i][1], 7);
	// 	textSize(8);
	// 	text(data[i][0] + ',' + data[i][1], data[i][0] + 5, height - data[i][1]);
	// }

    var puntoConsulta = [140, 90];    

    root = build_kdtree(data);
    console.log(root);
    
    var graphDot = "digraph G {\n" + generate_dot(root) + '}';
    console.log(graphDot);

    var brute = closest_point_brute_force(data, puntoConsulta); //[140,110]
    var naive = naive_closest_point(root, puntoConsulta); // [140, 90]
    var best = closest_point(root, puntoConsulta); //[140,110]

    console.log(brute, 'brute', naive, 'naive', best, 'closest point');

    kvecinos = []
    knn(root, puntoConsulta, kvecinos);
    console.log(kvecinos);

    
    

}

function draw() {
    background(0);
    show();

    var quee= [];
	var quee2 = [];

    if (withQuery.checked()) { 
        var point_s = [150,300];
        //var point_s =   [mouseX, height -mouseY];
        //var point_s2 = [150,300];
        var point_s2 =   [mouseX, height -mouseY];
    }
    else {    
        //var point_s = [150,300];
        var point_s =   [mouseX, height -mouseY];
        var point_s2 = [150,300];
        //var point_s2 =   [mouseX, height -mouseY];
    }
    
	var dimen=[75,30];
	var radio=75;

	range_query_circle(root,point_s2,radio,quee2);
	range_query_rect(root,point_s,dimen,quee);


    fill(0,255,255,40)
	circle(point_s2[0], height - point_s2[1], radio*2)

	fill(255,0,255,40);
	rect(point_s[0]-dimen[0],height-point_s[1]-dimen[1],dimen[0]*2,dimen[1]*2)

	for ( let i = 0 ; i < quee.length ; i ++){
		fill(0,255,255);
		circle(quee[i][0],height-quee[i][1],7); 
		textSize(8);
		text(quee[i][0] + ',' + quee[i][1],quee[i][0]+5,height-quee[i][1]); 
	}

	for ( let i = 0 ; i < quee2.length ; i ++){
		fill(255,0,255);
		circle(quee2[i][0],height-quee2[i][1],7); 
		textSize(8);
		text(quee2[i][0] + ',' + quee2[i][1],quee2[i][0]+5,height-quee2[i][1]); 
	}  
}

function show () {

    for (var x = 0; x < width; x += width / 10) {
        for (var y = 0; y < height; y += height / 5) {
            stroke(125, 125, 125);
            strokeWeight(0.5);
            line(x, 0, x, height);
            line(0, y, width, y);
        }
    }
    
    for(let i = 0; i < data.length; i++){
		// var x = Math.floor(Math.random() * height);
		// var y = Math.floor(Math.random() * height);
		//data.push([data[i][0], data[i][1]]);
		fill(255, 255, 255);
		circle(data[i][0], height - data[i][1], 7);
		textSize(8);
		text(data[i][0] + ',' + data[i][1], data[i][0] + 5, height - data[i][1]);
	}

}