$(document).ready(function(){
	$('.modal').modal();

	$(document).on("click", "#modalButton", function(){
		event.preventDefault();
		$("#title, #author, #genre, #comments").val("");
	});

	$(document).on("click", "#bookSubmit", function(){
		event.preventDefault();
		$("#tableLibrary").empty();
		var newBook = {
			title: $("#title").val().trim(),
			author: $("#author").val().trim(),
			genre: $("#genre").val().trim(),
			comments: $("#comments").val().trim()
		};
		console.log(newBook);

		addBook(newBook);

		showBooks();
	});

	function addBook(data){
		$.post("/api/library", data)
			.done(function(){				
		});
	};	

	function showBooks(){
		$.get("/api/library", function(data){
			for (var i = 0; i < data.length; i++) {
				var newRow = $("<tr>");
				newRow.append("<td>"+ data[i].title + "</td>");
				newRow.addClass("book")
				newRow.attr("value", data[i].title);
				$("#tableLibrary").append(newRow);
			}
		});
	}

	$(document).on("click", ".book", function(){
		var clickedTitle = $(this).attr("value");
		console.log(clickedTitle);
		$.get("/api/library", function(data){
			for (var i = 0; i<data.length; i++){
				if (clickedTitle===data[i].title){
					var bookInfo = $("<p> Title: "+ data[i].title +"</p><p> Author: "+ data[i].author + "</p><p> Genre: "+ data[i].genre + "</p><p> Comments: "+data[i].comments+ "</p>");
					$("#chooseBook").append(bookInfo);
				}
			}
		});
	});
});