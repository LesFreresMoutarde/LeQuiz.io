import React, {useRef, useState} from "react";

const InputValue = ({submitAnswer}) => {

    const [answer, setAnswer] = useState('');
    const buttonEl = useRef(null);

    const handleKeyPress = (evt) => {
        if (evt.charCode === 13 && answer !== '') buttonEl.current.click();
    }

    return (
        <>
            <input type="text"
                   style={{fontSize: "1.3em"}}
                   value={answer}
                   onChange={(e) => setAnswer(e.target.value)}
                   onKeyPress={(e) => handleKeyPress(e)}
                   autoFocus={true}
            />
            <button type="submit"
                    ref={buttonEl}
                    onClick={() => submitAnswer(answer)}
            >
                Valider
            </button>
        </>
    )
};

export default InputValue;
