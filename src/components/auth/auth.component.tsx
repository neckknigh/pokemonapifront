import React from 'react';
import LoginComponent from './login/login.component';
import { IAppState } from '../../redux/app-state';
import { connect } from 'react-redux';
import { AuthActions } from '../../redux/actions/auth.actions';
import { Dispatch } from 'redux';
import { authActions } from '../../redux/action-creators/auth.action.creator';
import { Redirect } from 'react-router';

export interface IAuthComponentProps {
    isFacebookLoggedIn?: boolean,
    validateAccountKitLoginDone?: () => any,
    userHasPendingRegistration?: boolean,
    userHasSession?: boolean
}

export interface IAuthComponentState {
}

class AuthComponent extends React.Component<IAuthComponentProps, IAuthComponentState> {
    //state = { :  }

    constructor(props: IAuthComponentProps) {
        super(props);

        console.log("aaa")

        /**
         * Se valida si el usuario realizó correctamente el login
         * por account kit
         */
        this.props.validateAccountKitLoginDone!();
    }

    render() {

        console.log("aaa");

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
            return (<Redirect to='/comunities' />);
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
        userHasSession: state.authState.userHasSession
    }
};

const mapDispatchToProps = (dispatch: Dispatch<AuthActions>): IAuthComponentProps => {
    return {
        validateAccountKitLoginDone: () => dispatch(authActions.validateAccountKitLoginDone())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthComponent);