import React, { Component } from 'react';
import "./card.component.scss";
import { utilService } from '../../../services/util.service';

interface CardComponentProps {
    readonly showUserLikes?: boolean;
    readonly image: string;
    readonly title: string;
    readonly innerTitles: string[];
}

export default class CardComponent extends Component<CardComponentProps, {}> {

    private getShowUserLikes = (): boolean => {
        let { showUserLikes } = this.props;
        showUserLikes = utilService.isUndefined(showUserLikes) ? true : showUserLikes;
        return showUserLikes!;
    }

    public render(): JSX.Element {
        let { title, innerTitles, image } = this.props;

        return (
            <div className="card-container">
                <div className="card-header-container">
                    <img src={image} alt="card" className="card-img" />
                    {
                        // TODO: Esto debe ser dinámico
                        this.getShowUserLikes() &&
                        <div className="user-likes-container">
                            <span className="circle"></span>
                            <span className="circle"></span>
                            <span className="circle"></span>
                            <span className="circle"></span>
                            <span className="circle with-inner-text">+34k</span>
                        </div>}
                </div>
                <div className="card-body-container">
                    <h3 className="card-title">{title}</h3>
                    {
                        innerTitles && innerTitles.map((innerTitle: string): JSX.Element => {
                            return <p className="hint">{innerTitle}</p>
                        })
                    }
                </div>
            </div>
        );
    }
}
