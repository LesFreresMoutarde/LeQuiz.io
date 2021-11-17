import React from "react";

const onKeyUp = (e) => {
    if (e.keyCode !== 13) {
        return;
    }

    e.target.click();
}

const Category = ({category, pickCategory, index}) => {
    return (
        <button id={`category-${category.name.toLowerCase()}`}
                className={`category ${category.selected ? 'selected' : ''}`}
                role="checkbox"
                onClick={() => pickCategory(category)}
                onKeyUp={onKeyUp}
        >
            {category.label}
        </button>
    )
};

export default Category;
