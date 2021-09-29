import React, {useEffect, useState} from "react";

const QuestionAnswerField = ({enableQcm, submitAnswer}) => {
    const [answerInputValue, setAnswerInputValue] = useState('');

    let answerInputRef = null;
    let validateButtonRef = null;

    useEffect(() => {
        answerInputRef.focus();
    }, []);

    const onAnswerInputKeyUp = (e) => {
        if (e.keyCode !== 13) {
            return;
        }

        if (answerInputValue === '') {
            return;
        }

        validateButtonRef.click();
    }

    return (
        <div className="question-answer-input-container">
            <input type="text"
                   ref={input => answerInputRef = input}
                   className="question-answer-input"
                   value={answerInputValue}
                   onChange={e => {setAnswerInputValue(e.target.value)}}
                   onKeyUp={onAnswerInputKeyUp}
            />

            <div className="question-answer-input-validate-button-container">
                <button className="button large green"
                        ref={button => validateButtonRef = button}
                        onClick={() => {submitAnswer(answerInputValue)}}
                >
                    Valider
                </button>
            </div>

            <div className="question-answer-input-display-qcm-button-container">
                <button className="question-answer-input-display-qcm-button"
                        onClick={enableQcm}
                >
                    Afficher des propositions
                </button>
            </div>
        </div>
    );
}

export default QuestionAnswerField;
