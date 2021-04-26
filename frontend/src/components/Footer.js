import React from "react";

const Footer = ({displayModal}) => {

    return (
        <footer>
            <div className="footer-text">
                <span className="footer-text-item">© LeQuiz.io {(new Date()).getFullYear()}</span>

                <span className="footer-text-item"><a href="/contact">Contact</a></span>
                <button className="footer-text-item" onClick={() => displayModal()}>Feedback</button>
                {/*<span className="footer-text-item"><a href="#" target="_blank">Mentions légales</a></span>*/}
            </div>
        </footer>
    );
}

export default Footer;
