import React, { Component } from 'react';
import CarrouselComponent from '../widgets/carrousel/carrousel.component';
import { connect } from 'react-redux';
import { IAppState } from '../../redux/app-state';
import Comunities from '../comunities/comunities.component';
import "./dashboard.component.scss";

interface IDashBoardComponent {
    userHasSession?: boolean;
    history?: any,
    isAdminUser?: boolean;
}


class DashBoardComponent extends Component<IDashBoardComponent, {}> {

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
            <div>
                <CarrouselComponent />
                <div className="comunities-container">
                    <Comunities />
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: IAppState): IDashBoardComponent => {
    return {
        isAdminUser: state.userState.isAdmin,
        userHasSession: state.authState.userHasSession
    }
}

export default connect(mapStateToProps)(DashBoardComponent);