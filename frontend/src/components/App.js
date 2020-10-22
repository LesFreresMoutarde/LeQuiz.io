import React from 'react';
import '../css/minireset.min.css';
import '../css/style.css';
import {Switch, Route} from "react-router-dom";
import Home from "./pages/Home";
import CreateRoom from "./pages/CreateRoom";
import JoinRoom from "./pages/JoinRoom";
import Footer from "./Footer";
import Header from "./Header";
import Util from "../util/Util";
import Loader from "./misc/Loader";

class App extends React.Component {

    state = {
        isLoading: true,
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
                        <Header/>
                        {/*<img src="http://localhost:8081/resources/toto.jpg" alt="Logo" />*/}
                        <Switch>
                            <Route exact path="/" component={Home}/>
                            <Route exact path="/create-room" component={CreateRoom}/>
                            <Route exact path="/join-room" component={JoinRoom}/>
                        </Switch>
                        <p>Du contenu</p>
                        <p>Du contenu</p>
                        <p>Du contenu</p>
                        <p>Du contenu</p>
                        <p>Du contenu</p>
                        <p>Du contenu</p>
                        <p>Du contenu</p>
                        <p>Du contenu</p>
                        <p>Du contenu</p>
                        <p>Du contenu</p>
                        <p>Du contenu</p>
                        <p>Du contenu</p>
                        <p>Du contenu</p>
                        <p>Du contenu</p>
                        <p>Du contenu</p>
                    </div>
                    <Footer/>
                </div>
            );
        }
    }

    componentDidMount = async () => {
        await Util.onApplicationLoad();
        Util.verbose('Application loaded');
        this.setState({
            isLoading: false,
        });
    }
}

export default App;
