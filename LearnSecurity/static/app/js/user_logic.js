/**
 * Created by Cezary on 27.09.2016.
 */
define(['jquery'], function ($) {
    "use strict";

    $("#changePasswordTrigger").on("click", function () {
        var editPassModal = $("#editPasswordModal");
        if (editPassModal.length === 0) {
            $.get("/change/password/").then(function (data) {
                var modal = $(data).modal();
                modal.on('shown.bs.modal', function () {
                    var editPassForm = $("#editPasswordForm");
                    $('#id_username').focus();

                    if ($._data(editPassForm.get(0), "events") === undefined) {
                        handleForm(editPassForm, "/change/password/");
                    }
                });
            });
        } else {
            editPassModal.modal();
        }
    });

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
                placement: 'bottom'
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
                    height: 200
                });
                var file = this.files[0];
                var reader = new FileReader();
                reader.onload = function (e) {
                    $(".image-preview-input-title").text("Change");
                    $(".image-preview-clear").show();
                    $(".image-preview-filename").val(file.name);
                    img.attr('src', e.target.result);
                    $(".image-preview").attr("data-content", $(img)[0].outerHTML).popover("show");
                };
                reader.readAsDataURL(file);
            });
        });
    }

    $("#editUserTrigger").on("click", function () {
        var editUserModal = $("#editUserModal");
        if (editUserModal.length === 0) {
            $.get("/change/credentials/").then(function (data) {
                var modal = $(data).modal();
                modal.on('shown.bs.modal', function () {
                    var editUserForm = $("#editUserForm");
                    $('#id_username').focus();

                    if ($._data(editUserForm.get(0), "events") === undefined) {
                        handleForm(editUserForm, "/change/credentials/");
                        createCustomImageInput();
                    }

                });
            });
        } else {
            editUserModal.modal();
        }
    });

    $("#registerTrigger").on("click", function () {
        var registerModal = $("#registerModal");
        if (registerModal.length === 0) {
            $.get("/register/").then(function (data) {
                var modal = $(data).modal();
                modal.on('shown.bs.modal', function () {
                    var registerForm = $("#registerForm");
                    $('#id_username').focus();

                    if ($._data(registerForm.get(0), "events") === undefined) {
                        handleForm(registerForm, "/register/");
                    }

                });
            });
        } else {
            registerModal.modal();
        }
    });

    function clearFormFeedback(form) {
        var inputs = form.find(':input');
        inputs.removeClass("form-control-danger");
        inputs.siblings(".form-control-feedback").text("");
        inputs.parent("div").removeClass("has-danger");
        return inputs;
    }

    function extractInputValues(inputs) {
        var values = {};
        inputs.each(function () {
            values[this.name] = $(this).val();
        });
        return values;
    }

    function addSpinnerToSubmitButton(form) {
        var submitButton = form.find("[data-type=submit]");
        submitButton.append("<i class='fa fa-spinner fa-spin' aria-hidden='true'></i>");
    }

    function removeSpinnerFromSubmitButton(form) {
        var submitButton = form.find("[data-type=submit]");
        submitButton.find("i").remove();
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
        console.warn("Registration failed");
    }

    function feedbackFormSubmissionSuccess() {
        console.log("test");
    }

    function handleForm(form, postUrl) {
        form.on("submit", function (e) {
            e.stopPropagation();

            var inputs = clearFormFeedback(form);
            var values = extractInputValues(inputs);

            addSpinnerToSubmitButton(form);
            $.post(postUrl, values).then(function () {
                feedbackFormSubmissionSuccess(form);
            }).always(function () {
                removeSpinnerFromSubmitButton(form);
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

    var loginForm = $('#loginForm');

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

    $("#logoutButton").on('click', handleLogout);

    loginForm.on('submit', function (e) {
        return handleLogin(e);
    });
    loginForm.on('click', function (e) {
        e.stopPropagation();
    });

    $("[id^=collapse]").on("click", function (e) {
        e.stopPropagation();
    });


});