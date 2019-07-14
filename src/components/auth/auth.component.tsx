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
    userHasPendingRegistration?: boolean
}

export interface IAuthComponentState {
}

class AuthComponent extends React.Component<IAuthComponentProps, IAuthComponentState> {
    //state = { :  }

    constructor(props: IAuthComponentProps) {
        super(props);

        /**
         * Se valida si el usuario realizó correctamente el login
         * por account kit
         */
        this.props.validateAccountKitLoginDone!();
    }

    /*
        TODO: 
        Montar la lógica para validar la sesíon
        Por ahora irá siempre al componente de login
    */

    render() {

        if (this.props.userHasPendingRegistration) {
            return (<Redirect to='/signup' />)
        }

        return (
            <LoginComponent />
        );
    }
}

const mapStateToProps = (state: IAppState): IAuthComponentProps => {
    console.log(state);
    return {
        isFacebookLoggedIn: state.userState.isFacebookLoggedIn,
        userHasPendingRegistration: state.userState.pendingRegistration
    }
};

const mapDispatchToProps = (dispatch: Dispatch<AuthActions>): IAuthComponentProps => {
    return {
        validateAccountKitLoginDone: () => dispatch(authActions.validateAccountKitLoginDone())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthComponent);