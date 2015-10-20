
$(document).ready(function() {

	$('button').click(function(){
		var newURL = $("input[name=url").val();
		$.get('/keywords?url=' + newURL, function(data){
			var words = "some place holder copy that's place holdin' like a mother fucker";
			var header = "Header";
			$('.keybucket').prepend("<div class='card'>" + "<h2>" + newURL + "</h2>" + "<div>" +  "<p>" + data + "</p>" + "</div>" + "</div>");
			//$('.card').draggable();
		});
		
	});
	
});

	