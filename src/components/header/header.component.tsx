import React, { Component } from 'react'
import "./header.component.scss";
import { connect } from 'react-redux';
import { IAppState } from '../../redux/app-state';
import { withRouter } from 'react-router';
import { Dispatch } from 'redux';
import { userActions } from '../../redux/action-creators/user.action.creator';

export interface IHeaderComponentProps {
    readonly userHasPendingRegistration?: boolean,
    readonly history?: any,
    readonly deletePendingRegistration?: () => void
}


class HeaderComponent extends Component<IHeaderComponentProps, {}> {

    private handleClickCancelBtn = (): void => {
        this.props.deletePendingRegistration!();
        this.props.history.push("/");
    }

    render() {
        return (
            <header>
                <nav className="flex-row-space-between">
                    <div className="flex-row-center logo-container">
                        <img className="logo" src="/img/login/logo.png" alt="Doo" />
                    </div>
                    <div className="searcher-container" >
                        {
                            this.props.userHasPendingRegistration ?
                                <button
                                    type="button"
                                    className="cancel-heading"
                                    onClick={this.handleClickCancelBtn}
                                >
                                    CANCELAR
                                </button> :
                                <span>Buscador</span>
                        }
                    </div>
                </nav>
            </header>
        );
    }
}

const mapStateToProps = (state: IAppState): IHeaderComponentProps => {
    return {
        userHasPendingRegistration: state.userState.pendingRegistration
    }
};

const mapDispatchToProps = (dipatch: Dispatch): IHeaderComponentProps => {
    return {
        deletePendingRegistration: () => dipatch(userActions.setUserHasPendingRegistration(false))
    }
};


export default withRouter<any>(connect(mapStateToProps, mapDispatchToProps)(HeaderComponent));