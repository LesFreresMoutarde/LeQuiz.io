import React, {useEffect, useState} from "react";
import {isConsole, isMobile, isSmartTV} from "react-device-detect";

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
                {!allowed && (
                    <img className="game-mode-label-disabled-desktop" src="/img/icons/work-in-progress.svg" />
                )}
            </>
        )
    }

    const useMobileLayout = isMobile || isSmartTV || isConsole;

    return (
        <button
            className={`
                game-mode game-mode-${classname.toLowerCase()}
                ${useMobileLayout ? 'mobile' : ''}
                ${!allowed ? 'disabled' : ''}
                ${playDisabledAnimation ? 'disabled-animation' : ''}
            `}
            aria-label={`${label} ${!allowed ? '(verrouillé)' : ''}`}
            aria-describedby={`game-mode-${classname.toLowerCase()}-description`}
            onClick={onClick}
        >
            {!allowed && (
                <img className="game-mode-disabled-mobile"
                     src="/img/icons/work-in-progress.svg"
                     style={{
                         maxHeight: 20,
                         maxWidth: 20,
                         position: 'absolute',
                         right: 10,
                         top: 10,
                     }}
                     alt="Verrouillé"
                />
            )}

            <div className="game-mode-label-mobile">{getGameModeLabelContent()}</div>
            <div className="game-mode-button-content">
                <div className="game-mode-label-container">
                    <div className="game-mode-icon-container">
                        <img className="game-mode-icon"
                             src={`/img/icons/gamemodes/${classname.toLowerCase()}.svg`}
                             alt={`Logo ${label}`}
                        />
                    </div>
                    <span className="game-mode-label-desktop">
                        {getGameModeLabelContent()}
                    </span>
                </div>
                <div className={"game-mode-description-container"}>
                    <span className="game-mode-description" id={`game-mode-${classname.toLowerCase()}-description`}>{description}</span>
                </div>
            </div>
        </button>

    );
}

export default GameMode;
