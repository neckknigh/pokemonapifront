import React, { Component } from 'react';
import "./auth-header.component.scss";
import { ConfigProvider as CP } from '../../../services/config/config.service';

export interface AuthHeaderComponentProps {
    hintText: string
}

export interface AuthHeaderComponentState {
    dooSlogan: string
}

class AuthHeaderComponent extends Component<AuthHeaderComponentProps, AuthHeaderComponentState> {

    constructor(props: AuthHeaderComponentProps) {
        super(props);

        this.state = {
            dooSlogan: CP.get(CP.SLOGAN_DOO)
        }
    }

    render() {
        return (
            <div className="flex-column-center auth-header-outer-container ">
                <div className="auth-header-inner-container">
                    <div className="flex-column-center-items">
                        <img className="logo-doo-simple" src="/img/login/simple-doo-icon.png" alt="Icon Doo" />
                    </div>
                    <div className="flex-column-center-items">
                        <h1 className="auth-header-slogan">{this.state.dooSlogan}</h1>
                    </div>
                </div>
                <div className="auth-line-on-side-container">
                    <div className="line-on-side">
                        <p className="hint">{this.props.hintText}</p>
                    </div>
                </div>
            </div>

        );
    }
}

export default AuthHeaderComponent;