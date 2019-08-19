import React, { Component } from 'react';
import "./country-flags.component.scss";
import { utilService } from '../../../services/util.service';

interface CountryFlagsComponentProps {
    readonly flagWidth?: string;
}

interface CountryFlagsComponentState {
    defaultFlagWidth: string;
}

class CountryFlagsComponent extends Component<CountryFlagsComponentProps, CountryFlagsComponentState> {

    constructor(props: CountryFlagsComponentProps) {
        super(props);

        this.state = {
            defaultFlagWidth: "1.4rem"
        }
    }

    private getFlagSize() {
        const { flagWidth } = this.props;
        return utilService.isDefined(flagWidth) ? flagWidth : this.state.defaultFlagWidth;
    }

    public render(): JSX.Element {
        return (
            <div className="country-flags-container">
                <img src="/img/flags/bol-flag.png" alt="bol" style={{
                    width: this.getFlagSize()
                }} className="clickable" />
                <img src="/img/flags/col-flag.png" alt="col" style={{
                    width: this.getFlagSize()
                }} className="clickable" />
                <img src="/img/flags/mex-flag.png" alt="mex" style={{
                    width: this.getFlagSize()
                }} className="clickable" />
            </div>
        );
    }
}

export default CountryFlagsComponent;
