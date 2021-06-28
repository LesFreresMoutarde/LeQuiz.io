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
                <svg className="logout-button" version="1.1" width={width} onClick={this.onClick} xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                     viewBox="0 0 100 100" xmlSpace="preserve">
                    <path fill={color} className="logout-button-arrow" d="M90.4,51c0-1.1-0.4-2.1-1.2-2.8L74.4,33.3c-1.6-1.6-4.1-1.6-5.7,0c-1.6,1.6-1.6,4.1,0,5.7l8,8H37c-2.2,0-4,1.8-4,4
                        s1.8,4,4,4h39.8l-8,8c-1.6,1.6-1.6,4.1,0,5.7c0.8,0.8,1.8,1.2,2.8,1.2s2-0.4,2.8-1.2l14.8-14.8C90,53.1,90.4,52.1,90.4,51z"/>
                    <path fill={color} className="logout-button-door" d="M26.8,27H52c2.2,0,4-1.8,4-4s-1.8-4-4-4H26.8C18.7,19,12,25.7,12,33.8v34.3C12,76.3,18.7,83,26.8,83H52c2.2,0,4-1.8,4-4
                        s-1.8-4-4-4H26.8C23,75,20,71.9,20,68.2V33.8C20,30.1,23.1,27,26.8,27z"/>
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
