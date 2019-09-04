import React, { Component } from 'react';
import "./title-container.component.scss";
import { utilService } from '../../../services/util.service';

interface TitleContainerComponentProps {
    readonly mainTitle: string;
    readonly secondaryTitle?: string;
    readonly className?: string;
}

class TitleContainerComponent extends Component<TitleContainerComponentProps, {}> {

    private getMainContainerCls() {
        let cls: string = "title-container";
        const { className } = this.props;

        if (utilService.isDefined(className)) {
            cls = `${cls} ${className}`;
        }

        return cls;
    }
    public render(): JSX.Element {
        const { mainTitle, secondaryTitle } = this.props;
        return (
            <div className={this.getMainContainerCls()}>
                <div className="title-header-container flex-row-items-center">
                    <h1 className="header">{mainTitle}</h1>
                    {
                        secondaryTitle && <div>
                            <span className="hint">{`(${secondaryTitle})`}</span>
                        </div>
                    }
                </div>
                <div className="title-body-container">
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default TitleContainerComponent;

