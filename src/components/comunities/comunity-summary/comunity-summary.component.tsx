import React, { Component } from 'react';
import "./comunity-summary.component.scss";
import { withRouter } from 'react-router';
//@ts-ignore
import { ResponsiveImage, ResponsiveImageSize } from 'react-responsive-image';
import StarRatingComponent from 'react-star-rating-component';
import ThumbnailImagesComponent from '../../widgets/thumbnail-images/thumbnail-images.component';
import { Dispatch } from 'redux';
import { ComunityActions } from '../../../redux/actions/comunity.actions';
import { comunityActions } from '../../../redux/action-creators/comunity.action.creator';
import { connect } from 'react-redux';

interface IComunitySummaryComponentProps {
    loadComunity?: (comunityId: string) => any;
}

class ComunitySummaryComponent extends Component<IComunitySummaryComponentProps, {}> {

    componentDidMount(): void {
        //this.props.loadComunity!(urlProvider.getComunityIdFromPath());
    }

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
                        <section className="column-20 maximum-height flex-row-center-items-center ">
                            <img src="https://picsum.photos/150/150" alt="logo" className="logo" />
                        </section>
                        <section className="column maximum-height info-details">
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
                            <div className="flex-row-space-between-items-center details">
                                <ThumbnailImagesComponent images={[
                                    "https://picsum.photos/150/150",
                                    "https://picsum.photos/150/150",
                                    "https://picsum.photos/150/150",
                                    "https://picsum.photos/150/150",
                                    "https://picsum.photos/150/150",
                                    "https://picsum.photos/150/150",
                                    "https://picsum.photos/150/150"
                                ]}
                                    imageCls="circle"
                                />
                                <div className="flex-column-center-items">
                                    <p className="feature-value">$ 3.500</p>
                                    <p className="feature-name">Valor Domicilio</p>
                                </div>
                                <div className="flex-column-center-items">
                                    <p className="feature-value">30 mins.</p>
                                    <p className="feature-name">Entrega</p>
                                </div>
                                <div className="flex-column-center-items">
                                    <p className="feature-value schedule">Abierto</p>
                                    <p className="feature-name">Horario</p>
                                </div>
                                <div>
                                    Medios de Pago
                                </div>
                            </div>
                        </section>
                    </div>

                </div>
            </div>
        );
    }
}

const mapDispatchToProps = ((dispatch: Dispatch<ComunityActions>): IComunitySummaryComponentProps => {
    return {
        loadComunity: (comunityId: string) => dispatch(comunityActions.loadComunity(comunityId))
    }
});

export default withRouter<any>(connect(null, mapDispatchToProps)(ComunitySummaryComponent));
