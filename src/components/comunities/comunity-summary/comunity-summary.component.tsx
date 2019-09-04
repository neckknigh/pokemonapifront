import React, { Component } from 'react';
import "./comunity-summary.component.scss";
import { withRouter } from 'react-router';
import { Dispatch } from 'redux';
import { ComunityActions } from '../../../redux/actions/comunity.actions';
import { comunityActions } from '../../../redux/action-creators/comunity.action.creator';
import { connect } from 'react-redux';
import { IRouterProps } from '../../../types/types';
import { Comunity } from '../../../models/comunity.model';
import { IAppState } from '../../../redux/app-state';
import { utilService } from '../../../services/util.service';
import ComunityBannerComponent from './comunity-banner.component/comunity-banner.component';
import { Nav } from 'react-bootstrap';
import ImageContainerComponent from '../../widgets/image-container/image-container.component';
import TitleContainerComponent from '../../widgets/title-container/title-container.component';
import ProductCardComponent from './product-card/product-card.component';

interface IComunitySummaryComponentProps extends IRouterProps {
    loadComunity?: (comunityId: string) => any;
    comunityLoaded?: Comunity | null;
}

class ComunitySummaryComponent extends Component<IComunitySummaryComponentProps, {}> {

    componentDidMount(): void {
        debugger;
        const { loadComunity, match } = this.props;
        loadComunity!(match.params.id);
    }

    public render(): JSX.Element | null {
        debugger;
        const { comunityLoaded } = this.props;

        if (!utilService.isEmpty(comunityLoaded)) {
            return (
                <div className="comunity-summary">

                    <ComunityBannerComponent
                        bannerImage="https://picsum.photos/1300/230"
                        logo={comunityLoaded!.logo}
                        name={comunityLoaded!.name}
                        category={comunityLoaded!.category.name}
                        likeUserPhotos={comunityLoaded!.likeUserPhotos}
                        score={comunityLoaded!.averageScore!}
                    />
                    <div className="grid body">
                        <aside className="aside">
                            <ImageContainerComponent
                                img="/img/comunity/ic_doo_delivery_2.png"
                                displayText="Doomicilios"
                                imageCls="menu-icon"
                                containerCls="menu-item"
                                textCls="menu-text"
                            />
                            <ImageContainerComponent
                                img="/img/comunity/slide_intro_8.png"
                                displayText="Enviar mensaje"
                                imageCls="menu-icon"
                                containerCls="menu-item"
                                textCls="menu-text"
                            />
                            <ImageContainerComponent
                                img="/img/comunity/slide_intro_4.png"
                                displayText="Opiniones"
                                imageCls="menu-icon"
                                containerCls="menu-item"
                                textCls="menu-text"
                            />
                            <ImageContainerComponent
                                img="/img/comunity/ic_msg_type_prom.png"
                                displayText="Promociones"
                                imageCls="menu-icon"
                                containerCls="menu-item"
                                textCls="menu-text"
                            />

                        </aside>
                        <section className="column-70 content">
                            <Nav justify variant="tabs" defaultActiveKey="costillas">
                                <Nav.Item>
                                    <Nav.Link href="#costillas" eventKey="costillas">Costillas de cerdo</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link href="#alitas">Alitas</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link href="#combos">Combos</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link href="#bebidas">Bebidas</Nav.Link>
                                </Nav.Item>
                            </Nav>
                            <div className="section-body">
                                <TitleContainerComponent
                                    mainTitle="Costillas de cerdo"
                                    className="section-container"
                                >

                                    <div className="grid grid-justify-space-between products">
                                        <ProductCardComponent
                                            className="column-49"
                                        />
                                        <ProductCardComponent
                                            className="column-49"
                                        />
                                        <ProductCardComponent
                                            className="column-49"
                                        />
                                    </div>

                                </TitleContainerComponent>

                                <TitleContainerComponent
                                    mainTitle="Alitas"
                                    className="section-container"
                                >

                                    <div className="grid grid-justify-space-between products">
                                        <ProductCardComponent
                                            className="column-49"
                                        />
                                        <ProductCardComponent
                                            className="column-49"
                                        />
                                        <ProductCardComponent
                                            className="column-49"
                                        />
                                    </div>

                                </TitleContainerComponent>

                                <TitleContainerComponent
                                    mainTitle="Acompañamientos"
                                    className="section-container"
                                >

                                    <div className="grid grid-justify-space-between products">
                                        <ProductCardComponent
                                            className="column-49"
                                        />
                                        <ProductCardComponent
                                            className="column-49"
                                        />
                                        <ProductCardComponent
                                            className="column-49"
                                        />
                                    </div>

                                </TitleContainerComponent>
                                <TitleContainerComponent
                                    mainTitle="Combos"
                                    className="section-container"
                                >

                                    <div className="grid grid-justify-space-between products">
                                        <ProductCardComponent
                                            className="column-49"
                                        />
                                        <ProductCardComponent
                                            className="column-49"
                                        />
                                        <ProductCardComponent
                                            className="column-49"
                                        />
                                    </div>

                                </TitleContainerComponent>

                                <TitleContainerComponent
                                    mainTitle="Bebidas"
                                    className="section-container"
                                >

                                    <div className="grid grid-justify-space-between products">
                                        <ProductCardComponent
                                            className="column-49"
                                        />
                                        <ProductCardComponent
                                            className="column-49"
                                        />
                                        <ProductCardComponent
                                            className="column-49"
                                        />
                                    </div>

                                </TitleContainerComponent>
                            </div>
                        </section>
                    </div>
                </div>
            );
        }

        return null;
    }
}

const mapStateToProps = (state: IAppState): IComunitySummaryComponentProps => {
    return {
        comunityLoaded: state.comunityState.comunityLoaded!
    }
}

const mapDispatchToProps = ((dispatch: Dispatch<ComunityActions>): IComunitySummaryComponentProps => {
    return {
        loadComunity: (comunityId: string) => dispatch(comunityActions.loadComunity(comunityId))
    }
});

export default withRouter<any>(connect(mapStateToProps, mapDispatchToProps)(ComunitySummaryComponent));
