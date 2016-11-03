/**
 * Created by Cezary on 27.09.2016.
 */

requirejs(['jquery', 'secApp', "navigo_init", 'bootstrap', 'user_logic'], function ($) {
    "use strict";

    $.fn.exists = function () {
        return this.length !== 0;
    };

    $("#initGuide").on("click", function (e) {
        var initGuideButton = $(e.target);
        initGuideButton.prop("disabled", true);

        var sandbox = $("#sandBox");
        var userwrapper = $("#userWrapper");
        var login = $("#loginComponent");
        var logout = $("#logoutComponent");
        var maze = $("#mazeTab");
        var author = $("#about_author");
        var currentStep = 0;
        var prevElem = 1;

        var presentationSteps = [{
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
        }];

        function onEnd() {
            $("#BasicLinux").find("a")[0].click();
        }

        function clickOnCollapseIfNotShown(element) {
            if (!element.find(".in").exists()) {
                element.click();
            }
        }

        var allLeaves = $('body *:not(:has(*))');
        $("body").append("<button class='btn btn-lg btn-secondary wobble animated' id='presentNext' style='position:fixed; top:20px; right:130px; z-index:999;'>Next</button>");
        $("body").append("<button class='btn btn-lg btn-secondary wobble animated' id='finishPresentation' style='position:fixed; top:20px; right:20px; z-index:999;'>Finish</button>");
        allLeaves.addClass("opaque02");

        $("#presentNext").on("click", function () {
            presentNextStep();
        });

        $("#finishPresentation").on("click", function () {
            finishPresentation();
        });

        function executePresentation() {
            var currentElement = presentationSteps[currentStep];
            var elementOptions = window.innerWidth > 991 ? currentElement.normal : currentElement.mobile;
            var domParentElement = currentElement.parentElement;


            if (domParentElement.exists()) {
                if (elementOptions.click !== undefined) {
                    elementOptions.click(domParentElement);
                }

                if (currentStep !== 0) {
                    presentationSteps[currentStep - prevElem].parentElement.find("*:not(:has(*)").addClass("opaque02");
                    presentationSteps[currentStep - prevElem].parentElement.removeClass("markOutline");
                    prevElem = 1;
                }

                domParentElement.find("*").removeClass("opaque02");
                domParentElement.addClass("markOutline");

                $("body").find(".presentationTether").remove();
                $("body").append($(currentElement.descElement).addClass("presentationTether"));


                createTether($(".presentationTether"), domParentElement, elementOptions.attachment, elementOptions.targetAttachment, elementOptions.offset);

                $('html, body').animate({
                    scrollTop: domParentElement.offset().top - 100
                }, 500);

            } else {
                prevElem += 1;
                presentNextStep();
            }
        }

        function presentNextStep() {
            currentStep += 1;
            if (presentationSteps.length === currentStep) {
                finishPresentation();
            } else {
                executePresentation();
            }
        }

        function finishPresentation() {
            $("body").find(".presentationTether").remove();
            allLeaves.removeClass("opaque02");
            presentationSteps.forEach(function (elem) {
                elem.parentElement.find("*:not(:has(*)").removeClass("opaque02");
                elem.parentElement.removeClass("markOutline");
            });
            $("#presentNext").remove();
            $("#finishPresentation").remove();
            initGuideButton.prop("disabled", false);
            onEnd();
        }

        executePresentation();
    });

    $("[id^=collapse]").on("click", function (e) {
        e.stopPropagation();
    });


    function createTether(element, target, attachment, targetAttachment, offset) {
        attachment = attachment ? attachment : 'middle left';
        targetAttachment = targetAttachment ? targetAttachment : 'middle right';

        if (element.exists() && target.exists()) {
            var options = {
                element: element,
                target: target,
                attachment: attachment,
                targetAttachment: targetAttachment,
                targetModifier: 'visible'
            };

            if (offset !== "" && offset !== undefined) {
                options.offset = offset;
            }

            new window.Tether(options);
            setTimeout(function () {
                window.Tether.position();
            });
        }
    }

    $("body").on("shown.bs.collapse hidden.bs.collapse", function () {
        window.Tether.position();
    });

});