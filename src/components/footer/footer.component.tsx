import React, { Component } from 'react';
import { IAppState } from '../../redux/app-state';
import { connect } from 'react-redux';

interface FooterComponentProps {
    readonly userHasSession: boolean;
    readonly isAdminUser: boolean;
}

class FooterComponent extends Component<FooterComponentProps, {}> {
    public render(): JSX.Element {
        return (
            <footer>
                {
                    (this.props.userHasSession &&
                        this.props.isAdminUser) &&
                    <div>
                        <p>FooterComponent</p>
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