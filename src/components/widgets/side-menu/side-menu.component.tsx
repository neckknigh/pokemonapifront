import React, { Component, Fragment } from 'react'
import Sidebar from 'react-sidebar';
import { IAppState } from '../../../redux/app-state';
import { connect } from 'react-redux';

export interface ISideMenuComponentProps {
    readonly isSideMenuOpen: boolean;
    readonly userHasSession: boolean;
}

export interface ISideMenuComponentState {
    readonly mql: any;
    readonly styles: any;
}

class SideMenuComponent extends Component<ISideMenuComponentProps, ISideMenuComponentState> {
    private stiles: any;
    constructor(props: ISideMenuComponentProps) {
        super(props);
        this.state = {
            mql: window.matchMedia(`(min-width: 800px)`),
            styles: {
                root: {
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    overflow: "hidden"
                },
                sidebar: {
                    zIndex: 2,
                    position: "absolute",
                    top: "2.8rem",
                    bottom: 0,
                    transition: "transform .3s ease-out",
                    WebkitTransition: "-webkit-transform .3s ease-out",
                    willChange: "transform",
                    overflowY: "auto",
                    width: "17rem"
                },
                content: {
                    position: "absolute",
                    top: "2.8rem",
                    left: 0,
                    right: 0,
                    bottom: 0,
                    overflowY: "auto",
                    WebkitOverflowScrolling: "touch",
                    transition: "left .3s ease-out, right .3s ease-out"
                },
                overlay: {
                    zIndex: 1,
                    position: "fixed",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    opacity: 0,
                    visibility: "hidden",
                    transition: "opacity .3s ease-out, visibility .3s ease-out",
                    backgroundColor: "rgba(0,0,0,.3)"
                },
                dragHandle: {
                    zIndex: 1,
                    position: "fixed",
                    top: 0,
                    bottom: 0
                }
            }
        }
    }

    componentWillMount() {
        this.state.mql.addListener(this.mediaQueryChanged);
    }

    componentWillUnmount() {
        this.state.mql.removeListener(this.mediaQueryChanged);
    }

    private mediaQueryChanged = () => {
        //this.setState({ docked: this.state.mql.matches });
    }

    render() {

        // Si el usuario no tiene sesión, no se muestra el menú lateral
        if (!this.props.userHasSession) {
            return (
                <Fragment>
                    {this.props.children}
                </Fragment>
            )
        }

        return (
            <Sidebar
                sidebar={<b>Sidebar content</b>}
                styles={this.state.styles}
                docked={this.props.isSideMenuOpen}
                contentClassName="content"
            >
                {this.props.children}
            </Sidebar>
        );
    }
}

const mapStateToProps = (state: IAppState): ISideMenuComponentProps => {
    return {
        isSideMenuOpen: state.systemState.isSideMenuOpen,
        userHasSession: state.authState.userHasSession
    }
};

export default connect(mapStateToProps)(SideMenuComponent);
