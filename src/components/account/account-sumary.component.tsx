import React, { Component } from 'react';
import "./account-sumary.component.scss";
import Popup from "reactjs-popup";
import ImageContainerComponent from '../widgets/image-container/image-container.component';


class AccountSummaryComponent extends Component<{}, {}> {
    public render(): JSX.Element {
        return (
            <Popup
                trigger={
                    <div className="clickable">
                        <ImageContainerComponent
                            img="https://i.pravatar.cc/150?img=8"
                            displayText="CUENTA"
                            iconCls="fas fa-chevron-down"
                            showIcon={true}
                        />
                    </div>
                }
                position="bottom right"
                offsetX={11}
                // TODO: Descomentar esto
                //on="hover"
                //defaultOpen={false}
                contentStyle={{
                    width: "264px",
                    padding: 0
                }}
                overlayStyle={{
                    background: "#434343 0% 0% no-repeat padding-box",
                    opacity: 0.33
                }}
                // TODO: Quitar esto
                closeOnDocumentClick={true}
                className="account-summary"
            >
                <div className="account-popup-container clickable">
                    <div className="account-sumary-header">
                        <ImageContainerComponent
                            img="https://i.pravatar.cc/150?img=8"
                            displayText="Kevin Perez"
                            iconCls="fas fa-chevron-down"
                            containerCls="account-user-image-container"
                            textCls="account-user-text-display"
                            imageCls="account-user-img"
                        />
                    </div>
                    <div className="account-sumary-body">
                        <div className="account-drop-item">
                            <ImageContainerComponent
                                img="/img/account/doo.png"
                                displayText="Puntos Doo"
                                containerCls="drop-item-container"
                                imageCls="drop-item-image"
                                textCls="drop-item-text-display"
                            />
                        </div>
                        <div className="account-drop-item">
                            <ImageContainerComponent
                                img="https://img.icons8.com/plasticine/100/000000/appointment-reminders.png"
                                displayText="Opcion 1"
                                containerCls="drop-item-container"
                                imageCls="drop-item-image"
                                textCls="drop-item-text-display"
                            />
                        </div>
                        <div className="account-drop-item">
                            <ImageContainerComponent
                                img="https://img.icons8.com/dusk/64/000000/administrative-tools.png"
                                displayText="Ajustes"
                                containerCls="drop-item-container"
                                imageCls="drop-item-image"
                                textCls="drop-item-text-display"
                            />
                        </div>

                    </div>
                    <div className="account-sumary-footer ">
                        <button className="btn btn-block trasnparent btn-logout">
                            <span>Cerrar sesión</span>
                        </button>
                    </div>

                </div>
            </Popup>
        );
    }
}

export default AccountSummaryComponent;