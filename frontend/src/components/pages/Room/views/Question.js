import React from "react";
import QcmAnswer from "../components/Question/QcmAnswer";
import LeaveRoomCross from "../components/Shared/LeaveRoomCross";
import Util from "../../../../util/Util";
import Clock from "../components/Shared/Clock";


class Question extends React.Component {

    constructor(props) {
        super(props);
        this.qcmAnswersColors = Util.getRandomColors(4);
    }

    render() {
        const {content, type, round, category, answer} = this.props.currentQuestion;
        const { submitAnswer, timeLeft, questionInputDisabled, leaveRoom } = this.props;
        switch (type) {
            case 'qcm':
                return (
                    <div className="question-screen-container">

                            <div className="question-screen-left">
                                <Clock timeLeft={timeLeft}/>
                                <LeaveRoomCross leaveRoom={leaveRoom}/>
                            </div>

                            <div className="question-screen-center">
                                <p className="question-round">{`Question ${round}`}</p>
                                <p className="question-content mb3">{content}</p>
                                <div className="qcm-container">
                                    {answer.answers.map((answer, index) => (
                                        <QcmAnswer key={index}
                                                   colorClass={this.qcmAnswersColors[index]}
                                                   answer={answer}
                                                   disabled={questionInputDisabled}
                                                   submitAnswer={submitAnswer}/>
                                        )
                                    )}
                                </div>
                            </div>

                            <div className="question-screen-right">
                                <div className="question-header-info">
                                    <p className={`question-header-info-box ${this.qcmAnswersColors[0]}`}>{category}</p>
                                    <p className={`question-header-info-box ${this.qcmAnswersColors[1]}`}>{type}</p>
                                </div>
                            </div>
                    </div>);
            case 'input':
        }
    }


}

export default Question;
