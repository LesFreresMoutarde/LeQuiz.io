import React from "react";
import LobbyEditSettingsButton from "./LobbyEditSettingsButton";
import LobbyValue from "./LobbyValue";

const CategoriesBox = ({categories, changeOptions, userCanEdit}) => {
    return (
        <div className="lobby-box lobby-box-categories">
            <div className="lobby-box-header">
                {userCanEdit &&
                    <LobbyEditSettingsButton onClick={() => changeOptions('categories')}/>
                }
                <span className="lobby-box-header-label">Catégories</span>
            </div>
            <div className="lobby-box-content">
                {categories.map((category, index) =>  (
                    <LobbyValue key={index} value={category.label}/>
                ))}
            </div>
        </div>
    )
};

export default CategoriesBox;
