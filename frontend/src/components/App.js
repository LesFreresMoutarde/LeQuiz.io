import React from 'react';
import '../css/style.css';
import {Switch, Route} from "react-router-dom";
import Home from "./pages/Home";
import CreateRoom from "./pages/CreateRoom";
import JoinRoom from "./pages/JoinRoom";

class App extends React.Component {
    render = () => {
        return (
            <div className="App">
                <p>Toujours là</p>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/create-room" component={CreateRoom} />
                    <Route exact path="/join-room" component={JoinRoom} />
                </Switch>
            </div>
        );
    }

    componentDidMount = () => {
        console.log('did mount');
    }
}

export default App;
