import React, { Component } from 'react';
import "./account.component.scss";
import Popup from "reactjs-popup";
import ImageContainerComponent from '../widgets/image-container/image-container.component';


class AccountComponent extends Component<{}, {}> {
    public render(): JSX.Element {
        return (
            <Popup
                trigger={
                    <div className="account-image-container clickable">
                        <ImageContainerComponent
                            img="/img/login/flags/dummy.png"
                            displayText="CUENTA"
                            iconCls="fas fa-chevron-down"
                            showIcon={true}
                        />
                    </div>
                }
                position="bottom right"
                offsetX={11}
                on="hover"
                defaultOpen={false}
                contentStyle={{
                    width: "264px"
                }}
            >
                <div className="account-popup-container">
                    Content here

                </div>
            </Popup>
        );
    }
}

export default AccountComponent;