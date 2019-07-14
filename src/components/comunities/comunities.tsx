import * as React from 'react';

export interface CominityProps {

}

export interface CominityState {

}

class Cominity extends React.Component<CominityProps, CominityState> {
    //state = { :  }
    render() {
        return (
            <div>
                Datos usuario: {localStorage.getItem("user")}
            </div>
        );
    }
}

export default Cominity;