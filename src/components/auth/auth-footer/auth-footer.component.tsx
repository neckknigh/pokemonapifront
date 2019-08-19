import React, { Component } from 'react'
import { ConfigProvider as CP } from '../../../services/config/config.service';
import "./auth-footer.component.scss";
import CountryFlagsComponent from '../../widgets/country-flags/country-flags.component';

export interface AuthFooterComponentProps {
    showFlags?: boolean
}

export interface AuthFooterComponentState {
    legalTerms: string,
    goToWebSiteDisplay: string,
    flagsWidth: string
}

class AuthFooterComponent extends Component<AuthFooterComponentProps, AuthFooterComponentState> {

    constructor(props: AuthFooterComponentProps) {
        super(props);

        this.state = {
            legalTerms: CP.get(CP.LEGAL_TERMS),
            goToWebSiteDisplay: CP.get(CP.GO_TO_WEBSITE_DISPLAY),
            flagsWidth: "2.2rem"
        }
    }

    public render(): JSX.Element {
        return (
            <div className="flex-column-center-items auth-footer-container">
                <p className="legal-terms">{this.state.legalTerms}</p>
                {
                    this.props.showFlags &&
                    <div className="maxsimun-size">
                        <div className="line-on-side-container">
                            <p className="line-on-side hint">Ir al sitio web</p>
                        </div>
                        <div className="grid grid-justify-center grid-center flags-container">
                            <CountryFlagsComponent flagWidth={this.state.flagsWidth} />
                        </div>
                    </div>
                }
            </div>
        );
    }
}

export default AuthFooterComponent;