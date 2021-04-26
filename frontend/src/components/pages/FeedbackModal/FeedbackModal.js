import React from "react";

const FeedbackModal = ({closeModal}) => {

    return (
        <div onClick={() => closeModal()}
            style={{position: 'absolute', height: "100%", width: '100%', backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1}}
        >
            <div style={{position: 'absolute', height: 500, width: 600,
                backgroundColor: '#1e8eb5', zIndex: 2, border: '4px white solid', borderRadius: 10,
                padding: 30}} onClick={(e) => {e.stopPropagation()}}>
                <p style={{fontSize: '1.4em', textAlign: "center"}}>Feedback</p>
            </div>
        </div>

    )
}

export default FeedbackModal;
