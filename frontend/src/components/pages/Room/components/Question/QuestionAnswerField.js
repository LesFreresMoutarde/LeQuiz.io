import React, {useEffect, useState} from "react";

const QuestionAnswerField = ({enableQcm, submitAnswer}) => {
    const [answerInputValue, setAnswerInputValue] = useState('');
    const [areInputsDisabled, setAreInputsDisabled] = useState(false);

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

    const submitButtonAndDisableInputs = () => {
        setAreInputsDisabled(true);
        submitAnswer(answerInputValue);
    }

    return (
        <div className="question-answer-input-container">
            <input type="text"
                   ref={input => answerInputRef = input}
                   className="question-answer-input"
                   value={answerInputValue}
                   onChange={e => {setAnswerInputValue(e.target.value)}}
                   onKeyUp={onAnswerInputKeyUp}
                   disabled={areInputsDisabled}
            />

            <div className="question-answer-input-validate-button-container">
                <button className="button large green"
                        ref={button => validateButtonRef = button}
                        onClick={submitButtonAndDisableInputs}
                        disabled={areInputsDisabled}
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
