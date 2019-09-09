import React, { Component } from 'react'
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { userActions } from '../../../../redux/action-creators/user.action.creator';
import { ConfigProvider as CP } from "../../../../services/config/config.service";
import "./facebook-login.component.scss";
import { UserActions } from '../../../../redux/actions/user.actions';
import { utilService } from '../../../../services/util.service';

export interface IFacebookLoginComponentProps {
    readonly buttonClassName?: string;
    readonly startFacebookRequestlogin?: () => void;
}

export interface IFacebookLoginComponentState {

    /**
     * Texto a mostrar en el botón de login con facebook
     */
    facebookLoginInDisplay: string;
}

class FacebookLoginComponent extends Component<IFacebookLoginComponentProps, IFacebookLoginComponentState> {

    constructor(props: IFacebookLoginComponentProps) {
        super(props);


        this.state = {
            facebookLoginInDisplay: CP.get(CP.FACEBOOK_LOGIN_IN_DISPLAY)
        };
    }

    private handleFacebookBtnClick = (): void => {

        // Se indica que se inicia proceso de login con facebook
        this.props.startFacebookRequestlogin!();
    }

    private buildButtonCls = (): string => {
        let btnCls = "btn btn-primary btn-lg btn-block facebook-login-btn";
        const { buttonClassName } = this.props;

        if (!utilService.isEmpty(buttonClassName)) {
            btnCls = `${btnCls} buttonClassName`;
        }

        return btnCls;
    }

    public render(): JSX.Element {
        return (
            <button
                className={this.buildButtonCls()}
                onClick={this.handleFacebookBtnClick}
            >
                {this.state.facebookLoginInDisplay}
            </button>
        );
    }
}


const mapDispatchToProps = (dispatch: Dispatch<UserActions>): IFacebookLoginComponentProps => {
    return {
        startFacebookRequestlogin: () => dispatch(
            userActions.startFacebookRequestlogin()
        )
    };
}

export default connect(null, mapDispatchToProps)(FacebookLoginComponent);