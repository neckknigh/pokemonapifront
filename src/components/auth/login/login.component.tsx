import React from 'react';
import "./login.comṕonent.scss";

export interface LoginComponentProps {

}

export interface LoginComponentState {

}

class LoginComponent extends React.Component<LoginComponentProps, LoginComponentState> {
    //state = { :  }
    render() {
        return (
            <div className="grid login-container">
                <div className="test-border column">
                    left side
               </div>
                <div className="test-border column flex-row-center right-container">
                    <img className="right-logo" src="/img/login/right-logo.png" alt="Righ-Doo" />
                </div>
            </div>
        );
    }
}

export default LoginComponent;