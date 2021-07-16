
//var k=4
var k=132
var kn = 20;



class Rectangle{

	constructor(x,y,w,h)
	{
		this.x=x;
		this.y=y;
		this.w=w;
		this.h=h;
	}

	pertenece(point)
	{
		return point.x>(this.x-this.w) && point.x<(this.x+this.w) && point.y>(this.y-this.h) && point.y<(this.y+this.h)
	}
	
	intersectar(range)
	{	
		return !(range.x-range.w > this.x+this.w || 
			range.x+range.w < this.x-this.w ||
			range.y-range.h > this.y+this.h ||
			range.y+range.h < this.y-this.h);
		
	}


}

class Node{
	constructor(point, axis){
		this.point = point;
		this.left = null;
		this.right = null;
		this.axis = axis;
	}
}


function build_kdtree(points, depth=0){

		var axis = depth%k;

		if(points.length<=0)
			return null;

		if(points.length==1)
		{
			return new Node(points[0],axis);
		}	

		//console.log(axis,points)
		const sortAsc = (a, b) => a[axis] - b[axis];
		points.sort(sortAsc);
	
		var middle;
		middle = Math.floor(points.length/2)

		var l = points.slice(0,middle)
		var r = points.slice(middle+1)
		
		var node = new Node(points[middle].slice(0,k+1),depth+1);
		//console.log(node.point);
		node.left = build_kdtree(l, depth+1);
		node.rigth = build_kdtree(r,depth+1);

		return node;
			
}

function distanceSquared(point1, point2){
	var distance = 0;
	for (var i = 0 ; i<k; i++)
		distance +=Math.pow((point1[i]-point2[i]),2);

	return Math.sqrt(distance);

}

function closest_point_brute_force(points, point){
	dist_less = 100000;

	for(var i of points)
	{
		dist = distanceSquared(i, point)
		//console.log(i,dist)

		if(dist<dist_less)
		{
			dist_less = dist;
			pointless = i;
		}

	}
	console.log(dist_less);
	return pointless;
}


function naive_closest_point(node, point, depth = 0, best = null){

	if(node == null)
		return best;

	if(best == null || distanceSquared(node.point, point)<distanceSquared(best, point))
		best = node.point;
		
	if(point[depth % k]< node.point[depth % k])
		return naive_closest_point(node.left, point, depth +1 , best)
		
	else
		return naive_closest_point(node.rigth, point, depth +1 , best)  

}


function getHeight(node)
{
	if(!node)
		return 0

	return getHeight(node.left)+getHeight(node.right)+1;
}

function closest(point, p1, p2)
{	
	if(!p1)
		return p2;

	if(!p2)
		return p1;

	if(distanceSquared(point, p1)<distanceSquared(point, p2))
		return p1; 

	else
		return p2;
}
	

function closest_point(node, point, depth = 0, best=null){

	if(node == null)
		return null;

	var next_branch = null;
	var opposite_branch = null;

	if(point[depth%k] < node.point[depth%k]){
		next_branch = node.left;
		opposite_branch = node.rigth;

	}else{
		next_branch = node.rigth;
		opposite_branch = node.left;
	}


	best = closest(point, closest_point(next_branch, point, depth+1), node.point);

	if(distanceSquared(point, best) > Math.abs(point[depth%k] - node.point[depth%k]))
	{
		best = closest(point, closest_point(opposite_branch, point, depth+1), node.point);
	}

	return best;
	
}

//FInal
function knearestpoints(node, point, kpoints ,depth = 0){
	
	//count++;
	if(node==null)
		return null;

	var next_branch;
	var opposite_branch;
	var temp;
		
	if(point[depth % k]< node.point[depth % k])
	{	next_branch = node.left;
		opposite_branch = node.rigth;
	}
		
	else		
	{
		next_branch = node.rigth;
		opposite_branch = node.left;	
	}


	closest(point, knearestpoints(next_branch, point, kpoints, depth +1), node.point);
	//count++;
	

	if(kpoints.length<kn)
	{
		temp = node.point;
		temp.push(distanceSquared(point,temp));
		
		kpoints.push(temp);

		const sortDist = (a, b) => a[k+1] - b[k+1];
		kpoints.sort(sortDist);
	}

	else
	{	
		temp = node.point;
		temp.push(distanceSquared(point,temp));
		if(temp[k+1]<kpoints[kpoints.length-1][k+1])
		{
			kpoints.pop();
		//	console.log("ddddd ",temp);
			kpoints.push(temp);
			const sortDist = (a, b) => a[k+1] - b[k+1];
			kpoints.sort(sortDist);

		}
		
	}
	

	if(kpoints.length<kn || kpoints[0][k+1]>=Math.abs(point[depth%k]-node.point[depth%k]))
	{
		closest(point, knearestpoints(opposite_branch, point, kpoints, depth +1), node.point);

	}
	
}

