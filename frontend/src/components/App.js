import React from 'react';
import '../css/minireset.min.css';
import '../css/style.css';
import {Switch, Route} from "react-router-dom";
import Home from "./pages/Home";
import CreateRoom from "./pages/CreateRoom";
import JoinRoom from "./pages/JoinRoom";

function App() {
    return (
        <div className="app">
            <div className="content-wrapper">
                <p>Toujours là</p>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/create-room" component={CreateRoom} />
                    <Route exact path="/join-room" component={JoinRoom} />
                </Switch>
            </div>
            <footer>
                <div className="footer-text">
                    <span className="footer-text-item">© LeQuiz.io {(new Date()).getFullYear()}</span>
                    -
                    <span className="footer-text-item"><a href="#" target="_blank">Mentions légales</a></span>
                </div>
            </footer>
        </div>
    );
}

export default App;
