import React, { Component } from 'react';
import "./card.component.scss";
import { utilService } from '../../../services/util.service';

interface ICardComponentProps {
    readonly image: string;
    readonly title: string;
    onTap?: (cardId: string) => void;
    id: string;
}

interface ICardComponentState {
    maximunPreviewImagesShown: number;
    previewImages: any[];
}

export default class CardComponent extends Component<ICardComponentProps, ICardComponentState> {

    public constructor(props: ICardComponentProps) {
        super(props);

        this.state = {
            maximunPreviewImagesShown: 4,
            previewImages: []
        }
    }

    private onCardClickHandler = () => {
        const { onTap, id } = this.props;
        utilService.isDefined(onTap) && onTap!(id);
    }

    public render(): JSX.Element {
        let { title, image, id } = this.props;

        return (
            <div className="card-container clickable" onClick={this.onCardClickHandler} id={id}>
                <div className="card-header-container">
                    <img src={image} alt="card" className="card-img" />
                </div>
                <div className="card-body-container">
                    <h3 className="card-title">{title}</h3>
                </div>
            </div>
        );
    }
}
