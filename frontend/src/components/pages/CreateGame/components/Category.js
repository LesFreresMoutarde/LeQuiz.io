import React from "react";

const Category = ({category}) => {
    return (
        <div>
            <button>
                {category.name}
            </button>
        </div>
    )
};

export default Category;