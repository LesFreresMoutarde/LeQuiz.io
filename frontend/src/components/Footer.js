import React from "react";

const Footer = ({displayFeedbackModal}) => {

    return (
        <footer>
            <div className="footer-text">
                <span className="footer-text-item">© LeQuiz.io {(new Date()).getFullYear()}</span>
                <span className="footer-text-item"><a href="/contact" className="no-underline">Contact</a></span>
                <span className="footer-text-item"><a href="/mentions-legales" className="no-underline" target="_blank">Mentions légales</a></span>
                <button className="footer-text-item" onClick={() => displayFeedbackModal()}>Feedback</button>
            </div>
        </footer>
    );
}

export default Footer;
