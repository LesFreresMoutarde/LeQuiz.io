import React from "react";
import Clock from "../Shared/Clock";
import Util from "../../../../../util/Util";

class QuestionHeader extends React.Component {

    constructor(props) {
        super(props);
        this.colorsClasses = Util.getRandomColors(2);
    }

    render() {
        const {round, category, type, timeLeft} = this.props;

        return (
            <div className="question-header mb3">
                <div id="clock">
                    <Clock timeLeft={timeLeft}/>
                </div>
                <h1 className="question-round">{`Question ${round}`}</h1>
                <div className="question-header-info">
                    <p className={`question-header-info-box ${this.colorsClasses[0]}`}>{category}</p>
                    <p className={`question-header-info-box ${this.colorsClasses[1]}`}>{type}</p>
                </div>
            </div>
        )

    }

};

export default QuestionHeader;
