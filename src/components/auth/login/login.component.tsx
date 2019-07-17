import React, { Component } from 'react';
import "./login.comṕonent.scss";
import FacebookLoginComponent from './facebook-login/facebook-login.component';
import AccountKitLoginComponent from "./accountkit-login/accountkit-login.component";
import AuthHeaderComponent from '../auth-header.component/auth-header.component';
import { ConfigProvider as CP } from '../../../services/config/config.service';


export interface LoginComponentState {
    logInHint: string
}

class LoginComponent extends Component<{}, LoginComponentState> {

    constructor(props: any) {
        super(props);

        this.state = {
            logInHint: CP.get(CP.LOGIN_HINT)
        }

    }


    render() {

        return (
            <div className="grid login-container">
                <div className="column-50 left-container">
                    <div className="test-border login-card flex-column-center-items">
                        <AuthHeaderComponent hintText={this.state.logInHint} />
                        <div className=" login-buttons flex-column-center-items">
                            <FacebookLoginComponent />
                            <AccountKitLoginComponent />
                        </div>
                        <div className="doo-terms">
                            <p>
                                Al hacer click, aceptas los Términos, Condiciones de Uso y Políticas de Habeas Data
                            </p>
                        </div>
                        <div className="line-on-side">
                            <p>Ir al sitio web</p>
                        </div>
                        <div className="country-flags">
                            flasg
                        </div>
                    </div>
                </div>
                <div className="column-50 flex-row-center right-container">
                    <img className="right-logo" src="/img/login/right-logo.png" alt="Righ-Doo" />
                </div>
            </div>
        );
    }
}

export default LoginComponent;