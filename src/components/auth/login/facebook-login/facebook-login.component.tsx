import React, { Fragment } from 'react'
import * as CSS from 'csstype';
import FacebookLogin, { ReactFacebookLoginInfo, ReactFacebookFailureResponse } from 'react-facebook-login';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { userActions } from '../../../../redux/action-creators/user.action.creator';
import { authActions } from '../../../../redux/action-creators/auth.action.creator';
import { ConfigProvider as CP } from "../../../../services/config/config.service";

interface Style extends CSS.Properties, CSS.PropertiesHyphen { }

export interface IFacebookLoginComponentState {

    /**
     *  Contendrá los estilos para el contenedor del
     *  login de facebook.
     */
    containerStyle: Style,

    /**
     *  Contendrá los estilos para el contenedor del
     *  botón interno de facebook.
     */
    buttonStyle: Style,

    /**
     * Identificador de la app de facebook.
     */
    facebookAppId: string,

    /**
     * Listado de la info del usuario de facebook a solicitar.
     */
    facebookRequestedFields: string,

    /**
     * Texto a mostrar en el botón de login con facebook
     */
    facebookLoginInDisplay: string
}

class FacebookLoginComponent extends React.Component<any, IFacebookLoginComponentState> {

    constructor(props: any) {
        super(props);
        const facebookColor: string = CP.get(CP.FACEBOOK_COLOR);

        const initialState: IFacebookLoginComponentState = {
            containerStyle: {
                width: "100%",
                marginBottom: "0.5rem"
            },
            buttonStyle: {
                backgroundColor: facebookColor,
                borderColor: facebookColor
            },
            facebookAppId: CP.get(CP.FACEBOOK_APP_ID),
            facebookRequestedFields: CP.get(CP.FACEBOOK_USER_REQUESTED_FIELDS),
            facebookLoginInDisplay: CP.get(CP.FACEBOOK_LOGIN_IN_DISPLAY)
        }

        this.state = initialState;
    }

    handleFacebookBtnClick = () => {

        // Se indica que se inicia proceso de login con facebook
        this.props.startFacebookRequestlogin();
    }

    handleFacebookResponse = (userInfo: ReactFacebookLoginInfo) => {

        // Se guarda al usuario logueado por facebook en el sistema.
        this.props.saveFacebookUser!(userInfo);
    }

    handleFailureFacebookLoginResponse = (response: ReactFacebookFailureResponse) => {
        console.log("Ocurrió un error");
        // TODO: Revisar que logica ejuctar cuando falle.
    }

    render() {
        return (
            <Fragment>
                <FacebookLogin
                    appId={this.state.facebookAppId}
                    autoLoad={false}
                    containerStyle={
                        this.state.containerStyle
                    }
                    buttonStyle={
                        this.state.buttonStyle
                    }
                    fields={this.state.facebookRequestedFields}
                    textButton={this.state.facebookLoginInDisplay}
                    typeButton="button"
                    cssClass="btn btn-primary btn-lg btn-block login-btn"
                    onClick={this.handleFacebookBtnClick}
                    callback={this.handleFacebookResponse}
                    onFailure={this.handleFailureFacebookLoginResponse}
                />
            </Fragment>
        );
    }
}


const mapDispatchToProps = (dispatch: Dispatch<any>): any => {
    const props: any = {
        startFacebookRequestlogin: () => dispatch(
            userActions.startFacebookRequestlogin()
        ),
        saveFacebookUser: (facebookUserData: ReactFacebookLoginInfo) => dispatch(
            authActions.saveFacebookUser(facebookUserData)
        )
    }
    return props;
}

export default connect(null, mapDispatchToProps)(FacebookLoginComponent);