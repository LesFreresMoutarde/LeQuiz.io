import '../styles/nav.scss';
import '../styles/app.scss';

document.querySelector('.icon-menu').addEventListener('click', () => {
    const menu = document.querySelector('.small-menu');

    if(menu.style.display === 'block') {
        menu.style.display = 'none';
    }
    else {
        menu.style.display = 'block';
    }
});

document.querySelector('body').addEventListener('click', (e) => {
    const elem = e.target;
    if ( !elem.closest('.sidebar') &&  elem.classList.contains('.sidebar') == false) {
        document.querySelector('.small-menu').style.display = 'none';
    }
});

const onResize = () => {
    document.querySelector('.small-menu').style.display = 'none';
};

window.addEventListener('resize', onResize, true);
