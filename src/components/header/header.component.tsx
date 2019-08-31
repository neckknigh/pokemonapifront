import React, { Component } from 'react';
import "./header.component.scss";
import { connect } from 'react-redux';
import { IAppState } from '../../redux/app-state';
import { withRouter } from 'react-router';
import { Dispatch } from 'redux';
import { userActions } from '../../redux/action-creators/user.action.creator';
import { urlProvider } from '../../services/config/url.service';
import SearcherComponent from '../widgets/searcher/searcher.component';
import { systemActions } from '../../redux/action-creators/system.action.creator';
import { authActions } from '../../redux/action-creators/auth.action.creator';
import AccountSummaryComponent from '../account/account-sumary.component';
import ImageContainerComponent from '../widgets/image-container/image-container.component';
import { NullableString } from '../../types/types';

interface IHeaderComponentProps {
    readonly userHasPendingRegistration?: boolean;
    readonly history?: any;
    readonly deletePendingRegistration?: () => void;
    readonly userHasSession?: NullableString;
    readonly showSideMenu?: (open: boolean) => void;
    readonly isSideMenuOpen?: boolean;
    readonly validateUserSession?: () => void;
    readonly isAdminUser?: NullableString;
}

interface IHeaderComponentState {
    readonly basePath: string;
}

class HeaderComponent extends Component<IHeaderComponentProps, IHeaderComponentState> {

    constructor(props: IHeaderComponentProps) {
        super(props);

        this.state = {
            basePath: urlProvider.getRootPath()
        }

        // Se valida la sessión de usuario
        //this.props.validateUserSession!();
    }

    private handleClickCancelBtn = (): void => {

        // se elimina el status de pendiente de registro
        this.props.deletePendingRegistration!();
        this.props.history.push(this.state.basePath);
    }

    private toogleSideMenuHandler = (): void => {
        this.props.showSideMenu!(!this.props.isSideMenuOpen);
    }

    // TODO: Refactorizar este render para que solo evalue una vez la session
    render() {
        const readOnlyMode = this.props.userHasSession !== "Y" || this.props.isAdminUser !== "Y";
        return (
            <header >
                <nav className="grid">
                    <div className="column flex-row-start-items-center left-container">
                        {
                            // Si tiene sesión se muestra el botón de abrir el sidemenu
                            !readOnlyMode &&
                            <div className="flex-row-center-items-center side-btn-menu-container">
                                <button
                                    type="button"
                                    className="btn side-menu-btn"
                                    onClick={this.toogleSideMenuHandler}
                                >
                                    {
                                        this.props.isSideMenuOpen ?
                                            <i className="fas fa-arrow-left side-menu-btn-icon"></i> :
                                            <i className="fas fa-align-justify side-menu-btn-icon"></i>
                                    }
                                </button>
                            </div>
                        }

                        <a href={this.state.basePath} className="flex-row-center logo-container">
                            <img className="logo" src="/img/login/logo.png" alt="Doo" />
                        </a>

                        {
                            // Solo si tiene sesión se muestra el buscador
                            !readOnlyMode &&
                            <div className="searcher">
                                <SearcherComponent />
                            </div>
                        }

                    </div>
                    <div className="column flex-row-end-items-center right-container">
                        {
                            this.props.userHasPendingRegistration ?
                                <button
                                    type="button"
                                    className="cancel-heading"
                                    onClick={this.handleClickCancelBtn}
                                >
                                    CANCELAR
                                </button> :

                                !readOnlyMode &&
                                <section className="flex-row-center-items-center grid header-right-items">
                                    <div className="column clickable">
                                        <ImageContainerComponent
                                            img="/img/flags/col-flag.png"
                                            displayText="Colombia"
                                            iconCls="fas fa-chevron-down"
                                            showIcon={true}
                                        />
                                    </div>
                                    <div className="column clickable">
                                        <ImageContainerComponent
                                            displayText="Bogotá"
                                            iconCls="fas fa-chevron-down"
                                            showIcon={true}
                                        />
                                    </div>
                                    <div className="column clickable">
                                        <AccountSummaryComponent />
                                    </div>
                                </section>
                        }
                    </div>
                </nav>
            </header>
        );
    }
}

const mapStateToProps = (state: IAppState): IHeaderComponentProps => {
    return {
        userHasPendingRegistration: state.userState.pendingRegistration,
        userHasSession: state.authState.userHasSession,
        isSideMenuOpen: state.systemState.isSideMenuOpen,
        isAdminUser: state.userState.isAdmin
    }
};

const mapDispatchToProps = (dispatch: Dispatch): IHeaderComponentProps => {
    return {
        deletePendingRegistration: () => dispatch(userActions.setUserHasPendingRegistration(false)),
        showSideMenu: (open: boolean) => dispatch(systemActions.openSideMenu(open)),
        validateUserSession: () => dispatch(authActions.validateUserSession())
    }
};


export default withRouter<any>(connect(mapStateToProps, mapDispatchToProps)(HeaderComponent));