import React, { Component, CSSProperties } from 'react';
import "./comunity-banner.component.scss";
import StarRatingComponent from 'react-star-rating-component';
import ThumbnailImagesComponent from '../../../widgets/thumbnail-images/thumbnail-images.component';

interface IComunityBannerComponentProps {
    bannerImage: string;
    logo: string;
    name: string;
    category: string;
    score: number;
    likeUserPhotos: string[] | undefined;
}

class ComunityBannerComponent extends Component<IComunityBannerComponentProps, {}> {

    private mainContainerStyle(): CSSProperties {
        return {
            backgroundImage: `url(${this.props.bannerImage})`
        };
    }

    public render(): JSX.Element {
        const { logo, name, category, score, likeUserPhotos } = this.props;
        return (
            <div className="grid grid-center comunity-banner" style={this.mainContainerStyle()} >
                <section className="column-20 maximum-height flex-row-center-items-center ">
                    <img src={logo} alt="logo" className="logo" />
                </section>
                <section className="column maximum-height info-details">
                    <div className="flex-row-items-center">
                        <h3 className="title">{name}</h3>
                        <button className="btn-transparent favorite flex-row-items-center">
                            <i className="fas fa-heart icon-favorite" />
                        </button>
                    </div>
                    <div >
                        <p className="category">{category}</p>
                    </div>
                    <div className="ratings">
                        <StarRatingComponent
                            name="rate1"
                            starCount={5}
                            value={score}
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
                        <ThumbnailImagesComponent images={likeUserPhotos}
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
        )
    }
}

export default ComunityBannerComponent;
