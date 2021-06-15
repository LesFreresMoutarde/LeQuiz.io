import React, {useEffect, useState} from "react";
import '../../../../css/gameMode.css';

const GameMode = ({gameMode, pickGameMode}) => {
    const {label, description, allowed, classname} = gameMode;

    const [playDisabledAnimation, setPlayDisabledAnimation] = useState(false)
    let disabledAnimationTimeout = null;

    useEffect(() => {
        return(() => {
            clearTimeout(disabledAnimationTimeout);
        })
    }, []);

    const onClick = allowed ? () => pickGameMode(gameMode) : () => {
        setPlayDisabledAnimation(true);
        disabledAnimationTimeout = setTimeout(() => {
            setPlayDisabledAnimation(false);
        }, 200); // CSS animation duration is 0.2s
    }

    const getGameModeLabelContent = () => {
        return (
            <>
                {label}
                {(() => {
                    if (!allowed) {
                        return(
                            <img className="game-mode-label-disabled" src="/img/icons/locked.svg" />
                        );
                    }
                })()}
            </>
        )
    }

    return (
        <button className={`game-mode gm-${classname.toLowerCase()} ${!allowed ? 'disabled' : ''} ${playDisabledAnimation ? 'disabled-animation' : ''}`} onClick={onClick}>
            <div className="game-mode-label-mobile">{getGameModeLabelContent()}</div>
            <div className="game-mode-button-content">
                <div className="game-mode-label-container">
                    <div className="game-mode-icon-container">
                        <img className="game-mode-icon" src={`/img/icons/gamemodes/${classname.toLowerCase()}.svg`} alt={`Logo ${label}`}/>
                    </div>
                    <span className="game-mode-label-desktop">
                        {getGameModeLabelContent()}
                    </span>
                </div>
                <div className={"game-mode-description-container"}>
                    <span className="game-mode-description">{description}</span>
                </div>
            </div>
        </button>

    );
}

export default GameMode;
