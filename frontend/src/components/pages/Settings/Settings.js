import React from "react";
import EmailSettings from "./views/EmailSettings";
import PasswordSettings from "./views/PasswordSettings";
import Util from "../../../util/Util";
import BackArrow from "../../misc/BackArrow";

class Settings extends React.Component {
    constructor(props) {
        super(props);

        Util.UserAccess.componentRequiresRole(Util.UserAccess.ROLES.LOGGED_IN);

        this.state = {
            desktopCurrentContent: "email",
        }
    }

    componentDidMount() {
        this.showDesktopSection('email');
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        Util.UserAccess.componentRequiresRole(Util.UserAccess.ROLES.LOGGED_IN); // TODO find a better/more generic solution ?

        return true;
    }

    onNavigate = (e) => {
        const li = e.target.parentNode;
        const navTo = li.getAttribute('data-desktop-nav');
        if (navTo === null) {
            return;
        }

        this.showDesktopSection(navTo);
        this.setLateralMenuActiveItem(navTo);
    }

    showDesktopSection(name) {
        const sectionId = `desktop-content-${name}`;

        const sectionsContainer = document.getElementById('desktop-variable-content');

        for (const section of sectionsContainer.childNodes) {
            if(section.id === sectionId) {
                section.classList.add('active');
                continue;
            }

            section.classList.remove('active');
        }
    }

    setLateralMenuActiveItem(name) {
        const nav = document.getElementById('page-lateral-navigation');
        const ul = nav.childNodes[0];

        for(const li of ul.childNodes) {
            if(li.getAttribute('data-desktop-nav') === name) {
                li.classList.add('active');
                continue;
            }

            li.classList.remove('active');
        }
    }

    goBack = () => {
        this.props.history.goBack();
    };

    render = () => {
        return (
            <>
            <BackArrow onClick={this.goBack}/>
            <div className="flex-container">
                <nav id="page-lateral-navigation">
                    <ul>
                        <li data-desktop-nav="email" className="active"><a onClick={this.onNavigate}>Adresse email</a></li>
                        <li data-desktop-nav="password"><a onClick={this.onNavigate}>Mot de passe</a></li>
                    </ul>
                </nav>
                <div className="flex-item-full-width">
                    <h1 className="mb">Paramètres</h1>

                    <div id="desktop-variable-content">

                        <section id="desktop-content-email">
                            <EmailSettings/>
                        </section>

                        <section id="desktop-content-password">
                            <PasswordSettings/>
                        </section>

                    </div>
                </div>
            </div>
        </>
        )
    }
}

export default Settings;
