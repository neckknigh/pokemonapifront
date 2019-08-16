import React, { Component } from 'react';
import "./account-sumary.component.scss";
import Popup from "reactjs-popup";
import ImageContainerComponent from '../widgets/image-container/image-container.component';
import { IAppState } from '../../redux/app-state';
import { Account } from '../../models/account.model';
import { connect } from 'react-redux';
import { utilService } from '../../services/util.service';

export interface IAccountSummaryComponentProps {
    readonly userInfo?: Account;
}

class AccountSummaryComponent extends Component<IAccountSummaryComponentProps, {}> {

    private getUserFullName = (userInfo: Account): string => {
        return utilService.getUserFullName(userInfo);
    }

    public getUserProfileImage = (userInfo: Account): string => {
        if (userInfo) {
            return userInfo.profileImage!;
        }
        return "";
    }


    public render(): JSX.Element {
        const { userInfo } = this.props;
        return (
            <Popup
                trigger={
                    <div className="clickable">
                        <ImageContainerComponent
                            img={this.getUserProfileImage(userInfo!)}
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
                            img={this.getUserProfileImage(userInfo!)}
                            displayText={this.getUserFullName(userInfo!)}
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

const mapStateToProps = (state: IAppState): IAccountSummaryComponentProps => {
    return {
        userInfo: state.userState.userInfo
    }
}

export default connect(mapStateToProps)(AccountSummaryComponent);