import React, { Component } from 'react';
import CarrouselComponent from '../widgets/carrousel/carrousel.component';


class DashBoardComponent extends Component<{}, {}> {

    render() {
        return (
            <div>
                <CarrouselComponent />
            </div>
        );
    }
}

export default DashBoardComponent;