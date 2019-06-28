import React, { Fragment } from 'react'
import * as CSS from 'csstype';
import FacebookLogin, { ReactFacebookLoginInfo } from 'react-facebook-login';

interface Style extends CSS.Properties, CSS.PropertiesHyphen { }

export interface FacebookLoginComponentProps {

}

export interface FacebookLoginComponentState {
    handleFacebookBtnClick?: () => void,
    handleFacebookResponse?: () => void
    containerStyle: Style
}

class FacebookLoginComponent extends React.Component<FacebookLoginComponentProps, FacebookLoginComponentState> {

    // Declaración del estado del componente
    state: FacebookLoginComponentState = {
        containerStyle: {
            width: "100%"
        }
    }


    handleFacebookBtnClick = () => {
        console.log("clickeó");
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
                    fields="name,email,picture"
                    textButton="Ingresar con Facebook"
                    //size="small"
                    typeButton="button"
                    cssClass="btn btn-primary btn-lg btn-block login-btn"
                    onClick={this.handleFacebookBtnClick}
                    callback={this.handleFacebookResponse}
                />
            </Fragment>
        );
    }
}

export default FacebookLoginComponent;