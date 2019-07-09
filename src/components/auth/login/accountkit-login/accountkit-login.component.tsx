import React, { Component, Fragment, SyntheticEvent } from 'react';
import { UserActions } from '../../../../redux/actions/user.actions';
import { Dispatch } from 'redux';
import { userActions } from '../../../../redux/action-creators/user.action.creator';
import { connect } from 'react-redux';
import { IAppState } from '../../../../redux/app-state';
import { SystemConstants, AuthConstants } from '../../../../services/constants.service';

export interface IAccountKitLoginComponentProps {
    readonly startAccountKitLoginRequest?: () => any,
    readonly accountKitSDKLoaded?: boolean
}

export interface IAccountKitLoginComponentState {
    form: any
}

class AccountKitLoginComponent extends Component<IAccountKitLoginComponentProps, IAccountKitLoginComponentState> {

    private refForm: any = React.createRef();

    /**
     * Se lanza la validación del formulario
     * cuando se actualiza el estado/componente.
     */
    componentDidUpdate() {
        this.submitForm();
    }

    handleFormSubmit = (event: SyntheticEvent) => {
        event.preventDefault();

        // Se indica que se inicia proceso de login con accountKit
        this.props.startAccountKitLoginRequest!();
    }

    submitForm = () => {
        const form = this.refForm.current;
        if (this.props.accountKitSDKLoaded) {
            form.method = SystemConstants.POST_METHOD;
            form.action = AuthConstants.ACCOUNT_KIT_FORM_ACTION
            form.submit();
        }
    }

    render() {

        // TODO: Validar como ponemos la redirección adecudamente
        return (
            <Fragment>
                <form
                    ref={this.refForm}
                    className="maximun-size"
                    onSubmit={this.handleFormSubmit}
                >
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