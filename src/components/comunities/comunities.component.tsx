import React, { Component } from 'react';
import "./comunities.component.scss";
import PopularComunities from './popular/popular-comunities.component';
import RecomendedComunities from './recomended/recomended-comunities.component';

class Comunities extends Component<{}, {}> {
    public render() {
        return (
            <div className="comunities-container">

                <PopularComunities />

                <RecomendedComunities />
            </div>
        );
    }
}

export default Comunities;

