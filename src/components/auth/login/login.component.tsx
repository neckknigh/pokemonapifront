import React, { Component } from 'react';
import "./login.comṕonent.scss";
import FacebookLoginComponent from './facebook-login/facebook-login.component';
import AccountKitLoginComponent from "./accountkit-login/accountkit-login.component";
import { ConfigProvider as CP } from '../../../services/config/config.service';
import AuthHeaderComponent from '../auth-header/auth-header.component';
import AuthFooterComponent from '../auth-footer/auth-footer.component';


export interface ILoginComponentState {
    logInHint: string,
    showFlags?: boolean
}

class LoginComponent extends Component<{}, ILoginComponentState> {

    constructor(props: any) {
        super(props);

        this.state = {
            logInHint: CP.get(CP.LOGIN_HINT),
            showFlags: true
        }
    }

    render() {

        return (
            <div className="grid login-container">
                <div className="column-50 left-container flex-row-end-items-center">
                    <div className="test-border login-card flex-column-center-items">
                        <AuthHeaderComponent hintText={this.state.logInHint} />
                        <div className=" login-buttons flex-column-center-items">
                            <FacebookLoginComponent />
                            <AccountKitLoginComponent />
                        </div>
                        <AuthFooterComponent showFlags={this.state.showFlags} />
                    </div>
                </div>
                <div className="column-50 right-container flex-row-start-items-center">
                    <img className="right-logo" src="/img/login/right-logo.png" alt="Righ-Doo" />
                </div>
            </div>
        );
    }
}

export default LoginComponent;