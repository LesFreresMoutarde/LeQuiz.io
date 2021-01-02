import React from "react";
import Clock from "../Shared/Clock";

const AnswerHeader = ({header, timeLeft, roundInfo}) => {

    return (
        <div className="answer-header mb3">
            <div className="pull-left">
                <Clock timeLeft={timeLeft}/>
            </div>
            <div className="answer-header-info">
                <h1 className={`mb2 ${header.colorClass}`}>{header.text}</h1>
                <p className='answer-header-info-round'>{roundInfo}</p>
            </div>
        </div>
    )
};

export default AnswerHeader;
