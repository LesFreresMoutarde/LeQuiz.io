import React from "react";

const Category = ({category, pickCategory, index}) => {
        return (
                <button id={`category-${category.name.toLowerCase()}`} className="category" onClick={(event) => pickCategory(category)}>
                    <p className="category-name">{category.label}</p>
                </button>
        )
};

export default Category;
