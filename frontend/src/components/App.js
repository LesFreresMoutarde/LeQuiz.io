import React from 'react';
import '../css/minireset.min.css';
import '../css/style.css';
import '../css/util.css';
import {Switch, Route} from "react-router-dom";
import Home from "./pages/Home/Home";
import CreateGame from "./pages/CreateGame/CreateGame";
import JoinRoom from "./pages/JoinRoom/JoinRoom";
import Footer from "./Footer";
import Header from "./Header";
import Util from "../util/Util";
import Loader from "./misc/Loader";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            user: null,
        }
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
                                <Route path="/create-room/" component={CreateGame}/>
                                <Route exact path="/join-room" component={JoinRoom}/>
                            </Switch>
                        </div>
                    </div>
                    <Footer/>
                </div>
            );
        }
    }

    setUser = (user) => {
        this.setState({
            user,
        });
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
}

export default App;
