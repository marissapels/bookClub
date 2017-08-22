$(document).ready(function () {

    $('.modal').modal();
    $('.collapsible').collapsible();
    var usersGroups;

    getGroups();

    // Get the user's groups and discussions when the page loads
    function getGroups() {
        var queryUrl = "/api/groups/discussions"

        $.get(queryUrl, function (data) {
            usersGroups = data;
            displayGroups(data);
        })
    };

    // Display the user's groups and discussions
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

        $.post("/api/groups", { name: nameInput }, function (data) {
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

        var queryUrl = "api/groups/" + id + "/discussions"

        $.post(queryUrl, { name: nameInput }, function (data) {
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
        var newGroupArray = [];
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

        var groupIds = [];

        groupsToAdd.forEach(function (groupName) {
            var index = allGroupData.findIndex(x => x.name == groupName);
            var groupID = allGroupData[index].id;
            groupIds.push(groupID);
        });

        $.post("/api/users/groups", { Ids: groupIds }, function (data) {
            for (var i = 0; i < groupsToAdd.length; i++) {
                var newChip = $("<div>");
                newChip.addClass("chip");
                newChip.text(groupsToAdd[i]);
                $('#groups').append(newChip);

            }
        })
    });

    $('#groups-modal-close').on("click", function () {
        location.reload();
    })

    var allUserData;
    // Object for holding all user info to be displayed in "add a member" modal autocomplete
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
                newChip.text(data[i].name);

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
                allUsers[data[i].name] = data[i].photoRef;
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

        var userName = $('.userInp').val().trim();
        var index = allUserData.findIndex(x => x.name == userName);
        var newUserID = allUserData[index].id;
        var newUserPhoto = allUserData[index].photoRef;

        var groupID = $('#members').attr("group-id");
        var queryUrl = "/api/groups/" + groupID + "/members";

        var addedUser = {
            id: newUserID
        }

        $.post(queryUrl, addedUser, function (data) {
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

});


