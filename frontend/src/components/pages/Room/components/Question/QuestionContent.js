import React, {useEffect, useState} from "react";

const BASE_FONT_SIZE = '3rem';

const QuestionContent = ({content}) => {
    const [fontSize, setFontSize] = useState(BASE_FONT_SIZE);
    const [clientDimensions, saveClientDimensions] = useState({
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight,
    });

    let questionContentRef = null;
    let questionContentResizerRef = null;

    /**
     * Returns max content height
     * @returns {number} % of window height
     */
    const getMaxContentHeight = () => {
        if (clientDimensions.width <= 576) {
            return 0.3;
        }

        return 0.2;
    }

    const onClientDimensionsChange = () => {
        const baseFontSize = parseInt(window.getComputedStyle(questionContentResizerRef)['font-size']);
        const resizerHeight = parseInt(window.getComputedStyle(questionContentResizerRef)['height']);
        const maxContentHeight = clientDimensions.height * getMaxContentHeight();

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
