import React from "react";

const Footer = ({showModal}) => {

    return (
        <footer>
            <div className="footer-text">
                <span className="footer-text-item">© LeQuiz.io {(new Date()).getFullYear()}</span>
                {/*-*/}
                <button className="footer-text-item" onClick={() => showModal()}>Feedback</button>
                {/*<span className="footer-text-item"><a href="#" target="_blank">Mentions légales</a></span>*/}
            </div>
        </footer>
    );
}

export default Footer;
