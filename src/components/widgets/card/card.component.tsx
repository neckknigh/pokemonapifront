import React, { Component } from 'react';
import "./card.component.scss";

export default class CardComponent extends Component<{}, {}> {
    public render(): JSX.Element {
        return (
            <div className="card-container">
                <div className="card-header-container">
                    <img src="https://placeimg.com/380/185/nature" alt="card" className="card-img" />
                    <div className="user-likes-container">
                        <span className="circle"></span>
                        <span className="circle"></span>
                        <span className="circle"></span>
                        <span className="circle"></span>
                        <span className="circle with-inner-text">+34k</span>
                    </div>
                </div>
                <div className="card-body-container">
                    <h3 className="card-title">Nombre Comunidad</h3>
                    <p className="hint">Hamburguesas - Perros</p>
                    <p className="hint">Abierto hasta las 10pm</p>
                </div>
            </div>
        );
    }
}
