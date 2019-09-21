import React, { Component } from 'react';
import "./popular-comunities.component.scss";
import { ConfigProvider as CP } from '../../../services/config/config.service';
import { connect } from 'react-redux';
import { Comunity } from '../../../models/comunity.model';
import { IAppState } from '../../../redux/app-state';

interface IPopularComunitiesState {
    mainTitle: string;
}

interface IPopularComunitiesProps {
    popularComunities?: Comunity[];
}

class PopularComunities extends Component<IPopularComunitiesProps, IPopularComunitiesState> {

    constructor(props: any) {
        super(props);
        this.state = {
            mainTitle: CP.get(CP.POPULAR_COMUNITIES_DISPLAY)
        }
    }

    public render() {
        return (
            <div className="popular-comunities-container">
                <div className="comunity-header-container">
                    <h1 className="header">{this.state.mainTitle}</h1>
                </div>
                <div className="grid grid-with-padding-bottom cards-comunities-container">

                    {
                        this.props.popularComunities!.map((popularComunity, index: number) => {
                            return (
                                <div key={index} className="column-32 comunity-card">
                                    <img alt="" className="card-comunity-img" src={popularComunity.logo} />
                                    <p className="card-comunity-title">{popularComunity.name}</p>
                                </div>
                            );
                        })
                    }

                </div>

            </div>
        );
    }
}

const mapStateToProps = (state: IAppState): IPopularComunitiesProps => {
    return {
        popularComunities: state.comunityState.popularComunities
    };
}

export default connect(mapStateToProps)(PopularComunities);
