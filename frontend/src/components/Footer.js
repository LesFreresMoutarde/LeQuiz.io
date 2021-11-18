import React from "react";
import {Link} from "react-router-dom";

const Footer = ({displayFeedbackModal, mobile}) => {

    if (mobile) {
        return (
            <footer>
                <div>
                    <button className="footer-text-item footer-feedback-button" onClick={() => displayFeedbackModal()}>Feedback</button>
                </div>
                <div>
                    <span className="footer-text-item"><a href="/mentions-legales" className="no-underline" target="_blank">Mentions légales</a></span>
                    <span className="footer-text-item"><Link to="/contact" className="no-underline">Contact</Link></span>
                </div>
                <div>
                    <span className="footer-text-item">© LeQuiz.io {(new Date()).getFullYear()}</span>
                </div>
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
