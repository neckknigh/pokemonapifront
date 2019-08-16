import React, { Component } from 'react';
import "./signup.component.scss";
import { Redirect } from 'react-router';
import { IAppState } from '../../../redux/app-state';
import { connect } from 'react-redux';
import AuthHeaderComponent from '../auth-header/auth-header.component';
import { ConfigProvider as CP } from '../../../services/config/config.service';
import AuthFooterComponent from '../auth-footer/auth-footer.component';
import { Dispatch } from 'redux';
import { UserActions } from '../../../redux/actions/user.actions';
import { userActions } from '../../../redux/action-creators/user.action.creator';
import TextFieldComponent from '../../widgets/textfield/textfield.component';

export interface SignUpComponentProps {
    readonly userHasPendingRegistration?: boolean,
    readonly startSignUpUserRequest?: (userName: string, email: string) => any,
    readonly userHasSession?: boolean
}

export interface SignUpComponentState {
    signUpHint?: string,
    userNamePlaceHolder?: string,
    emailPlaceHolder?: string,
    userName?: string,
    email?: string,
    disabledButton?: boolean
}

class SignUpComponent extends Component<SignUpComponentProps, SignUpComponentState> {

    constructor(props: SignUpComponentProps) {
        super(props);

        this.state = {
            signUpHint: CP.get(CP.SIGN_UP_HINT),
            userNamePlaceHolder: CP.get(CP.USERNAME_PLACEHOLDER),
            emailPlaceHolder: CP.get(CP.EMAIL_PLACEHOLDER),
            userName: "",
            email: "",
            disabledButton: true
        }
    }

    private handleSignUpBtnClick = (): void => {
        const { userName, email } = this.state;

        // Se lanza la petición de registro
        this.props.startSignUpUserRequest!(
            userName!,
            email!
        );
    }

    private handleChange = (event: any): void => {
        const { name, value } = event.target;
        this.setState({ [name]: value },
            () => {
                this.updateButtonState();
            }
        );
    }

    private updateButtonState = (): void => {
        let disabledButton = true;
        const { userName, email } = this.state;

        if (userName && email) {
            disabledButton = false;
        }

        this.setState({ disabledButton });
    }

    render() {

        /**
         * No se podrá acceder a esta ruta si no se ha realizado
         * el login con account kit ó
         * si ya inició sesión.
         */
        if (!this.props.userHasPendingRegistration ||
            this.props.userHasSession) {
            return (<Redirect to='/' />)
        }

        return (
            <div className="signup-container flex-column-center-items">
                <div className="sign-up-card flex-column-center-items">

                    <AuthHeaderComponent hintText={this.state.signUpHint!} />

                    <div className="signup-card-body">
                        <div className="signup-inputs-container flex-column-center-items ">

                            <TextFieldComponent
                                value={this.state.userName}
                                onChange={this.handleChange}
                                name="userName"
                                required={true}
                                placeHolder={this.state.userNamePlaceHolder}
                            />

                            <TextFieldComponent
                                value={this.state.email}
                                onChange={this.handleChange}
                                name="email"
                                required={true}
                                placeHolder={this.state.emailPlaceHolder}
                            />

                        </div>
                        <div className="signup-card-body-btn">
                            <button
                                type="button"
                                className="btn btn-success btn-lg btn-block signup-btn"
                                onClick={this.handleSignUpBtnClick}
                                disabled={this.state.disabledButton}
                            >
                                Continuar
                            </button>
                        </div>
                    </div>
                    <AuthFooterComponent />

                </div>

            </div>
        );
    }
}

const mapStateToProps = (state: IAppState): SignUpComponentProps => {
    return {
        userHasPendingRegistration: state.userState.pendingRegistration,
        userHasSession: state.authState.userHasSession
    }
};

const mapDispathToProps = (dispatch: Dispatch<UserActions>): SignUpComponentProps => {
    return {
        startSignUpUserRequest: (userName: string, email: string) => dispatch(userActions.startSignUpUserRequest(userName, email))
    }
};

export default connect(mapStateToProps, mapDispathToProps)(SignUpComponent);