import React from "react";
import { Link, Redirect } from "react-router-dom";

class ForgotPassword extends React.Component {
    constructor(props) {
        super(props);

        if(this.props.currentUser) {
            this.state = {
                redirect: true,
            }
        } else {
            this.state = {
                redirect: false,
            }
        }
    }

    render = () => {
        if(this.state.redirect) {
            return(
                <Redirect to="/" />
            )
        }

        return(
            <div className="text-center">
                <h1 className="mb">Mot de passe oublié</h1>
                <p className="mb2"><Link to="/login">Retour</Link></p>
                <form id="forgot-password-form" onSubmit={this.onForgotPasswordFormSubmit}>
                    <div className="mb3 mt3">
                        <input className="full-width" id="username-input" name="username" placeholder="Nom d'utilisateur ou adresse email" autoFocus autoComplete="username" required/>
                    </div>
                    <button type="submit" className="button green mb2">Réinitialiser le mot de passe</button>
                </form>
            </div>
        );
    }

    onForgotPasswordFormSubmit = async (e) => {
        e.preventDefault();
        console.log(e);
    }
}

export default ForgotPassword;
