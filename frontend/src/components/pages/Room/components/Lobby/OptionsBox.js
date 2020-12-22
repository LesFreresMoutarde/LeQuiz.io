import React from "react";
import {Link} from "react-router-dom";

const OptionsBox = ({questionTypes, winCriterion, changeOptions, displayClass}) => {
    return (
        <>
            <p>Options de jeu</p>
            <p>Types de questions :</p> {questionTypes.map((questionType, index) => (
                <p key={index}>{questionType.type}</p>
            ))}
            <p>Nombre de questions : {winCriterion}</p>
            <button className={`${displayClass}`} onClick={() => changeOptions('options')}>Modifier</button>
        </>
    )
};

export default OptionsBox;
