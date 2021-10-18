import React from "react";

const QuestionDesktopHeader = ({question}) => {
    return (
        <div className="question-screen-desktop-header">
            {question.categories.map(categoryLabel => {
                return (
                    <div key={categoryLabel} className="question-screen-desktop-header-item">
                        {categoryLabel}
                    </div>
                )
            })}
        </div>
    )
}

export default QuestionDesktopHeader;
