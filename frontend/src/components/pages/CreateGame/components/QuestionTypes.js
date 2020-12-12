import React from "react";
import QuestionType from "../components/QuestionType";

const QuestionTypes = ({questionTypes, evaluateWinCriterionMaxValue}) => {
    return (
        <>
            <p className="game-options-section-header">Types de questions</p>
            <div className="question-type-container">
                {questionTypes.map((questionType, index) => {
                        return(
                            <div key={index}>
                                <QuestionType evaluateWinCriterionMaxValue={evaluateWinCriterionMaxValue}
                                              type={questionType.type} checked={questionType.checked}/>
                            </div>
                        )
                    }
                )}
            </div>
        </>
    )
};

export default QuestionTypes;