import '../styles/question.scss';

import $ from 'jquery'

$(document).on('click', '.show-cell i', function (e) {
    let element = e.target;
    $(element).css('display', 'none');
    $(element).closest('td').find('.hide-cell').css('display', 'block');
    $(element).closest('td').find('.hide-cell i').css('display', 'block');
    $(element).closest('td').find('.answer-cell').css('display', 'block');
})

$(document).on('click', '.hide-cell i', function (e) {
    let element = e.target;
    $(element).css('display', 'none');
    $(element).closest('td').find('.show-cell i').css('display', 'block');
    $(element).closest('td').find('.answer-cell').css('display', 'none');
})

$("td:contains('pending')").css('color', 'orange');
$("td:contains('approved')").css('color', 'green');
$("td:contains('disapproved')").css('color', 'red');
$("td:contains('medium')").css('color', 'blue');
$("td:contains('hard')").css('color', 'red');
$("td:contains('easy')").css('color', 'green');

$('.search-input').keyup(function (e) {
    let element = e.target;
    let value = $(this).val();
    if ((e.which <= 90 && e.which >= 48) || e.which === 8) {
        if (value.length >= 3 || value.length === 0) {
            let selector = $('.tbody-question').html('');
            $.ajax({
                type: "GET",
                url: '/question/search',
                data: {
                    'str': value
                },
                success: function (res) {
                    // $.each(res.entities, function (index, entity) {
                    let result = JSON.parse(res);
                    $('.total-question').html('Nombre de resultat : ' + result.length);
                    for (let index = 0; index < result.length; index++) {
                        let types = '';
                        let categories = '';
                        let answers = '';
                        let medias = '';

                        let line =
                            '<tr>' +
                            '<td>' + result[index]['id'] + '</td>';

                        for (var type in result[index]['types']) {
                            types += result[index]['types'][type]['name'] + '\n';
                        }
                        line += '<td>' + types + '</td>' +
                            '<td>' + result[index]['difficulty'] + '</td>';
                        for (var category in result[index]['categories']) {
                            categories += result[index]['categories'][category]['name'] + '\n';
                        }
                        line += '<td>' + categories + '</td>';

                        line +=
                            '<td>' + result[index]['content'] + '</td>' +
                            '<td class="content-answer-cell">' +
                            '   <span class="show-cell"><i class="fas fa-eye"></i></span>' +
                            '   <span class="hide-cell"><i class="fas fa-minus-circle"></i></span>' +
                            '   <div class="answer-cell">';
                        for (var answer in result[index]['answer']) {
                            for (var rep in result[index]['answer'][answer]) {
                                if (result[index]['answer'][answer][rep]['is_good_answer'] == true) {
                                    answers += '<p style="color: forestgreen">' + result[index]['answer'][answer][rep]['content'] + '</p>';
                                } else {
                                    answers += '<p style="color: red">' + result[index]['answer'][answer][rep]['content'] + '</p>';
                                }
                            }
                        }
                        line += answers;
                        line += '</div></td>';
                        line += '<td>' + result[index]['status'] + '</td>';

                        if (result[index]['media'].length) {
                            for (var media in result[index]['media']) {
                                medias += '<span>' + result[index]['media'][media]['url'] + ' : ' + result[index]['media'][media]['type'] + '</span>';
                            }
                        } else {
                            medias += 'N/A Media'
                        }
                        line += '<td>' + medias + '</td>';
                        line +=
                            '<td>' + (result[index]['createdAt'] ? result[index]['createdAt'] : 'N/A Created') + '</td>' +
                            '<td>' + (result[index]['updatedAt'] ? result[index]['updatedAt'] : 'N/A Updated') + '</td>' +
                            '<td>' +
                            '   <a href="/question/' + result[index]['id'] + '"><i class="fas fa-eye"></i></a>' +
                            '   <a href="/question/' + result[index]['id'] + '/edit"><i class="fas fa-edit"></i></a>' +
                            '</td>' +
                            '</tr>';

                        $('.tbody-question').append(line);
                        $("td:contains('pending')").css('color', 'orange');
                        $("td:contains('approved')").css('color', 'green');
                        $("td:contains('disapproved')").css('color', 'red');
                        $("td:contains('medium')").css('color', 'blue');
                        $("td:contains('hard')").css('color', 'red');
                        $("td:contains('easy')").css('color', 'green');
                        if (value.length >= 3) {
                            $('.pagination').css('display', 'none');
                        } else if (value.length === 0) {
                            $('.pagination').css('display', 'flex');
                        }

                    }
                }
            })
        }
    }
})
