import React, { Component } from 'react';
import "./popular-comunities.component.scss";

class PopularComunities extends Component<{}, {}> {

    public render() {
        return (
            <div className="popular-comunities-container">
                <div className="header-container">
                    <h1 className="popular-header">Comunidades Populares</h1>
                </div>
                <div className="flex-row-center-items-center-wrap cards-comunities-container">
                    <div className="comunity-card">
                        <img alt="comunity" className="card-comunity-img" src="https://via.placeholder.com/350x100.png" />
                        <p className="card-comunity-title">DooMarket</p>
                    </div>

                    <div className="comunity-card">
                        <img alt="comunity" className="card-comunity-img" src="https://via.placeholder.com/350x100.png" />
                        <p className="card-comunity-title">DooFarmacia</p>
                    </div>

                    <div className="comunity-card">
                        <img alt="comunity" className="card-comunity-img" src="https://via.placeholder.com/350x100.png" />
                        <p className="card-comunity-title">Almuerzos</p>
                    </div>
                </div>

            </div>
        );
    }

}

export default PopularComunities;
