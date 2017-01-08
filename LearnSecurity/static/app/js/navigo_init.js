/**
 * Created by Cezary on 27.09.2016.
 */
define(['jquery', 'navigo', 'jquery-cookie'], function ($, navigo) {
    "use strict";

    var router = new navigo(null, true);
    var mazeSandBox = $("#sandBox");

    router
        .on({
            'Maze/:maze/:id': function showSpecificMazeLevel(param) {
                $.get("/Maze/" + param.maze + "/" + param.id).then(function (data) {
                    mazeSandBox.html(data);
                    mazeSandBox.addClass("animated fadeIn");
                    mazeSandBox.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
                        mazeSandBox.removeClass("animated fadeIn");
                        mazeSandBox.off('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend');
                        requirejs(['maze_logic'], function (maze_logic) {
                            maze_logic.init();
                        });
                    });
                });
            },
            '/': function showLandingPage() {
                $.get("/LandingPage/").then(function (data) {
                    mazeSandBox.html(data);
                    mazeSandBox.addClass("animated fadeIn");
                    mazeSandBox.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
                        mazeSandBox.removeClass("animated fadeIn");
                        mazeSandBox.off('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend');
                        requirejs(['landing_page'], function (landing_page) {
                            landing_page.init();
                        });
                    });
                });
            }
        }).resolve();
});