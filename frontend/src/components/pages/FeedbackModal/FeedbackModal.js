import React, {useState} from "react";
import Toastr from "toastr2";

const FeedbackModal = ({closeModal}) => {

    const toastr = new Toastr()

    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');

    const sendFeedback = () => {
        try {
            // Verifier que message ne soit pas vide
            if (message === '')
                throw new Error('message ne peut pas être vide');
        } catch (error) {
            toastr.error(error.message);
        }
    }

    return (
        <div onClick={() => closeModal()}
             style={{position: 'absolute', height: "100%", width: '100%', backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1}}
        >
            <div style={{position: 'absolute', height: 500, width: 600,
                backgroundColor: '#1e8eb5', zIndex: 2, border: '4px white solid', borderRadius: 10,
                padding: 30}}
                 onClick={(e) => {e.stopPropagation()}}
            >
                <p style={{fontSize: '1.4em', textAlign: "center", marginBottom: 20}}>Feedback</p>
                <div style={{marginBottom: 20}}>
                    <input type="text"
                           value={subject}
                           placeholder="sujet"
                           onChange={(e) => setSubject(e.target.value)}/>
                </div>
                <div style={{marginBottom: 20}}>
                    <textarea value={message}
                              onChange={(e) => setMessage(e.target.value)}
                              placeholder="message"
                              cols="30"
                              rows="10"/>
                </div>
                <button type="submit" onClick={() => {sendFeedback()}}>Envoyer</button>
            </div>
        </div>

    )
}

export default FeedbackModal;
