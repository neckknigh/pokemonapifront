import React, { Component } from 'react'
import "./error-message.component.scss";
import { IAppState } from '../../../redux/app-state';
import { connect } from 'react-redux';
import { ConfigProvider as CP } from '../../../services/config/config.service';
import { Dispatch } from 'redux';
import { SystemActions } from '../../../redux/actions/system.actions';
import { systemActions } from '../../../redux/action-creators/system.action.creator';
import { utilService } from '../../../services/util.service';

export interface IErrorMessageComponentProps {
    readonly appHasError?: boolean,
    readonly appErrorMessage?: string,
    readonly hideErrorMessage?: () => any
}

export interface IErrorMessageComponentState {
    mainContainerStyle: string[],
    hiddenClass: string
}

class ErrorMessageComponent extends Component<IErrorMessageComponentProps, IErrorMessageComponentState> {

    constructor(props: IErrorMessageComponentProps) {
        super(props);

        this.state = {
            mainContainerStyle: [
                "alert",
                "alert-danger",
                "alert-dismissible",
                "fade",
                "show",
                "error-container"
            ],
            hiddenClass: CP.get(CP.HIDDEN_CLASS)
        }
    }

    private onDismissError = (): void => {
        this.props.hideErrorMessage!();
    }

    /**
     * Permite construir los estilos que tendrá 
     * el contenedor del error.
     */
    private buildContainerStyles = (): string => {
        const styles = this.state.mainContainerStyle.concat([
            this.props.appHasError && !utilService.isEmpty(this.props.appErrorMessage) ? "" : this.state.hiddenClass
        ]);
        return styles.join(" ");
    }

    render() {
        debugger;
        return (
            <div
                className={
                    this.buildContainerStyles()
                }
                role="alert"
            >
                <strong>Error: </strong>
                {this.props.appErrorMessage}
                <button
                    type="button"
                    className="close"
                    onClick={this.onDismissError}
                >
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
        );
    }
}

const mapStateToProps = (appState: IAppState): IErrorMessageComponentProps => {
    return {
        appErrorMessage: appState.systemState.errorMessage,
        appHasError: appState.systemState.appHasError
    }
};

const mapDispatchToProps = (dispatch: Dispatch<SystemActions>): IErrorMessageComponentProps => {
    return {
        hideErrorMessage: () => dispatch(systemActions.setAppWithError(false))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ErrorMessageComponent);