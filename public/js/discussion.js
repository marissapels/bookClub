//Initialize Firebase
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

// Global variables
var chatName, chatData, username;

/****************** Firebase Chat Functions *******************/
// On-click event to open and post to specific discussions in Firebase
$("#discussionList").on("click", ".disc-btn", function(){
  // Clears previous chat messages when appending
  $("#chat-messages").html("");

  // Variables to store information for Firebase
  chatName = $(this).attr("data-key");
  username = "Whitney"; //Make this dynamic for group members

  // Create chat directories with unique names
  chatData = database.ref("/chat/" + chatName);
  console.log(chatData)

  // Chat send button listener, grabs input and pushes to firebase.
  $("#chat-send").click(function() {
    if ($("#chat-input").val() !== "") {
      var message = $("#chat-input").val();
      chatData.push({
        name: username,
        message: message,
        time: firebase.database.ServerValue.TIMESTAMP
      });
      $("#chat-input").val("");
    }
  });
  // Chatbox input listener
  $("#chat-input").keypress(function(e) {
    if (e.keyCode === 13 && $("#chat-input").val() !== "") {
      var message = $("#chat-input").val();
      chatData.push({
        name: username,
        message: message,
        time: firebase.database.ServerValue.TIMESTAMP
      });
      $("#chat-input").val("");
    }
  });
  // Render message to page. Update chat on screen when new message detected - ordered by 'time' value
  chatData.orderByChild("time").on("child_added", function(snapshot) {
    $("#chat-messages").append("<p class=chatMessages><span>"+ snapshot.val().name + "</span>: " + snapshot.val().message + "</p>");
    // Keeps div scrolled to bottom on each update.
    $("#chat-messages").scrollTop($("#chat-messages")[0].scrollHeight); 
  });
})


/****************** Display Discussions *******************/
// Function to read all active discussions
function readDiscussions(){
  $.get("/api/group/discussions", function(data){
    for (var i=0; i<data.length; i++){
      var discussionRow = $("<li>");

      var itemHeader = $("<div>");
      itemHeader.addClass("collapsible-header");
      itemHeader.html(data[i].name);

      var itemBody = $("<div>");
      itemBody.addClass("collapsible-body");

      var discussionButton;
      data[i].Discussions.forEach(function(item) {
        discussionButton = $("<a class='waves-effect waves-light btn view-members modal-trigger disc-btn' href='#chat' data-key=chat"+item.id+">"+item.name+"</a>");
        itemBody.append(discussionButton);
      });

      discussionRow.append(itemHeader, itemBody);
      $("#discussionList").append(discussionRow);

      $('.collapsible').collapsible();
    }
  })
}

// Function to determine active user
function activeUser(){
  $.get("/api/:user/:group/discussions", function(data){

  })
}


/****************** Open Modal *******************/
$(document).ready(function(){
  //Materialize javascript code for modal
  $('.modal').modal();
});



// Call functions here
readDiscussions();