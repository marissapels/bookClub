$(document).ready(function () {

    // console.log(location.origin)
    // console.log(location.pathname)

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
                discButton.addClass("waves-effect waves-light btn view-discussions");
                //discButton.attr("data-id", "");
                discButton.html("View Discussions");

                var memberButton = $("<a>");
                memberButton.addClass("waves-effect waves-light btn view-members");
                memberButton.attr("group-id", data[i].id);
                memberButton.attr("href", "#member-modal");
                memberButton.html("View Members");

                itemBody.append(discButton, memberButton);

                newItem.append(itemHeader, itemBody);
                $("#groupList").append(newItem);

                $('.collapsible').collapsible();
                $('.modal').modal();
            }
        });
    }

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

                /*                 var userImage = $("<img>");
                                userImage.attr("src", data[i].photoRef);
                                userImage.attr("alt", "User Image")
                                newChip.prepend(userImage); */

                $('#members').append(newChip);
            }
        });

        $.get("api/users", function (data) {
            allUserData = data;

            for (var i = 0; i < data.length; i++) {
                allUsers[data[i].userName] = data[i].photoRef;
            }

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

        index = allUserData.findIndex(x => x.userName == userName);

        var newUserID = allUserData[index].id;

        var addedUser = {
            id: newUserID
        }

        $.post(queryUrl, addedUser, function (data) {
            console.log(data[0]);

             $('.userInp').val("");
            //$('#members').empty();
            //getMembers(groupID);

             var newChip = $("<div>");
            newChip.addClass("chip");
            newChip.attr("user-id", data.UserId);
            newChip.text(userName);  
            $('#members').append(newChip);
        })
    });



});


