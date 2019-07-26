import React, { Component } from 'react';
import "./searcher.component.scss";
import TextFieldComponent from '../textfield/textfield.component';
import { ConfigProvider as CP } from '../../../services/config/config.service';

export interface ISearcherComponentProps {

}

export interface ISearcherComponentState {
    value?: string;
    name?: string;
    placeHolder?: string;
}

class SearcherComponent extends Component<ISearcherComponentProps, ISearcherComponentState> {

    constructor(props: ISearcherComponentProps) {
        super(props);

        this.state = {
            value: "",
            name: "searcher",
            placeHolder: CP.get(CP.SEARCHER_PLACEHOLDER)
        }
    }

    private onChangeSearcher = (event: any) => {
        const { value } = event.target;
        this.setState({
            value
        });
    }

    render() {
        return (
            <div className="searcher-container flex-row-center-items-center">
                <TextFieldComponent
                    value={this.state.value}
                    onChange={this.onChangeSearcher}
                    name={this.state.name}
                    className="searcher-textfield-container"
                    placeHolder={this.state.placeHolder}
                />
                <button type="button" className="searcher-btn">
                    <i className="fas fa-search"></i>
                </button>
            </div>
        );
    }
}

export default SearcherComponent;