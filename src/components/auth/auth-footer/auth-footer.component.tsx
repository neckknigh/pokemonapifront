import React, { Component } from 'react'
import { ConfigProvider as CP } from '../../../services/config/config.service';
import "./auth-footer.component.scss";

export interface AuthFooterComponentProps {
    showFlags?: boolean
}

export interface AuthFooterComponentState {
    legalTerms: string,
    goToWebSiteDisplay: string,
    flags: any[]
}

class AuthFooterComponent extends Component<AuthFooterComponentProps, AuthFooterComponentState> {

    constructor(props: AuthFooterComponentProps) {
        super(props);

        this.state = {
            legalTerms: CP.get(CP.LEGAL_TERMS),
            goToWebSiteDisplay: CP.get(CP.GO_TO_WEBSITE_DISPLAY),
            flags: this.buildFlags()
        }
    }

    private buildFlags(): any[] {
        return [
            {
                src: "/img/login/flags/dummy.png",
                alt: "country flag 1"
            },
            {
                src: "/img/login/flags/dummy.png",
                alt: "country flag 1"
            },
            {
                src: "/img/login/flags/dummy.png",
                alt: "country flag 1"
            }
        ]
    }

    render() {
        return (
            <div className="flex-column-center-items auth-footer-container">
                <p className="legal-terms">{this.state.legalTerms}</p>
                {
                    this.props.showFlags &&
                    <div className="maximun-size">
                        <div className="line-on-side-container">
                            <p className="line-on-side hint">Ir al sitio web</p>
                        </div>
                        <div className="grid grid-justify-center grid-center flags-container">
                            {
                                this.state.flags.map((flag: any, index: number) => {
                                    return <button
                                        type="button"
                                        className="btn"
                                        key={index}
                                    >
                                        <img
                                            className="country-flag"
                                            src={flag.src}
                                            alt={flag.alt}
                                        />
                                    </button>
                                })
                            }
                        </div>
                    </div>
                }
            </div>
        );
    }
}

export default AuthFooterComponent;