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
                        {/*<div>*/}
                        {/*    <p>Temps restant : {timeLeft}</p>*/}
                        {/*    <Title title={`Question ${round}`}/>*/}
                        {/*    <div> <!-- Flex direction: colum -->*/}
                        {/*        <p>{category}</p>*/}
                        {/*        <p>{type}</p>*/}
                        {/*    </div>*/}
                        {/*</div>*/}
                        <p>{content}</p>
                        {answer.answers.map((answer, index) => (
                                <QcmAnswer key={index} answer={answer} disabled={questionInputDisabled} submitAnswer={submitAnswer}/>
                            )
                        )}
                        <LeaveRoomCross leaveRoom={leaveRoom}/>
                    </>);
            case 'input':
        }
    }


}

export default Question;
