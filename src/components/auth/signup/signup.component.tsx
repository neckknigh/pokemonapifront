import * as React from 'react';
import "./signup.component.scss";
import { Redirect } from 'react-router';
import { IAppState } from '../../../redux/app-state';
import { connect } from 'react-redux';

export interface SignUpComponentProps {
    readonly userHasPendingRegistration: boolean
}

export interface SignUpComponentState {

}

class SignUpComponent extends React.Component<SignUpComponentProps, SignUpComponentState> {

    handleFormSubmit = (event: React.SyntheticEvent) => {
        event.preventDefault();
        console.log("click");
    }

    render() {

        /**
         * No se podrá acceder a esta ruta si no se ha realizado
         * el login con account kit
         */
        if (!this.props.userHasPendingRegistration) {
            return (<Redirect to='/' />)
        }

        return (
            <div className="flex-column-center-items signup-container">
                <h1>Completa tu registro</h1>
                <form onSubmit={this.handleFormSubmit}>
                    <div className="form-group">
                        <label >Ingresa tu username</label>
                        <input type="text" className="form-control" id="formGroupExampleInput" placeholder="username" />
                    </div>

                    <div className="form-group">
                        <label >Ingresa tu correo</label>
                        <input type="text" className="form-control" id="formGroupExampleInput" placeholder="email" />
                    </div>
                    <button type="submit" className="btn btn-primary">Enviar</button>
                </form>

            </div>
        );
    }
}

const mapStateToProps = (state: IAppState): SignUpComponentProps => {
    return {
        userHasPendingRegistration: state.userState.pendingRegistration
    }
}

export default connect(mapStateToProps)(SignUpComponent);