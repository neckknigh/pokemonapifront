import React, { Component } from 'react';
import "./textfield.component.scss";
import { ConfigProvider as CP } from '../../services/config/config.service';

export interface ITextFieldComponentProps {
    name: string | undefined,
    value: string | undefined,
    onChange: (event: any) => void,
    required?: boolean,
    placeHolder?: string,
    requiredErrorMessage?: string
}

export interface ITextFieldComponentState {
    hasError: boolean,
    requiredErrorMessage?: string
}

class TextFieldComponent extends Component<ITextFieldComponentProps, ITextFieldComponentState> {

    constructor(props: ITextFieldComponentProps) {
        super(props);
        const { requiredErrorMessage } = this.props;

        this.state = {
            hasError: false,
            requiredErrorMessage: requiredErrorMessage ?
                requiredErrorMessage : CP.get(CP.REQUIRED_FIELD_MESSAGE)
        }
    }

    /**
     * Handler del evento blur del input interno.
     * Valida el componente.
     */
    private onBlurHandler = () => {
        this.validateField();
    }

    private onFocusHandler = () => {
        this.setState({
            hasError: false
        });
    }

    private validateField = () => {

        /**
         * Si el campo es requerido y no tiene valor
         * se muestra mensaje de error
         */
        if (this.props.required && !this.props.value) {
            this.setState({
                hasError: true
            });
        }
    }

    render() {
        return (
            <div className="textfield-container">
                <input
                    type="text"
                    className="form-control"
                    placeholder={this.props.placeHolder}
                    value={this.props.value}
                    name={this.props.name}
                    onChange={this.props.onChange}
                    onBlur={this.onBlurHandler}
                    onFocus={this.onFocusHandler}
                />
                {
                    this.state.hasError &&
                    <div className="flex-row-space-between input-error">
                        <span className="error-message">
                            {this.state.requiredErrorMessage}
                        </span>
                    </div>
                }
            </div>
        );
    }
}

export default TextFieldComponent;
