import React, {useState} from "react";
import QcmPick from "./QcmPick";
import Util from "../../../../../util/Util";

const QuestionAnswerQCM = ({question, userCanSubmit, submitAnswer}) => {
    const [colorIndexes, setColorIndexes] = useState(Util.randomizeArray([1, 2, 3, 4]));
    const [answers, setAnswers] = useState(Util.randomizeArray([...question.answer.answers.qcm]));

    return (
        <div className="question-answer-qcm-container">
            {answers.map((answer, index) => {
                return (
                    <QcmPick key={index}
                             answer={answer}
                             disabled={!userCanSubmit}
                             submitAnswer={submitAnswer}
                             colorIndex={colorIndexes[index]}
                    />
                )
            })}
        </div>
    );
}

export default QuestionAnswerQCM;
