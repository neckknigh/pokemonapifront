import React, { Component } from 'react';
import "./promotions.component.scss";
import TitleContainerComponent from '../widgets/title-container/title-container.component';
import CardCarrouselComponent, { CardCarrouselItem } from '../widgets/carrousel/card-carrousel.component';
import { Promotion } from '../../models/promotion.model';
import { ConfigProvider as CP } from '../../services/config/config.service';
import { connect } from 'react-redux';
import { IAppState } from '../../redux/app-state';
import { utilService } from '../../services/util.service';

interface IPromotionsComponentProps {
    readonly promotions?: Promotion[];
}

interface IPromotionsComponentState {
    promotionslogosUrl: string;
    mainTitle: string;
    totalComuityfounded: string;
}

class PromotionsComponent extends Component<IPromotionsComponentProps, IPromotionsComponentState> {

    constructor(props: any) {
        super(props);

        this.state = {
            promotionslogosUrl: CP.get(CP.ANNOUNCEMENTS_LOGOS_URL),
            mainTitle: CP.get(CP.PROMOTIONS_MAIN_TITLE),
            totalComuityfounded: CP.get(CP.TOTAL_ITEMS_FOUNDED_DISPLAY)
        };
    }

    private getCarrouselItems = (): CardCarrouselItem[] => {
        const items: CardCarrouselItem[] = [];

        this.props.promotions!.forEach((promotion: Promotion) => {
            items.push(
                {
                    title: promotion.name,
                    showUserLikes: false,
                    img: `${this.state.promotionslogosUrl}${promotion.imagePath}`,
                    innerTitles: [
                        promotion.description
                    ],
                    id: utilService.getUniqueID()
                }
            );
        })
        return items;
    }

    public getPromotionsCount(): number {
        return this.props.promotions!.length;
    }

    public render(): JSX.Element {
        return (
            <TitleContainerComponent
                mainTitle={this.state.mainTitle}
                secondaryTitle={utilService.replaceParamsInString(
                    this.state.totalComuityfounded,
                    {
                        count: this.getPromotionsCount()
                    }
                )}
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

const mapStateToProps = (state: IAppState): IPromotionsComponentProps => {
    return {
        promotions: state.promotionState.promotions
    }
}

export default connect(mapStateToProps)(PromotionsComponent);
