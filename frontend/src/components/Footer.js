import React from "react";
import {Link} from "react-router-dom";

const Footer = ({displayFeedbackModal, isMobile}) => {

    if (isMobile) {
        return (
            <footer className="mobile-footer">
                <span className="footer-text-item mb">© LeQuiz.io {(new Date()).getFullYear()}</span>
                <span className="mb">
                    <span className="footer-text-item"><a href="/mentions-legales" className="no-underline" target="_blank">Mentions légales</a></span>
                <span className="footer-text-item"><Link to="/contact" className="no-underline">Contact</Link></span>
                </span>
                <button className="footer-text-item footer-feedback-button" onClick={() => displayFeedbackModal()}>Feedback</button>
            </footer>
        )
    }
    return (
        <footer>
            <span className="footer-text-item">© LeQuiz.io {(new Date()).getFullYear()}</span>
            <span className="footer-text-item"><a href="/mentions-legales" className="no-underline" target="_blank">Mentions légales</a></span>
            <span className="footer-text-item"><Link to="/contact" className="no-underline">Contact</Link></span>
            <button className="footer-text-item footer-feedback-button" onClick={() => displayFeedbackModal()}>Feedback</button>
        </footer>
    );
}

export default Footer;
