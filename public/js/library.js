// //Initialize Firebase
var loggedIn = false;


var config = {
  apiKey: "AIzaSyBUVyIW2d33WHzArLsdPx3X-X39qV-SZLY",
  authDomain: "bookclub-ed08b.firebaseapp.com",
  databaseURL: "https://bookclub-ed08b.firebaseio.com",
  projectId: "bookclub-ed08b",
  storageBucket: "bookclub-ed08b.appspot.com",
  messagingSenderId: "874403788158"
};
firebase.initializeApp(config);

var database = firebase.database();

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    var displayName = user.displayName;
    var email = user.email;
    var uid = user.uid;
    var providerData = user.providerData;
    localStorage.setItem("firebaseUID", uid);
    loggedIn = true;
  } else {
  	loggedIn=false;
  }
});

var dataMethods = {
  //Function that creates a new user
  signUp: function(email, pwd) {
    firebase.auth().createUserWithEmailAndPassword(email, pwd).then(function(authdata){
        var newUser={
          username: $("#username").val().trim(),
          firebase: firebase.auth().currentUser.uid   
        };
        console.log(newUser);
        createUser(newUser);
      }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // [START_EXCLUDE]
      if (errorCode == 'auth/weak-password') {
        $("#sign-up-err").text('The password is too weak.');
      } else {
        $("#sign-up-err").text(errorMessage);
      }

      console.log(error);
      // [END_EXCLUDE]

    });
  },
  //Function that allows login of an existing user
  logIn: function(email, password) {
      firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // [START_EXCLUDE]
      if (errorCode === 'auth/wrong-password') {
          $("#sign-in-err").text('Wrong password.');
      } else {
          $("#sign-in-err").text(errorMessage);
      }
      console.log(error);
      // [END_EXCLUDE]
      });
  },
  //Function that logs out a user that is logged in
  logOut: function() {
      firebase.auth().signOut().then(function() {
      // Sign-out successful.
      }).catch(function(error) {
      // An error happened.
          console.log(error);
      });
  },
}

/*************Firebase Click Events*************/

//Login
$("#submitLogin").on("click", function() {
		event.preventDefault();
    var email = $("#email1").val();
    var pwd = $("#password1").val();
    dataMethods.logIn(email, pwd);
    window.open(this.href);
});
//Sign-up
$("#submitNewUser").on("click", function() {
    var email = $("#email2").val();
    var pwd = $("#password2").val();
    var pwdCheck = $("#passwordCheck").val();
    if(pwd === pwdCheck) {
        dataMethods.signUp(email, pwd);
    } else {
        $("#sign-up-err").text("Your passwords do not match. Please correct and submit again.")
    }
});

function createUser(data){
	$.post("/api/users",data)
			.done(function(){		
      console.log("created user: " + data);		
	});
};	

//Logout
$("#logout").on("click", function(){
    dataMethods.logOut();
});

// *************************************************************************


//Materialize javascript code for modal
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
			comments: $("#comments").val().trim(),
      firebase: firebase.auth().currentUser.uid
		};
		console.log(newBook);

		addBook(newBook);

		showBooks();
	});

  $(document).on("click", "#viewBooks", function(){
    event.preventDefault();
    showBooks();
  });

	//function to add book to Library API
	function addBook(data){
		$.post("/api/library", data)
			.done(function(){				
		});
	};	

	//Retrieves title from Library API and displays on HTML
	function showBooks(){
    var currentUser = firebase.auth().currentUser.uid;
    var query = "/api/library/" + currentUser;
    console.log(query);
		$.get(query, function(data){
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
		// var clickedAuthor = $(this).attr("data-author");

		var currentUser = firebase.auth().currentUser.uid;
    var query = "/api/library/" + currentUser;
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
