import React from 'react';
//@ts-ignore
import ItemsCarousel from 'react-items-carousel';
import "./card-carrousel.component.scss";
import ChevronComponent from './chevron/chevron.component';
import CardComponent from '../card/card.component';
import { utilService } from '../../../services/util.service';

export interface CardCarrouselItem {
    title: string;
    img: string;
    id: string;
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

    onTap?: (id: any) => void;
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
        });
    }

    /**
     * Permite manejar el evento click sobre una carta
     * 
     * @return {CardCarrouselItem} una referencia del item de la carta.
     */
    private onTapCard = (id: string) => {
        const { onTap, cardItems } = this.props;
        utilService.isDefined(onTap) && onTap!(
            cardItems!.find((cardItem: CardCarrouselItem) => cardItem.id === id));
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
                                title={cardItem.title}
                                onTap={this.onTapCard}
                                id={cardItem.id}
                            />
                        })
                    }
                </ItemsCarousel>
            </div>
        );
    }
} 