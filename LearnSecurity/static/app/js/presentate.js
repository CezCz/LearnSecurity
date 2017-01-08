/**
 * Created by Cezary on 04.01.2017.
 */

define(['jquery'], function ($) {
    "use strict";

    var presentationSteps;
    var onEnd;
    var currentStep;
    var prevElem;
    var allLeaves;

    function startPresentation(data) {
        presentationSteps = data.steps;
        onEnd = data.onEnd;
        currentStep = 0;
        prevElem = 1;
        allLeaves = $('body *:not(:has(*))');

        $("body").append("<button class='btn btn-lg btn-primary wobble animated' id='presentNext' style='position:fixed; top:20px; right:130px; z-index:999;'>Next</button>");
        $("body").append("<button class='btn btn-lg btn-primary wobble animated' id='finishPresentation' style='position:fixed; top:20px; right:20px; z-index:999;'>Finish</button>");
        allLeaves.addClass("opaque02");

        $("#presentNext").on("click", function () {
            presentNextStep();
        });

        $("#finishPresentation").on("click", function () {
            finishPresentation();
        });

        $("body").on("shown.bs.collapse hidden.bs.collapse", function () {
            window.Tether.position();
        });

        executePresentation();
    }

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
        $("body").unbind("shown.bs.collapse hidden.bs.collapse");
        onEnd();
    }

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

    return {"startPresentation": startPresentation};
});

