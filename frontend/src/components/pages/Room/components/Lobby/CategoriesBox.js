import React from "react";
import {Link} from "react-router-dom";

const CategoriesBox = ({categories, changeOptions, displayClass}) => {
    return (
        <div className="lobby-box">
            <p>Thèmes</p>
            {categories.map((category, index) =>  (
                <p key={index}>{category.name}</p>
            ))}
            <button className={`${displayClass}`} onClick={() => changeOptions('categories')}>Modifier</button>
        </div>
    )
};

export default CategoriesBox;