function closest_range(point, p1, p2)
{	
	if(!p1)
		return p2;

	if(!p2)
		return p1;

	if(distanceSquared(point, p1)<distanceSquared(point, p2))
		return p1; 

	else
		return p2;
}


function range_query_circle(node, point, kpoints , radio, depth = 0)
{
	if(node==null)
		return null;

	var next_branch;
	var opposite_branch;
	var temp;
		
	if(point[depth % k]< node.point[depth % k])
	{	next_branch = node.left;
		opposite_branch = node.rigth;
	}
		
	else		
	{
		next_branch = node.rigth;
		opposite_branch = node.left;	
	}


	closest_range(point, range_query_circle(next_branch, point, kpoints, radio, depth +1), node.point);
	//count++;

	if(distanceSquared(point,node.point)<radio)
	{		
		node.point.push(distanceSquared(point,node.point));
		kpoints.push(node.point);
	}

	if(radio>=Math.abs(point[depth%k]-node.point[depth%k]))
	{
		closest_range(point, range_query_circle(opposite_branch, point, kpoints, radio, depth +1), node.point);

	}
	

}

function pertenece(point, rectangle)
{
	return point[0]>(rectangle.x-rectangle.w) && point[0]<(rectangle.x+rectangle.w) && point[1]>(rectangle.y-rectangle.h) && point[1]<(rectangle.y+rectangle.h)
}


function range_query_rectangle(node, point, kpoints , rectangle, depth = 0)
{
	if(node==null)
		return null;

	var next_branch;
	var opposite_branch;
	var temp;
		
	if(point[depth % k]< node.point[depth % k])
	{	next_branch = node.left;
		opposite_branch = node.rigth;
	}
		
	else		
	{
		next_branch = node.rigth;
		opposite_branch = node.left;	
	}


	closest_range(point, range_query_rectangle(next_branch, point, kpoints, rectangle, depth +1), node.point);
	//count++;

	if(node.point[0]>(rectangle.x-rectangle.w) && node.point[0]<(rectangle.x+rectangle.w) && node.point[1]>(rectangle.y-rectangle.h) && node.point[1]<(rectangle.y+rectangle.h))
	{		
		//node.point.push(distanceSquared(point,node.point));
		kpoints.push(node.point);
	}

	if(rectangle.x+rectangle.w>=Math.abs(point[depth%k]-node.point[depth%k]) || rectangle.x-rectangle.w>=Math.abs(point[depth%k]-node.point[depth%k]) || rectangle.y+rectangle.h>=Math.abs(point[depth%k]-node.point[depth%k]) || rectangle.y-rectangle.h>=Math.abs(point[depth%k]-node.point[depth%k]))
	{
		closest_range(point, range_query_rectangle(opposite_branch, point, kpoints, rectangle, depth +1), node.point);

	}
	

}




function print_nodes(temp, node, side)
{
	if(temp)
	{
		console.log("\""+node.point[0].toString()+","+node.point[1].toString() +"\"->\""+temp.point[0].toString()+","+ temp.point[1].toString()+"\"")

		print_nodes(temp.left, temp)
		print_nodes(temp.rigth, temp)
	}
}


function generate_dot(node)
{
	console.log("Digraph G {")
	if(node)
	{	
		print_nodes(node.left,node);
		print_nodes(node.rigth,node);
	}
	console.log("}");

}

function show()
{
	var width = 700;
	var height = 500;		

	for(var x=0; x<width; x+=width/10){
		for(var y=0;y<height;y+=height/5){

			stroke(125,125,125);
			strokeWeight(1);
			line(x,0,x,height);
			line(0,y, width, y);
		}
	}
	
	for(let i=0;i<data.length;i++){
		let c = color(255, 255, 255); 
		fill(c);
		circle(data[i][0], height-data[i][1], 7);
		textSize(8);
		text(data[i][0] + ',' + data[i][1], data[i][0]+5, height -data[i][1]);
	}

/*
	for(let i=0;i<knearest.length;i++){
		let c = color(0,255,0); 
		fill(c);
		circle(knearest[i][0], height-knearest[i][1], 7);
		textSize(8);
		text(knearest[i][0] + ',' + knearest[i][1], knearest[i][0]+5, height -knearest[i][1]);
	}*/
}

