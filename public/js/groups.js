//$(document).ready(function () {

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

firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        // User is signed in.
        var displayName = user.displayName;
        var email = user.email;
        var uid = user.uid;
        var providerData = user.providerData;
        loggedIn = true;
    } else {
        loggedIn = false;
    }
});

var dataMethods = {
    //Function that logs out a user that is logged in
    logOut: function () {
        firebase.auth().signOut().then(function () {
            // Sign-out successful.
        }).catch(function (error) {
            // An error happened.
            console.log(error);
        });
    }
}

//Logout
$("#logout").on("click", function () {
    dataMethods.logOut();
});

/*************Firebase Click Events*************/

var user;
$('#button').on("click", function () {
    user = firebase.auth().currentUser.uid;
    console.log(user);

    $.get("api/firebase/" + user, function (data) {
    console.log(data);
    currentUserID = data.id;
    getGroups();
})
})

//var user = firebase.auth().currentUser;
//var user = "InADjdt2HWPQ7PgXBhKyJN0Z8UD2";
var currentUserID;



$('.modal').modal();
$('.collapsible').collapsible();

//***** Change this to be updated for active user
//var currentUserID = 1
//var firebaseId = firebase code;
//$.get(mysql user id from firebase id)

//getGroups();

function getGroups() {

    var queryUrl = "/api/users/" + currentUserID + "/groups/discussions"

    $.get(queryUrl, function (data) {
        usersGroups = data;
        displayGroups(data);
    })
};


function displayGroups(data) {
    console.log(data);
    for (var i = 0; i < data.length; i++) {
        console.log(data[i].name);

        var newItem = $("<li>");

        var itemHeader = $("<div>");
        itemHeader.addClass("collapsible-header");
        itemHeader.html(data[i].name)

        var itemBody = $("<div>");
        itemBody.addClass("collapsible-body");

        var discussionButton = $("<div>");
        discussionButton.addClass("discussionBtnArea" + data[i].id);

        if (data[i].Discussions) {
            data[i].Discussions.forEach(function (item) {
                discussionButton.append($("<a class='waves-effect waves-light btn modal-trigger disc-btn blue' href='#chat' data-key=chat" + item.id + ">" + item.name + "</a>"));
                itemBody.append(discussionButton);
            });
        } else {
            itemBody.append(discussionButton);
        }

        var htmlBreak = $("<br>");
        itemBody.append(htmlBreak);

        var discButton = $("<a>");
        discButton.addClass("waves-effect waves-light btn create-discussion");
        discButton.attr("group-id", data[i].id);
        discButton.html("Add Discussion");

        var memberButton = $("<a>");
        memberButton.addClass("waves-effect waves-light btn view-members");
        memberButton.attr("group-id", data[i].id);
        memberButton.attr("href", "#member-modal");
        memberButton.html("Members");

        itemBody.append(discButton, memberButton);

        newItem.append(itemHeader, itemBody);
        $("#groupList").append(newItem);

        $('.collapsible').collapsible();
        $('.modal').modal();
    }
}

$('#create-group').on("click", function () {
    $('.userInp3').val("");
    $('#new-group-modal').modal('open');
});

$('#add-created-group').on("click", function () {
    var nameInput = $('.userInp3').val().trim();

    var newGroup = {
        name: nameInput,
        UserId: currentUserID
    }

    $.post("/api/groups", newGroup, function (data) {
        console.log(data);
        var dataArray = [];
        dataArray.push(data);
        displayGroups(dataArray);
        $('.collapsible').collapsible();
    })
});

$(document).on("click", ".create-discussion", function () {
    $('.userInp4').val("");
    $('#new-discussion-modal').modal('open');
    var id = $(this).attr("group-id");
    $('#add-created-discussion').attr("group-id", id);
});


$('#add-created-discussion').on("click", function () {
    var nameInput = $('.userInp4').val().trim();
    var id = $(this).attr("group-id");

    var newDiscussion = {
        name: nameInput,
    }

    var queryUrl = "api/groups/" + id + "/discussions"

    $.post(queryUrl, newDiscussion, function (data) {

        $('.discussionBtnArea' + data.GroupId).append("<a class='waves-effect waves-light btn modal-trigger disc-btn blue' href='#chat' data-key=chat" + data.id + ">" + data.name + "</a>");

        $('.collapsible').collapsible();
    })
});

var allGroupData;
var allGroups = {};

$('#join-groups').on("click", function () {
    $('.userInp2').val("");
    $('#groups-modal').modal('open');

    $.get("/api/groups", function (data) {
        allGroupData = data;

        for (var i = 0; i < data.length; i++) {
            allGroups[data[i].name] = "";
        }

        for (var i = 0; i < usersGroups.length; i++) {
            var newChip = $("<div>");
            newChip.addClass("chip");
            newChip.text(usersGroups[i].name);

            $('#groups').append(newChip);
        }

        $('.chips-autocomplete').material_chip({
            autocompleteOptions: {
                data: allGroups,
                limit: 20,
                minLength: 1
            }
        });
    })
});

