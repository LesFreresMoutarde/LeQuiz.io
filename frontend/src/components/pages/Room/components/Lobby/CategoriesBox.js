import React from "react";
import {Link} from "react-router-dom";

const CategoriesBox = ({categories}) => {
    return (
        <>
            <p>Thèmes</p>
            <Link to='/create-room/categories'>Edit</Link>
        </>
    )
};

export default CategoriesBox;