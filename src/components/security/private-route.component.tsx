import React, { Component } from 'react';
import {
    Route, Redirect, RouteComponentProps
} from "react-router-dom";


class PrivateRouteComponent extends Component<any, any> {
    render() {
        const { component, ...rest } = this.props;
        return (
            <Route
                {...rest}
                render={(props: RouteComponentProps) => {
                    return (
                        false ? <Component {...props} /> :
                            <Redirect
                                to={{
                                    pathname: "/",
                                    state: { from: props.location }
                                }}
                            />
                    );
                }}
            />
        );
    }
}

export default PrivateRouteComponent;
