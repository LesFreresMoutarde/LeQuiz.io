import React from "react";
import {Link} from "react-router-dom";

const CategoriesBox = ({categories}) => {
    return (
        <>
            <p>Thèmes</p>
            {categories.map((category, index) =>  (
                <p key={index}>{category.name}</p>
            ))}
        </>
    )
};

export default CategoriesBox;