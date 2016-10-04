/**
 * Created by Cezary on 27.09.2016.
 */

requirejs(['jquery', 'secApp', "navigo_init", 'bootstrap', 'user_logic'], function ($, secApp) {
    "use strict";

    $("[id^=collapse]").on("click", function (e) {
        e.stopPropagation();
    });



    //new Tether({
    //    element: $('#login_description'),
    //    target: $('#collapseOne').parent(),
    //    attachment: 'middle left',
    //    targetAttachment: 'middle right'
    //});
    //
    //new Tether({
    //    element: $('#maze_description'),
    //    target: $('#collapseTwo').parent(),
    //    attachment: 'middle left',
    //    targetAttachment: 'middle right'
    //});
    //
    //new Tether({
    //    element: $('#author_description'),
    //    target: $('#collapseThree').parent(),
    //    attachment: 'middle left',
    //    targetAttachment: 'middle right'
    //});

});