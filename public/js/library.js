//allows modal to open up
$('.modal').modal();

//When modal button is clicked, it clears out search contents from previous search
$(document).on("click", "#modalButton", function(){
	event.preventDefault();
	$("#title, #author, #comments").val("");
});

//When book submit button is clicked, it retrieves data from search fields and posts info to Library API
$(document).on("click", "#bookSubmit", function(){
	event.preventDefault();
	$("#tableLibrary").empty();
	var newBook = {
		title: $("#title").val().trim(),
		author: $("#author").val().trim(),
		comments: $("#comments").val().trim()
	};
	console.log(newBook);
	addBook(newBook);
	showBooks();
});

$(document).on("click", "#viewBooks", function(){
	event.preventDefault();
	showBooks();
	console.log($("#usernameTest").val());
	/*console.log(req.user);*/

});

//function to add book to Library API
function addBook(data){
	$.post("/api/library", data)
		.done(function(){				
	});
};	

//Retrieves title from Library API and displays on HTML
function showBooks(){
	$.get("/api/library/", function(data){
		for (var i = 0; i < data.length; i++) {
			var newRow = $("<tr>");
			newRow.append("<td>"+ data[i].title + "</td>");
			newRow.addClass("book")
			newRow.attr("value", data[i].title);
			newRow.attr("data-author", data[i].author);
    
			$("#tableLibrary").append(newRow);
		}
	});
}

// **************************************Google Books API******************************************

//when a book title is selected, it shows book info on HTML
$(document).on("click", ".book", function(){
	$("#chooseTitle, #chooseComments, #chooseAuthor, #chooseRate, #chooseSummary").html("");
	$("#chooseImage").attr("src","");
	var clickedTitle = $(this).attr("value");

var query = "/api/library/";
	googleBook(clickedTitle);
	$.get(query, function(data){
		for (var i = 0; i<data.length; i++){
			if (clickedTitle===data[i].title){
				$("#chooseTitle").html("Title: "+data[i].title);
				$("#chooseComments").html("My Comments: "+data[i].comments);
			}
		}
	});
});

function googleBook(titleSearch) {
	var apiKey = "AIzaSyBUVyIW2d33WHzArLsdPx3X-X39qV-SZLY";
	var queryURL= "https://www.googleapis.com/books/v1/volumes?q=intitle:"+ titleSearch +"&key=" + apiKey;

	$.ajax({
		url: queryURL,
		method: "GET"
	}).done(function(response){
		console.log(response)
		var results = response.items[0].volumeInfo;
		$("#chooseAuthor").html("Author: "+results.authors[0]);
		$("#chooseRate").html("Average Rating: "+results.averageRating+"/5.0");
		$("#chooseSummary").html("Summary: "+results.description);
		$("#chooseImage").attr("src",results.imageLinks.smallThumbnail);
	});
};
