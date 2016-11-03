/**
 * Created by Cezary on 27.09.2016.
 */
define(['jquery', 'navigo', 'jquery-cookie'], function ($, navigo) {
    "use strict";

    var router = new navigo(null, false);

    function setPreviousURL() {
        router.pause(true);
        router.navigate("#/" + $.cookie("previousUrl"));
        router.pause(false);
    }

    router
        .on({
            // TODO
            // Proper maze list open-close link setup after action.
            // This is for proper behaviour in case of page refresh
            'Maze/:maze/:id': function showSpecificMazeLevel(param) {
                $.get("/Maze/" + param.maze + "/" + param.id).then(function (data) {
                    var mazeSandBox = $("#sandBox");
                    mazeSandBox.html(data);
                    mazeSandBox.addClass("animated fadeIn");
                    mazeSandBox.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
                        mazeSandBox.removeClass("animated fadeIn");
                        mazeSandBox.off('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend');
                    });
                });
                //$.cookie("previousUrl", window.location.href.split("#")[1], {path: "/"});
            },
            'Maze/:maze': function showSpecificMazeLevelList(param) {
                $.get("/Maze/" + param.maze).then(function (data) {
                    var mazeDescDiv = $("#mazeDesc");
                    mazeDescDiv.html(data);

                    if ($("#navigationBar").hasClass("col-lg-3")) {
                        mazeDescDiv.parent().show();
                        $("#navigationBar").toggleClass("col-lg-4 col-lg-3");
                        $("#mainNavigationBar").toggleClass("col-lg-7 col-lg-12");
                        $("#sandBox").toggleClass("col-lg-8 col-lg-9");

                    }

                    mazeDescDiv.addClass("animated fadeIn");
                    mazeDescDiv.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
                        mazeDescDiv.removeClass("animated fadeIn");
                        mazeDescDiv.off('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend');
                    });

                });
                //setPreviousURL();
            },
            'Maze': function closeSpecificMazeLevelList() {
                var mazeDescDiv = $("#mazeDesc");

                if ($("#navigationBar").hasClass("col-lg-4")) {
                    mazeDescDiv.addClass("animated slideOutLeft");
                    $("#mainNavigationBar").toggleClass("col-lg-7 col-lg-12");
                    $("#navigationBar").toggleClass("col-lg-4 col-lg-3");
                    $("#sandBox").toggleClass("col-lg-8 col-lg-9");
                }

                mazeDescDiv.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
                    mazeDescDiv.parent().hide();
                    mazeDescDiv.removeClass("animated slideOutLeft");
                    mazeDescDiv.off('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend');
                });
                //setPreviousURL();
                window.location = "#/";
            }
        }).resolve();
});