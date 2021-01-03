import React from 'react';
import '../css/minireset.min.css';
import '../css/style.css';
import '../css/util.css';
import 'toastr2/dist/toastr.min.css';
import '../css/toastr.override.css';
import {Switch, Route, Redirect} from "react-router-dom";
import Home from "./pages/Home/Home";
import CreateGame from "./pages/CreateGame/CreateGame";
import JoinRoom from "./pages/JoinRoom/JoinRoom";
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
const toastr = new Toastr();


class App extends React.Component {

    static GLOBAL = null;

    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
            isLoading: true,
            user: null,
        }

        this.nextRedirect = null;

        App.GLOBAL = this;
    }

    componentDidMount = async () => {
        await Util.onApplicationLoad();
        Util.verbose('Application loaded');

        const newState = {
            isLoading: false,
            user: Util.accessTokenPayload.user ? Util.accessTokenPayload.user : null,
        };

        const accessTokenPayload = Util.accessTokenPayload;

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

    logoutUser = async () => {
        Util.verbose('User logout');

        if(this.state.user === null) {
            return false;
        }

        const response = await Util.performAPIRequest('/auth/logout', {
            method: 'POST',
        });

        if(!response.ok) {
            toastr.error('Une erreur inconnue est survenue');
            return false;
        }

        try {
            await Util.getNewAccessToken();
        } catch(e) {
            console.error(e);
            toastr.error('Une erreur inconnue est survenue');
            return false;
        }

        this.setUser(null);

        toastr.success("Vous n'êtes plus connecté");

        return true;
    }

    redirectTo = (url) => {
        this.nextRedirect = url;
        this.setState({
            redirect: true,
        });
    }

    render = () => {
        if (this.state.redirect) {
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

        if(this.state.isLoading) {
            return (
                <div className="app loading">
                    <div className="app-loader">
                        <Loader width="max(8vw, 100px)" />
                    </div>
                </div>
            );
        } else {
            return (
                <div className="app">
                    <div className="content-wrapper">
                        <Header user={this.state.user} />
                        {/*<img src="http://localhost:8081/resources/toto.jpg" alt="Logo" />*/}
                        <div id="page-content">
                            <Switch>
                                <Route exact path="/" component={Home}/>
                                <Route exact path="/login" component={Login} />
                                <Route exact path="/register" component={Register}/>
                                <Route exact path="/forgot-password" component={ForgotPassword} />
                                <Route exact path="/reset-password/:token" component={ResetPassword} />
                                <Route exact path="/settings" component={Settings}/>
                                <Route path="/create-room/" component={CreateGame}/>
                                <Route exact path="/join-room" component={JoinRoom}/>
                                <Route path="/room/:id" component={Room}/>
                                <Route component={NotFound} />
                            </Switch>
                        </div>
                    </div>
                    <Footer/>
                </div>
            );
        }
    }
}

export default App;
