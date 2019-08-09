import React, { Component } from 'react';
import "./promotions.component.scss";
import TitleContainerComponent from '../widgets/title-container/title-container.component';
import CardCarrouselComponent, { CardCarrouselItem } from '../widgets/carrousel/card-carrousel.component';


export default class PromotionsComponent extends Component<{}, {}> {

    private getCarrouselItems = (): CardCarrouselItem[] => {
        const items: CardCarrouselItem[] = [];

        for (let index = 0; index < 10; index++) {
            items.push(
                {
                    title: "Desayuna con Alpina",
                    showUserLikes: false,
                    img: "https://placeimg.com/380/185/nature",
                    innerTitles: [
                        "Quesito Alpina de 325gr + 20 arenas Don Maia por tan solo $10.000"
                    ]
                }
            );
        }
        return items;
    }

    public render(): JSX.Element {
        return (
            <TitleContainerComponent
                mainTitle="Promociones"
                secondaryTitle="(25 encontradas)"
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
