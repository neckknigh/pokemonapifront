import React, { Component } from 'react';
import "./country-flags.component.scss";

class CountryFlagsComponent extends Component<{}, {}> {
    public render(): JSX.Element {
        return (
            <div className="flags-container">
                <img src="/img/flags/bol-flag.png" alt="bol" className="flag-icon" />
                <img src="/img/flags/col-flag.png" alt="col" className="flag-icon" />
                <img src="/img/flags/mex-flag.png" alt="mex" className="flag-icon" />
            </div>
        );
    }
}

export default CountryFlagsComponent;
