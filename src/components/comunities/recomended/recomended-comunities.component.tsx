import React, { Component } from 'react';
import "./recomended-comunities.component.scss";
import CardCarrouselComponent, { CardCarrouselItem } from '../../widgets/carrousel/card-carrousel.component';
import TitleContainerComponent from '../../widgets/title-container/title-container.component';
import { Dispatch } from 'redux';
import { comunityActions } from '../../../redux/action-creators/comunity.action.creator';
import { connect } from 'react-redux';
import { IAppState } from '../../../redux/app-state';
import { Comunity } from '../../../models/comunity.model';
import { ConfigProvider as CP } from '../../../services/config/config.service';

interface IRecomendedComunitiesComponentProps {
    readonly loadRecomendedComunities?: () => void;
    readonly recomendedComunities?: Comunity[];
}

interface IRecomendedComunitiesComponentState {
    comunitylogosUrl: string;
}

class RecomendedComunitiesComponent extends Component<IRecomendedComunitiesComponentProps, IRecomendedComunitiesComponentState> {

    constructor(props: IRecomendedComunitiesComponentProps) {
        super(props);

        this.state = {
            comunitylogosUrl: CP.get(CP.COMUNITY_LOGOS_URL)
        }
    }

    componentDidMount = () => {
        this.props.loadRecomendedComunities!();
    }

    private getCarrouselItems = (): CardCarrouselItem[] => {
        const items: CardCarrouselItem[] = [];
        const { recomendedComunities } = this.props;

        recomendedComunities!.forEach(recomendedComunity => {
            items.push(
                {
                    title: recomendedComunity.name,
                    showUserLikes: true,
                    img: `${this.state.comunitylogosUrl}${recomendedComunity.logo}`,
                    innerTitles: [
                        recomendedComunity.description
                    ],
                    previewImages: recomendedComunity.likeUserPhotos
                }
            );
        });
        return items;
    }

    private getRecomendedComunitiesCount() {
        return this.props.recomendedComunities!.length;
    }

    public render() {
        return (
            <TitleContainerComponent
                mainTitle="Comunidades recomendadas"
                // TODO: Mover el armado de este texto al componente TitleContainerComponent
                secondaryTitle={"(" + this.getRecomendedComunitiesCount() + " encontradas)"}
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

const mapDispatchToProps = (dispatch: Dispatch): IRecomendedComunitiesComponentProps => {
    return {
        loadRecomendedComunities: () => dispatch(comunityActions.loadRecomendedComunities())
    };
};

const mapStateToProps = (state: IAppState): IRecomendedComunitiesComponentProps => {
    return {
        recomendedComunities: state.comunityState.recomendedComunities
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(RecomendedComunitiesComponent);

