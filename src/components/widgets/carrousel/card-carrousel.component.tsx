import React from 'react';
//@ts-ignore
import ItemsCarousel from 'react-items-carousel';
import "./card-carrousel.component.scss";
import ChevronComponent from './chevron/chevron.component';
import CardComponent from '../card/card.component';

export interface CardCarrouselItem {
    title: string;
    showUserLikes: boolean;
    img: string;
    innerTitles: string[];
    previewImages?: string[];
}

interface CardCarrouselComponentState {

    // indice de la tarjeta activa por defecto
    activeCardIndex: number;

    // tamaño de la flecha (chevron) en px
    chevronWidth: number;

    // Indica si las flechas se muestran afuera del carrousel
    outsideChevron: boolean;
}

interface CardCarrouselComponentProps {

    // número de tarjetas que se muestran 
    numberOfCards?: number;

    // Espacio entre tarjetas en px
    spaceBetweenCards?: number;

    // items que se mostrarán en el carrousel
    cardItems?: CardCarrouselItem[];
}

export default class CardCarrouselComponent extends React.Component<CardCarrouselComponentProps, CardCarrouselComponentState> {

    constructor(props: CardCarrouselComponentProps) {
        super(props);
        this.state = {
            activeCardIndex: 0,
            chevronWidth: 60,
            outsideChevron: false
        }
    }

    private onTapChevron = (newIndex: number): void => {
        this.setState({
            activeCardIndex: newIndex
        })
    }

    render() {
        const { numberOfCards, spaceBetweenCards, cardItems } = this.props;
        return (
            <div className="card-carrousel-container">
                <ItemsCarousel
                    numberOfCards={numberOfCards ? numberOfCards : 5}
                    gutter={spaceBetweenCards ? spaceBetweenCards : 23}
                    rightChevron={
                        <ChevronComponent
                            containerCss="right-chevron"
                            iconCss="fas fa-chevron-right"
                        />
                    }
                    leftChevron={
                        <ChevronComponent
                            containerCss="left-chevron"
                            iconCss="fas fa-chevron-left"
                        />
                    }
                    chevronWidth={this.state.chevronWidth}
                    outsideChevron={this.state.outsideChevron}
                    activeItemIndex={this.state.activeCardIndex}
                    requestToChangeActive={this.onTapChevron}
                >
                    {
                        cardItems && cardItems.map((cardItem: CardCarrouselItem, index: number): JSX.Element => {
                            return <CardComponent
                                key={index}
                                image={cardItem.img}
                                showUserLikes={cardItem.showUserLikes}
                                innerTitles={cardItem.innerTitles}
                                title={cardItem.title}
                                previewImages={cardItem.previewImages}
                            />
                        })
                    }
                </ItemsCarousel>
            </div>
        );
    }
} 