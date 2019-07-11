import React, { Component, Fragment, SyntheticEvent } from 'react';
import { UserActions } from '../../../../redux/actions/user.actions';
import { Dispatch } from 'redux';
import { userActions } from '../../../../redux/action-creators/user.action.creator';
import { connect } from 'react-redux';
import { IAppState } from '../../../../redux/app-state';
import { SystemConstants, AuthConstants } from '../../../../services/constants.service';
import { ConfigProvider as CP } from "../../../../services/config/config.service";

export interface IAccountKitLoginComponentProps {
    readonly startAccountKitLoginRequest?: () => any,
    readonly accountKitSDKLoaded?: boolean
}

export interface IAccountKitLoginComponentState {
    accountKitLoginInDisplay: string,
    accountKitDebugMode: string,
    facebookAppId: string,
    accountKitRedirectURL: string,
    facebookEventsEnabled: string,
    accountKitState: string
}

class AccountKitLoginComponent extends Component<IAccountKitLoginComponentProps, IAccountKitLoginComponentState> {

    private refForm: any;

    constructor(props: IAccountKitLoginComponentProps) {
        super(props);
        this.refForm = React.createRef();
        const initialState: IAccountKitLoginComponentState = {
            accountKitLoginInDisplay: CP.get(CP.ACCOUNT_KIT_LOGIN_IN_DISPLAY),
            accountKitDebugMode: String(CP.get(CP.ACCOUNT_KIT_DEBUG_MODE)),

            // TODO: Mejorar esta forma de obtener la url
            accountKitRedirectURL: window.location.href + "auth",
            facebookEventsEnabled: String(CP.ACCOUNT_KIT_ENABLE_FACEBOOK_EVENTS),
            facebookAppId: CP.get(CP.FACEBOOK_APP_ID),
            accountKitState: CP.get(CP.ACCOUNT_KIT_STATE)
        }
        this.state = initialState;
    }

    /**
     * Se lanza la validación del formulario
     * cuando se actualiza el estado/componente.
     */
    componentDidUpdate() {

        // TODO: Solo disparar si hay un cambio en el estado
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
                    <input type="hidden" name="app_id" value={this.state.facebookAppId} />
                    <input type="hidden" name="redirect" value={this.state.accountKitRedirectURL} />
                    <input type="hidden" name="state" value={this.state.accountKitState} />
                    <input type="hidden" name="fbAppEventsEnabled" value={this.state.facebookEventsEnabled} />
                    <input type="hidden" name="debug" value={this.state.accountKitDebugMode} />
                    <button
                        type="submit"
                        className="btn btn-success btn-lg btn-block login-btn"
                    >
                        {this.state.accountKitLoginInDisplay}
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