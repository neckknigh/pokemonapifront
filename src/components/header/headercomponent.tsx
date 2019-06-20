import React, { Component } from 'react'
import "./headercomponent.scss";

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
                    <div className="flex-row-center logo-container">
                        <img className="logo" src="/img/login/logo.png" alt="Doo" />
                    </div>
                    <div className="div1" >
                        Buscador
                    </div>
                </nav>
            </header>
        );
    }
}

export default HeaderComponent;