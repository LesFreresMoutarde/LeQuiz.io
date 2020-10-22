import React from "react";
import {Link} from "react-router-dom";

class Login extends React.Component {
    render = () => {
        return(
            <div className="text-center">
                <h1 className="mb">Connexion</h1>
                <p className="mb2">Tu n'as pas encore de compte ? <Link to="/register">Inscription</Link></p>
                <form id="login-form" onSubmit={this.onLoginFormSubmit}>
                    <div className="mb3 mt3">
                        <input className="full-width" name="username" placeholder="Nom d'utilisateur" autoFocus autoComplete="username"/>
                    </div>
                    <div className="mb3">
                        <input className="full-width" type="password" name="password" placeholder="Mot de passe" autoComplete="current-password"/>
                    </div>
                    <div className="mb3 text-left">
                        <label className="checkbox">
                            <input type="checkbox" name="stayLoggedIn"/>
                            <span>Rester connecté</span>
                        </label>
                    </div>
                    <button type="submit" className="button green mb3">Connexion</button>
                </form>
            </div>
        )
    }

    onLoginFormSubmit = (e) => {
        e.preventDefault();
        console.log('Submit');
    }
}

export default Login;