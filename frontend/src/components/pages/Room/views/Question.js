import React from "react";
import Title from "../../../misc/Title";
import QcmAnswer from "../components/Question/QcmAnswer";
import LeaveRoomCross from "../components/Shared/LeaveRoomCross";
import QuestionHeader from "../components/Question/QuestionHeader";


class Question extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const {content, type, round, category, answer} = this.props.currentQuestion;
        const { submitAnswer, timeLeft, questionInputDisabled, leaveRoom } = this.props;
        switch (type) {
            case 'qcm':
                return (
                    <>
                        <QuestionHeader round={round} category={category} type={type} timeLeft={timeLeft}/>
                        <p className="question-content mb3">{content}</p>
                        <div className="question-answer-container">
                        {answer.answers.map((answer, index) => (
                                <QcmAnswer key={index} answer={answer} disabled={questionInputDisabled} submitAnswer={submitAnswer}/>
                            )
                        )}
                        </div>
                        <LeaveRoomCross leaveRoom={leaveRoom}/>
                    </>);
            case 'input':
        }
    }


}

export default Question;
