/**
 * Created by Cezary on 03.10.2016.
 */
define(['jquery', "secApp", "presentate", "typed"], function ($, secApp, presentate) {
    "use strict";
    return {
        "init": function () {
            var placement = window.innerWidth > 991 ? "left" : "top";

            $('body').on('click', function (e) {
                if ($(e.target).closest(".popover").length === 0) {
                    $('.popover').popover('hide');
                }
            });

            $("div[id*='step']").on("click", function (e) {
                e.stopPropagation();
            });

            function getInformation() {
                var maze = $(this).attr("data-maze");
                var level = $(this).attr("data-maze-level");
                var step = $(this).attr("data-maze-step");
                return {maze: maze, level: level, step: step};
            }

            var passwordInput = $(".passwordInput");

            passwordInput.on("keyup", function () {
                var icon = $(this).find("i");
                if (!icon.hasClass("fa-spinner")) {
                    $(this).siblings("span").html("<i class='fa fa-spinner fa-spin' aria-hidden='true'></i>");
                }
            });

            passwordInput.on("keyup", secApp.debounce(function () {
                var mazeLevelStepInfo = getInformation.call($(this));
                var password = $(this).val();
                if (password === "") {
                    // debounce makes this race condition safe
                    $(this).siblings("span").html("<i class='fa fa-arrow-right text-primary' aria-hidden='true'></i>");
                } else {
                    $.post("Maze/" + mazeLevelStepInfo.maze + "/" + mazeLevelStepInfo.level + "/check/" + mazeLevelStepInfo.step, {answer: password}).then(function (data) {
                        if (data.check === true) {
                            $(this).siblings("span").html("<i class='fa fa-check text-success' aria-hidden='true'></i>");
                            $(this).closest("li").find(".passedTick").html('<i class="fa fa-check tada animated" aria-hidden="true"></i>');
                        } else {
                            $(this).siblings("span").html("<i class='fa fa-times text-danger' aria-hidden='true'></i>");
                        }
                    }.bind(this));
                }
            }, 500));


            $("button[data-type='help']").on("click", function () {
                var mazeLevelStepInfo = getInformation.call(this);
                $.post("Maze/" + mazeLevelStepInfo.maze + "/" + mazeLevelStepInfo.level + "/help/" + mazeLevelStepInfo.step).then(function (data) {
                    $(this).popover({content: data.help, placement: placement, title: "Help!"});
                    $(this).popover('show');
                }.bind(this));

            });

            $("button[data-type='peek']").on("click", function () {

                var mazeLevelStepInfo = getInformation.call(this);
                $.post("Maze/" + mazeLevelStepInfo.maze + "/" + mazeLevelStepInfo.level + "/peek/" + mazeLevelStepInfo.step).then(function (data) {
                    $(this).popover({content: data.peek, placement: placement, title: "Password"});
                    $(this).popover('show');
                }.bind(this));
            });

            if ($("#terminal").length !== 0) {
                var triggerConsole = function () {
                    var terminal = $("#terminal");
                    $('.terminalBody').html(terminal.attr("data-prompt-begin") + ' <span class="typeplace"></span>');
                    var typeplace = $(".typeplace");
                    if (window.previousTypedObject) {
                        window.previousTypedObject.reset();
                    }

                    typeplace.typed({
                        strings: [terminal.attr("data-command")],
                        typeSpeed: 20,
                        startDelay: 200,
                        callback: function () {
                            setTimeout(function () {
                                var terminalBody = $(".terminalBody");
                                terminalBody.find(".typed-cursor").remove();
                                terminalBody.append("<pre class='terminalPre'>" + terminal.attr("data-result") + "</pre>");
                                terminalBody.append("<span>" + terminal.attr("data-prompt-end") + " </span>");
                            }, 500);
                        }
                    });

                    window.previousTypedObject = typeplace.data('typed');
                };

                triggerConsole();
                $("#restartTerminal").on('click', function () {
                    triggerConsole();
                });
            }
        }
    };
});

