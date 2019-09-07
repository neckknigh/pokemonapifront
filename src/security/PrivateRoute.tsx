import React, { Component } from 'react';
import { connect } from 'react-redux';
import { IAppState } from '../redux/app-state';
import { Redirect } from 'react-router';
import { Dispatch } from 'redux';
import { authActions } from '../redux/action-creators/auth.action.creator';
import { utilService } from '../services/util.service';
import { ConfigProvider as CP } from '../services/config/config.service';
import { urlProvider } from '../services/config/url.service';
import { NullableString } from '../types/types';
import DashBoardComponent from '../components/dashboard/dashboard.component';
import ComunitySummaryComponent from '../components/comunities/comunity-summary/comunity-summary.component';
import SignupComponent from '../components/auth/signup/signup.component';
import IncomingFeaturesComponent from '../components/incoming-features/incoming-features.component';
import AuthComponent from '../components/auth/auth.component';

interface ISecureComponentProps {
    userHasSession?: NullableString;
    validateSession?: () => void;
    sessionBeingValidated?: NullableString;
    userHasPendingRegistration?: NullableString;
    isAdminUser?: NullableString;
}

interface ISecureComponentState {
    YES: string;
    rootPath: string;
    NO: string;
    publicComponents: string[];
}

const array: any[] = [];

export function secureComponentFactory(componentName: string) {
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
            let componentToRender: JSX.Element | null = null;
            const { YES, NO } = this.state;
            const {
                userHasSession,
                sessionBeingValidated,
                userHasPendingRegistration,
                isAdminUser
            } = this.props;
            debugger;

            /**
             * Si la sessión está siendo validada o necesita validarse
             */
            if (utilService.isEmpty(sessionBeingValidated) || sessionBeingValidated === YES) {
                componentToRender = null;
            }

            /**
             * Terminó de validar la sesión,
             * el usuario no tiene sesión.
             * y no es el componente de completar registro.
             */
            else if (userHasSession === NO && componentName !== "SignUpComponent") {

                /**
                 * Si se cargó la ruta /auth
                 */
                if (componentName === "AuthComponent") {

                    // Si no se ha evaluado si hay o no pendiente registro
                    if (utilService.isEmpty(userHasPendingRegistration)) {
                        componentToRender = <AuthComponent {...this.props} />
                    }

                    // Ya se evaluó si hay o no pendiente de registro
                    else {

                        // Si lo hay, se redirecciona a completar el registro
                        if (userHasPendingRegistration === "Y") {
                            componentToRender = <Redirect to='/signup' />;
                        }

                        // Si no, se devuelve al path base.
                        else {
                            componentToRender = <Redirect to='/' />;
                        }
                    }
                }

                /**
                 * No hay sesión, y cargo cualquier otra ruta,
                 * se redirecciona al path base.
                 */
                else if (!this.isPublicComponent()) {
                    componentToRender = <Redirect to='/' />;
                }
            }

            /**
             * Si tiene sesión,
             * entro a la ruta /auth o /signup
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

            else {

                switch (componentName) {
                    case "DashBoardComponent":
                        componentToRender = <DashBoardComponent {...this.props} />;
                        break;

                    case "ComunitySummaryComponent":
                        componentToRender = <ComunitySummaryComponent {...this.props} />;
                        break;

                    case "SignUpComponent":
                        componentToRender = <SignupComponent {...this.props} />;
                        break;

                    case "IncomingFeaturesComponent":
                        componentToRender = <IncomingFeaturesComponent {...this.props} />;
                        break;
                }
            }

            return componentToRender;
        }

        private isPublicComponent(): boolean {
            return this.state.publicComponents.includes(componentName);
        }
    };

    const connectedComponent = connect(mapStateToProps, mapDispatchToProps)(SecureComponent);


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