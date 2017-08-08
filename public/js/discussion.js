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

//Setup for specific discussion
//Includes loading members of each group from database --> Need table ID's of user or a group ID
// var groupUsers = require("../models"); // This doesn't seem right....how to access database to get all users associated with a group????
// Grab group ID/name
// Grab the users that are associated with that group
// Create availability to contribute to chat


/****************** Testing out listing out all group discussions for user - No Database *******************/
var discussList = [
  {
    name: "Harry Potter Rox",
    chatId: 0
  },
  {
    name: "My Library is Better",
    chatId: 1
  },
  {
    name: "Books are Cewl",
    chatId: 2
  }];

for (var i=0; i<discussList.length; i++){
  // Create rows with Discussion Name data
  var groupRow = $("<tr>");
  groupRow.append("<td>"+discussList[i].name+"</td>");
  groupRow.append("<td><a class='btn modal-trigger modalButton' href='#chat' id=chat"+discussList[i].chatId+">Open Chat</a></td>")
  //Append information as a table to page
  $("#discussionList").append(groupRow);
}


/****************** Variables to get chat to work - No database *******************/
var chatName = "chat0";     //Make this dynamic for group discussions
var username = "Whitney";   //Make this dynamic for group members

//Push chat message to firebase
var chatData = database.ref("/chat/" + chatName);

// CHAT LISTENERS
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
  $("#chat-messages").append("<p class=chatMessages><span>"
  + snapshot.val().name + "</span>: " + snapshot.val().message + "</p>");
  // Keeps div scrolled to bottom on each update.
  $("#chat-messages").scrollTop($("#chat-messages")[0].scrollHeight);
});



/****************** Open Modal *******************/
$(document).ready(function(){
  //Materialize javascript code for modal
  $('.modal').modal();
  //When modal button is clicked, it clears out search contents from previous search
  $(document).on("click", ".modalButton", function(){
    event.preventDefault();
    $("#message").val("");
  });
});



//Questions:
//Do we want users to see when users join or disconnect from the chat?