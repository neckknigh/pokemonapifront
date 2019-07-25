import React, { Component } from 'react'
import "./incoming-features.component.scss";
import { IAppState } from '../../redux/app-state';
import { connect } from 'react-redux';

interface IIncomingFeaturesProps {
    userHasSession: boolean;
    history?: any;
}


class IncomingFeaturesComponent extends Component<IIncomingFeaturesProps, {}> {

    private handleGooglePlayBtn() {
        window.open("https://play.google.com/store/apps/details?id=and.doo.greenggers.com.doo&hl=es", "_blank")
    }

    private handleAppleStoreBtn() {
        window.open("https://apps.apple.com/us/app/doo-el-barrio-en-tu-bolsillo/id1167625418", "_blank")
    }

    render() {

        if (!this.props.userHasSession) {
            this.props.history.push("/");
        }

        return (
            <div className="grid login-container incoming-features-container">
                <div className="column-50 left-container flex-row-end-items-center">
                    <div className="test-border login-card flex-column-center-items">
                        <div className="flex-column-center auth-header-outer-container ">
                            <div className="auth-header-inner-container incoming-header">
                                <div className="flex-column-center-items">
                                    <img className="logo-doo-simple" src="/img/login/simple-doo-icon.png" alt="Icon Doo" />
                                </div>
                                <div className="flex-column-center-items">
                                    <h1 className="auth-header-slogan">Todo el barrio en tu bolsillo</h1>
                                    <h6 >Muy pronto nuevos servicios para ti</h6>
                                </div>
                            </div>
                            <div className="line-on-side-container">
                                <div className="line-on-side">
                                    <p className="hint">Descarga la App</p>
                                </div>
                            </div>

                            <div className="flex-column-center-items incoming-footer">

                                <div className="maximun-size">

                                    <div className="grid grid-justify-center grid-center flags-container">
                                        <button
                                            type="button"
                                            className="btn"
                                            onClick={this.handleGooglePlayBtn}
                                        >
                                            <img
                                                className="google-social-btn"
                                                src="/img/incoming-features/google-play-button.png"
                                                alt=""
                                            />
                                        </button>

                                        <button
                                            type="button"
                                            className="btn apple-btn"
                                            onClick={this.handleAppleStoreBtn}
                                        >
                                            <img
                                                className="apple-social-icon"
                                                src="/img/incoming-features/app-store-button.png"
                                                alt=""
                                            />
                                        </button>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="column-50 right-container flex-row-start-items-center">
                    <img className="right-logo" src="/img/login/right-logo.png" alt="Righ-Doo" />
                </div>
            </div>
        );
    }
}

const mapStateToProps = (appState: IAppState): IIncomingFeaturesProps => {
    return {
        userHasSession: appState.authState.userHasSession
    }
}

export default connect(mapStateToProps)(IncomingFeaturesComponent);