import React, { Fragment } from 'react'
import * as CSS from 'csstype';
import FacebookLogin, { ReactFacebookLoginInfo, ReactFacebookFailureResponse } from 'react-facebook-login';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { userActions } from '../../../../redux/action-creators/user.action.creator';
import { authActions } from '../../../../redux/action-creators/auth.action.creator';

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
    buttonStyle: Style
}

class FacebookLoginComponent extends React.Component<any, IFacebookLoginComponentState> {

    // Declaración del estado del componente

    // Declaración del estado del componente
    constructor(props: any) {
        super(props);
        const initialState: IFacebookLoginComponentState = {
            containerStyle: {
                width: "100%",
                marginBottom: "0.5rem"
            },
            buttonStyle: {
                backgroundColor: "#3b5998",
                borderColor: "#3b5998"
            }
        }

        this.state = initialState;
    }

    handleFacebookBtnClick = () => {

        // Se indica que se inicia proceso de login con facebook
        this.props.startFacebookRequestlogin();
    }

    handleFacebookResponse = (userInfo: ReactFacebookLoginInfo) => {

        // TODO: Solo lanzar una acción, la otra que se lanze automaticamente

        // Se indica que se logueó con facebook correctamente
        this.props.setFacebookLoggedInStatus(true);
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
                    appId="368256876708367"
                    autoLoad={false}
                    containerStyle={
                        this.state.containerStyle
                    }
                    buttonStyle={
                        this.state.buttonStyle
                    }
                    fields="name,email,picture"
                    textButton="Ingresar con Facebook"
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
        setFacebookLoggedInStatus: (isFacebookLoggedIn: boolean) => dispatch(
            userActions.setFacebookLoggedInStatus(isFacebookLoggedIn)
        ),
        saveFacebookUser: (facebookUserData: ReactFacebookLoginInfo) => dispatch(
            authActions.saveFacebookUser(facebookUserData)
        )
    }
    return props;
}

export default connect(null, mapDispatchToProps)(FacebookLoginComponent);