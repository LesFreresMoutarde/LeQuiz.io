import React, {useState} from "react";
import QcmPick from "./QcmPick";
import Util from "../../../../../util/Util";

const QuestionAnswerQCM = ({question, userCanSubmit, submitAnswer}) => {
    const [colorIndexes, setColorIndexes] = useState(Util.randomizeArray([1, 2, 3, 4]));
    const [answers, setAnswers] = useState(Util.randomizeArray([...question.answer.answers.qcm]));
    const [pickedAnswer, setPickedAnswer] = useState(null);

    const submitAnswerAndDisableInputs = (answer) => {
        setPickedAnswer(answer);
        submitAnswer(answer);
    }

    return (
        <div className="question-answer-qcm-container">
            {answers.map((answer, index) => {
                return (
                    <QcmPick key={index}
                             answer={answer}
                             pickedAnswer={pickedAnswer}
                             disabled={!userCanSubmit}
                             submitAnswer={submitAnswerAndDisableInputs}
                             colorIndex={colorIndexes[index]}
                    />
                )
            })}
        </div>
    );
}

export default QuestionAnswerQCM;
