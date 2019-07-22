import React, { Component } from 'react'
import "./error-message.component.scss";

export interface IErrorMessageComponentProps {

}

export interface IErrorMessageComponentState {

}

class ErrorMessageComponent extends Component<IErrorMessageComponentProps, IErrorMessageComponentState> {

    private onDismissError = (): void => {

    }

    render() {
        return (
            <div className="alert alert-danger alert-dismissible fade show error-container" role="alert">
                <strong>Ocurrió un error!</strong> No se pudo registrar
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

export default ErrorMessageComponent;