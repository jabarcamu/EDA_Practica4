let carname = "christian"

$(document).ready(function(){
	$("#mytable tr").click(function(event){
		console.log($(this).find('td:eq(0)').text());
		carname = $(this).find('td:eq(0)').text();
	});                                                     
});        
