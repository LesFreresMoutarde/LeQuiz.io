import React from "react";


export default class ChooseOptions extends React.Component {

    constructor(props) {
        super(props);

    }

    componentDidMount() {
        console.log("options MOUNTED")
    }

    render() {
        return (
            <div>
                <p>Les options de jeu !!!!</p>
            </div>
        );
    }


}