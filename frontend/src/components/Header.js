import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCog} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";

class Header extends React.Component {
    render = () => {
        return (
            <header className="app-header">
                <div className="header-user">
                    <div className="header-user-name">
                        Current user
                    </div>
                    <div className="header-user-settings-cog">
                        <Link to="/settings">
                            <FontAwesomeIcon icon={faCog} />
                        </Link>
                    </div>
                </div>
                <div className="clearfix"/>
            </header>
        )
    }
}

export default Header;