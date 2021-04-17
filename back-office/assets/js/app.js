import '../styles/nav.scss';
import '../styles/app.scss';

import $ from 'jquery'

$('.sidebar').mouseover(function () {
    $('#content-body').css({"width": "calc(100% - 260px)"})
});

$('.sidebar').mouseleave(function () {
    $('#content-body').css({"width": "calc(100% - 100px)"})
});
