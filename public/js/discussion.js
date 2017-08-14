// Global variables
var chatName, username;

/****************** Firebase Chat Functions *******************/
// On-click event to open and post to specific discussions in Firebase
$(document).on("click", ".disc-btn", function(){
  // Variables to store information for Firebase
  chatName = $(this).attr("data-key");
  username = "Whitney"; //Make this dynamic for group members
  // Create chat directories with unique names
  var chatData = database.ref("/chat/" + chatName);

  // Clears previous chat messages when appending
  $("#chat-messages").html("");
  chatData.orderByChild("time").off("child_added");

  // Render message to page. Update chat on screen when new message detected - ordered by 'time' value
  chatData.orderByChild("time").on("child_added", function(snapshot) {
    $("#chat-messages").append("<p class=chatMessages><span>"+ snapshot.val().name + "</span>: " + snapshot.val().message + "</p>");
    // Keeps div scrolled to bottom on each update.
    $("#chat-messages").scrollTop($("#chat-messages")[0].scrollHeight); 
  });

  // Unbind chat when clicked off of modal. Prevent multiple messages.
  $("#chat-send").off('click')
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
  $("#chat-input").off('keypress')
  // Chat send keypress listener, grabs input and pushes to firebase.
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
})



/****************** Display Discussions *******************/
// Function to read all active discussions

/* function readDiscussions(){
  $.get("/api/group/discussions", function(data){
    for (var i=0; i<data.length; i++){
      var discussionRow = $("<li>");

      var itemHeader = $("<div>");
      itemHeader.addClass("collapsible-header");
      itemHeader.html(data[i].name);

      var itemBody = $("<div>");
      itemBody.addClass("collapsible-body");


      var discussionButton = $("<div>");
      discussionButton.addClass("discussionBtnArea"+data[i].id);
      data[i].Discussions.forEach(function(item) {
        discussionButton.append($("<a class='waves-effect waves-light btn modal-trigger disc-btn' href='#chat' data-key=chat"+item.id+">"+item.name+"</a>"));
        itemBody.append(discussionButton);
      });
      
      discussionRow.append(itemHeader, itemBody);
      $("#discussionList").append(discussionRow);

      $('.collapsible').collapsible();
    }
  })
} */

/****************** Create New Discussions *******************/
// Function to create new discussions
function newDiscussion() {
  $("#discussionList").on("click", ".add-discussion", function(event){
    event.preventDefault();
    var groupId = $(this).attr("data-id");
    var queryUrl = "/api/" + groupId + "/discussions";
    // var discussionName = {
    //   name: $("#newInput").val().trim()
    // }
    // var discussionName = "Whitney";
    var discussionName = $("#newInput").val().trim();  //For some reason, only grabs value from Group ID = 1....need to fix
    console.log($("#newInput").val().trim());
    
    var newDiscBtn;
    $.post(queryUrl, {name: discussionName}, function (data) {
      newDiscBtn = $("<a class='waves-effect waves-light btn modal-trigger disc-btn' href='#chat' data-key=chat"+data.id+">"+data.name+"</a>");
      $(".discussionBtnArea"+data.id).append(newDiscBtn);
    });
  });
}

// Function to delete a discussion
function deleteDiscussion() {

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
//readDiscussions();
newDiscussion();