import React, { Component } from 'react';
import "./account.component.scss";

class AccountComponent extends Component<{}, {}> {
    public render(): JSX.Element {
        return (
            <div className="account">
                <img src="/img/login/flags/dummy.png" alt="login-img" className="account-image clickable" />
            </div>
        );
    }
}

export default AccountComponent;