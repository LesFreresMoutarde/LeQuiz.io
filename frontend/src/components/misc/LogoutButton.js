import React from "react";
import {app} from "../App";
import Loader from "./Loader";

class LogoutButton extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
        };
    }

    render = () => {
        const defaultWidth = 36;
        const defaultHeight = 24;

        const width = this.props.width ?? defaultWidth;
        const color = this.props.color ?? "#fff";

        if(this.state.isLoading) {
            const widthRatio = width / defaultWidth;
            const loaderHeight = defaultHeight * widthRatio;

            return (
                <Loader width={width} height={loaderHeight} />
            )
        } else {

            return (
                <svg className="logout-button" width={width} onClick={this.onClick} xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px"
                     y="0px"
                     viewBox="0 0 36 24" xmlSpace="preserve">
                    <path fill={color} className="logout-button-door" d="M11.2,23.9H6c-3.3,0-6-2.7-6-6v-12c0-3.3,2.7-6,6-6h5.2c0.4,0,0.8,0.3,0.8,0.8v2.5c0,0.4-0.4,0.7-0.8,0.7H6
	            c-1.1,0-2,0.9-2,2v12c0,1.1,0.9,2,2,2h5.2c0.4,0,0.7,0.3,0.8,0.8v2.5C12,23.6,11.6,23.9,11.2,23.9z"/>
                    <path fill={color} className="logout-button-arrow" d="M18.6,5l4.9,4.4h-12c-0.8,0-1.5,0.7-1.5,1.5v2c0,0.8,0.7,1.5,1.5,1.5h12l-4.9,4.4c-0.6,0.6-0.7,1.5-0.1,2.1l0,0l1.4,1.4
                c0.6,0.6,1.5,0.6,2.1,0l9.5-9.4c0.6-0.6,0.6-1.5,0-2.1l0,0L22,1.4c-0.6-0.6-1.5-0.6-2.1,0l0,0l-1.4,1.4C18,3.4,17.9,4.3,18.6,5
                C18.5,4.9,18.5,4.9,18.6,5L18.6,5z"/>
                </svg>
            )
        }
    }

    onClick = async () => {
        this.setState({
            isLoading: true,
        });

        if(!(await app.logoutUser())) {
            this.setState({
                isLoading: false,
            });
        }
    }
}

export default LogoutButton;
