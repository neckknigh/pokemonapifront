import * as React from 'react';
import "./signup.component.scss";
import { Redirect } from 'react-router';
import { IAppState } from '../../../redux/app-state';
import { connect } from 'react-redux';
import AuthHeaderComponent from '../auth-header.component/auth-header.component';
import { ConfigProvider as CP } from '../../../services/config/config.service';

export interface SignUpComponentProps {
    readonly userHasPendingRegistration: boolean
}

export interface SignUpComponentState {
    signUpHint: string
}

class SignUpComponent extends React.Component<SignUpComponentProps, SignUpComponentState> {

    constructor(props: SignUpComponentProps) {
        super(props);

        this.state = {
            signUpHint: CP.get(CP.SIGN_UP_HINT)
        }
    }

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
            <div className="signup-container flex-column-center-items">
                <div className="sign-up-card flex-column-center-items">

                    <AuthHeaderComponent hintText={this.state.signUpHint} />

                    <div className="signup-card-body">
                        <div className="signup-inputs-container flex-column-center-items ">
                            <input type="password" className="form-control" placeholder="Ingresa un nombre de usuario..." />
                            <input type="password" className="form-control" placeholder="Ingresa email..." />

                        </div>
                        <div className="signup-card-body-btn">
                            <button
                                type="submit"
                                className="btn btn-success btn-lg btn-block signup-btn"
                            >
                                Continuar
                        </button>
                        </div>
                    </div>

                </div>

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