/*
data = [
[40, 70],
[70, 130],
[90, 40],
[110, 100],
[140, 110],
[160, 100],
[150, 30]
];

var point = [140,90];
*/

var data =[]
var puntos = []
var i=1;
//var elegido = Math.floor(Math.random() * 10) + 1;
//var elegido = Math.floor(Math.random() * 150) + 1;

const csv = require('csv-parser');
const fs = require('fs');
// const readline = require('readline');

// const readInterface = readline.createInterface({
//     input: fs.createReadStream('puntos.txt'),
//     output: process.stdout,
//     console: false
// });


  
// Reading data in utf-8 format 
// which is a type of character set. 
// Instead of 'utf-8' it can be  
// other character set also like 'ascii' 

var point = fs.readFileSync('point.txt').toString().split(",");
const punto = Object.assign({}, point);

point = point.slice(0,k)

for(var i = 0 ; i<point.length; i++) {
    point[i] = parseFloat(point[i]);
}




//fs.createReadStream('Iris.csv', {star:10})
fs.createReadStream('train.csv', {star:10})
    .on('error', () => {
        // handle error
    })

    .pipe(csv())
    .on('data', (row) => {
        //console.log(row);

		let column= []

		Object.keys(row).forEach(function (c) {
			let valor;
			if(c === 'movie_name') {
				valor = `${row[c]}`;
			} else {
				//console.log(c) // this print headers only
				valor = parseFloat(`${row[c]}`);
			}

			column.push(valor);			
		})

		data.push(column);		

    })
	

	// .pipe(csv())
    // .on('data', (row) => {
		
		
	// 	//if(i>10)
	// 	//{	
			
	// 	let str = `${row["SepalLengthCm"]} ${row["SepalWidthCm"]} ${row["PetalLengthCm"]} ${row["PetalWidthCm"]}`;
	// 	//console.log(str);
	// 	//console.log(parseFloat(`${row["SepalLengthCm"]}`)+10);
	// 	/*
	// 	var a = parseFloat(`${row["SepalLengthCm"]}`);
	// 	var b = parseFloat(`${row["SepalWidthCm"]}`);
	// 	var c = parseFloat(`${row["PetalLengthCm"]}`);
	// 	var d = parseFloat(`${row["PetalWidthCm"]}`);
	// 	var e = `${row["Species"]}`;
		
	// 	data.push([a,b,c,d,e]);	
	// 	*/
	// 	var a = parseFloat(`${row["dat1"]}`);
	// 	var b = parseFloat(`${row["dat2"]}`);
	// 	var c = parseFloat(`${row["dat3"]}`);
	// 	var d = parseFloat(`${row["dat4"]}`);
	// 	var e = parseFloat(`${row["dat5"]}`);
	// 	var f = parseFloat(`${row["dat6"]}`);			
	// 	var g = `${row["clase"]}`;
	// 	data.push([a,b,c,d,e,f,g]);	
	// 	//console.log(data);
	// 	//}
        
	// 	i++;
        
    // })

    .on('end', () => {

		var cat=0;
		var dog =0;
		var root = build_kdtree(data);
		//console.log(getHeight(root));
		console.log("K: ",kn);

		console.log("Punto a consultar: ");
		console.log(punto[k]);
		
		// for(var i = 0 ; i<point.length; i++) {
		// 	console.log(point[i]);
		// }


		console.log("RESULTADOS:");

		// for(var i = 0 ; i<point.length; i++) {
		// 	point[i] = parseFloat(point[i]);
		// }

		knearest=[]
		knearestpoints(root, point , knearest);
		

		for(var i = 0 ; i<knearest.length-1; i++)
		{	
			console.log(knearest[i][k]);			
		}
		
		
		
		//console.log(closest_point_brute_force(data, point));
		//console.log("\n");

		// readInterface.on('line', function(line) {

			


		// });

		

		// if(cat>dog)
		// 	console.log("cat")
		// else
		// 	console.log("dog")
        
    })
	
	.on('close', function(){
        
    })

