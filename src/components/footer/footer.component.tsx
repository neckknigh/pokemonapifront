import React, { Component } from 'react';
import { IAppState } from '../../redux/app-state';
import { connect } from 'react-redux';

interface FooterComponentProps {
    readonly userHasSession: boolean;
}

class FooterComponent extends Component<FooterComponentProps, {}> {
    public render(): JSX.Element {
        return (
            <footer>
                {
                    this.props.userHasSession &&
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
        userHasSession: state.authState.userHasSession
    }
}

export default connect(mapStateToProps)(FooterComponent);