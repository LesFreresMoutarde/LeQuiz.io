import React from "react";
import Clock from "../Shared/Clock";
import Util from "../../../../../util/Util";

// let firstInstance = true
// let colors= ['',''];
// const handleFirstInstance = (timeLeft) => {
//     // firstInstance = false
//     // console.log(timeLeft)
//     // if (timeLeft === 0) firstInstance = true;
//     if (timeLeft === 0) return true;
//     return false;
// }

class QuestionHeader extends React.Component {

    constructor(props) {
        super(props);
        this.colorsClasses = Util.getRandomColors(2);
    }

    render() {
        const {round, category, type, timeLeft} = this.props;

        return (
            <div className="question-header mb3">
                <Clock timeLeft={timeLeft}/>
                <h1 className="text-center">{`Question ${round}`}</h1>
                <div className="question-header-info">
                    <p className={`question-header-info-box ${this.colorsClasses[0]}`}>{category}</p>
                    <p className={`question-header-info-box ${this.colorsClasses[1]}`}>{type}</p>
                </div>
            </div>
        )

    }

};

export default QuestionHeader;
