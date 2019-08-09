import React, { Component, Fragment } from 'react'
import Sidebar from 'react-sidebar';
import { IAppState } from '../../../redux/app-state';
import { connect } from 'react-redux';
import { sideMenuStyleConfig, items } from './side-menu-data.component';
import "./side-menu.component.scss";
import DropDownComponent from '../drop-down/drop-down.component';

export interface ISideMenuComponentProps {
    readonly isSideMenuOpen: boolean;
    readonly userHasSession: boolean;
}

export interface ISideMenuComponentState {
    readonly mql: any;
    readonly styles: any;
    readonly items: any[];
}

class SideMenuComponent extends Component<ISideMenuComponentProps, ISideMenuComponentState> {
    constructor(props: ISideMenuComponentProps) {
        super(props);
        this.state = {
            mql: window.matchMedia(`(min-width: 800px)`),
            styles: sideMenuStyleConfig,
            items: items
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
                sidebar={
                    <div className="flex-column-center-items side-menu-container">
                        {
                            this.state.items.map((item: any, index: number) => {
                                return <DropDownComponent
                                    headerText={item.name}
                                    innerItems={item.innerItems}
                                    key={index}
                                />
                            })
                        }
                    </div>
                }
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
