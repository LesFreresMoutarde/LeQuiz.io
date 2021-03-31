import React from "react";
import EditLobbyButton from "./EditLobbyButton";
import LobbyValue from "./LobbyValue";

const CategoriesBox = ({categories, changeOptions, displayClass}) => {
    return (
        <div className="lobby-box">
            <div className="lobby-box-header">
                <p className="lobby-box-header-label">Thèmes</p>
                <button className={`${displayClass} lobby-edit-button`} onClick={() => changeOptions('categories')}>
                    <EditLobbyButton/>
                </button>
            </div>
            <div className="lobby-box-content">
                <div className="lobby-value-container">
                    {categories.map((category, index) =>  (
                        <LobbyValue key={index} value={category.label}/>
                    ))}
                </div>

            </div>

        </div>
    )
};

export default CategoriesBox;
