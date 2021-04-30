import '../styles/nav.scss';
import '../styles/app.scss';

document.querySelector('.icon-menu').addEventListener('click', () => {
    if(document.querySelector('.small-menu').style.display == 'block') {
        document.querySelector('.small-menu').style.display = 'none';
    }
    else {
        document.querySelector('.small-menu').style.display = 'block';
    }
});

document.querySelector('body').addEventListener('click', (e) => {
    let elem = e.target;
    if ( !elem.closest('.sidebar') &&  elem.classList.contains('.sidebar') == false) {
        document.querySelector('.small-menu').style.display = 'none';
    }
});

