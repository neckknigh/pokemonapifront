import React, { Component } from 'react';
import "./promotions.component.scss";
import TitleContainerComponent from '../widgets/title-container/title-container.component';
import CardCarrouselComponent, { CardCarrouselItem } from '../widgets/carrousel/card-carrousel.component';
import { promotionService } from '../../services/data/promotion.service';
import { Promotion } from '../../models/promotion.model';
import { ConfigProvider as CP } from '../../services/config/config.service';

interface IPromotionsComponentState {
    // TOOD: Quitar esto
    promotions: Promotion[];
    comunitylogosUrl: string;
}

export default class PromotionsComponent extends Component<{}, IPromotionsComponentState> {

    constructor(props: any) {
        super(props);

        this.state = {
            promotions: [],
            comunitylogosUrl: CP.get(CP.ANNOUNCEMENTS_LOGOS_URL)
        };

        // TODO: Sacar esto de aquí
        promotionService.getPromotions()
            .subscribe(
                (promotions: Promotion[]) => {
                    this.setState({
                        promotions
                    })
                }, error => {
                    console.log(error);
                },
                () => {
                    //done();
                }
            );
    }

    private getCarrouselItems = (): CardCarrouselItem[] => {
        const items: CardCarrouselItem[] = [];

        this.state.promotions.forEach((promotion: Promotion) => {
            items.push(
                {
                    title: promotion.name,
                    showUserLikes: false,
                    img: `${this.state.comunitylogosUrl}${promotion.imagePath}`,
                    innerTitles: [
                        promotion.description
                    ]
                }
            );
        })
        return items;
    }

    public render(): JSX.Element {
        return (
            <TitleContainerComponent
                mainTitle="Promociones"
                secondaryTitle="(8 encontradas)"
            >
                <div>
                    <CardCarrouselComponent
                        numberOfCards={4}
                        cardItems={this.getCarrouselItems()}
                    />
                </div>
            </TitleContainerComponent>
        );
    }
}
