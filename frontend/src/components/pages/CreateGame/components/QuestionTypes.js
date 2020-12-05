import React from "react";
import QuestionType from "../components/QuestionType";

const QuestionTypes = ({questionTypes}) => {
    return (
        <>
            <p className="game-options-section-header">Types de questions</p>
            <div className="question-type-container">
                {questionTypes.map((questionType, index) => {
                        console.log("questionTyê", questionType);
                        return(
                            <div key={index}>
                                <QuestionType type={questionType.type}/>
                            </div>
                        )
                    }
                )}
            </div>
        </>
    )
};

export default QuestionTypes;