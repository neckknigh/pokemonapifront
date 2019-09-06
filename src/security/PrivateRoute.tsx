import React, { Component } from 'react';
import { connect } from 'react-redux';
import { IAppState } from '../redux/app-state';
import { Redirect, withRouter } from 'react-router';
import { Dispatch } from 'redux';
import { authActions } from '../redux/action-creators/auth.action.creator';
import { utilService } from '../services/util.service';
import { ConfigProvider as CP } from '../services/config/config.service';
import { urlProvider } from '../services/config/url.service';
import { NullableString } from '../types/types';

interface ISecureComponentProps {
    userHasSession?: NullableString;
    validateSession?: () => void;
    sessionBeingValidated?: NullableString;
    userHasPendingRegistration?: boolean;
    isAdminUser?: NullableString;
}

interface ISecureComponentState {
    YES: string;
    rootPath: string;
    NO: string;
    publicComponents: string[];
}

const array: any[] = [];

export function privateRoute(WrappedComponent: any) {
    const componentName = WrappedComponent.WrappedComponent.name;
    const cached = array.find((entry) => entry.name === componentName);

    if (!utilService.isEmpty(cached)) {
        return cached.component;
    }

    class SecureComponent extends Component<ISecureComponentProps, ISecureComponentState> {

        constructor(props: ISecureComponentProps) {
            super(props);

            this.state = {
                YES: CP.get(CP.YES),
                rootPath: urlProvider.getRootPath(),
                NO: CP.get(CP.NO),
                publicComponents: [
                    "SignUpComponent",
                    "AuthComponent"
                ]
            }
        }

        public componentWillMount() {
            const { sessionBeingValidated, validateSession } = this.props;

            /**
             * Si no se ha lanzado el proceso de validación,
             * se lanza
             */
            if (utilService.isEmpty(sessionBeingValidated)) {
                validateSession!();
            }
        }

        public render(): JSX.Element | null {
            let componentToRender: JSX.Element | null = <WrappedComponent {...this.props} />;
            const { YES, rootPath, NO } = this.state;
            const {
                userHasSession,
                sessionBeingValidated,
                userHasPendingRegistration,
                isAdminUser
            } = this.props;
            //debugger;

            /**
             * Si la sessión está siendo validada o necesita validarse
             */
            if (utilService.isEmpty(sessionBeingValidated) || sessionBeingValidated === YES) {
                componentToRender = null;
            }

            /**
             * Terminó de validar la sesión,
             * el usuario no tiene sesión y tampoco tiene pendiente
             * el registro.
             */
            else if (userHasSession === NO && !userHasPendingRegistration) {
                componentToRender = <Redirect to={rootPath} />
            }

            /**
             * Si tiene sesión, y cargo la ruta para hacer el registro
             */
            else if (userHasSession === YES && this.isPublicComponent()) {

                /**
                 * Si es administrador
                 * se envía a la página principal
                 */
                if (isAdminUser === YES) {
                    componentToRender = <Redirect to="/comunities" />
                }

                /**
                 * Si no lo es, se envía a la página de construcción.
                 */
                else if (isAdminUser === NO) {
                    componentToRender = <Redirect to="/incoming_features" />
                }
            }

            return componentToRender;
        }

        private isPublicComponent(): boolean {
            return this.state.publicComponents.includes(componentName);
        }
    };

    const connectedComponent = withRouter<any>(connect(mapStateToProps, mapDispatchToProps)(SecureComponent));
    array.push({
        component: connectedComponent,
        name: componentName
    });

    return (connectedComponent);
}

const mapStateToProps = (state: IAppState): ISecureComponentProps => {
    return {
        userHasSession: state.authState.userHasSession,
        sessionBeingValidated: state.authState.sessionBeingValidated,
        userHasPendingRegistration: state.userState.pendingRegistration,
        isAdminUser: state.userState.isAdmin
    }
}

const mapDispatchToProps = (dispatch: Dispatch): ISecureComponentProps => {
    return {
        validateSession: () => dispatch(authActions.validateUserSession())
    };
}