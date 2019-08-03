import React, { Component } from 'react';
import "./drop-down.component.scss";

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
            <div className="flex-column-center-items drop-down-container">
                <div className="flex-row-items-center drop-down-header clickable">
                    <div className="icon-container">
                        <img src="/img/login/flags/dummy.png" className="icon" alt="item-icon" />
                    </div>
                    <h4 className="header-label">
                        {this.props.headerText}
                    </h4>
                </div>
                <div className="drop-down-body">
                    {
                        this.props.innerItems!.map((innerItem: DropDownItem) => {
                            return <a className="dropdown-item"
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