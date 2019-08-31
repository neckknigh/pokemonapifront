import React, { Component } from 'react';
import CarrouselComponent from '../widgets/carrousel/carrousel.component';
import { connect } from 'react-redux';
import "./dashboard.component.scss";
import PromotionsComponent from '../promotions/promotions.component';
import ComunitiesComponent from '../comunities/comunities.component';
import { utilService } from '../../services/util.service';


class DashBoardComponent extends Component<{}, {}> {

    constructor(props: any) {
        super(props);

        // TODO: Quitar esto de aquí
        if (utilService.isDefined(navigator.geolocation)) {
            navigator.geolocation.getCurrentPosition(
                function success(position) {
                    // for when getting location is a success
                    console.log('latitude', position.coords.latitude,
                        'longitude', position.coords.longitude);
                },
                function error(error_message) {
                    // for when getting location results in an error
                    console.error('An error has occured while retrieving location', error_message);
                });
        }

    }

    render() {
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

export default connect(null)(DashBoardComponent);