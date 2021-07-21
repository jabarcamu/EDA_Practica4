$(document).ready(function(){
	var lastHeader = $("#mytable thead").find("th:last");
	$('<th>Input</th>').insertAfter(lastHeader);
	
	$('#mytable tbody tr').each(function(){
		$this = $(this);
		var firstTd = $this.find("td:first");
		var idMovie = firstTd.text().toString();
		var lastTd = $this.find("td:last");
		var idx = lastTd.index() + 1;
		$('<td><input type="text" name="col'+idx+'" value="'+idMovie+'" /</td>').insertAfter(lastTd);
	});
	$('td:nth-child(5),th:nth-child(5)').hide();
	$('td:nth-child(2),th:nth-child(2)').hide();	

	$('#mytable tbody tr').click(sendSelectedMovie);
});


var dataLocalStorage = window.localStorage.getItem("dataSelMovieJson");
console.log("LocalStorage-Pelicula Seleccionada:",dataLocalStorage);
