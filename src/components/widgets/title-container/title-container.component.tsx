import React, { Component } from 'react';
import "./title-container.component.scss";

interface TitleContainerComponentProps {
    readonly mainTitle: string;
    readonly secondaryTitle: string;
}

class TitleContainerComponent extends Component<TitleContainerComponentProps, {}> {
    public render(): JSX.Element {
        return (
            <div className="title-container">
                <div className="title-header-container flex-row-items-center">
                    <h1 className="header">{this.props.mainTitle}</h1>
                    <div>
                        <span className="hint">{`(${this.props.secondaryTitle})`}</span>
                    </div>
                </div>
                <div className="title-body-container">
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default TitleContainerComponent;

