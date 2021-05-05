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

const computeField = (data, field) => {
    let res = ''
    if (field === 'types' || field === 'categories') {
        data.forEach(el => {
            let value = document.createElement("p");
            value.innerHTML = el['name'];
            res += value.outerHTML;
        });
        return res;
    }
    else if (field === 'answer') {
        data['answers'].forEach(el => {
            let value = document.createElement("p");
            value.style.color = (el['is_good_answer']) ? 'forestgreen' : 'red' ;
            value.innerHTML = el['content'];
            res += value.outerHTML;
        });
        return res;
    }
    else
        return data;
};

const appendLine = (data) => {
    const fields = ['id', 'types', 'difficulty', 'categories', 'content', 'answer', 'status', 'media', 'createdAt', 'updatedAt']
    const parent = document.querySelector('.tbody-question');
    const lines = JSON.parse(data);
    for (let index = 0; index < lines.length; index++) {
        let line = document.createElement("tr");
        fields.forEach(el => {
            line.innerHTML += '<td>' + computeField(lines[index][el], el) + '</td>';
        });
        line.innerHTML += '<td><a href="/question/' + lines[index]['id'] + '"><i class="fas fa-eye"></i></a>' +
                          '<a href="/question/' + lines[index]['id'] + '/edit"><i class="fas fa-edit"></i></a></td>';
        parent.append(line);
    }


};

const promiseAjax = (parameters) => {
    let myPromise = new Promise(function (myResolve, myReject) {
        let req = new XMLHttpRequest();
        req.open('POST', "/question/search", true);
        req.onload = () => {
            if (req.status === 200) {
                myResolve(req.response);
            } else {
                myReject("Aucun Résultat");
            }
        };
        req.send(JSON.stringify(parameters));
    });

    myPromise.then(
        function (data) {
            appendLine(data);
            setColorStatus();
            putEventAnswers();
            if (parameters['value'].length >= 3) {
                $('.pagination').css('display', 'none');
            } else if (parameters['value'].length === 0) {
                $('.pagination').css('display', 'flex');
            }
        },
        function (error) {
            parent.append('<tr><td colspan="11">' + error + '</td></tr>');
        }
    );

};

const filterSearch = (e) => {
    const value = document.querySelector('#search-input').value;
    const type = document.querySelector('#type');
    const difficulty = document.querySelector('#difficulty');
    const category = document.querySelector('#category');
    const status = document.querySelector('#status');
    const delay = 200;
    const parameters = {
        'value': value,
        'type': type.value === '---' ? '---' : document.querySelector('#type option:selected').attr('data-name'),
        'difficulty': difficulty.value === '---' ? '---' : document.querySelector('#difficulty option:selected').attr('data-name'),
        'category': category.value === '---' ? '---' : document.querySelector('#category option:selected').attr('data-name'),
        'status': status.value === '---' ? '---' : document.querySelector('#status option:selected').attr('data-name')
    };
    clearTimeout(timer);
    timer = setTimeout(function () {
        if ((e.which <= 90 && e.which >= 48) || e.which === 8 || e.type === "change") {
            if (value.length >= 3 || value.length === 0) {
                promiseAjax(parameters)
            }
        }
    }, delay);
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
