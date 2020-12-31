import React from 'react';
import '../css/minireset.min.css';
import '../css/style.css';
import '../css/util.css';
import 'toastr2/dist/toastr.min.css';
import '../css/toastr.override.css';
import {Switch, Route} from "react-router-dom";
import Home from "./pages/Home/Home";
import CreateGame from "./pages/CreateGame/CreateGame";
import JoinRoom from "./pages/JoinRoom/JoinRoom";
import Footer from "./Footer";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import Header from "./Header";
import Util from "../util/Util";
import Loader from "./misc/Loader";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Settings from "./pages/Settings/Settings";

import Toastr from "toastr2";
import Room from "./pages/Room/Room";
const toastr = new Toastr();


class App extends React.Component {

    static GLOBAL = null;

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            user: null,
        }

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

    render = () => {
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
                                <Route exact path="/login" render={() => <Login setUser={this.setUser} currentUser={this.state.user} />}/>
                                <Route exact path="/register" component={Register}/>
                                <Route exact path="/forgot-password" render={() => <ForgotPassword currentUser={this.state.user} />} />
                                <Route exact path="/settings" component={Settings}/>
                                <Route path="/create-room/" component={CreateGame}/>
                                <Route exact path="/join-room" component={JoinRoom}/>
                                <Route path="/room/:id" component={Room}/>
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
