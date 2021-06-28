import React from "react";
import {Link} from "react-router-dom";
import LogoutButton from "./misc/LogoutButton";
import BackArrow from "./misc/BackArrow";
import SettingsButton from "./misc/SettingsButton";

class Header extends React.Component {
    getHeaderUserSection = () => {
        if(this.props.user) {
            return(
                <>
                    <div className="header-user-name">
                        {this.props.user.username}
                    </div>
                    <div className="header-user-settings-cog">
                        <Link to="/settings">
                            <SettingsButton />
                        </Link>
                    </div>
                    <div className="header-user-logout-button">
                        <LogoutButton />
                    </div>
                </>
            );
        } else {
            return(
                <div><Link to="/login">Connexion</Link></div>
            )
        }
    }

    render = () => {
        return (
            <header className="app-header">
                <div className="header-left">
                    <BackArrow />
                </div>
                <div className="header-right">
                    {this.getHeaderUserSection()}
                </div>
            </header>
        )
    }
}

export default Header;
