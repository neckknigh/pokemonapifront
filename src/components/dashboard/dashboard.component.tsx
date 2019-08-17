import React, { Component } from 'react';
import CarrouselComponent from '../widgets/carrousel/carrousel.component';
import { connect } from 'react-redux';
import { IAppState } from '../../redux/app-state';
import "./dashboard.component.scss";
import PromotionsComponent from '../promotions/promotions.component';
import ComunitiesComponent from '../comunities/comunities.component';
import { utilService } from '../../services/util.service';

interface IDashBoardComponentProps {
    userHasSession?: boolean;
    history?: any,
    isAdminUser?: boolean;
}


class DashBoardComponent extends Component<IDashBoardComponentProps, {}> {

    constructor(props: IDashBoardComponentProps) {
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

        /**
         * No podrá acceder a esta ruta si no tiene sesión
         */
        if (!this.props.userHasSession) {
            this.props.history.push("/");
        }

        /**
         * Si es un administrador, se redirecciona 
         * al dashboard principal
         */
        if (!this.props.isAdminUser) {
            this.props.history.push("/incoming_features");
        }

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

const mapStateToProps = (state: IAppState): IDashBoardComponentProps => {
    return {
        isAdminUser: state.userState.isAdmin,
        userHasSession: state.authState.userHasSession
    }
}

export default connect(mapStateToProps)(DashBoardComponent);