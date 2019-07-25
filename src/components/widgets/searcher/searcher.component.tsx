import React, { Component } from 'react';
import "./searcher.component.scss";
import TextFieldComponent from '../textfield/textfield.component';

export interface ISearcherComponentProps {

}

export interface ISearcherComponentState {

}

class SearcherComponent extends Component<ISearcherComponentProps, ISearcherComponentState> {

    private onChangeSearcher(): void {

    }

    render() {
        return (
            <div className="searcher-container flex-row-center-items-center">
                <TextFieldComponent
                    name=""
                    value=""
                    onChange={this.onChangeSearcher}
                    className="searcher-textfield-container"
                    placeHolder="¿Que estás buscando?"
                />
                <button type="button" className="searcher-btn">
                    <i className="fas fa-search"></i>
                </button>
            </div>
        );
    }
}

export default SearcherComponent;