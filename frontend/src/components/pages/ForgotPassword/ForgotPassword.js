import React from "react";
import Util from "../../../util/Util";

import ApiUtil from "../../../util/ApiUtil";
import UserAccessUtil from "../../../util/UserAccessUtil";
import {app} from "../../App";
import {ON_CLICK_GO_BACK} from "../../misc/BackArrow";

/**
 * Component displayed when the user wants to receive an email to reset his/her password
 */
class ForgotPassword extends React.Component {
    constructor(props) {
        super(props);

        UserAccessUtil.componentRequiresRole(UserAccessUtil.ROLES.GUEST_ONLY);
    }

    componentDidMount() {
        app.showBackArrow(true, ON_CLICK_GO_BACK);
    }

    render = () => {
        return(
            <div className="text-center">
                <h1 className="mb">Mot de passe oublié</h1>
                <form id="forgot-password-form" onSubmit={this.onForgotPasswordFormSubmit}>
                    <div className="mb3 mt3">
                        <input className="full-width" id="username-input" name="username" placeholder="Nom d'utilisateur ou adresse email" autoFocus autoComplete="username" required/>
                    </div>
                    <button type="submit" className="button green mb2">Réinitialiser mon mot de passe</button>
                </form>
            </div>
        );
    }

    onForgotPasswordFormSubmit = async (e) => {
        e.preventDefault();

        // TODO make an automatic form serialization function in Util.js ?

        const username = document.getElementById('username-input').value;

        const response = await ApiUtil.sendJsonToAPI('/auth/forgot-password', {
            username,
        });

        const responseJson = await response.json();

        switch(response.status) {
            case 200:
                Util.verbose('Forgot password request successfully sent');
                app.toastr.success('Un email vous a été envoyé pour réinitialiser votre mot de passe.');
                break;
            case 404:
                app.toastr.error('Aucun utilisateur ne correspond à ce nom ou cette adresse email.');
                break;
            case 429:
                app.toastr.error(`Veuillez patienter ${responseJson.minutesToWait} minute${responseJson.minutesToWait > 1 ? 's' : ''} avant de demander un nouvel email de réinitialisation.`);
                break;
        }

        console.log(response.status, responseJson)
    }
}

export default ForgotPassword;
