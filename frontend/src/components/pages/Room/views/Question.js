import React from "react";
import Title from "../../../misc/Title";
import QcmAnswer from "../components/Question/QcmAnswer";


class Question extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const {content, type, round, category, answer} = this.props.currentQuestion;
        const { submitAnswer } = this.props;

        switch (type) {
            case 'qcm':
                return (
                    <>
                        <Title title={`Question ${round}`}/>
                        <p>{category}</p>
                        <p>{content}</p>
                        {answer.answers.map((answer, index) => (
                                <QcmAnswer key={index} answer={answer} submitAnswer={submitAnswer}/>
                            )
                        )}
                    </>);
            case 'input':
        }
    }


}

export default Question;