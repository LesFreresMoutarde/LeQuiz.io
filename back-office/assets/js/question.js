import '../styles/question.scss';

import $ from 'jquery'

let timer;

function setColorStatus() {
    let statusColor = {'pending': 'orange', 'approved': 'green', 'disapproved': 'red'};
    document.querySelectorAll('.status-cell')
        .forEach(el => el.style.color = statusColor[el.innerHTML]);
}

function showAnswer(e) {
    let element = e.target.closest('span')

    element.classList.add('hide');
    element.closest('td').querySelector('.hide-cell').classList.add('show');
    element.closest('td').querySelector('.answer-cell').classList.add('show');
}


function hideAnswer(e) {
    let element = e.target.closest('span')

    element.classList.remove('show');
    element.closest('td').querySelector('.show-cell').classList.remove('hide');
    element.closest('td').querySelector('.answer-cell').classList.remove('show');
}

function putEventAnswers() {
    document.querySelectorAll(".show-cell")
        .forEach(el => el.addEventListener("click", (e) => {
            showAnswer(e);
        }, false));

    document.querySelectorAll(".hide-cell")
        .forEach(el => el.addEventListener("click", (e) => {
            hideAnswer(e);
        }, false));
}

function filterSearch(e) {
    let element = e.target;
    let value = $('#search-input').val();
    let type = $('#type').val() === '---' ? '---' : $('#type option:selected').attr('data-name');
    let difficulty = $('#difficulty').val() === '---' ? '---' : $('#difficulty option:selected').attr('data-name');
    let category = ($('#category').val() == '---') ? '---' : $('#category option:selected').attr('data-name');
    let status = $('#status').val() === '---' ? '---' : $('#status option:selected').attr('data-name');
    clearTimeout(timer);
    let ms = 200;
    timer = setTimeout(function () {
        if ((e.which <= 90 && e.which >= 48) || e.which === 8 || e.type === "change") {
            if (value.length >= 3 || value.length === 0) {
                let selector = $('.tbody-question').html('');
                $.ajax({
                    type: "GET",
                    url: '/question/search',
                    data: {
                        'str': value,
                        'type': type,
                        'difficulty': difficulty,
                        'status': status,
                        'category': category
                    },
                    success: function (res) {
                        // $.each(res.entities, function (index, entity) {
                        let result = JSON.parse(res);
                        if (result.length == 0) {
                            $('.tbody-question').append('<tr><td colspan="11">' + 'Pas de resultat' + '</td></tr>');
                            return;
                        }
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
                            line += '<td class="status-cell">' + result[index]['status'] + '</td>';

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
                            setColorStatus();
                            putEventAnswers()
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
    }, ms)
}



document.querySelector('#search-input').addEventListener('keyup', (e) => {
    filterSearch(e)
}, false);

document.querySelectorAll('.filters select').forEach(el => {
    el.addEventListener('change', (e) => {
        filterSearch(e)
    }, false);
}, false);

document.querySelector('#reset-filtre').addEventListener('click', () => {
    document.querySelectorAll('.filters select').forEach(el => el.selectedIndex = "0");
    document.querySelector('#search-input').value = '';
    var event = new Event('change');
    document.querySelector('.filters select').dispatchEvent(event);
}, false)


putEventAnswers();
setColorStatus();
