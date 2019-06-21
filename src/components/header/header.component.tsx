import React, { Component } from 'react'
import "./header.component.scss";

export interface HeaderComponentProps {

}

export interface HeaderComponentState {

}

class HeaderComponent extends Component<HeaderComponentProps, HeaderComponentState> {
    //state = { :  }
    render() {
        return (
            <header>
                <nav className="flex-row-space-between">
                    <div className="test-border flex-row-center logo-container">
                        <img className="logo" src="/img/login/logo.png" alt="Doo" />
                    </div>
                    <div className="test-border div1" >
                        Buscador
                    </div>
                </nav>
            </header>
        );
    }
}

export default HeaderComponent;