import React, {useEffect, useState} from "react";
import {app} from "../../App";
import ApiUtil from "../../../util/ApiUtil";
import AuthUtil from "../../../util/AuthUtil";

const Contact = () => {

    const title = 'Contact';

    const [username, setUsername] = useState(app.state.user ? app.state.user.username : '');
    const [email, setEmail] = useState('');
    const [fetchedEmail, setFetchedEmail] = useState(false);
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchEmail = async () => {
            const response = await ApiUtil.performAPIRequest('/settings/email');

            if (!response.ok) return;

            const data = await response.json()

            setEmail(data.email);
            setFetchedEmail(data.email);
        }

        if (app.state.user) fetchEmail()

    }, [])

    const formElements = {
        'username': {label: 'nom d \'utilisateur', value: username},
        'email': {label: 'adresse email', value: email},
        'subject': {label: 'sujet', value: subject},
        'message': {label: 'message', value: message}
    };

    const submitForm = async (evt) => {
        evt.preventDefault()
        const errors = [];

        try {
            Object.keys(formElements).forEach(formElement => {
                if (formElements[formElement].value === '')
                    errors.push(`${formElements[formElement].label} doit être renseigné`)
            })

            if (errors.length > 0) throw new Error(errors.join('#'))

            if (!email.match(/\S+@\S+\.\S+/))
                errors.push(`${formElements.email.value} n'est pas une adresse valide`);

            if (app.state.user) {

                if (fetchedEmail) {
                    if (username !== AuthUtil.accessTokenPayload.user.username || email !== fetchedEmail)
                        throw new Error('les données saisies ne correspondent pas à vos informations personnelles');
                }

                if (username !== AuthUtil.accessTokenPayload.user.username)
                    throw new Error('les données saisies ne correspondent pas à vos informations personnelles');

            }

            const response = await ApiUtil.sendJsonToAPI('/users/contact', {username, email, subject, message});

            if (!response.ok)
                throw new Error('Impossible d\'envoyer votre message. Réessayez ultérieurement');

            app.toastr.success('Votre message a été envoyé. Nous vous répondrons dans les plus bref délais');

        } catch (error) {
            const errors = error.message.split('#');
            errors.reverse().forEach(error => {
                app.toastr.error(error)
            })
        }
    }

    return (
        <>
            <a href="/">Home</a>
            <h1 className="mb">{title}</h1>
            <form onSubmit={(e) => submitForm(e)}>
                <div className="mb">
                    <input type="text"
                           placeholder="nom d'utilisateur"
                           value={username}
                           onChange={(e) => setUsername(e.target.value)}
                           autoFocus={!app.state.user}
                           readOnly={app.state.user}
                    />
                </div>
                <div className="mb">
                    <input type="email"
                           placeholder="adresse email"
                           value={email}
                           onChange={(e) => setEmail(e.target.value)}
                           readOnly={fetchedEmail}
                    />
                </div>
                <div className="mb">
                    <input type="text"
                           placeholder="sujet"
                           value={subject}
                           onChange={(e) => setSubject(e.target.value)}
                    />
                </div>
                <div className="mb">
                    <textarea cols="100"
                              rows="10"
                              placeholder="message"
                              value={message}
                              onChange={(e) => setMessage(e.target.value)}
                    />
                </div>
                <div>
                    <input type="submit" value="Envoyer"/>
                </div>
            </form>
        </>
    )

}

export default Contact;
