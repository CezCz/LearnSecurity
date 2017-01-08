/**
 * Created by Cezary on 27.09.2016.
 */
requirejs(['jquery', 'secApp', "navigo_init", 'bootstrap', 'user_logic'], function ($) {
    "use strict";

    var mazeListState = localStorage.getItem("mazeListState");
    if (mazeListState !== null) {
        $("#navigationBar, #mainNavigationBar, #sandBox, #mazeDesc").css({transition: "all 0.01s"});
        showSpecificMazeLevelList(mazeListState);
        $("#navigationBar, #mainNavigationBar, #sandBox").removeAttr("style");
    }

    $.fn.exists = function () {
        return this.length !== 0;
    };

    $(".listLevels").on("click", function () {
        showSpecificMazeLevelList($(this).attr("data-maze-name"));
    });

    function showSpecificMazeLevelList(param) {
        $.get("/Maze/" + param).then(function (data) {
            var mazeDescDiv = $("#mazeDesc");
            var navbar = $("#navigationBar");
            mazeDescDiv.html(data);

            var currentlyOpenedState = localStorage.getItem("mazeListState");
            var isOpened = mazeDescDiv.is(":visible");

            if (!isOpened || currentlyOpenedState !== param) {
                localStorage.setItem("mazeListState", param);
                if (navbar.hasClass("col-lg-3")) {
                    navbar.toggleClass("col-lg-4 col-lg-3");
                    $("#mainNavigationBar").toggleClass("col-lg-7 col-lg-12");
                    $("#sandBox").toggleClass("col-lg-8 col-lg-9");

                    navbar.on('transitionend webkitTransitionEnd oTransitionEnd', function () {
                        mazeDescDiv.parent().show();
                        mazeDescDiv.addClass("animated fadeInLeft");
                        navbar.off('transitionend webkitTransitionEnd oTransitionEnd');
                    });

                    mazeDescDiv.on('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
                        mazeDescDiv.removeClass("animated fadeInLeft");
                        mazeDescDiv.off('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend');
                    });
                } else {
                    mazeDescDiv.addClass("animated fadeInLeft");
                }

                mazeDescDiv.on('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
                    mazeDescDiv.removeClass("animated fadeInLeft");
                    mazeDescDiv.off('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend');
                });


                $("#closeMazeCard").on("click", function () {
                    closeSpecificMazeLevelList();
                    $("#closeMazeCard").off("click");
                });
            }
        });
    }

    function closeSpecificMazeLevelList() {
        var mazeDescDiv = $("#mazeDesc");
        var navbar = $("#navigationBar");

        if (navbar.hasClass("col-lg-4")) {
            localStorage.removeItem("mazeListState");

            mazeDescDiv.addClass("animated fadeOutLeft");

            mazeDescDiv.on('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
                mazeDescDiv.parent().hide();
                mazeDescDiv.removeClass("animated fadeOutLeft");
                mazeDescDiv.off('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend');
                $("#mainNavigationBar").toggleClass("col-lg-7 col-lg-12");
                navbar.toggleClass("col-lg-4 col-lg-3");
                $("#sandBox").toggleClass("col-lg-8 col-lg-9");
                mazeDescDiv.off('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend');
            });
        }
    }


    $("[id^=collapse]").on("click", function (e) {
        e.stopPropagation();
    });
});