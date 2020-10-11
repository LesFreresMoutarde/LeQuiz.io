import React from 'react';
import '../css/minireset.min.css';
import '../css/style.css';
import {Switch, Route} from "react-router-dom";
import Home from "./pages/Home";
import CreateRoom from "./pages/CreateRoom";
import JoinRoom from "./pages/JoinRoom";
import Footer from "./Footer";

function App() {
    return (
        <div className="app">
            <div className="content-wrapper">
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/create-room" component={CreateRoom} />
                    <Route exact path="/join-room" component={JoinRoom} />
                </Switch>
            </div>
            <Footer />
        </div>
    );
}

export default App;
