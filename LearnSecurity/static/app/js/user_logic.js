/**
 * Created by Cezary on 27.09.2016.
 */
define(['jquery'], function ($) {
    "use strict";

    var loginForm = $('#loginForm');
    var logoutButton = $("#logoutButton");

    logoutButton.on('click', handleLogout);
    loginForm.on('submit', handleLogin);

    $("#changePasswordTrigger").on("click", function () {
        var changePassFormHandler = function (form, url) {
            handleForm(form, url);
        };
        displayModalForm("#editPasswordModal", "/change/password/", "#editPasswordForm", changePassFormHandler);
    });

    $("#editUserTrigger").on("click", function () {
        var editUserFormHandler = function (form, url) {
            handleForm(form, url);
            createCustomImageInput();
        };
        displayModalForm("#editUserModal", "/change/credentials/", "#editUserForm", editUserFormHandler);
    });

    $("#registerTrigger").on("click", function () {
        var registerFormHandler = function (form, url) {
            handleForm(form, url);
        };
        displayModalForm("#registerModal", "/register/", "#registerForm", registerFormHandler);
    });

    function displayModalForm(modalId, modalUrl, formId, formHandleFunction) {
        var modal = $(modalId);

        if (modalExists()) {
            $.get(modalUrl).then(function (data) {
                var modal = $(data).modal();
                modal.on('shown.bs.modal', function () {
                    var form = $(formId);
                    $('#id_username').focus();

                    if ($._data(form.get(0), "events") === undefined) {
                        formHandleFunction(form, modalUrl);
                    }
                });
                modal.on('hidden.bs.modal', function () {
                    var form = $(formId);
                    getSubmitButton(form).attr('class', 'btn btn-secondary');
                    removeIconFromSubmitButton(form);
                });
            });
        } else {
            modal.modal();
        }

        function modalExists() {
            return modal.length === 0;
        }
    }

    function createCustomImageInput() {
        $("body").on('click', '#close-preview', function () {
            var imgPreview = $('.image-preview');
            imgPreview.popover('hide');
            // Hover befor close the preview
            imgPreview.hover(
                function () {
                    imgPreview.popover('show');
                },
                function () {
                    imgPreview.popover('hide');
                }
            );
        });

        $(function () {
            // Create the close button
            var closebtn = $('<button/>', {
                type: "button",
                text: 'x',
                id: 'close-preview',
                style: 'font-size: initial;'
            });
            closebtn.attr("class", "close pull-right");
            // Set the popover default content
            $('.image-preview').popover({
                trigger: 'manual',
                html: true,
                title: "<strong>Preview</strong>" + $(closebtn)[0].outerHTML,
                content: "There's no image",
                placement: 'top'
            });
            // Clear event
            $('.image-preview-clear').click(function () {
                $('.image-preview').attr("data-content", "").popover('hide');
                $('.image-preview-filename').val("");
                $('.image-preview-clear').hide();
                $('.image-preview-input input:file').val("");
                $(".image-preview-input-title").text("Browse");
            });
            // Create the preview image
            $(".image-preview-input input:file").change(function () {
                var img = $('<img/>', {
                    id: 'dynamic',
                    width: 250,
                    height: 250
                });
                var file = this.files[0];
                var thisInput = $(this);
                var reader = new FileReader();
                reader.onload = function (e) {
                    $(".image-preview-input-title").text("Change");
                    $(".image-preview-clear").show();
                    $(".image-preview-filename").val(file.name);
                    img.attr('src', e.target.result);
                    thisInput.attr('file-data', e.target.result);
                    $(".image-preview").attr("data-content", $(img)[0].outerHTML).popover("show");
                };
                reader.readAsDataURL(file);
            });
        });
    }

    function clearFormFeedback(form) {
        var inputs = form.find(':input');
        inputs.removeClass("form-control-danger");
        inputs.siblings(".form-control-feedback").text("");
        inputs.parent("div").removeClass("has-danger");
        getSubmitButton(form).attr('class', 'btn btn-secondary');
        removeIconFromSubmitButton(form);
        return inputs;
    }

    function extractInputValues(inputs) {
        var values = {};
        inputs.each(function () {
            if (!$(this).is("[type=file]")) {
                values[this.name] = $(this).val();
            } else {
                values[this.name] = $(this).attr('file-data');
            }
        });
        return values;
    }

    function getSubmitButton(form) {
        return form.find("[data-type=submit]");
    }

    function addSpinnerToSubmitButton(form) {
        var submitButton = getSubmitButton(form);
        submitButton.append("<i class='fa fa-spinner fa-spin' aria-hidden='true'></i>");
    }

    function removeIconFromSubmitButton(form) {
        getSubmitButton(form).find("i").remove();
    }

    function feedbackFormSubmissionFail(data, form) {
        var errors = JSON.parse(data.responseText);
        var feedbackDiv = $("<div>");
        feedbackDiv.addClass("form-control-feedback");
        for (var error in errors) {
            if (errors.hasOwnProperty(error)) {
                var inputWithError = form.find('[name=' + error + ']');
                if (inputWithError.length !== 0) {
                    inputWithError.parent("div").addClass("has-danger");
                    inputWithError.addClass('form-control-danger');
                    if (inputWithError.siblings(".form-control-feedback").length === 0) {
                        inputWithError.after(feedbackDiv.clone());
                    }
                    var errorDiv = inputWithError.siblings(".form-control-feedback");
                    errorDiv.text(errors[error].join(" "));
                }
            }
        }

        getSubmitButton(form).attr('class', 'btn btn-danger');
        getSubmitButton(form).append("<i class='fa fa-times wobble animated' aria-hidden='true'></i>");
        console.warn("Registration failed");
    }

    function feedbackFormSubmissionSuccess(form) {
        var submitInput = getSubmitButton(form);
        submitInput.attr('class', 'btn btn-success');
        submitInput.append("<i class='fa fa-check tada animated' aria-hidden='true'></i>");
    }

    function handleForm(form, postUrl) {
        form.on("submit", function (e) {
            e.stopPropagation();

            var inputs = clearFormFeedback(form);
            var values = extractInputValues(inputs);
            console.log(values);

            addSpinnerToSubmitButton(form);
            $.post(postUrl, values).always(function () {
                removeIconFromSubmitButton(form);
            }).then(function () {
                feedbackFormSubmissionSuccess(form);
            }).fail(function (errors) {
                feedbackFormSubmissionFail(errors, form);
            });

            return false;
        });
    }

    function handleLogout(e) {
        e.stopPropagation();
        var logoutButton = $(e.target);
        logoutButton.append("<i class='fa fa-spinner fa-spin' aria-hidden='true'></i>");
        $.post("logout/").then(function () {
            $("body").fadeOut();
            location.reload();
        }).fail(function () {
            console.warn("Logout failed for unknown reasons");
        }).always(function () {
            logoutButton.find("i").remove();
        });
    }

    function handleLogin(e) {
        var inputs = $('#loginForm').find(':input');
        inputs.removeClass("form-control-danger");
        inputs.siblings(".form-control-feedback").text("");
        inputs.parent("div").removeClass("has-danger");
        var loginButton = $(e.target).find("button");
        loginButton.append("<i class='fa fa-spinner fa-spin' aria-hidden='true'></i>");

        var values = {};
        inputs.each(function () {
            if ($(this).is(":checkbox")) {
                values[this.name] = $(this).is(':checked');
            } else {
                values[this.name] = $(this).val();
            }
        });

        $.post("login/", values).then(function () {
            $("body").fadeOut();
            location.reload();
        }).fail(function (data) {

            var errors = JSON.parse(data.responseText);
            var allInputs = loginForm.find('input');
            allInputs.addClass("form-control-danger");
            allInputs.parent("div").addClass("has-danger");

            var feedbackDiv;

            if (loginForm.find(".form-control-feedback").length === 0) {
                feedbackDiv = $("<div>");
                feedbackDiv.addClass("form-control-feedback");
                allInputs.eq(-2).after(feedbackDiv);
            } else {
                feedbackDiv = $('#loginForm').find(".form-control-feedback");
            }

            var errorArray = [];
            for (var key in errors) {
                if (errors.hasOwnProperty(key)) {
                    errorArray.push(errors[key]);
                }
            }
            var flattenArray = [].concat.apply([], errorArray);

            feedbackDiv.text(flattenArray.join(" "));
            console.warn("Login failed");
        }).always(function () {
            loginButton.find("i").remove();
        });
        return false;
    }

});