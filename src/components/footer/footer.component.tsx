import React, { Component } from 'react';
import { IAppState } from '../../redux/app-state';
import { connect } from 'react-redux';
import "./footer.component.scss";
import CountryFlagsComponent from '../widgets/country-flags/country-flags.component';
import { NullableString } from '../../types/types';

interface FooterComponentProps {
    readonly userHasSession: NullableString;
    readonly isAdminUser: NullableString;
}

class FooterComponent extends Component<FooterComponentProps, {}> {
    public render(): JSX.Element {
        return (
            <footer>
                {
                    (this.props.userHasSession === "Y" &&
                        this.props.isAdminUser === "Y") &&
                    <div className="footer-container">
                        <div className="grid footer-top">
                            <div className="column column-flex grid-justify-center">
                                <a href="https://doomicilios.net" className="column-full footer-link " >Nosotros</a>
                                <a href="https://doomicilios.net" className="column-full footer-link " >Contacto</a>
                            </div>
                            <div className="column column-flex">
                                <a href="https://doomicilios.net" className="column-full footer-link " >Trabaja con nosotros</a>
                                <a href="https://doomicilios.net" className="column-full footer-link" >Sugiere una comunidad</a>
                            </div>
                            <div className="column column-flex">

                                <h3 className="column-full footer-title" >Siguenos</h3>
                                <a href="https://doomicilios.net" className="footer-link with-image ">
                                    <img src="/img/footer/faceicon.png" className="footer-icon " alt="facebook" />
                                </a>
                                <a href="https://doomicilios.net" className="footer-link with-image">
                                    <img src="/img/footer/instaicon.png" className="footer-icon" alt="Instagram" />
                                </a>
                                <a href="https://doomicilios.net" className="footer-link with-image">
                                    <img src="/img/footer/youtubeicon.png" className="footer-icon" alt="Youtube" />
                                </a>
                            </div>
                            <div className="column apps-container column-flex">
                                <h3 className="column-full footer-title" >Descarga la App</h3>
                                <a href="https://doomicilios.net" className="footer-link with-image">
                                    <img src="/img/footer/androidicon.png" className="footer-icon" alt="AndroidApp" />
                                </a>
                                <a href="https://doomicilios.net" className="footer-link with-image">
                                    <img src="/img/footer/appleicon.png" className="footer-icon apple" alt="AppleApp" />
                                </a>
                            </div>
                        </div>
                        <div className="grid footer-bottom">
                            <div className="column"><p>Doo - El Barrio en tu bolsillo 2015 -2019</p></div>
                            <div className="column"><CountryFlagsComponent /></div>
                        </div>
                    </div>

                }
            </footer>
        );
    }
}

const mapStateToProps = (state: IAppState): FooterComponentProps => {
    return {
        userHasSession: state.authState.userHasSession,
        isAdminUser: state.userState.isAdmin
    }
}

export default connect(mapStateToProps)(FooterComponent);