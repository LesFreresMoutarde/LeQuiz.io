import '../styles/nav.scss';
import '../styles/app.scss';

import $ from 'jquery'

$('.icon-menu').click(function () {
    $('.small-menu').toggle();
})

$('body').click(function (event)
{
    if(!$(event.target).closest('.sidebar').length && !$(event.target).is('.sidebar')) {
        $(".small-menu").hide();
    }
});
