import React, { Fragment } from 'react'
import * as CSS from 'csstype';
import FacebookLogin, { ReactFacebookLoginInfo, ReactFacebookFailureResponse } from 'react-facebook-login';
import { Dispatch } from 'redux';
import { UserActions } from '../../../../redux/actions/user.actions';
import { connect } from 'react-redux';
import { userActions } from '../../../../redux/action-creators/user.action.creator';

interface Style extends CSS.Properties, CSS.PropertiesHyphen { }

export interface IFacebookLoginComponentProps {
    startFacebookRequestlogin: () => any,
    setFacebookLoggedInStatus: (isFacebookLoggedIn: boolean) => any
}

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

class FacebookLoginComponent extends React.Component<IFacebookLoginComponentProps, IFacebookLoginComponentState> {

    // Declaración del estado del componente

    // Declaración del estado del componente
    constructor(props: IFacebookLoginComponentProps) {
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
        console.log(userInfo);
        // Se indica que se logueó con facebook correctamente
        this.props.setFacebookLoggedInStatus(true);
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


const mapDispatchToProps = (dispatch: Dispatch<UserActions>): IFacebookLoginComponentProps => {
    const props: IFacebookLoginComponentProps = {
        startFacebookRequestlogin: () => dispatch(userActions.startFacebookRequestlogin()),
        setFacebookLoggedInStatus: (isFacebookLoggedIn: boolean) => dispatch(userActions.setFacebookLoggedInStatus(isFacebookLoggedIn))
    }
    return props;
}

export default connect(null, mapDispatchToProps)(FacebookLoginComponent);