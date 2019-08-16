import React, { Component } from 'react';
import "./comunities.component.scss";
import PopularComunities from './popular/popular-comunities.component';
import RecomendedComunitiesComponent from './recomended/recomended-comunities.component';
import TagsFilterComponent from '../widgets/tags-filter/tags-filter.component';

class ComunitiesComponent extends Component<{}, {}> {
    public render() {
        return (
            <div className="comunities-container">

                <div className="">
                    <PopularComunities />
                </div>

                <div className="tags-container">
                    <TagsFilterComponent />
                </div>

                <div className="recomended-container">
                    <RecomendedComunitiesComponent />
                </div>
            </div>
        );
    }
}

export default ComunitiesComponent;

