import React from "react";
import {Link, Redirect} from "react-router-dom";
import Util from "../../../util/Util";
import App from "../../App";

import Toastr from "toastr2";
import BackArrow from "../../misc/BackArrow";
const toastr = new Toastr();

class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            redirect: false,
        }

        Util.UserAccess.componentRequiresRole(Util.UserAccess.ROLES.GUEST_ONLY);
    }

    goBack = () => {
        this.props.history.goBack();
    };

    render = () => {
        if(this.state.redirect) {
            return(
                <Redirect to="/"/>
            )
        }

        return(
            <>
                <BackArrow onClick={this.goBack}/>
                <div className="text-center">
                    <h1 className="mb">Connexion</h1>
                    <p className="mb2">Tu n'as pas encore de compte ? <Link to="/register">Inscription</Link></p>
                    <form id="login-form" onSubmit={this.onLoginFormSubmit}>
                        <div className="mb3 mt3">
                            <input className="full-width" id="username-input" name="username" placeholder="Nom d'utilisateur ou adresse email" autoFocus autoComplete="username" required/>
                        </div>
                        <div className="mb3">
                            <input className="full-width" id="password-input" type="password" name="password" placeholder="Mot de passe" autoComplete="current-password" required/>
                        </div>
                        <div className="mb3 text-left">
                            <label className="checkbox">
                                <input type="checkbox" id="stay-logged-in-checkbox" name="stayLoggedIn"/>
                                <span>Rester connecté</span>
                            </label>
                        </div>
                        <button type="submit" className="button green mb2">Connexion</button>
                    </form>
                    <small><Link to="/forgot-password">Mot de passe oublié</Link></small>
                </div>
            </>
        )
    }

    onLoginFormSubmit = async (e) => {
        e.preventDefault();

        // TODO make an automatic form serialization function in Util.js ?

        const username = document.getElementById('username-input').value;
        const password = document.getElementById('password-input').value;
        const stayLoggedIn =  document.getElementById('stay-logged-in-checkbox').checked;

        const response = await Util.sendJsonToAPI('/auth/login', {
            username,
            password,
            stayLoggedIn,
        });

        const responseJson = await response.json()

        switch(response.status) {
            case 200:
                Util.verbose('Login successful');
                Util.setAccesstoken(responseJson.accessToken);
                Util.setRefreshToken(responseJson.refreshToken);

                App.GLOBAL.setUser(Util.accessTokenPayload.user);

                this.setState({
                    redirect: true,
                })
                break;
            case 403:
                console.log(responseJson);
                toastr.error("Vous avez été banni jusqu'à TODO");
                break;
            case 404:
                toastr.error('Ces identifiants sont incorrects');
                break;
            default:
                toastr.error('Une erreur inconnue est survenue');
                break;
        }
    }
}

export default Login;
