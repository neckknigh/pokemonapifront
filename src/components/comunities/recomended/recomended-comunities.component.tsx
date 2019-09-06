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
import { utilService } from '../../../services/util.service';
import * as BrowserHistory from 'history';
import { withRouter } from 'react-router';
import { urlProvider } from '../../../services/config/url.service';

interface IRecomendedComunitiesComponentProps {
    readonly history?: BrowserHistory.History;
    readonly loadRecomendedComunities?: () => void;
    readonly recomendedComunities?: Comunity[];
}

interface IRecomendedComunitiesComponentState {
    mainTitle: string;
    totalComuityfounded: string;
    comunityDetailURL: string;
}

class RecomendedComunitiesComponent extends Component<IRecomendedComunitiesComponentProps, IRecomendedComunitiesComponentState> {

    constructor(props: IRecomendedComunitiesComponentProps) {
        super(props);

        this.state = {
            mainTitle: CP.get(CP.RECOMENDED_COMUNITY_MAIN_TITLE),
            totalComuityfounded: CP.get(CP.TOTAL_ITEMS_FOUNDED_DISPLAY),
            comunityDetailURL: urlProvider.get(urlProvider.URL_COMUNITY_DETAIL)
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
                    img: recomendedComunity.logo,
                    innerTitles: [
                        recomendedComunity.description
                    ],
                    previewImages: recomendedComunity.likeUserPhotos,
                    id: recomendedComunity.id
                }
            );
        });
        return items;
    }

    private getRecomendedComunitiesCount(): number {
        return this.props.recomendedComunities!.length;
    }

    /**
     * Permite redireccionar al detalle de una comunidad
     */
    private onTapCard = (selectedCardItem: CardCarrouselItem) => {
        this.props.history!.push(
            utilService.replaceParamsInString(this.state.comunityDetailURL, {
                id: selectedCardItem.id
            })
        );
    }

    public render(): JSX.Element {
        return (
            <TitleContainerComponent
                mainTitle={this.state.mainTitle}
                secondaryTitle={utilService.replaceParamsInString(
                    this.state.totalComuityfounded,
                    {
                        count: this.getRecomendedComunitiesCount()
                    }
                )}
            >
                <div className="carrousel-container">
                    <CardCarrouselComponent
                        cardItems={this.getCarrouselItems()}
                        onTap={this.onTapCard}
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

export default withRouter<any>(connect(mapStateToProps, mapDispatchToProps)(RecomendedComunitiesComponent));

