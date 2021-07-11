import React from "react";

const Footer = ({displayFeedbackModal}) => {

    return (
        <footer>
            <span className="footer-text-item">© LeQuiz.io {(new Date()).getFullYear()}</span>
            <span className="footer-text-item"><a href="/mentions-legales" className="no-underline" target="_blank">Mentions légales</a></span>
            <span className="footer-text-item"><a href="/contact" className="no-underline">Contact</a></span>
            <button className="footer-text-item footer-feedback-button" onClick={() => displayFeedbackModal()}>Feedback</button>
        </footer>
    );
}

export default Footer;
