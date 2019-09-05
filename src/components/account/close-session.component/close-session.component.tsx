import React, { Component, Fragment } from 'react';
import "./close-session.component.scss";
import { ConfigProvider as CP } from '../../../services/config/config.service';
import { Modal, Button } from 'react-bootstrap';
import { Dispatch } from 'redux';
import { authActions } from '../../../redux/action-creators/auth.action.creator';
import { connect } from 'react-redux';

interface ICloseSessionComponentProps {
    destroySession: () => any;
}

interface ICloseSessionComponentState {
    closeSessionDisplay: string;
    showConfirmationModal: boolean;
    cancelDisplayOption: string;
}

class CloseSessionComponent extends Component<ICloseSessionComponentProps, ICloseSessionComponentState> {

    public constructor(props: ICloseSessionComponentProps) {
        super(props);

        this.state = {
            closeSessionDisplay: CP.get(CP.CLOSE_SESSION_DISPLAY),
            showConfirmationModal: false,
            cancelDisplayOption: CP.get(CP.CANCEL_DISPLAY)
        }
    }

    private closeModal = () => {
        this.setState({
            showConfirmationModal: false
        });
    }

    private openModal = () => {
        this.setState({
            showConfirmationModal: true
        });
    }

    private handleCloseSession = () => {
        this.closeModal();
        this.props.destroySession();
    }

    public render(): JSX.Element {
        const { showConfirmationModal, closeSessionDisplay, cancelDisplayOption } = this.state;
        return (
            <Fragment>
                <button className="btn btn-block trasnparent btn-logout" onClick={this.openModal}>
                    <span>{closeSessionDisplay}</span>
                </button>
                <Modal show={showConfirmationModal} onHide={this.closeModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>{closeSessionDisplay}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>¿Está seguro que desea cerrar la sesión?</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.closeModal}>
                            {cancelDisplayOption}
                        </Button>
                        <Button variant="primary" onClick={this.handleCloseSession}>
                            Aceptar
                    </Button>
                    </Modal.Footer>
                </Modal>
            </Fragment>
        );
    }
}

const mapDispatchToProps = (dispatch: Dispatch): ICloseSessionComponentProps => {
    return {
        destroySession: () => dispatch(authActions.destroySession())
    }
};

export default connect(null, mapDispatchToProps)(CloseSessionComponent);
