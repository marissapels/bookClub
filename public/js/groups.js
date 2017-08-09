$(document).ready(function () {

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



