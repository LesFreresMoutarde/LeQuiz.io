import React from "react";
import {Link} from "react-router-dom";
import Util from "../../../util/Util";

class Register extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            redirect: false,
        }

        Util.UserAccess.componentRequiresRole(Util.UserAccess.ROLES.GUEST_ONLY);
    }

    render = () => {
        return(
            <div className="text-center">
                <h1 className="mb">Inscription</h1>
                <p className="mb2">Tu as déjà un compte ? <Link to="/login">Connexion</Link></p>
                <form id="register-form" onSubmit={this.onRegisterFormSubmit}>
                    <div className="mb3 mt3">
                        <input className="full-width" name="username" placeholder="Nom d'utilisateur" autoFocus autoComplete="username"/>
                    </div>
                    <div className="mb3">
                        <input className="full-width" type="email" name="email" placeholder="Adresse email" autoComplete="email"/>
                    </div>
                    <div className="mb3">
                        <input className="full-width" type="password" name="password" placeholder="Mot de passe" autoComplete="new-password"/>
                    </div>
                    <div className="mb3">
                        <input className="full-width" type="password" name="passwordConfirm" placeholder="Confirmation du mot de passe" autoComplete="new-password"/>
                    </div>
                    <div className="mb3 text-left">
                        <label className="checkbox">
                            <input type="checkbox" name="stayLoggedIn"/>
                            <span>Rester connecté</span>
                        </label>
                    </div>

                    <button type="submit" className="button green mb3">Inscription</button>
                </form>
            </div>
        )
    }

    onRegisterFormSubmit = (e) => {
        e.preventDefault();
        console.log('Submit');
    }
}

export default Register;
