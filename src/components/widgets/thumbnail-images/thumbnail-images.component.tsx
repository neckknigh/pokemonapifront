import React, { Component } from 'react';
import "./thumbnail-images.component.scss";
import { utilService } from '../../../services/util.service';

export interface IThumbnailImagesComponentProps {
    images?: string[];
    containerCls?: string;
    imageCls?: string;
}

interface IThumbnailImagesComponentState {
    maximunThumbnailImagesShown: number;
    containerStyle: string;
    imageStyle: string;
}

class ThumbnailImagesComponent extends Component<IThumbnailImagesComponentProps, IThumbnailImagesComponentState> {

    constructor(props: IThumbnailImagesComponentProps) {
        super(props);

        this.state = {
            maximunThumbnailImagesShown: 4,
            containerStyle: "thumbnail-container",
            imageStyle: "thumbnail"
        }
    }

    private getShowPreviewImages(): boolean {
        return !utilService.isUndefined(this.props.images);
    }

    private getMainContainerStyles(): string {
        const styles = [this.state.containerStyle];
        const { containerCls } = this.props;

        if (utilService.isDefined(containerCls)) {
            styles.push(containerCls!);
        }

        return styles.join(" ");
    }

    private getImagesStyles(): string {
        const styles = [this.state.imageStyle];
        const { imageCls } = this.props;

        if (utilService.isDefined(imageCls)) {
            styles.push(imageCls!);
        }

        return styles.join(" ");
    }

    public render(): JSX.Element {
        let container: JSX.Element | null = null;

        if (this.getShowPreviewImages()) {
            let { images } = this.props;
            const { maximunThumbnailImagesShown } = this.state;
            const limitImages = maximunThumbnailImagesShown < images!.length;
            const rest = images!.length - maximunThumbnailImagesShown;
            images = limitImages ? images!.slice(0, maximunThumbnailImagesShown) : images;
            const imagesStyles: string = this.getImagesStyles();

            container = (
                <div className={this.getMainContainerStyles()}>
                    {
                        images!.map((image: string, index: number) =>
                            <img
                                src={image}
                                alt={`thumbnail${index}`}
                                className={imagesStyles}
                                key={index}
                            />
                        )
                    }
                    {
                        limitImages && <span className={`${imagesStyles} with-inner-text`}>
                            {
                                `+${rest}`
                            }
                        </span>
                    }
                </div>
            );
        }

        return container!;
    }
}

export default ThumbnailImagesComponent;
