import React from "react";

class Footer extends React.Component {
    render = () => {
        return (
            <footer>
                <div className="footer-text">
                    <span className="footer-text-item">© LeQuiz.io {(new Date()).getFullYear()}</span>
                    <span className="footer-text-item"><a href="/contact">Contact</a></span>
                    {/*<span className="footer-text-item"><a href="#" target="_blank">Mentions légales</a></span>*/}
                </div>
            </footer>
        )
    }
}

export default Footer;
