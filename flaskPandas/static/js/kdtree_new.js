k = 32;
kn = 5;
vecinos = 3; // Buscar vecinos más cercanos

class Node {
    constructor(point, axis, object) {
        this.point = point;
        this.left = null;
        this.right = null;
        this.axis = axis;
	//objeto de datos adicional para el nodo (genial)
	this.obj = object
    }
}

function getHeight(node) {
    if (node == null) {
        return 0;
    }
    // acumulador de alturas por hijo
    //   var height_left = 0
    //   height_left += node.left +1;

    var height_left = getHeight(node.left) + 1;
    var height_right = getHeight(node.right) + 1;

    // comparar si el acumulador es mayor en el hijo izq o derecho
    // para dar la altura completa del arbol
    if (height_left > height_right) {
        return height_left;
    }
    else {
        return height_right;
    }
}

function generate_dot(node) {
    if (node === null) {
        return "";
    } 

    var tmp = ''; 

    if (node.left != null) {
        tmp += '"' + node.point.toString() + '"' + ' -> ' + '"' + node.left.point.toString() + '"' + ';\n';
        tmp += generate_dot(node.left);
    }
    if (node.right != null) {
        tmp += '"' + node.point.toString() + '"' + ' -> ' + '"' + node.right.point.toString() + '"' + ';\n';
        tmp += generate_dot(node.right);
    } 

    return tmp;
}


// Recibe una lista de puntos([{vector:[1,2,....], obj:{movie}}, ...])
function build_kdtree(points, depth=0, p5=false) {
    // verifica si esta vacio
    var n = points.length;
	var axis = depth % k;

	if ( n<=0){
		return null;
	}
	if(n==1){
		//trabajando con vector de caracteristicas y el punto u obj adicional
		if(p5 == false)
			return new Node(points[0]['vector'],axis, points[0]['obj']);
		if(p5 == true)
			return new Node(points[0],axis,null);
	}
	var median = Math.floor(points.length/2);

	points.sort(function(a,b){
		if(p5 == false)
			return a['vector'][axis] - b['vector'][axis];
		else
			return a[axis] - b[axis];
	});

	var left = points.slice(0,median);
	var right = points.slice(median+1);

	// var node = new Node(points[median].slice(0,k),axis,);
	// para la creacion del padre igualmente la posicion medianda opbtenemos su vector y obj para construir el nodo
	if(p5 == false)
		var node = new Node(points[median]['vector'], axis, points[median]['obj']);
	else
		var node = new Node(points[median].slice(0,k),axis);
	node.left = build_kdtree(left,depth +1,p5);
	node.right = build_kdtree(right,depth +1,p5);

	return node;
}

function distanceSquared(point1, point2) {
    // dos dimensiones	k esta definido al inicio

    var distancia = 0;
    for (var i = 0; i < k; i++) {
        distancia += Math.pow((point1[i] - point2[i]), 2);
    }
    //devolver raiz de la sumatoria de las distancias
    return Math.sqrt(distancia);
}

function closest_point_brute_force(points, point) {    
    var distance = null;
    var best_distance = null;
    var best_point = null;
    for (let i = 0; i < points.length; i++) {
        distance = distanceSquared(points[i], point);        
        //console.log(distance);
        if (best_distance === null || distance < best_distance) {
            best_distance = distance;
            //best_point = { 'point': points[i], 'distance': distance }
            best_point = points[i];
        }
    } return best_point;

    // var dist=distanceSquared(points[0],point);
	// var punto=points[0];
	// for (var i = 1; i < points.length; i++) {
	// 	var aux=distanceSquared(points[i],point);
	// 	if(aux<dist){
	// 		dist=aux;
	// 		punto=points[i];
	// 	}
	// }
	// return punto;

}

function naive_closest_point(node, point, depth = 0, best = null) {
    //algorithm
    //1. best = min(distance(point, node.point), best)
    //2. chose the branch according to axis per level
    //3. recursevely call by branch chosed    
    
    // if (node === null)
    //     return best;
        
    // var axis = depth % k;

    // var next_best = null; //next best point
    // var next_branch = null; //next node brach to look for    
    // if (best === null || (distanceSquared(best, point) > distanceSquared(node.point, point)))
    //     next_best = node.point;
    // else
    //     next_best   = best;    

    // if (point[axis] < node.point[axis])
    //     next_branch = node.left
    // else
    //     next_branch = node.right    
    
    // return  naive_closest_point(next_branch, point, depth +1, next_best);    

    if(node == null)
        return best;

	var axis = depth% k;

	var best1 = null;
	var camino = null;

	if(best==null)
		best1=node.point;

	if(point[axis]>node.point[axis])
		camino=node.right
	else
		camino=node.left
	return naive_closest_point(camino,point,depth+1,best1)	
}

