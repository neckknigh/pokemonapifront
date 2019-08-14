import React, { Component } from 'react';
import "./recomended-comunities.component.scss";
import CardCarrouselComponent, { CardCarrouselItem } from '../../widgets/carrousel/card-carrousel.component';
import TitleContainerComponent from '../../widgets/title-container/title-container.component';

class RecomendedComunities extends Component<{}, {}> {

    private getCarrouselItems = (): CardCarrouselItem[] => {
        const items: CardCarrouselItem[] = [];

        for (let index = 0; index < 10; index++) {
            items.push(
                {
                    title: "Nombre Comunidad",
                    showUserLikes: true,
                    img: "https://placeimg.com/380/185/nature",
                    innerTitles: [
                        "Hamburguesas - Perros",
                        "Abierto hasta las 10pm"
                    ]
                }
            );
        }
        return items;
    }

    public render() {
        return (
            <TitleContainerComponent
                mainTitle="Comunidades recomendadas"
                secondaryTitle="(45 encontradas)"
            >
                <div className="carrousel-container">
                    <CardCarrouselComponent
                        cardItems={this.getCarrouselItems()}
                    />
                </div>
            </TitleContainerComponent>
        );
    }
}

export default RecomendedComunities;

