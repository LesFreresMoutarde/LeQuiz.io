import '../styles/question.scss';

let timer;

const setColorStatus = () => {
    const statusColor = {'pending': 'orange', 'approved': 'green', 'disapproved': 'red'};

    document.querySelectorAll('.status-cell')
        .forEach(el => el.style.color = statusColor[el.innerHTML]);
};

const showAnswer = (e) => {
    const element = e.target.closest('span');

    element.classList.add('hide');
    element.closest('td').querySelector('.hide-cell').classList.add('show');
    element.closest('td').querySelector('.answer-cell').classList.add('show');
};

const hideAnswer = (e) => {
    const element = e.target.closest('span');

    element.classList.remove('show');
    element.closest('td').querySelector('.show-cell').classList.remove('hide');
    element.closest('td').querySelector('.answer-cell').classList.remove('show');
};

const putEventAnswers = () => {
    document.querySelectorAll(".show-cell")
        .forEach(el => el.addEventListener("click", (e) => {
            showAnswer(e);
        }, false));

    document.querySelectorAll(".hide-cell")
        .forEach(el => el.addEventListener("click", (e) => {
            hideAnswer(e);
        }, false));
};

const computeField = (data, field) => {
    let res = '';
    if (field === 'types' || field === 'categories') {
        data.forEach(el => {
            let value = document.createElement("p");
            value.innerHTML = el['name'];
            res += value.outerHTML;
        });
        return '<td>' + res + '</td>';
    } else if (field === 'answer') {
        res = '<td class="content-answer-cell">' +
            '<span class="show-cell"><i class="fas fa-eye"></i></span>' +
            '<span class="hide-cell"><i class="fas fa-minus-circle"></i></span>' +
            '<div class="answer-cell">';
        data['answers'].forEach(el => {
            let value = document.createElement("p");
            value.style.color = (el['is_good_answer']) ? 'forestgreen' : 'red';
            value.innerHTML = el['content'];
            res += value.outerHTML;
        });
        res += '</div></td>';
        return res;
    } else if (field === 'status') {
        return '<td class="status-cell">' + data + '</td>';
    }
    return '<td>' + data + '</td>';
};

const appendLine = (data) => {
    const fields = ['id', 'types', 'difficulty', 'categories', 'content', 'answer', 'status', 'media', 'createdAt', 'updatedAt']
    const parent = document.querySelector('.tbody-question');
    const lines = JSON.parse(data);
    for (let index = 0; index < lines.length; index++) {
        let line = document.createElement("tr");
        fields.forEach(el => {
            line.innerHTML += computeField(lines[index][el], el);
        });
        line.innerHTML += '<td><a href="/question/' + lines[index]['id'] + '"><i class="fas fa-eye"></i></a>' +
            '<a href="/question/' + lines[index]['id'] + '/edit"><i class="fas fa-edit"></i></a></td>';
        parent.append(line);
    }
};

const promiseAjax = (parameters) => {
    const parent = document.querySelector('.tbody-question');
    const myPromise = new Promise(function (myResolve, myReject) {
        const req = new XMLHttpRequest();
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
            if (data.length > 2) {
                appendLine(data);
                setColorStatus();
                putEventAnswers();
            }
            else {
                parent.innerHTML = '<tr><td colspan="11">Pas de resultat</td></tr>';
            }
        },
        function (error) {
            parent.innerHTML= '<tr><td colspan="11">Pas de resultat</td></tr>';
        }
    );
};

const filterSearch = (e) => {
    const value = document.querySelector('#search-input').value;
    const pagination = document.querySelector('.pagination');
    const delay = 200;
    const parent = document.querySelector('.tbody-question');
    const parameters = {
        'value': value,
        'type': document.querySelector('#type').value,
        'difficulty': document.querySelector('#difficulty').value,
        'category': document.querySelector('#category').value,
        'status': document.querySelector('#status').value
    };

    if (parameters['value'].length >= 3) {
        pagination.style.display = 'none'
    } else if (parameters['value'].length === 0) {
        pagination.style.display = 'flex'
    }
    clearTimeout(timer);
    timer = setTimeout(function () {
        if ((e.which <= 90 && e.which >= 48) || e.which === 8 || e.type === "change") {
            if (value.length >= 3 || value.length === 0) {
                parent.innerHTML = '';
                promiseAjax(parameters)
            }
        }
    }, delay);
};

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
    const event = new Event('change');
    document.querySelector('.filters select').dispatchEvent(event);
}, false)

putEventAnswers();
setColorStatus();
