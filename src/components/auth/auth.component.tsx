import React from 'react';
import LoginComponent from './login/login.component';
import { IAppState } from '../../redux/app-state';
import { connect } from 'react-redux';
import { AuthActions } from '../../redux/actions/auth.actions';
import { Dispatch } from 'redux';
import { authActions } from '../../redux/action-creators/auth.action.creator';
import { Redirect } from 'react-router';
import { urlProvider } from '../../services/config/url.service';

export interface IAuthComponentProps {
    isFacebookLoggedIn?: boolean;
    validateAccountKitLoginDone?: () => any;
    userHasPendingRegistration?: boolean;
    userHasSession?: boolean;
    history?: any;
    appHasError?: boolean;
}

export interface IAuthComponentState {
    validateAccountKitLogin: boolean
}

class AuthComponent extends React.Component<IAuthComponentProps, IAuthComponentState> {


    constructor(props: IAuthComponentProps) {
        debugger;
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

        /**
         * Si hubo un cambio en el estado de error de la app
         * y si hubo un error, se redirecciona a la ruta base.  
         */
        if (props.appHasError !== this.props.appHasError
            && props.appHasError) {
            this.props.history.push("/");
        }
    }

    render() {

        /**
         * Si se tiene pendiente un registro,
         * se redirecciona
         */
        if (this.props.userHasPendingRegistration) {
            return (<Redirect to='/signup' />);
        }

        /**
         * Si ya ha iniciado sesión,
         * redirecciona a la página princiipal.
         */
        if (this.props.userHasSession) {
            return (<Redirect to='/incoming_features' />);
        }

        return (
            <LoginComponent />
        );
    }
}

const mapStateToProps = (state: IAppState): IAuthComponentProps => {
    return {
        isFacebookLoggedIn: state.userState.isFacebookLoggedIn,
        userHasPendingRegistration: state.userState.pendingRegistration,
        userHasSession: state.authState.userHasSession,
        appHasError: state.systemState.appHasError
    }
};

const mapDispatchToProps = (dispatch: Dispatch<AuthActions>): IAuthComponentProps => {
    return {
        validateAccountKitLoginDone: () => dispatch(authActions.validateAccountKitLoginDone())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthComponent);