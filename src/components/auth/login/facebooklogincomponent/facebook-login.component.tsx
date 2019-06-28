import React, { Fragment } from 'react'
import * as CSS from 'csstype';
import FacebookLogin, { ReactFacebookLoginInfo } from 'react-facebook-login';
import { Dispatch } from 'redux';
import { UserActions } from '../../../../redux/actions/user.actions';
import { connect } from 'react-redux';
import { userActions } from '../../../../redux/action-creators/user.action.creator';

interface Style extends CSS.Properties, CSS.PropertiesHyphen { }

export interface FacebookLoginComponentProps {
    startFacebookRequestlogin: () => any
}

export interface FacebookLoginComponentState {

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

class FacebookLoginComponent extends React.Component<FacebookLoginComponentProps, FacebookLoginComponentState> {

    // Declaración del estado del componente

    // Declaración del estado del componente
    constructor(props: FacebookLoginComponentProps) {
        super(props);
        const initialState: FacebookLoginComponentState = {
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
        console.log("clickeó");
        this.props.startFacebookRequestlogin();
    }

    handleFacebookResponse = (userInfo: ReactFacebookLoginInfo) => {
        console.log(userInfo);
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
                />
            </Fragment>
        );
    }
}


const mapDispatchToProps = (dispatch: Dispatch<UserActions>) => {
    return {
        startFacebookRequestlogin: () => dispatch(userActions.startFacebookRequestlogin())
    }
}

export default connect(null, mapDispatchToProps)(FacebookLoginComponent);