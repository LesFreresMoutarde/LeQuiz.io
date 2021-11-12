import React, {useState} from "react";
import ApiUtil from "../../../util/ApiUtil";
import {app} from "../../App";
import QuitCross from "../../misc/QuitCross";

const FeedbackModal = ({closeModal}) => {

    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');

    const sendFeedback = async () => {
        try {
            const feedback = {}

            if (message === '')
                throw new Error('message vide');

            if (subject) feedback['subject'] = subject;

            feedback['message'] = message;
            const response = await ApiUtil.sendJsonToAPI('/users/feedback', feedback);

            if (!response.ok)
                throw new Error('Impossible d\'envoyer votre message. Réessayez ultérieurement');

            app.toastr.success('Votre message a été envoyé. Merci de nous aider à améliorer leQuiz.io');

        } catch (error) {
            app.toastr.error(error.message);
        }
    }

    const handleKeyPress = async (charCode) => {
        if (charCode === 13) await sendFeedback()
    }

    return (
        <div className="feedback-modal-app-overlay" onClick={closeModal}>
            <div className="feedback-modal"
                 onClick={(e) => {e.stopPropagation()}}
            >
                <div className="feedback-modal-close-cross-container">
                    <QuitCross onClick={closeModal} />
                </div>

                <div className="feedback-modal-title">
                    Feedback
                </div>

                <input type="text"
                       className="feedback-modal-subject-input"
                       value={subject}
                       placeholder="Sujet"
                       autoFocus={true}
                       onChange={(e) => setSubject(e.target.value)}
                       onKeyPress={(e) => handleKeyPress(e.charCode)}
                />

                <textarea className="feedback-modal-message-textarea"
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          placeholder="Message"
                          rows="8"/>

                <div className="feedback-modal-submit-button-container">
                    <button type="submit" className="button green" onClick={() => {sendFeedback()}}>Envoyer</button>
                </div>
            </div>
        </div>

    )
}

export default FeedbackModal;
