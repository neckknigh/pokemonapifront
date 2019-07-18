import React, { Component } from 'react'
import { ConfigProvider as CP } from '../../../services/config/config.service';
import "./auth-footer.component.scss";

export interface AuthFooterComponentProps {

}

export interface AuthFooterComponentState {
    legalTerms: string,
    goToWebSiteDisplay: string
}

class AuthFooterComponent extends Component<AuthFooterComponentProps, AuthFooterComponentState> {

    constructor(props: AuthFooterComponentProps) {
        super(props);

        this.state = {
            legalTerms: CP.get(CP.LEGAL_TERMS),
            goToWebSiteDisplay: CP.get(CP.GO_TO_WEBSITE_DISPLAY)
        }
    }

    render() {
        return (
            <div className="flex-column-center-items auth-footer-container">
                <p className="legal-terms">{this.state.legalTerms}</p>

            </div>
        );
    }
}

export default AuthFooterComponent;