import React from "react";
import Loader from "../../../misc/Loader";

import ApiUtil from "../../../../util/ApiUtil";
import {app} from "../../../App";

class EmailSettings extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            error: false,
            formErrors: {},
            email: null,
        }
    }

    componentDidMount = async () => {
        const response = await ApiUtil.performAPIRequest('/settings/email');

        if(!response.ok) {
            const state = this.state;
            state.isLoading = false;
            state.error = true;
            this.setState(state);
            return;
        }

        const responseJSON = await response.json();

        const state = this.state;
        state.isLoading = false;
        state.email = responseJSON.email;
        this.setState(state);
    }

    onInputUpdate = (e) => {
        const inputName = e.target.getAttribute('name');

        if(this.state.formErrors.hasOwnProperty(inputName)) {
            const state = this.state;
            delete state.formErrors[inputName];
            this.setState(state);
        }
    }

    onEmailFormSubmit = async (e) => {
        e.preventDefault();

        // TODO make an automatic form serialization function in Util.js ?

        const newEmailInput = document.getElementById('new-email-input');
        const passwordInput = document.getElementById('password-input');

        const newEmail = newEmailInput.value;
        const password = passwordInput.value;

        const response = await ApiUtil.sendJsonToAPI('/settings/email', {
            newEmail,
            password,
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

        const responseJSON = await response.json();

        const state = this.state;
        state.email = responseJSON.email;
        this.setState(state);

        newEmailInput.value = '';
        passwordInput.value = '';

        app.toastr.success('Votre adresse email a été mise à jour');
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
        if(this.state.isLoading) {
            return(
                <Loader width="50px"/>
            )
        } else if(this.state.error) {
            return(
                <p>Une erreur est survenue.</p>
            )
        } else {
            return(
                <>
                    <p>Votre adresse email actuelle est <strong>{this.state.email}</strong></p>
                    <form id="email-settings-form" onSubmit={this.onEmailFormSubmit} style={{maxWidth: '600px'}}>
                        <div className="mb3 mt3">
                            <input className={"full-width" + (this.state.formErrors.newEmail ? ' error' : '')} id="new-email-input" type="email" name="newEmail" placeholder="Nouvelle adresse email" autoComplete="email" required onInput={this.onInputUpdate}/>
                        </div>
                        <div className="mb3">
                            <input className={"full-width" + (this.state.formErrors.password ? ' error' : '')} id="password-input" type="password" name="password" placeholder="Mot de passe" autoComplete="current-password" required onInput={this.onInputUpdate}/>
                        </div>
                        <button type="submit" className="button green mb3">Changer d'adresse email</button>
                    </form>
                </>
            )
        }
    }
}

export default EmailSettings;
