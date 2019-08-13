import React, { Component } from 'react';
import "./account.component.scss";
import Popup from "reactjs-popup";


class AccountComponent extends Component<{}, {}> {
    public render(): JSX.Element {
        return (
            <Popup
                trigger={
                    //<button>Trigger</button>
                    <div className="flex-row-center-items-center account clickable">
                        <img
                            src="/img/login/flags/dummy.png"
                            alt="account"
                            className="account-image"
                        />
                        <div className="flex-row-center-items-center account-box">
                            <span className="account-display">CUENTA</span>
                            <span className="flex-row-center-items-center account-arrow">
                                <i className="fas fa-chevron-down" />
                            </span>
                        </div>
                    </div>
                }
                position="bottom right"
                offsetX={11}
                on="hover"
                //defaultOpen={true}
                contentStyle={{
                    width: "264px"
                }}
                open={true}
            >
                <div className="account-popup-container">
                    Content here

                </div>
            </Popup>
        );
    }
}

export default AccountComponent;