$('#add-groups').on("click", function () {

    var groupsToAdd = [];
    $('.chips-autocomplete .chip').each(function (index, obj) {
        var trimmedVal = $(this).text().replace(/close/g, '');
        groupsToAdd.push(trimmedVal);
        $(this).remove();
    })

    $('.chips-autocomplete').material_chip({
        autocompleteOptions: {
            data: allGroups,
            limit: 20,
            minLength: 1
        }
    });

    var queryUrl = "/api/users/" + currentUserID + "/groups"

    var groupIds = [];

    groupsToAdd.forEach(function (groupName) {
        var index = allGroupData.findIndex(x => x.name == groupName);
        var groupID = allGroupData[index].id;
        groupIds.push(groupID);
    });

    $.post(queryUrl, { Ids: groupIds }, function (data) {

        for (var i = 0; i < groupsToAdd.length; i++) {

            var newChip = $("<div>");
            newChip.addClass("chip");
            newChip.text(groupsToAdd[i]);

            /*                 var check = $("<i>");
                            check.addClass("material-icons close");
                            check.text("check");
            
                            newChip.append(check); */
            $('#groups').append(newChip);
        }
    })
});

var allUserData;
var allUsers = {};

$(document).on("click", ".view-members", function () {
    $('.userInp').val("");
    $('#members').empty();
    $('#member-modal').modal('open');

    var id = $(this).attr("group-id");
    getMembers(id);
});

function getMembers(id) {
    var queryUrl = "/api/groups/" + id + "/members";

    $.get(queryUrl, function (data) {
        for (var i = 0; i < data.length; i++) {

            $('#members').attr("group-id", id);

            var newChip = $("<div>");
            newChip.addClass("chip");
            newChip.attr("user-id", data[i].id);
            newChip.text(data[i].userName);

            var userImage = $("<img>");
            userImage.attr("src", data[i].photoRef);
            userImage.attr("alt", "User Image")
            newChip.prepend(userImage);

            $('#members').append(newChip);
        }
    });

    $.get("api/users", function (data) {
        allUserData = data;

        for (var i = 0; i < data.length; i++) {
            allUsers[data[i].userName] = data[i].photoRef;
        }
        console.log(allUsers);
        $('input.autocomplete').autocomplete({
            data: allUsers,
            limit: 20,
            onAutocomplete: function (val) {
            },
            minLength: 1,
        });
    })
}

$("#add-user").on("click", function () {
    var groupID = $('#members').attr("group-id");
    var queryUrl = "/api/groups/" + groupID + "/members";

    var userName = $('.userInp').val().trim();

    var index = allUserData.findIndex(x => x.userName == userName);

    var newUserID = allUserData[index].id;
    var newUserPhoto = allUserData[index].photoRef;

    var addedUser = {
        id: newUserID
    }

    $.post(queryUrl, addedUser, function (data) {
        console.log(data[0]);

        $('.userInp').val("");

        var newChip = $("<div>");
        newChip.addClass("chip");
        newChip.attr("user-id", data.UserId);
        newChip.text(userName);

        var userImage = $("<img>");
        userImage.attr("src", newUserPhoto);
        userImage.attr("alt", "User Image")
        newChip.prepend(userImage);

        $('#members').append(newChip);

    })
});

$(document).on("click", ".disc-btn", function () {
    // Variables to store information for Firebase
    chatName = $(this).attr("data-key");
    username = "Whitney"; //Make this dynamic for group members
    // Create chat directories with unique names
    var chatData = database.ref("/chat/" + chatName);

    // Clears previous chat messages when appending
    $("#chat-messages").html("");
    chatData.orderByChild("time").off("child_added");

    // Render message to page. Update chat on screen when new message detected - ordered by 'time' value
    chatData.orderByChild("time").on("child_added", function (snapshot) {
        $("#chat-messages").append("<p class=chatMessages><span>" + snapshot.val().name + "</span>: " + snapshot.val().message + "</p>");
        // Keeps div scrolled to bottom on each update.
        $("#chat-messages").scrollTop($("#chat-messages")[0].scrollHeight);
    });

    // Unbind chat when clicked off of modal. Prevent multiple messages.
    $("#chat-send").off('click')
    // Chat send button listener, grabs input and pushes to firebase.
    $("#chat-send").click(function () {
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
    $("#chat-input").keypress(function (e) {
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

function newDiscussion() {
    $("#discussionList").on("click", ".add-discussion", function (event) {
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
        $.post(queryUrl, { name: discussionName }, function (data) {
            newDiscBtn = $("<a class='waves-effect waves-light btn modal-trigger disc-btn' href='#chat' data-key=chat" + data.id + ">" + data.name + "</a>");
            $(".discussionBtnArea" + data.id).append(newDiscBtn);
        });
    });
}

// Function to delete a discussion
function deleteDiscussion() {

}

// Function to determine active user
function activeUser() {
    $.get("/api/:user/:group/discussions", function (data) {

    })
}

newDiscussion();






