import React, { Component, Fragment, SyntheticEvent } from 'react';
import { UserActions } from '../../../../redux/actions/user.actions';
import { Dispatch } from 'redux';
import { userActions } from '../../../../redux/action-creators/user.action.creator';
import { connect } from 'react-redux';
import { IAppState } from '../../../../redux/app-state';

export interface IAccountKitLoginComponentProps {
    readonly startAccountKitLoginRequest?: () => any,
    readonly accountKitSDKLoaded?: boolean
}

export interface IAccountKitLoginComponentState {
    form: any
}

class AccountKitLoginComponent extends Component<IAccountKitLoginComponentProps, IAccountKitLoginComponentState> {

    private form: any = null;

    componentDidUpdate() {
        this.submitForm();
    }

    // TODO: Revisar si esta lógica va aquí
    handleFormSubmit = (event: SyntheticEvent) => {
        event.preventDefault();

        this.form = event.target;

        // Se indica que se inicia proceso de login con accountKit
        this.props.startAccountKitLoginRequest!();
    }

    // TODO: MOVER ESTAS CONSTANTES DE AQUI
    submitForm = () => {
        if (this.props.accountKitSDKLoaded && this.form) {
            this.form.method = "post";
            this.form.action = "https://www.accountkit.com/v1.0/basic/dialog/sms_login/";
            this.form.submit();
        }
    }

    render() {

        // TODO: Validar como ponemos la redirección adecudamente
        return (
            <Fragment>
                <form className="maximun-size" onSubmit={this.handleFormSubmit}>
                    <input type="hidden" name="app_id" value="368256876708367" />
                    <input type="hidden" name="redirect" value={window.location.href + "auth"} />
                    <input type="hidden" name="state" value="31e2a963ada08b93e2667243805407c3" />
                    <input type="hidden" name="fbAppEventsEnabled" value="true" />
                    <input type="hidden" name="debug" value="true" />
                    <button
                        type="submit"
                        className="btn btn-success btn-lg btn-block login-btn"
                    >
                        Ingresar con tu celular
                </button>
                </form>
            </Fragment>
        );
    }
}

const mapDispatchToProps = (dispatch: Dispatch<UserActions>): IAccountKitLoginComponentProps => {
    const props: IAccountKitLoginComponentProps = {
        startAccountKitLoginRequest: () => dispatch(userActions.startAccountKitLoginRequest())
    }
    return props;
}

const mapStateToProps = (state: IAppState): IAccountKitLoginComponentProps => {
    const props: IAccountKitLoginComponentProps = {
        accountKitSDKLoaded: state.authState.accountKitSDKLoaded
    };
    return props;
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountKitLoginComponent);