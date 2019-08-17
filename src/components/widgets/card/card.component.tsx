import React, { Component } from 'react';
import "./card.component.scss";
import { utilService } from '../../../services/util.service';

interface CardComponentProps {
    readonly showUserLikes?: boolean;
    readonly image: string;
    readonly title: string;
    readonly innerTitles: string[];
    readonly previewImages?: string[];
}

interface CardComponentState {
    maximunPreviewImagesShown: number;
}

export default class CardComponent extends Component<CardComponentProps, CardComponentState> {

    public constructor(props: CardComponentProps) {
        super(props);

        this.state = {
            maximunPreviewImagesShown: 4
        }
    }

    private getShowPreviewImages = (): boolean => {
        return !utilService.isUndefined(this.props.previewImages);
    }

    private buildPreviewImagesContainer(): JSX.Element {
        //debugger;
        let container: JSX.Element | null = null;
        if (this.getShowPreviewImages()) {

            let { previewImages } = this.props;
            const { maximunPreviewImagesShown } = this.state;
            const limitImages = maximunPreviewImagesShown < previewImages!.length;
            const rest = previewImages!.length - maximunPreviewImagesShown;
            previewImages = limitImages ? previewImages!.slice(0, maximunPreviewImagesShown) : previewImages;
            container =
                <div className="preview-images-container">
                    {
                        previewImages!.map((previewImage: string, index: number) =>
                            <img
                                src={previewImage}
                                alt={`previewImage${index}`}
                                className="circle"
                                key={index}
                            />
                        )
                    }
                    {
                        limitImages && <span className="circle with-inner-text">
                            {
                                `+${rest}`
                            }
                        </span>
                    }
                </div>;
        }

        return container!;

    }

    public render(): JSX.Element {
        let { title, innerTitles, image } = this.props;

        return (
            <div className="card-container">
                <div className="card-header-container">
                    <img src={image} alt="card" className="card-img" />
                    {
                        this.buildPreviewImagesContainer()
                    }
                </div>
                <div className="card-body-container">
                    <h3 className="card-title">{title}</h3>
                    {
                        innerTitles && innerTitles.map((innerTitle: string, i: number): JSX.Element => {
                            return <p key={i} className="hint">{innerTitle}</p>
                        })
                    }
                </div>
            </div>
        );
    }
}
