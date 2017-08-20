//allows modal to open up
$('.modal').modal();

//When modal button is clicked, it clears out search contents from previous search
$(document).on("click", "#modalButton", function(){
	event.preventDefault();
	$("#title, #author, #comments").val("");
});

//edit profile
$(document).on("click","#editProfile", function(){
	$("#personalName").replaceWith("<input type='text' id='editPersonalName' placeholder='Name'>");
	$("#personalFavorite").replaceWith("<input type='text' id='editPersonalFavorite' placeholder='Favorite Book'>");
	$("#personalCurrent").replaceWith("<input type='text' id='editPersonalCurrent' placeholder='Currently Reading'>");
	$("#editProfile").replaceWith("<button id='updateProfile'> Update </button>");
});

$(document).on("click", "#updateProfile",function(){
	var newName=$("#editPersonalName").val().trim();
	$("#editPersonalName").replaceWith("<h2 id='personalName'>"+newName+"</h2>");
	var newFavorite=$("#editPersonalFavorite").val().trim();
	$("#editPersonalFavorite").replaceWith("<p id='personalFavorite'> Favorite Book: "+newFavorite+"</p>");
	var newCurrent=$("#editPersonalCurrent").val().trim();
	$("#editPersonalCurrent").replaceWith("<p id='personalCurrent'> Currently Reading: "+newCurrent+"</p>");
	$("#updateProfile").replaceWith("<button id='editProfile'> Edit </button>");
	var userInfo = {
		name: newName,
		currentlyReading: newCurrent,
		favoriteBook: newFavorite
	};
	$.ajax({
      method: "PUT",
      url: "/api/users",
      data: userInfo
    })
    .done(function(){
    });
})


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
			var newRow = $("<div>");
			googleBook(data[i].title)
			// newRow.append("<td>"+ data[i].title + "</td>");
			// newRow.addClass("book")
			// newRow.attr("value", data[i].title);
			// newRow.attr("data-author", data[i].author);
    
			// $("#tableLibrary").append(newRow);
		}
	})
}

// **************************************Google Books API******************************************

//when a book title is selected, it shows book info on HTML
// $(document).on("click", ".book", function(){
// 	$("#chooseTitle, #chooseComments, #chooseAuthor, #chooseRate, #chooseSummary").html("");
// 	$("#chooseImage").attr("src","");
// 	var clickedTitle = $(this).attr("value");

// var query = "/api/library/";
	// googleBook(clickedTitle);
// 	$.get(query, function(data){
// 		for (var i = 0; i<data.length; i++){
// 			if (clickedTitle===data[i].title){
// 				$("#chooseTitle").html("Title: "+data[i].title);
// 				$("#chooseComments").html("My Comments: "+data[i].comments);
// 			}
// 		}
// 	});
// };

function googleBook(titleSearch) {
	var apiKey = "AIzaSyBUVyIW2d33WHzArLsdPx3X-X39qV-SZLY";
	var queryURL= "https://www.googleapis.com/books/v1/volumes?q=intitle:"+ titleSearch +"&key=" + apiKey;

	$.ajax({
		url: queryURL,
		method: "GET"
	}).done(function(response){
		console.log(response)
		var results = response.items[0].volumeInfo;
		var newBook=$("<div class='book valign-wrapper'>");
		var image=$("<img>").attr("src",results.imageLinks.smallThumbnail);
		var title= $("<div>"+results.title+"</div>");
		// $("#chooseAuthor").html("Author: "+results.authors[0]);
		// $("#chooseRate").html("Average Rating: "+results.averageRating+"/5.0");
		// $("#chooseSummary").html("Summary: "+results.description);
		// $("#chooseImage").attr("src",results.imageLinks.smallThumbnail);
		// var newBook = $("<div>");
		// $("#tableLibrary").append("<p class='book'><img src='"+results.imageLinks.smallThumbnail+"'>"+results.title+"</p>");
		// newBook.append("<p>"+results.title+"</p>");
		newBook.append(image);
		newBook.append(title);
		$("#tableLibrary").append(newBook);
	});
};
