import React, { Component } from 'react';
import "./login.comṕonent.scss";
import FacebookLoginComponent from './facebook-login/facebook-login.component';
import AccountKitLoginComponent from "./accountkit-login/accountkit-login.component";

export interface LoginComponentProps {

}

export interface LoginComponentState {
}

class LoginComponent extends Component<LoginComponentProps, LoginComponentState> {
    //state = { :  }


    render() {

        return (
            <div className="grid login-container">
                <div className="column-50 left-container">
                    <div className="test-border login-card flex-column-center-items">
                        <div>
                            <img className="logo-doo-simple" src="/img/login/simple-doo-icon.png" alt="Icon Doo" />
                        </div>
                        <div>
                            <h1 className="slogan-doo">Todo el barrio en tu mano</h1>
                        </div>
                        <div className="line-on-side">
                            <p>Ingresar</p>
                        </div>
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