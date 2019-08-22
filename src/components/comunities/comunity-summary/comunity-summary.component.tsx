import React, { Component } from 'react';
import "./comunity-summary.component.scss";
import { withRouter, RouteComponentProps } from 'react-router';
import * as History from 'history';

interface IComunitySummaryComponentProps extends RouteComponentProps {
    //readonly history?: History.History;
    //readonly match?: any;
}

class ComunitySummaryComponent extends Component<IComunitySummaryComponentProps, {}> {

    public render(): JSX.Element {
        debugger
        return (
            <div className="comunity-summary">
                <div className="top">
                    <img
                        src="https://picsum.photos/id/85/1400/300"
                        alt="banner" className="banner" />


                    <div className="grid banner-summary-info">
                        <section className="column-20 test-border">
                            <img src="https://picsum.photos/150/150" alt="logo" className="logo" />
                        </section>
                        <section className="column test-border">
                            Touch to go - Las mejores alitas del mundos
                       </section>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter<RouteComponentProps>(ComunitySummaryComponent);
