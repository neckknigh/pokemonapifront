import React from 'react';
import LoginComponent from './login/login.component';
import { IAppState } from '../../redux/app-state';
import { connect } from 'react-redux';
import { AuthActions } from '../../redux/actions/auth.actions';
import { Dispatch } from 'redux';
import { authActions } from '../../redux/action-creators/auth.action.creator';
import { Redirect, withRouter } from 'react-router';
import { urlProvider } from '../../services/config/url.service';
import { NullableString } from '../../types/types';

export interface IAuthComponentProps {
    isFacebookLoggedIn?: boolean;
    validateAccountKitLoginDone?: () => any;
    userHasPendingRegistration?: boolean;
    userHasSession?: NullableString;
    history?: any;
    appHasError?: boolean;
    isAdminUser?: NullableString;
}

export interface IAuthComponentState {
    validateAccountKitLogin: boolean
}

class AuthComponent extends React.Component<IAuthComponentProps, IAuthComponentState> {


    constructor(props: IAuthComponentProps) {
        super(props);

        this.state = {
            validateAccountKitLogin: !urlProvider.isRoot()
        }

        /**
         * Si la url no es el path base
         * Se valida si el usuario realizó correctamente el login
         * por account kit.
         */
        if (this.state.validateAccountKitLogin) {
            this.props.validateAccountKitLoginDone!();
        }
    }

    public componentWillReceiveProps(props: IAuthComponentProps): void {
        //debugger;
        /**
         * Si hubo un cambio en el estado de error de la app
         * y si hubo un error, se redirecciona a la ruta base.  
         */
        if (props.appHasError !== this.props.appHasError
            && props.appHasError) {
            this.props.history.push("/");
        }
    }

    public render(): JSX.Element {
        //debugger;
        const { userHasPendingRegistration, isAdminUser, userHasSession } = this.props;
        let componentToRender = <LoginComponent />;

        /**
         * Si se tiene pendiente un registro,
         * se redirecciona
         */
        if (userHasPendingRegistration) {
            componentToRender = <Redirect to='/signup' />;
        }

        else if (userHasSession === "Y") {

            if (isAdminUser === "Y") {
                componentToRender = <Redirect to="/comunities" />;
            }
            else if (isAdminUser === "N") {

                /**
                * Si es usuario normal verá la página en construcción.
                */
                componentToRender = <Redirect to="/incoming_features" />;
            }
        }

        return componentToRender;
    }
}

const mapStateToProps = (state: IAppState): IAuthComponentProps => {
    return {
        isFacebookLoggedIn: state.userState.isFacebookLoggedIn,
        userHasPendingRegistration: state.userState.pendingRegistration,
        userHasSession: state.authState.userHasSession,
        appHasError: state.systemState.appHasError,
        isAdminUser: state.userState.isAdmin
    }
};

const mapDispatchToProps = (dispatch: Dispatch<AuthActions>): IAuthComponentProps => {
    return {
        validateAccountKitLoginDone: () => dispatch(authActions.validateAccountKitLoginDone())
    }
};

export default withRouter<any>(connect(mapStateToProps, mapDispatchToProps)(AuthComponent));