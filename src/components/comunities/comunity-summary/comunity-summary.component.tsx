import React, { Component } from 'react';
import "./comunity-summary.component.scss";
import { withRouter, RouteComponentProps } from 'react-router';
//@ts-ignore
import { ResponsiveImage, ResponsiveImageSize } from 'react-responsive-image';
import StarRatingComponent from 'react-star-rating-component';

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

                    {/* TOO: REVISAR ESTO*/}
                    <ResponsiveImage className="logo">
                        <ResponsiveImageSize
                            default
                            minWidth={0}

                            path={'https://picsum.photos/800/150'}
                            className="logo"
                        />
                        <ResponsiveImageSize
                            minWidth={768}
                            path={'https://picsum.photos/1000/225'}
                            className="logo"
                        />
                        <ResponsiveImageSize
                            minWidth={992}
                            path={'https://picsum.photos/1200/225'}
                            className="logo"
                        />
                        <ResponsiveImageSize
                            minWidth={1200}
                            path={'https://picsum.photos/2000/225'}
                            className="logo"
                        />
                    </ResponsiveImage>

                    <div className="grid banner-summary-info">
                        <section className="column-20 flex-row-center-items-center ">
                            <img src="https://picsum.photos/150/150" alt="logo" className="logo" />
                        </section>
                        <section className="column info-details">
                            <div className="flex-row-items-center">
                                <h3 className="title">Touch to go - Las mejores alitas del mundos</h3>
                                <button className="btn-transparent favorite flex-row-items-center">
                                    <i className="fas fa-heart icon-favorite" />
                                </button>
                            </div>
                            <div >
                                <p className="category">Restaurantes</p>
                            </div>
                            <div className="ratings">
                                <StarRatingComponent
                                    name="rate1"
                                    starCount={5}
                                    value={3}
                                    renderStarIcon={(index: number, value: number) => {
                                        const icon = index <= value ? 'fas fa-star' : 'far fa-star';
                                        return (

                                            <span>
                                                <i className={`${icon} star-icon`} />
                                            </span>
                                        );
                                    }}
                                />
                            </div>
                        </section>
                    </div>

                </div>
            </div>
        );
    }
}

export default withRouter<RouteComponentProps>(ComunitySummaryComponent);
