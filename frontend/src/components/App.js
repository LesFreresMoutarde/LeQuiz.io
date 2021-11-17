import React from 'react';
import '../css/minireset.min.css';
import '../css/style.css';
import '../css/util.css';
import 'toastr2/dist/toastr.min.css';
import '../css/toastr.override.css';
import {Switch, Route, Redirect} from "react-router-dom";
import Home from "./pages/Home/Home";
import CreateGame from "./pages/CreateGame/CreateGame";
import Footer from "./Footer";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import ResetPassword from "./pages/ResetPassword/ResetPassword";
import Header from "./Header";
import Util from "../util/Util";
import Loader from "./misc/Loader";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Settings from "./pages/Settings/Settings";
import NotFound from "./pages/Errors/404/NotFound";

import Toastr from "toastr2";
import Room from "./pages/Room/Room";
import AuthUtil from "../util/AuthUtil";
import ApiUtil from "../util/ApiUtil";
import FeedbackModal from "./pages/FeedbackModal/FeedbackModal";
import Contact from "./pages/Contact/Contact";
import LegalNotice from "./pages/LegalNotice/LegalNotice";
import {isMobileOnly} from "react-device-detect";

let instance;

class App extends React.Component {

    constructor(props) {
        super(props);

        if (instance) {
            throw new Error('App has already been instanciated');
        }

        instance = this;

        this.toastr = new Toastr();

        this.state = {
            redirect: false,
            isLoading: true,
            user: null,
            showFeedbackModal: false,
            showBackArrow: false,
            backArrowOnClick: null,
            showQuitCross: false,
            quitCrossOnClick: null,
        };

        this.nextRedirect = null;
    }

    componentDidMount = async () => {
        await Util.onApplicationLoad();
        Util.verbose('Application loaded');

        const newState = {
            isLoading: false,
            user: AuthUtil.accessTokenPayload.user ? AuthUtil.accessTokenPayload.user : null,
        };

        const accessTokenPayload = AuthUtil.accessTokenPayload;

        if(accessTokenPayload.hasOwnProperty('user')) {
            newState.userId = accessTokenPayload.user.id;
            newState.userName = accessTokenPayload.user.username;
        }

        this.setState(newState);
    }

    setUser = (user) => {
        this.setState({
            user,
        });
    }

    displayFeedbackModal = () => {
        this.setState({showFeedbackModal: true});
    }

    closeFeedbackModal = () => {
        this.setState({showFeedbackModal: false});
    }

    /**
     * Display or not the header Back Arrow. This function must be called in
     * the componentDidMount of a main "page" component
     * @param {boolean} show
     * @param {string|function} onClick
     */
    showBackArrow = (show = true, onClick = () => {}) => {
        this.setState({
            showBackArrow: show,
            backArrowOnClick: onClick,
        });
    }

    /**
     * Display or not the header responsive Quit Cross. This function must be caled in
     * the componentDidMount of a main "page" component
     * @param show
     * @param onClick
     */
    showQuitCross = (show = true, onClick = () => {}) => {
        this.setState({
            showQuitCross: show,
            quitCrossOnClick: onClick,
        });
    }

    logoutUser = async () => {
        Util.verbose('User logout');

        if(this.state.user === null) {
            return false;
        }

        const response = await ApiUtil.performAPIRequest('/auth/logout', {
            method: 'POST',
        });

        if(!response.ok) {
            this.toastr.error('Une erreur inconnue est survenue');
            return false;
        }

        try {
            await AuthUtil.getNewAccessToken();
        } catch(e) {
            console.error(e);
            this.toastr.error('Une erreur inconnue est survenue');
            return false;
        }

        this.setUser(null);

        this.toastr.success("Vous n'êtes plus connecté");

        this.redirectTo('/');

        return true;
    }

    redirectTo = (url) => {
        this.nextRedirect = url;
        this.setState({
            redirect: true,
        });
    }

    render = () => {

        const {redirect, isLoading, user, showFeedbackModal, showBackArrow, backArrowOnClick, showQuitCross, quitCrossOnClick} = this.state;

        if (redirect) {
            const url = this.nextRedirect;
            this.nextRedirect = null;
            setTimeout(() => { // SetTimeout to update the state of the App component after rendering the <Redirect> component
                this.setState({
                    redirect: false,
                });
            }, 0);
            return (
                <Redirect to={url} />
            );
        }

        // If user device is a smartphone, display footer only on homepage
        const hideFooter = isMobileOnly && !isLoading && window.location.pathname !== '/';

        if(isLoading) {
            return (
                <div className="app loading">
                    <div className="app-loader">
                        <Loader width="max(8vw, 100px)" />
                    </div>
                </div>
            );
        } else {
            return (
                <div className={`app ${hideFooter ? 'no-footer' : ''}`}>
                    {showFeedbackModal &&
                        <FeedbackModal closeModal={this.closeFeedbackModal}/>
                    }
                    <div className="content-wrapper">
                        <Header user={user}
                                showBackArrow={showBackArrow}
                                backArrowOnClick={backArrowOnClick}
                                showResponsiveQuitCross={showQuitCross}
                                responsiveQuitCrossOnClick={quitCrossOnClick}
                        />
                        <div id="page-content">
                            <Switch>
                                <Route exact path="/" component={Home}/>
                                <Route exact path="/login" component={Login} />
                                <Route exact path="/register" component={Register}/>
                                <Route exact path="/forgot-password" component={ForgotPassword} />
                                <Route exact path="/reset-password/:token" component={ResetPassword} />
                                <Route exact path="/settings" component={Settings}/>
                                <Route path="/create-room/" component={CreateGame}/>
                                <Route path="/room/:id" component={Room}/>
                                <Route path="/contact" component={Contact}/>
                                <Route path="/mentions-legales" component={LegalNotice}/>
                                <Route component={NotFound}/>
                            </Switch>
                        </div>
                    </div>
                    <Footer displayFeedbackModal={this.displayFeedbackModal}/>
                </div>
            );
        }
    }
}

export { instance as app }

export default App;
