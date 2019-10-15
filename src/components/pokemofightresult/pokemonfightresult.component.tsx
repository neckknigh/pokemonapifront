import React, { Component } from 'react';
import { connect } from 'react-redux';
import TitleContainerComponent from '../widgets/title-container/title-container.component';
import CardCarrouselComponent, { CardCarrouselItem } from '../widgets/carrousel/card-carrousel.component';
import { Dispatch } from 'redux';
import { pokemonFightResultActions } from '../../redux/action-creators/pokemonfightresult.action.creator';
import { PokemonFightResult } from '../../models/pokemonfightresult.model';
import { IAppState } from '../../redux/app-state';

interface IPokemonFightResultComponentProps {
    loadLastPokemonFightResult?: () => void;
    lastPokemonFightResut?: PokemonFightResult | null;
}


class PokemonFightResultComponent extends Component<IPokemonFightResultComponentProps, {}> {

    public componentDidMount(): void {
        this.props.loadLastPokemonFightResult!();
    }

    private getCarrouselItems = (): CardCarrouselItem[] => {
        const items: CardCarrouselItem[] = [];
        const { lastPokemonFightResut } = this.props;

        if (!!lastPokemonFightResut) {
            console.log("listado", lastPokemonFightResut)
            lastPokemonFightResut!.pokemonList.forEach((pokemon) => {
                items.push(
                    {
                        title: pokemon.name,
                        img: pokemon.picture!,
                        id: "1"
                    }
                );
            });
        }
        return items;
    }

    public render(): JSX.Element {
        console.log("listado", this.props.lastPokemonFightResut)
        return (
            <TitleContainerComponent mainTitle="Pokemon Fight Results">

                <div className="carrousel-container">
                    <CardCarrouselComponent
                        cardItems={this.getCarrouselItems()}
                        onTap={this.onTapCard}
                    />
                </div>
            </TitleContainerComponent>
        );
    }

    /**
     * Permite redireccionar al detalle de una comunidad
     */
    private onTapCard = (selectedCardItem: CardCarrouselItem) => {

        console.log("tap", selectedCardItem);
    }
}

const mapDispatchToProps = (dispatch: Dispatch): IPokemonFightResultComponentProps => {
    return {
        loadLastPokemonFightResult: () => dispatch(pokemonFightResultActions.loadLastPokemonFightResult())
    }
};

const mapStateToProps = (state: IAppState): IPokemonFightResultComponentProps => {
    return {
        lastPokemonFightResut: state.pokemonFightResultState.lasPokemonFightResult
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(PokemonFightResultComponent);
