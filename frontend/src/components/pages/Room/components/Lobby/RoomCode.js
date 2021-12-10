import React, {useEffect, useRef} from "react";

const RoomCode = ({code}) => {
    let roomCodeHoverTimeout = null;

    const hiddenCodeMessageElement = useRef(null);
    const codeElement = useRef(null);

    useEffect(() => {
        return () => {
            clearTimeout(roomCodeHoverTimeout);
        }
    }, []);

    const onRoomCodeMouseEnter = () => {
        hiddenCodeMessageElement.current.classList.add('is-hover');
        roomCodeHoverTimeout = setTimeout(() => {
            codeElement.current.classList.add('visible');
            hiddenCodeMessageElement.current.classList.remove('visible');
        }, 500);
    };

    const onRoomCodeMouseLeave = () => {
        clearTimeout(roomCodeHoverTimeout);
        hiddenCodeMessageElement.current.classList.remove('is-hover');
        codeElement.current.classList.remove('visible');
        hiddenCodeMessageElement.current.classList.add('visible');
    };

    return (
        <div className="lobby-room-code-container">
            <span className="lobby-hover-to-show-code" onMouseEnter={onRoomCodeMouseEnter} onMouseLeave={onRoomCodeMouseLeave}>
                <span ref={hiddenCodeMessageElement} className="lobby-hidden-code-message visible">Survolez pour afficher le code du salon</span>
                <span ref={codeElement} className="lobby-room-code">{code}</span>
            </span>
        </div>
    );
}

export default RoomCode;
