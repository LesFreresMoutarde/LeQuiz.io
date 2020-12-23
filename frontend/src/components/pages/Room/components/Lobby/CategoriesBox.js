import React from "react";
import {Link} from "react-router-dom";

const CategoriesBox = ({categories, changeOptions, displayClass}) => {
    return (
        <>
            <p>Thèmes</p>
            {categories.map((category, index) =>  (
                <p key={index}>{category.name}</p>
            ))}
            <button className={`${displayClass}`} onClick={() => changeOptions('categories')}>Modifier</button>
        </>
    )
};

export default CategoriesBox;
