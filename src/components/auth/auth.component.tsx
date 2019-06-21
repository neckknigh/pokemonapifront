import React from 'react';
import LoginComponent from './login/login.component';
export interface AuthComponentProps {

}

export interface AuthComponentState {

}

class AuthComponent extends React.Component<AuthComponentProps, AuthComponentState> {
    //state = { :  }

    /*
        TODO: 
        Montar la lógica para validar la sesíon
        Por ahora irá siempre al componente de login
    */

    render() {
        return (
            <LoginComponent />
        );
    }
}

export default AuthComponent;