import React, {useEffect, useState} from "react";

const BASE_FONT_SIZE = '3rem';
const MAX_CONTENT_HEIGHT = 0.2; // In % of window height

const QuestionContent = ({content}) => {
    const [fontSize, setFontSize] = useState(BASE_FONT_SIZE);
    const [clientDimensions, saveClientDimensions] = useState({
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight,
    });

    let questionContentRef = null;
    let questionContentResizerRef = null;

    const onClientDimensionsChange = () => {
        const baseFontSize = parseInt(window.getComputedStyle(questionContentResizerRef)['font-size']);
        const resizerHeight = parseInt(window.getComputedStyle(questionContentResizerRef)['height']);
        const maxContentHeight = clientDimensions.height * MAX_CONTENT_HEIGHT;

        if (resizerHeight <= maxContentHeight) {
            setFontSize(BASE_FONT_SIZE);
            return;
        }
        const heightRatio = maxContentHeight / resizerHeight;

        // Seems to work well with this formula
        const fontSizeCorrection = heightRatio + ((1 - heightRatio) / 8);

        setFontSize(baseFontSize * fontSizeCorrection);
    }

    useEffect(() => {
        const onWindowResize = () => {
            saveClientDimensions({
                width: document.documentElement.clientWidth,
                height: document.documentElement.clientHeight,
            })
        }

        window.addEventListener('resize', onWindowResize);

        return () => {
            window.removeEventListener('resize', onWindowResize);
        }
    }, []);

    useEffect(() => {
        onClientDimensionsChange();
    }, [clientDimensions])

    return (
        <div className="question-content"
             style={{fontSize}}
             ref={div => questionContentRef = div}
        >
            {content}
            <div className="question-content-resizer"
                 style={{fontSize: BASE_FONT_SIZE}}
                 ref={div => questionContentResizerRef = div}
            >
                {content}
            </div>
        </div>
    )
}

export default QuestionContent;