function closest_point(node , point , depth = 0, best=null)
{
	if(node==null)return best;

	var axis=depth% k;
	var camino = null;

	if(best==null)
	{
		best1=node.point;
	}
	else if((distanceSquared(best, point)> distanceSquared(node.point,point)))
		best1=node.point;
	else
		best1=best;

	if(point[axis]>node.point[axis])
		camino=node.right;

	else
		camino=node.left;

	return closest_point(camino,point,depth+1,best1)
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

//FInal
function knearestpoints(node, point, kpoints, resultNodes, depth = 0){
		
	//count++;
	if(node==null)
		return null;

	var next_branch;
	var opposite_branch;
	var temp;
	var tempNode; 

	if(point[depth % k]< node.point[depth % k])
	{	next_branch = node.left;
		opposite_branch = node.rigth;
	}
		
	else		
	{
		next_branch = node.rigth;
		opposite_branch = node.left;	
	}


	closest(point, knearestpoints(next_branch, point, kpoints, resultNodes, depth +1), node.point);
	//count++;
	

	if(kpoints.length<kn) {
		// almacena el valor del nodo
		tempNode = node;
		temp = node.point;

		tempNode['point'].push(distanceSquared(point,tempNode['point']));
		temp.push(distanceSquared(point,temp));
		

		resultNodes.push(tempNode)
		kpoints.push(temp);

		const sortDist = (a, b) => a[k] - b[k];
		const sortDistNode = (a, b) => a['point'][k] - b['point'][k];
		
		resultNodes.sort(sortDistNode);
		kpoints.sort(sortDist);

	} else {	
		temp = node.point;
		temp.push(distanceSquared(point,temp));
		if(temp[k]<kpoints[kpoints.length-1][k])
		{
			kpoints.pop();
		//	console.log("ddddd ",temp);
			kpoints.push(temp);
			const sortDist = (a, b) => a[k] - b[k];
			kpoints.sort(sortDist);

		}
		
	}
	

	if(kpoints.length<kn || kpoints[0][k+1]>=Math.abs(point[depth%k]-node.point[depth%k]))
	{
		closest(point, knearestpoints(opposite_branch, point, kpoints, resultNodes, depth +1), node.point);

	}
	
}

function masCercano(puntoConsulta, p1, p2) {
    if (!p1) {
      return p2;
    }
    if (!p2) {
      return p1;
    }
    return (distanceSquared(puntoConsulta, p1) < distanceSquared(puntoConsulta, p2))? p1 : p2;
  }

function knn(node, puntoConsulta, kpoints, depth = 0) {
    if (!node) {
      return null;
    }
  
    var temp;
    var subTree1 = node.left;
    var subTree2 = node.right;
  
    if (puntoConsulta[depth % k] >= node.point[depth % k]) {
      subTree1 = node.right;
      subTree2 = node.left;
    }
  
    // Mejor distancia entre el padre y el subTree1.
    masCercano(puntoConsulta, knn(subTree1, puntoConsulta, kpoints, depth +1), node.point);
  
    // Variable para ordenar por distancias
    const sortByDistance = (a, b) => a[2] - b[2];
  
    if (kpoints.length < vecinos) {
      temp = node.point;
      temp.push(Math.round(distanceSquared(puntoConsulta, temp)*100)/100);
      kpoints.push(temp);
      kpoints.sort(sortByDistance);
    } else {
      temp = node.point;
      temp.push(Math.round(distanceSquared(puntoConsulta, temp)*100)/100);
      if (temp[2] < kpoints[kpoints.length - 1][2]) {
        kpoints.pop();
        kpoints.push(temp);
        kpoints.sort(sortByDistance);
      }
    }
  
    if(kpoints.length < vecinos || kpoints[0][2] >= Math.abs(puntoConsulta[depth % k] - node.point[depth%k])) {
      masCercano(puntoConsulta, knn(subTree2, puntoConsulta, kpoints, depth +1), node.point);
    }
  }


  /**
   * 
   * Ultima parte
   */

function closer_point(point,p1,p2)
{
	
	if(!p1) return p2;
	if(!p2) return p1;
	if(p1.estado==false && p2.estado==false) return null;
	if(p1.estado == false) return p2;
	if (p2.estado == false) return p1;

	if(distanceSquared(point,p1.point) > distanceSquared(point,p2.point)) return p2;
	return p1;

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




function range_query_rect(node, point, kpoints , rectangle, depth = 0)
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


	closest_range(point, range_query_rect(next_branch, point, kpoints, rectangle, depth +1), node.point);
	//count++;

	if(node.point[0]>(rectangle.x-rectangle.w) && node.point[0]<(rectangle.x+rectangle.w) && node.point[1]>(rectangle.y-rectangle.h) && node.point[1]<(rectangle.y+rectangle.h))
	{		
		//node.point.push(distanceSquared(point,node.point));
		kpoints.push(node.point);
	}

	if(rectangle.x+rectangle.w>=Math.abs(point[depth%k]-node.point[depth%k]) || rectangle.x-rectangle.w>=Math.abs(point[depth%k]-node.point[depth%k]) || rectangle.y+rectangle.h>=Math.abs(point[depth%k]-node.point[depth%k]) || rectangle.y-rectangle.h>=Math.abs(point[depth%k]-node.point[depth%k]))
	{
		closest_range(point, range_query_rect(opposite_branch, point, kpoints, rectangle, depth +1), node.point);

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

