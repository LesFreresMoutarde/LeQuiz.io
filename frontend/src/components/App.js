import React from 'react';
import '../css/style.css';
import {Switch, Route} from "react-router-dom";
import Home from "./pages/Home";
import CreateRoom from "./pages/CreateRoom";
import JoinRoom from "./pages/JoinRoom";
import Util from "../util/Util";


class App extends React.Component {
    render = () => {
        return (
            <div className="App">
                <p>Toujours là</p>
                <img src="http://localhost:8081/resources/toto.jpg" alt="Logo" />
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/create-room" component={CreateRoom} />
                    <Route exact path="/join-room" component={JoinRoom} />
                </Switch>
            </div>
        );
    }

    componentDidMount = () => {
        Util.onApplicationLoad();
    }

}

export default App;
