$(document).ready(function () {

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
    loggedIn = true;
  } else {
    loggedIn=false;
  }
});

var dataMethods = {
  //Function that logs out a user that is logged in
  logOut: function() {
      firebase.auth().signOut().then(function() {
      // Sign-out successful.
      }).catch(function(error) {
      // An error happened.
          console.log(error);
      });
  }
}

//Logout
$("#logout").on("click", function(){
    dataMethods.logOut();
});

/*************Firebase Click Events*************/

    $('.modal').modal();

    $('.collapsible').collapsible();

    showGroups();

    function showGroups() {
        $.get("/api/groups", function (data) {
            for (var i = 0; i < data.length; i++) {
                /*                 var newRow = $("<tr>");
                                newRow.append("<td>" + data[i].name + "</td>");
                                newRow.addClass("group")
                                //newRow.attr("value", data[i].name);
                                newRow.attr("data-id", data[i].id);
                                $("#groupList").append(newRow); */

                var newItem = $("<li>");

                var itemHeader = $("<div>");
                itemHeader.addClass("collapsible-header");
                itemHeader.html(data[i].name)

                var itemBody = $("<div>");
                itemBody.addClass("collapsible-body");

                var discButton = $("<a>");
                discButton.addClass("waves-effect, waves-light, btn, view-discussions");
                //discButton.attr("data-id", "");
                discButton.html("View Discussions");

                var memberButton = $("<a>");
                memberButton.addClass("waves-effect, waves-light, btn, view-members");
                memberButton.attr("group-id", data[i].id);
                memberButton.html("View Members");

                itemBody.append(discButton, memberButton);

                newItem.append(itemHeader, itemBody);
                $("#groupList").append(newItem);

                $('.collapsible').collapsible();
            }
        });
    }

    $(document).on("click", "#view-members", function () {
        $.get("/api/groups", function (data) {
            for (var i = 0; i < data.length; i++) {
                

            }

        });

    });

});



