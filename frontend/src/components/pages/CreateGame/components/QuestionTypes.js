import React from "react";
import QuestionType from "../components/QuestionType";

const QuestionTypes = ({questionTypes, pickQuestionType}) => {
    return (
        <>
            <p className="game-options-section-header">Types de questions</p>
            <div className="question-type-container">
                {questionTypes.map((questionType, index) => {
                        return(
                            <div key={index}>
                                <QuestionType pickQuestionType={pickQuestionType}
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