import React from "react";
import {Link} from "react-router-dom";
import LogoutButton from "./misc/LogoutButton";
import BackArrow from "./misc/BackArrow";
import SettingsButton from "./misc/SettingsButton";

const Header = ({user, showBackArrow, backArrowOnClick}) => {
    const getHeaderUserSection = () => {
        if(user) {
            return(
                <>
                    <div className="header-user-name">
                        {user.username}
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

    return (
        <header className="app-header">
            <div className="header-left">
                {showBackArrow && <BackArrow onClick={backArrowOnClick} />}
            </div>
            <div className="header-right">
                {getHeaderUserSection()}
            </div>
        </header>
    )
}

export default Header;
