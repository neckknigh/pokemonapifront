import React, { Component } from 'react';
import "./drop-down.component.scss";
import ImageContainerComponent, { ImageContainerPosition } from '../image-container/image-container.component';

export interface DropDownItem {
    name: string;
    path: string;
}

export interface IDropDownComponentProps {
    opened?: boolean;
    headerText?: string;
    innerItems?: DropDownItem[];
}

class DropDownComponent extends Component<IDropDownComponentProps, {}> {

    public render() {
        return (
            <div className="flex-column-center-items drop-down-container clickable">
                <ImageContainerComponent
                    img="/img/login/flags/dummy.png"
                    displayText={this.props.headerText!}
                    containerCls="drop-down-image-container"
                    layoutPosition={ImageContainerPosition.START}
                    textContainerCls="drop-down-text-container"
                    textCls="drop-down-text"
                    imageCls="drop-down-image"
                />
                <div className="drop-down-body">
                    {
                        this.props.innerItems!.map((innerItem: DropDownItem, index: number) => {
                            return <a key={index} className="dropdown-item"
                                href={innerItem.path} >
                                {innerItem.name}
                            </a>
                        })
                    }
                </div>
            </div>
        );
    }

}

export default DropDownComponent;