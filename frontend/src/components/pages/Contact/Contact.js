import React, {useState} from "react";
import App from "../../App";
import Toastr from "toastr2";
import ApiUtil from "../../../util/ApiUtil";
import AuthUtil from "../../../util/AuthUtil";

const Contact = () => {

    const title = 'Contact';

    const [username, setUsername] = useState(App.GLOBAL.state.user ? App.GLOBAL.state.user.username : '');
    const [email, setEmail] = useState(App.GLOBAL.state.user ? App.GLOBAL.state.user.email : '');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');

    const formElements = {
        'username': {label: 'nom d \'utilisateur', value: username},
        'email': {label: 'adresse email', value: email},
        'subject': {label: 'sujet', value: subject},
        'message': {label: 'message', value: message}
    };

    const toastr = new Toastr();

    const submitForm = async (evt) => {
        // Valider le form (chaque élément est différent de '') DONE
        // vérifier que c'est un email DONE
        // Si App.GLOBAL.user == true Vérifier que le username et l'email correspondent  DONE
        // Envoyer le JSON au serv

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

            if (App.GLOBAL.state.user) {
                console.log(AuthUtil.accessTokenPayload.user);
                //TODO Attendre reéponse Emile sur reconnexion après chgt email et password
                if (username !== AuthUtil.accessTokenPayload.user.username
                    ||
                    email !== AuthUtil.accessTokenPayload.user.email)
                    throw new Error('les données saisies ne correspondent pas à vos informations personnelles');
            }

            const response = await ApiUtil.sendJsonToAPI('/users/contact', {username, email, subject, message});

            if (!response.ok)
                throw new Error('Impossible d\'envoyer votre message. Réessayez ultérieurement')

            toastr.success('Votre message a été envoyé. Nous vous répondrons dans les plus bref délais');

        } catch (error) {
            const errors = error.message.split('#');
            errors.reverse().forEach(error => {
                toastr.error(error)
            })

        }
    }

    return (
        <>
            <h1 className="mb">{title}</h1>
            <form onSubmit={(e) => submitForm(e)}>
                <div className="mb">
                    <input type="text"
                           placeholder="nom d'utilisateur"
                           value={username}
                           onChange={(e) => setUsername(e.target.value)}
                           autoFocus={!App.GLOBAL.state.user}
                           readOnly={App.GLOBAL.state.user}
                           // required={true}
                    />
                </div>
                <div className="mb">
                    <input type="email"
                           placeholder="adresse email"
                           value={email}
                           onChange={(e) => setEmail(e.target.value)}
                           readOnly={App.GLOBAL.state.user}
                           // required={true}
                    />
                </div>
                <div className="mb">
                    <input type="text"
                           placeholder="sujet"
                           value={subject}
                           onChange={(e) => setSubject(e.target.value)}
                           // required={true}
                    />
                </div>
                <div className="mb">
                    <textarea cols="100"
                              rows="10"
                              placeholder="message"
                              // required={true}
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
