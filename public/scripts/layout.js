$(document).ready(function () {
    if ($(".server-menu").length > 0) {
        var menu = new mdc.menu.MDCSimpleMenu($(".server-menu")[0]);

        $("header").find(".server-menu-button").click(function () {
            menu.open = !menu.open;
        });

        var pwddlg = new mdc.dialog.MDCDialog($("#set-password-dialog")[0]);

        $(".set-password-button").on("click", function () {
            var form = $("#change-password-form");
            var message = "";

            if (isNaN(form.find("#user-id").val())) {
                message += "Falscher Nutzer.<br />";
            }

            if (form.find("#new-password").val() == "") {
                message += "Du musst ein Passwort vergeben.<br />";
            }

            if (form.find("#new-password").val().length < 8) {
                message += "Das Passwort muss aus mind. 8 Zeichen bestehen.<br />";
            }

            if (form.find("#new-password").val() != form.find("#confirm-password").val()) {
                message += "Passwörter stimmen nicht überein.<br />";
            }

            if (message == "") {
                form.submit();
            } else {
                form.find("#password-message").html(message);
            }
        });

        $(".change-password").click(function () {
            pwddlg.show();
        });

        $(".logout-button").click(function () {
            window.location.href = "/logout";
        });
    }
});
