import React, { Component } from 'react';
import "./recomended-comunities.component.scss";
import CardCarrouselComponent from '../../widgets/carrousel/card-carrousel.component';

class RecomendedComunities extends Component<{}, {}> {
    public render() {
        return (
            <div className="recomended-comunities-container">
                <div className="flex-row-items-center">
                    <div className="comunity-header-container">
                        <h1 className="header">Comunidades recomendadas</h1>
                    </div>
                    <div>
                        <span className="hint">(45 encontradas)</span>
                    </div>
                </div>
                <div className="carrousel-container">
                    <CardCarrouselComponent />
                </div>
            </div>
        );
    }
}

export default RecomendedComunities;

