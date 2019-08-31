import React, { Component } from 'react';
import { connect } from 'react-redux';
import { IAppState } from '../redux/app-state';
import { withRouter, Redirect } from 'react-router';
import { Dispatch } from 'redux';
import { authActions } from '../redux/action-creators/auth.action.creator';
import { utilService } from '../services/util.service';
import { ConfigProvider as CP } from '../services/config/config.service';
import { urlProvider } from '../services/config/url.service';
import { IAppProps } from '../app.component';

interface ISecureComponentProps {
    userHasSession?: boolean;
    validateSession?: () => any;
    sessionBeingValidated?: string | null;
}

interface ISecureComponentState {
    YES: string;
    authComponentName: string;
    rootPath: string;
}

export function privateRoute(WrappedComponent: any, appProps: IAppProps) {

    const wrappedComponentName: string = WrappedComponent.WrappedComponent.name;
    let { sessionBeingValidated, userHasSession } = appProps;
    const isEmptySessionBeingValidate = utilService.isEmpty(sessionBeingValidated);

    class SecureComponent extends Component<ISecureComponentProps, ISecureComponentState> {

        constructor(props: ISecureComponentProps) {
            super(props);

            this.state = {
                YES: CP.get(CP.YES),
                authComponentName: "AuthComponent",
                rootPath: urlProvider.getRootPath()
            }
        }

        public componentWillMount() {

            /**
             * Si no se ha lanzado el proceso de validación,
             * se lanza
             */
            if (isEmptySessionBeingValidate) {
                this.props.validateSession!();
            }
        }

        public isAuthComponent(): boolean {
            return wrappedComponentName === this.state.authComponentName;
        }

        render() {
            debugger;
            const { YES, rootPath } = this.state;
            console.log("userHasSession", this.props.userHasSession);
            userHasSession = this.props.userHasSession!;

            /**
             * Si la sessión está siendo validad o necesita validarse
             */
            if (isEmptySessionBeingValidate || sessionBeingValidated === YES) {
                return null;
            }

            // terminó de validar la sesión. y no está logueado.
            else if (!userHasSession) {
                return <Redirect to={rootPath} />
            }

            return <WrappedComponent {...this.props} />;
        }
    };

    return connect(mapStateToProps, mapDispatchToProps)(SecureComponent);
}

const mapStateToProps = (state: IAppState): ISecureComponentProps => {
    return {
        userHasSession: state.authState.userHasSession,
        sessionBeingValidated: state.authState.sessionBeingValidated
    }
}

const mapDispatchToProps = (dispatch: Dispatch): ISecureComponentProps => {
    return {
        validateSession: () => dispatch(authActions.validateUserSession())
    };
}