/**
 * Created by Cezary on 06.01.2017.
 */
define(['jquery', 'presentate'], function ($, presentate) {
    "use strict";
    return {
        "init": function () {
            $("#initGuide").on("click", function (e) {
                var sandbox = $("#sandBox");
                var userwrapper = $("#userWrapper");
                var login = $("#loginComponent");
                var logout = $("#logoutComponent");
                var maze = $("#mazeTab");
                var author = $("#about_author");

                var presentationData = {
                    steps: [{
                        parentElement: sandbox,
                        descElement: "<p class='text-primary infoText sketchText bubbleText text-justify'>All the magic would happen here, <br/> all the maze specific elements would land in here.</p>",
                        mobile: {
                            offset: "300px 0",
                            attachment: "middle center",
                            targetAttachment: "middle center"
                        },
                        normal: {
                            attachment: "middle center",
                            targetAttachment: "middle center"
                        }
                    }, {
                        parentElement: userwrapper,
                        descElement: "<p class='text-primary infoText sketchText bubbleText text-justify'>Here's some user quality stuff. It's is to make things personal. <br/> Register users can change picture and will be greeted by name.</p>",
                        mobile: {
                            offset: "-300px 0",
                            attachment: "middle center",
                            targetAttachment: "middle center"
                        },
                        normal: {
                            offset: "0 -16px"
                        }

                    }, {
                        parentElement: login,
                        descElement: "<p class='text-primary infoText text-justify'>Login form, plain and simple. Register button can be found here :). </p>",
                        mobile: {
                            offset: "-100px 0",
                            attachment: "middle center",
                            targetAttachment: "middle center",
                            click: clickOnCollapseIfNotShown
                        },
                        normal: {
                            offset: "0 -16px",
                            click: clickOnCollapseIfNotShown
                        }

                    }, {
                        parentElement: logout,
                        descElement: "<p class='text-primary infoText text-justify'>Well, this is self-explanatory.</p>",
                        mobile: {
                            offset: "-100px 0",
                            attachment: "middle center",
                            targetAttachment: "middle center",
                            click: clickOnCollapseIfNotShown
                        },
                        normal: {
                            offset: "0 -16px",
                            click: clickOnCollapseIfNotShown
                        }
                    }, {
                        parentElement: author,
                        descElement: "<p class='text-primary infoText text-justify'>If you like my work, please let me know.</p>",
                        mobile: {
                            offset: "-100px 0",
                            attachment: "middle center",
                            targetAttachment: "middle center",
                            click: clickOnCollapseIfNotShown
                        },
                        normal: {
                            offset: "0 -16px",
                            click: clickOnCollapseIfNotShown
                        }
                    }, {
                        parentElement: maze,
                        descElement: "<p class='text-primary infoText text-justify'>All mazes are listed here. <br/> Clicking on one will cause an additional list of maze steps. <br/> Every consists of some interesting topic with excercises. <br/> Let's see whats under BasicLinux <br/> This is last step in this presentation, good luck! </p>",
                        mobile: {
                            offset: "-150px 0",
                            attachment: "middle center",
                            targetAttachment: "middle center",
                            click: clickOnCollapseIfNotShown
                        },
                        normal: {
                            offset: "0 -16px",
                            click: clickOnCollapseIfNotShown
                        }
                    }],
                    onEnd: function () {
                        initGuideButton.prop("disabled", false);
                        $("#BasicLinux")[0].click();
                    }
                };

                function clickOnCollapseIfNotShown(element) {
                    if (!element.find(".in").exists()) {
                        element.click();
                    }
                }

                var initGuideButton = $(e.target);
                initGuideButton.prop("disabled", true);
                presentate.startPresentation(presentationData);
            });
        }
    };
});

