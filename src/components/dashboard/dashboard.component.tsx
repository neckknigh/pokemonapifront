import React, { Component } from 'react';
import CarrouselComponent from '../widgets/carrousel/carrousel.component';
import { connect } from 'react-redux';
import "./dashboard.component.scss";
import PromotionsComponent from '../promotions/promotions.component';
import ComunitiesComponent from '../comunities/comunities.component';
import { withRouter } from 'react-router';
import { Dispatch } from 'redux';
import { systemActions } from '../../redux/action-creators/system.action.creator';

interface IDashBoardComponentProps {
    loadMainData: () => void;
}


class DashBoardComponent extends Component<IDashBoardComponentProps, {}> {

    public componentDidMount() {
        this.props.loadMainData();
    }

    public render(): JSX.Element {
        return (
            <div className="dashboard-container">
                <CarrouselComponent />
                <div className="dashboard-body">
                    <div className="comunities-container">
                        <ComunitiesComponent />
                    </div>
                    <div className="promotions-container">
                        <PromotionsComponent />
                    </div>
                </div>
            </div>
        );
    }
}

const mapDispachToProps = (dispatch: Dispatch): IDashBoardComponentProps => {
    return {
        loadMainData: () => dispatch(systemActions.loadMainData())
    }
};

export default withRouter<any>(connect(null, mapDispachToProps)(DashBoardComponent));