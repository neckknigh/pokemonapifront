import React, { Component } from 'react'
import "./header.component.scss";
import { connect } from 'react-redux';
import { IAppState } from '../../redux/app-state';
import { withRouter } from 'react-router';
import { Dispatch } from 'redux';
import { userActions } from '../../redux/action-creators/user.action.creator';
import { urlProvider } from '../../services/config/url.service';
import SearcherComponent from '../widgets/searcher/searcher.component';

interface IHeaderComponentProps {
    readonly userHasPendingRegistration?: boolean;
    readonly history?: any;
    readonly deletePendingRegistration?: () => void;
    readonly userHasSession?: boolean;
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
    }

    private handleClickCancelBtn = (): void => {

        // se elimina el status de pendiente de registro
        this.props.deletePendingRegistration!();
        this.props.history.push(this.state.basePath);
    }

    render() {
        return (
            <header>
                <nav className="grid">
                    <div className="column flex-row-start-items-center left-container">
                        <div>Arrow</div>
                        <a href={this.state.basePath} className="flex-row-center logo-container">
                            <img className="logo" src="/img/login/logo.png" alt="Doo" />
                        </a>
                        {
                            // Solo si tiene sesión se muestra el buscador
                            this.props.userHasSession &&
                            <div className="searcher">
                                <SearcherComponent />
                            </div>
                        }
                    </div>
                    <div className="column flex-row-end-items-center">
                        2 3 4
                    </div>
                </nav>
            </header>
        );
    }
}

const mapStateToProps = (state: IAppState): IHeaderComponentProps => {
    return {
        userHasPendingRegistration: state.userState.pendingRegistration,
        userHasSession: state.authState.userHasSession
    }
};

const mapDispatchToProps = (dipatch: Dispatch): IHeaderComponentProps => {
    return {
        deletePendingRegistration: () => dipatch(userActions.setUserHasPendingRegistration(false))
    }
};


export default withRouter<any>(connect(mapStateToProps, mapDispatchToProps)(HeaderComponent));