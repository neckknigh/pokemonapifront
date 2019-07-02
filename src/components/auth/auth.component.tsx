import React from 'react';
import LoginComponent from './login/login.component';
import { IAppState } from '../../redux/app-state';
import { connect } from 'react-redux';

export interface IAuthComponentProps {
    isFacebookLoggedIn?: boolean
}

export interface IAuthComponentState {
}

class AuthComponent extends React.Component<IAuthComponentProps, IAuthComponentState> {
    //state = { :  }

    /*
        TODO: 
        Montar la lógica para validar la sesíon
        Por ahora irá siempre al componente de login
    */

    render() {

        if (this.props.isFacebookLoggedIn) {
            console.log("Se logueó con facebook (AuthComponent");
        }

        return (
            <LoginComponent />
        );
    }
}

const mapStateToProps = (state: IAppState): IAuthComponentProps => {
    console.log(state);
    return {
        isFacebookLoggedIn: state.userState.isFacebookLoggedIn
    }
};

export default connect(mapStateToProps)(AuthComponent);