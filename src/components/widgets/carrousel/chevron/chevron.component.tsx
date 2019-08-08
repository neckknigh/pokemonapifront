import React, { Component } from 'react';
import "./chevron.component.scss";

interface ChevronComponentProps {
    containerCss: string;
    iconCss: string;
}

export default class ChevronComponent extends Component<ChevronComponentProps, {}> {

    public render(): JSX.Element {
        const cssClases = [
            "flex-row-center-items-center chevron-container",
            this.props.containerCss
        ].join(" ");
        return (
            <div className={cssClases}>
                <span>
                    <i className={this.props.iconCss}></i>
                </span>
            </div>
        );
    }
}
