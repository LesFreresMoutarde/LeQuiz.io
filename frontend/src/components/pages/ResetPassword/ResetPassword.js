import React from "react";
import {Redirect} from "react-router-dom";
import Util from "../../../util/Util";

import Toastr from "toastr2";
import Loader from "../../misc/Loader";
import ApiUtil from "../../../util/ApiUtil";
const toastr = new Toastr();

/**
 * Component displayed when the user wants to receive an email to reset his/her password
 */
class ResetPassword extends React.Component {
    constructor(props) {
        super(props);

        this.userHasAccess = Util.UserAccess.componentRequiresRole(Util.UserAccess.ROLES.GUEST_ONLY);

        this.state = {
            isLoading: true,
            isCompleted: false,
            resetTokenExists: false,
        };
    }

    componentDidMount() {
        if(this.userHasAccess) {
            (async () => {
                const resetToken = window.location.pathname.split('/')[2];

                const tokenExistsResponse = await ApiUtil.performAPIRequest(`/auth/reset-password?passwordResetToken=${resetToken}`);

                if(tokenExistsResponse.ok) {
                    this.setState({
                        resetTokenExists: true,
                    });
                }

                this.setState({
                    isLoading: false,
                    resetToken,
                });
            })()
        }

    }

    render = () => {
        if(this.state.isCompleted) {
            return(
                <Redirect to="/login" />
            )
        }

        if(this.state.isLoading) {
            return (
                <div className="app loading">
                    <div className="app-loader">
                        <Loader width="max(8vw, 100px)"/>
                    </div>
                </div>
            );
        }

        if(!this.state.resetTokenExists) {
            return(
                <div className="text-center">
                    <h1 className="mb">Erreur</h1>
                    <p className="mb2">Ce lien ne peut pas ou plus être utilisé pour réinitialiser votre mot de passe.</p>
                </div>
            )
        }

        return (
            <div className="text-center">
                <h1 className="mb">Réinitialisez votre mot de passe</h1>
                <p className="mb2">Veuillez choisir un nouveau mot de passe.</p>
                <form id="reset-password-form" onSubmit={this.onResetPasswordFormSubmit}>
                    <div className="mb3 mt3">
                        <input className="full-width" id="new-password-input" type="password" name="newPassword" placeholder="Nouveau mot de passe" autoFocus autoComplete="new-password" required/>
                    </div>
                    <div className="mb3">
                        <input className="full-width" id="confirm-new-password-input" type="password" name="confirmNewPassword" placeholder="Confirmation du nouveau mot de passe" autoComplete="current-password" required/>
                    </div>
                    <button type="submit" className="button green mb2">Valider</button>
                </form>
            </div>
        )
    }

    onResetPasswordFormSubmit = async (e) => {
        e.preventDefault();

        // TODO make an automatic form serialization function in Util.js ?

        const newPassword = document.getElementById('new-password-input').value;
        const confirmNewPassword = document.getElementById('confirm-new-password-input').value;

        const response = await ApiUtil.sendJsonToAPI('/auth/reset-password', {
            newPassword,
            confirmNewPassword,
            passwordResetToken: this.state.resetToken,
        });

        switch(response.status) {
            case 204:
                Util.verbose('Password reset successful');

                toastr.success('Votre mot de passe a été réinitialisé.');

                this.setState({
                    isCompleted: true,
                })
                break;
            case 422:
                const responseJson = await response.json();

                for(const field in responseJson.errors) {
                    toastr.error(responseJson.errors[field]);
                }
                break;
            default:
                toastr.error('Une erreur inconnue est survenue.');
        }
    }
}

export default ResetPassword;
