import React from 'react';
//@ts-ignore
import ItemsCarousel from 'react-items-carousel';
import "./card-carrousel.component.scss";
import ChevronComponent from './chevron/chevron.component';
import CardComponent from '../card/card.component';

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
}

export default class CardCarrouselComponent extends React.Component<CardCarrouselComponentProps, CardCarrouselComponentState> {

    constructor(props: CardCarrouselComponentProps) {
        super(props);
        this.state = {
            activeCardIndex: 1,
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
        const { numberOfCards, spaceBetweenCards } = this.props;
        return (
            <div className="card-carrousel-container">
                <ItemsCarousel
                    numberOfCards={numberOfCards ? numberOfCards : 5}
                    gutter={spaceBetweenCards ? spaceBetweenCards : 23}
                    /*
                    rightChevron={
                        <div className="flex-row-center-items-center chevron-container right">
                            <span>
                                <i className="fas fa-chevron-right"></i>
                            </span>
                        </div>
                    }
                    */
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
                    {false ? [] : Array.from(new Array(8)).map((_, i) =>

                        /*
                        <div
                            key={i}
                            style={{
                                height: 205,
                                background: 'url(https://placeimg.com/380/205/nature)'
                            }}
                        />
                        //*/


                        ///*
                        <CardComponent key={i} />
                        //*/

                    )}
                </ItemsCarousel>
            </div>
        );
    }
} 