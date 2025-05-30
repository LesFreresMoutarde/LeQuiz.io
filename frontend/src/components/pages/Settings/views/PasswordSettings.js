import React from "react";

import ApiUtil from "../../../../util/ApiUtil";
import {app} from "../../../App";

class PasswordSettings extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            error: false,
            formErrors: {},
            email: null,
        }
    }

    onInputUpdate = (e) => {
        const inputName = e.target.getAttribute('name');

        if(this.state.formErrors.hasOwnProperty(inputName)) {
            const state = this.state;
            delete state.formErrors[inputName];
            this.setState(state);
        }
    }

    onPasswordFormSubmit = async (e) => {
        e.preventDefault();

        // TODO make an automatic form serialization function in Util.js ?

        const passwordInput = document.getElementById('current-password-input');
        const newPasswordInput = document.getElementById('new-password-input');
        const confirmNewPasswordInput = document.getElementById('confirm-new-password-input');

        const currentPassword = passwordInput.value;
        const newPassword = newPasswordInput.value;
        const confirmNewPassword = confirmNewPasswordInput.value;

        const response = await ApiUtil.sendJsonToAPI('/settings/password', {
            currentPassword,
            newPassword,
            confirmNewPassword,
        }, {
            method: 'PATCH',
        });

        if(!response.ok) {
            if([401, 422].includes(response.status)) {
                const responseJSON = await response.json();
                this.handleErrors(responseJSON.errors);
                return;
            }
            const state = this.state;
            state.error = true;
            state.formErrors = {};
            this.setState(state);
            return;
        }

        passwordInput.value = '';
        newPasswordInput.value = '';
        confirmNewPasswordInput.value = '';

        app.toastr.success('Votre mot de passe a été mis à jour');
    }

    handleErrors = (errors) => {
        const state = this.state;
        state.formErrors = errors;
        this.setState(state);

        for(const field in this.state.formErrors) {
            app.toastr.error(this.state.formErrors[field]);
        }
    }

    render = () => {
        if(this.state.error) {
            return(
                <p>Une erreur est survenue.</p>
            )
        } else {
            return(
                <div className="settings-section-container">
                    <div className="password-settings-form-container">
                        <form id="password-settings-form" onSubmit={this.onPasswordFormSubmit}>
                            <div className="mb3 mt3">
                                <input className={"full-width" + (this.state.formErrors.currentPassword ? ' error' : '')} id="current-password-input" type="password" name="currentPassword" placeholder="Mot de passe actuel" autoComplete="current-password" required onInput={this.onInputUpdate}/>
                            </div>
                            <div className="mb3">
                                <input className={"full-width" + (this.state.formErrors.newPassword ? ' error' : '')} id="new-password-input" type="password" name="newPassword" placeholder="Nouveau mot de passe" autoComplete="new-password" required onInput={this.onInputUpdate}/>
                            </div>
                            <div className="mb3">
                                <input className={"full-width" + (this.state.formErrors.confirmNewPassword ? ' error' : '')} id="confirm-new-password-input" type="password" name="confirmNewPassword" placeholder="Confirmation du nouveau mot de passe" autoComplete="new-password" required onInput={this.onInputUpdate}/>
                            </div>

                            <div className="settings-form-submit-button-container">
                                <button type="submit" className="button green mb3">Changer de mot de passe</button>
                            </div>
                        </form>
                    </div>
                </div>
            )
        }
    }
}

export default PasswordSettings;
